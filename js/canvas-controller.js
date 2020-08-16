'use strict'
var gCanvas;
var gCtx;
var gDrag = false;
var gCurrLine;
var gDragSticker = false;
const STICER_SIZE = 60;
var gStickerChoose;

var gCurr = 0;

function initCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.addEventListener("mousedown", startDrag);
    gCanvas.addEventListener("mousemove", drag);
    gCanvas.addEventListener("mouseup", finishDrag);
    gCanvas.addEventListener("touchstart", startDrag);
    gCanvas.addEventListener("touchmove", drag);
    gCanvas.addEventListener("touchend", finishDrag);
}


//UPLOAD CANVAS
function drawMeme() {
    drawImg();
}

function drawImg() {
    var meme = getMeme();
    var img = new Image();
    var myImgMeme = getImgById(meme.selectedImgId);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        drawText();
        drawStickers();
    }
    img.src = myImgMeme.url;
}

function drawText() {
    var meme = getMeme();
    meme.lines.forEach((line) => {
        var myText = line.txt;
        var mySize = line.size;
        var myAlign = line.align;
        var myColor = line.color;
        var myColorLine = line.colorLine;
        var yPos = line.y;
        var xPos = line.x;
        var font = line.font;
        gCtx.lineWidth = '2';
        gCtx.strokeStyle = myColorLine;
        gCtx.fillStyle = myColor;
        gCtx.font = `${mySize}px ${font}`;
        gCtx.textAlign = myAlign;
        gCtx.fillText(myText, xPos, yPos);
        setWidthTxt(line.id, gCtx.measureText(myText).width);
        gCtx.strokeText(myText, xPos, yPos);
        setPosition(line.id, xPos, yPos);
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
    setMemeText(ev.value);
    drawMeme();
}

function onAddLine() {
    var elTxtInput = document.querySelector('.input-text');
    if (!elTxtInput.value) return;
    elTxtInput.value = '';
    addLine();
}

function onDecrease() {
    setMemeTextSize(-1);
    drawMeme();
}

function onIncrease() {
    setMemeTextSize(+1);
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
    setColor(newColor)
    drawMeme();
}

function onChangeColorLine(newColor) {
    document.querySelector('.btn-color-line').classList.remove('display');
    document.querySelector('.color-line').classList.add('display');
    setColorLine(newColor)
    drawMeme();
}

function onChangeFont(newFont) {
    setFont(newFont);
    drawMeme();
}

function onRemoveLine() {
    removeLine();
    drawMeme();
}

// UPLOAD
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    var u = document.getElementById('imgData').src;
    var t = document.getElementById('imgData').getAttribute.alt;
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn share" href="//www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}&t=${encodeURIComponent(t)}" title="Share on Facebook" target="_blank" onclick="window.open('//www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
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

// DRAG
function drawSign() {
    var wid = gMeme.lines[gCurrLine].widthTxt * 2;
    var hei = gMeme.lines[gCurrLine].size * 1.5;
    var posX = gMeme.lines[gCurrLine].x / 2;
    var posY = gMeme.lines[gCurrLine].y - gMeme.lines[gCurrLine].size;
    gCtx.beginPath();
    gCtx.rect(posX, posY, wid, hei);
    gCtx.strokeStyle = "#b48484";
    gCtx.lineWidth = '5';
    gCtx.strokeRect(posX, posY, wid, hei)
}


function startDrag(ev) {
    var meme = getMeme();
    var { offsetX, offsetY } = ev;
    if (ev.type === "touchstart") {
        ev.preventDefault();
        offsetX = ev.touches[0].pageX - ev.touches[0].target.offsetLeft;
        offsetY = ev.touches[0].pageY - ev.touches[0].target.offsetTop;
    }
    const clickedLine = meme.lines.find(line => {
        return (offsetY <= line.y && offsetY > line.y - line.size
            && offsetX < line.x + line.widthTxt && offsetX > line.x - line.widthTxt)
    });
    const clickedSticker = meme.stickers.find(sticker => {
        return (offsetY >= sticker.y && offsetY <= sticker.y + sticker.size
            && offsetX >= sticker.x && offsetX <= sticker.x + sticker.size)
    })
    if (!clickedLine && !clickedSticker) return;
    if (clickedLine) {
        drawSign();
        gCurrLine = clickedLine.id;
        setCurrLineIdx(clickedLine.id);
        gDrag = true;
    }
    else {
        meme.selectedStickerIdx = clickedSticker.id;
        // setStickerIdx(clickedSticker.id);
        setMeme(meme);
        gDragSticker = true;
    }
}

function finishDrag(ev) {
    if (!gDrag && !gDragSticker) return;
    var offsetX;
    var offsetY;
    if (ev.type === "touchmove") {
        ev.preventDefault();
        offsetX = ev.touches[0].pageX - ev.touches[0].target.offsetLeft;
        offsetY = ev.touches[0].pageY - ev.touches[0].target.offsetTop;
    } else {
        offsetX = ev.offsetX;
        offsetY = ev.offsetY;
    }
    if (gDrag) {
        setPosition(gCurrLine, offsetX, offsetY);
        gDrag = false;
    } else {
        setPositionSticker(offsetX, offsetY)
        gDragSticker = false;
    }
}


function drag(ev) {
    if (!gDrag && !gDragSticker) return;
    var offsetX;
    var offsetY;
    var movementX;
    var movementY;
    if (ev.type === "touchmove") {
        ev.preventDefault();
        offsetX = ev.touches[0].pageX - ev.touches[0].target.offsetLeft;
        offsetY = ev.touches[0].pageY - ev.touches[0].target.offsetTop;
    } else {
        offsetX = ev.offsetX;
        offsetY = ev.offsetY;
        movementX = ev.movementX;
        movementY = ev.movementY;
    }
    if (gDrag) {
        setPosition(gCurrLine, offsetX - movementX, offsetY - movementY);
        drawSign();
    }
    if (gDragSticker) setPositionSticker(offsetX - movementX, offsetY - movementY);
    drawImg();
}

// STICKERS
function addSticker(el) {
    var meme = getMeme();
    meme.stickers.push(createSticker(meme.stickers.length, el.src, STICER_SIZE))
    setMeme(meme);
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, gCanvas.width / 2, gCanvas.height / 2, STICER_SIZE, STICER_SIZE)
        drawText();
    }
    img.src = el.src;
}

