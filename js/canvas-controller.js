'use strict'
var gCanvas;
var gCtx;
var gDrag = false;
const STICER_SIZE = 60;



function initCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.addEventListener("mousedown", startDrag);
    gCanvas.addEventListener("mousemove", drag);
    gCanvas.addEventListener("mouseup", finishDrag);
    gCanvas.addEventListener("touchmove", startDrag);
    gCanvas.addEventListener("touchmove", drag);
    gCanvas.addEventListener("touchend", finishDrag);

    if (window.innerWidth <= 550) {
        gCanvas.width = 350;
        gCanvas.height = 350;
    }
}

//UPLOAD CANVAS
function drawMeme() {
    const meme = getMeme();
    var img = new Image();
    var myImgMeme = getImgById(meme.selectedImgId);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawText();
    }
    img.src = myImgMeme.url;
}

function drawText() {
    const meme = getMeme();
    meme.lines.forEach((line) => {
        const myText = line.txt;
        let mySize = line.size;
        let myAlign = line.align;
        let myColor = line.color;
        let myColorLine = line.colorLine;
        let yPos = line.y;
        let xPos = line.x;
        let font = line.font;
        gCtx.lineWidth = '2';
        gCtx.strokeStyle = myColorLine;
        gCtx.fillStyle = myColor;
        gCtx.font = `${mySize}px ${font}`;
        gCtx.textAlign = myAlign;
        gCtx.fillText(myText, xPos, yPos);
        setWidthTxt(line.id, gCtx.measureText(myText).width);
        gCtx.strokeText(myText, xPos, yPos);
    })
}

function getCanvasSize() {
    return { height: gCanvas.height, width: gCanvas.width };
}

function renderCanvas(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

// ACTIONS
function onWrite(ev) {
    // setMemeText(ev.value);
    setNewType(ev.value, 'txt');
    drawMeme();
}

function onAddLine() {
    let elTxtInput = document.querySelector('.input-text');
    if (!elTxtInput.value) return;
    elTxtInput.value = '';
    addLine();
    drawMeme();
}

function onChangeSize(newVal) {
    setNewType(newVal, 'size');
    drawMeme();
}

function onOpenColors() {
    document.querySelector('.btn-color-fill').classList.add('display');
    document.querySelector('.color-fill').classList.remove('display');
}

function onOpenColorsLine() {
    document.querySelector('.btn-color-line').classList.add('display');
    document.querySelector('.color-line').classList.remove('display');
}

function onChangeColor(newColor) {
    document.querySelector('.btn-color-fill').classList.remove('display');
    document.querySelector('.color-fill').classList.add('display');
    setNewType(newColor, 'color');
    drawMeme();
}

function onChangeColorLine(newColor) {
    document.querySelector('.btn-color-line').classList.remove('display');
    document.querySelector('.color-line').classList.add('display');
    setNewType(newColor, 'colorLine');
    drawMeme();
}

function onChangeFont(newFont) {
    setNewType(newFont, 'font');
    // setFont(newFont);
    drawMeme();
}

function onRemoveLine() {
    removeLine();
    drawMeme();
}

function onMoveUp() {
    const currLine = getCurrentLine();
    setPosition(currLine.x, currLine.y - 5)
    drawMeme();
}

function onMoveDown() {
    const currLine = getCurrentLine();
    setPosition(currLine.x, currLine.y + 5)
    drawMeme();
}

function onSwitchLines() {
    const meme = getMeme();
    if (meme.selectedLineIdx === 0) {
        if (meme.lines.length > 0) meme.selectedLineIdx = meme.lines.length - 1;
    } else {
        meme.selectedLineIdx = meme.selectedLineIdx - 1;
    }
    document.querySelector('.input-text').value = meme.lines[gMeme.selectedLineIdx].txt;
}

function onRigth() {
    const currLine = getCurrentLine();
    setPosition(currLine.x + 5, currLine.y);
    drawMeme();
}

function onLeft() {
    const currLine = getCurrentLine();
    setPosition(currLine.x - 5, currLine.y);
    drawMeme();
}

function onCenter() {
    const currLine = getCurrentLine();
    setPosition(gCanvas.width / 2, currLine.y)
    drawMeme();
}

// DRAG
function drawSign() {
    const currLineIdx = getCurrentIdx();
    const meme = getMeme();
    let width = meme.lines[currLineIdx].widthTxt;
    let height = meme.lines[currLineIdx].size * 1.2;
    let posX = meme.lines[currLineIdx].x - meme.lines[currLineIdx].widthTxt / 2;
    let posY = meme.lines[currLineIdx].y - meme.lines[currLineIdx].size;
    gCtx.beginPath();
    gCtx.rect(posX, posY, width, height);
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = "rgb(0, 0, 0, 0.25)";
    gCtx.lineWidth = '2';
    gCtx.strokeRect(posX, posY, width, height);
    gCtx.fillRect(posX, posY, width, height);
}


function startDrag(ev) {
    const meme = getMeme();
    let { offsetX, offsetY } = ev;
    if (ev.type === "touchmove") {
        ev.preventDefault();
        offsetX = ev.targetTouches[0].pageX;
        offsetY = ev.targetTouches[0].pageY;
        console.log(offsetX);
        console.log(offsetY);
    }
    const clickedLine = meme.lines.find(line => {
        return (offsetY <= line.y + line.size && offsetY >= line.y - line.size
            && offsetX <= line.x + line.widthTxt && offsetX > line.x - line.widthTxt)
    });

    if (!clickedLine) return;
    setCurrLineIdx(clickedLine.id);
    gDrag = true;
}

function finishDrag(ev) {
    if (!gDrag) return;
    drawSign();
    gDrag = false;
}

function drag(ev) {
    if (!gDrag) return;
    var { offsetX, offsetY } = ev;
    if (ev.type === "touchmove") {
        ev.preventDefault();
        offsetX = ev.targetTouches[0].pageX;
        offsetY = ev.targetTouches[0].pageY;
    }
    setPosition(offsetX, offsetY);
    drawMeme();
}

// STICKERS
function onCreateSticker(sticker) {
    addSticker(gCanvas.width / 2, gCanvas.height / 2, sticker, STICER_SIZE);
    drawMeme();
}

// SAVE MEMES 
function onSaveMeme(elMeme) {
    let memeId = elMeme.dataset.id;
    let memeIdx = findOnSaveMemes(memeId);
    let memes = loadFromStorage(KEY_MEMES);
    gMeme = memes[memeIdx].gMeme;
    openCanvas();
    drawMeme();
}

function findOnSaveMemes(memeId) {
    let memes = loadFromStorage(KEY_MEMES);
    return memes.findIndex(meme => {
        return meme.id === memeId;
    })
}

// UPLOAD
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");
    var imgSrc = document.getElementById('imgData').src;
    var imgAlt = document.getElementById('imgData').getAttribute.alt;
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn share" href="//www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imgSrc)}&t=${encodeURIComponent(imgAlt)}"
        title="Share on Facebook" target="_blank" onclick="window.open('//www.facebook.com/sharer/sharer.php?u=
        ${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        Share   
        </a>`
    }
    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

function onSave() {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    var meme = {
        id: makeId(),
        img: imgContent,
        gMeme
    }
    _saveMemesToStorage(meme);
}

function onDownload(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img);
        img.src = event.target.result;
        var newImgId = addImg(img.src);
        var newMeme = creatMeme(newImgId);
        setMeme(newMeme);
    }
    reader.readAsDataURL(ev.target.files[0]);
}