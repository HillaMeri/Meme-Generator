'use strict'
var gCanvas;
var gCtx;
var gDrag = false;
var gCurrLine;
var gDragSticker = false;

function drawMeme() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.addEventListener("mousedown", startDrag);
    gCanvas.addEventListener("mousemove", drag);
    gCanvas.addEventListener("mouseup", finishDrag);
    gCanvas.addEventListener("touchstart", startDrag);
    gCanvas.addEventListener("touchmove", drag);
    gCanvas.addEventListener("touchend", finishDrag);
    gCanvas.addEventListener("dblclick",onChangeSize);
    gCanvas.addEventListener("contextmenu",onChangeSize);
    drawImgFromlocal();
}

function drawImgFromlocal() {
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
        var yPos = line.y;
        gCtx.lineWidth = '2';
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = myColor;
        var font = getFont();
        gCtx.font = `${mySize}px ${font}`;
        var xPos = line.x;
        gCtx.textAlign = myAlign;
        gCtx.fillText(myText, xPos, yPos);
        gCtx.strokeText(myText, xPos, yPos);
        setPosition(line.id, xPos, yPos);
    })
}

function startDrag(ev) {
    var meme = getMeme();
    var { offsetX, offsetY} = ev;
    if (ev.type === "touchmove") {
        ev.preventDefault();
        offsetY = ev.touches[0].pageY - ev.touches[0].target.offsetTop;
    }
    const clickedLine = meme.lines.find(line => {
        return (offsetY <= line.y && offsetY > line.y - line.size
            && offsetX < line.x + line.txt.length * 10 && offsetX > line.x - line.txt.length * 10)
    });
    const clickedSticker = meme.stickers.find(sticker => {
        return (offsetY >= sticker.y - sticker.height && offsetY <= sticker.y + sticker.height
            && offsetX >= sticker.x - sticker.width && offsetX <= sticker.x + sticker.width)
    })
    if (!clickedLine && !clickedSticker) return;
    if (clickedLine) {
        gCurrLine = clickedLine.id;
        setCurrLineIdx(clickedLine.id);
        gDrag = true;
        return;
    }
    if (clickedSticker) {
        meme.selectedStickerIdx = clickedSticker.id;
        gDragSticker = true;
    }
}

function finishDrag() {
    gDrag = false;
    gDragSticker = false;
}


function drag(ev) {
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
    if (gDrag) setPosition(gCurrLine, offsetX, offsetY);
    if (gDragSticker) setPositionSticker(gMeme.selectedStickerIdx, offsetX, offsetY)
    drawImgFromlocal();
}


function onChangeSize(ev){
    ev.preventDefault();
    var meme = getMeme();
    var { offsetX, offsetY } = ev;
    const clickedSticker = meme.stickers.find(sticker => {
        return (offsetY >= sticker.y - sticker.height && offsetY <= sticker.y + sticker.height
            && offsetX >= sticker.x - sticker.width && offsetX <= sticker.x + sticker.width)
    }) 
    if (clickedSticker){
        if(ev.type === 'dblclick') setStickerSize(clickedSticker.id, 10)
        else setStickerSize(clickedSticker.id, -10)
        drawImgFromlocal();
    }
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function createSticker(id, url) {
    return {
        id,
        x: gCanvas.width / 2,
        y: gCanvas.height / 2,
        height: 30,
        width: 30,
        url
    }
}
function setPositionSticker(id, newX, newY) {
    gMeme.stickers[id].x = newX;
    gMeme.stickers[id].y = newY;
}

function addSticker(el) {
    gMeme.stickers.push(createSticker(gMeme.stickers.length, el.src))
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 200, 200, 40, 40)
        drawText();
    }
    img.src = el.src;
}

function drawStickers() {
    gMeme.stickers.forEach(sticker => {
        var img = new Image();
        img.onload = () => {
            gCtx.drawImage(img, sticker.x, sticker.y, sticker.width, sticker.height)
        }
        img.src = sticker.url;
    })
}