function drawStickers() {
    var meme = getMeme();
    meme.stickers.forEach(sticker => {
        var img = new Image();
        img.onload = () => {
            gCtx.drawImage(img, sticker.x, sticker.y, sticker.size, sticker.size)
        }
        img.src = sticker.url;
    })
}

function onIncreasStickers() {
    setStickersSize(10);
    drawMeme();
}

function onDecreasStickers() {
    setStickersSize(-10);
    drawMeme();
}

function onDeleteSticker() {
    deleteSticker();
    drawMeme();
}

// SAVE MEMES 
function onSaveMeme(elMeme) {
    var memeId = elMeme.dataset.id;
    var memeIdx = findOnSaveMemes(memeId);
    var memes = loadFromStorage(KEY_MEMES);
    gMeme = memes[memeIdx].gMeme;
    openCanvas();
    drawMeme();
}

function findOnSaveMemes(memeId) {
    var memes = loadFromStorage(KEY_MEMES);
    return memes.findIndex(meme => {
        return meme.id === memeId;
    })
}



function onMoveUp() {
    // var currLineIdx = getCurrentLineIdx();
    setPosition(gCurr, gMeme.lines[gCurr].x, gMeme.lines[0].y - 5)
    drawMeme();
}

function onMoveDown() {
    // var currLineIdx = getCurrentLineIdx();
    setPosition(gCurr, gMeme.lines[gCurr].x, gMeme.lines[0].y + 5)
    drawMeme();
}

function onSwitchLines() {
    var meme = getMeme();
    if(meme.selectedLineIdx === 0) {
        if(meme.lines.length > 0) meme.selectedLineIdx = meme.lines.length-1;
    } else {
        meme.selectedLineIdx = meme.selectedLineIdx-1;
    }
    document.querySelector('.input-text').value = meme.lines[gMeme.selectedLineIdx].txt;
}

