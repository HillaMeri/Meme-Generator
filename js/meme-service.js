'use strict'
const KEY_MEMES = 'memes';
var gMeme;
var gColor = 'white';
var gFontFamily = 'impact';
var gCurrLine = 0;
var gId = 0;
var gMemes = [];


function creatMeme(id) {
    gId = 0;
    gColor = 'white';
    gFontFamily = 'impact';
    var canvasSize = getCanvasSize();
    var xPos = canvasSize.width / 2;
    var yPos = canvasSize.height / 8;
    return {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            {
                id: gId,
                txt: '',
                size: 40,
                align: 'center',
                color: gColor,
                font: gFontFamily,
                x: xPos,
                y: yPos,
                widthTxt: 0
            }
        ],
        selectedStickerIdx: -1,
        stickers: []
    }
}

function addLine() {
    gId++;
    gMeme.selectedLineIdx = gMeme.lines.length;
    var pos;
    var canvasSize = getCanvasSize();
    var xPos = canvasSize.width / 2;
    pos = (gId === 1) ? canvasSize.height - canvasSize.height / 8 : canvasSize.height / 2;
    var line = {
        id: gId,
        txt: '',
        size: 40,
        align: 'center',
        color: gColor,
        font: gFontFamily,
        x: xPos,
        y: pos,
        widthTxt: 0
    }
    gMeme.lines.push(line);
}

function setMeme(meme) {
    gMeme = meme;
}

function getMeme() {
    return gMeme;
}

function setWidthTxt(lineId, widthTxt) {
    var lineIdx = findLineIdx(lineId);
    if (lineIdx === -1) return;
    gMeme.lines[lineIdx].widthTxt = widthTxt;
}

function findLineIdx(lineId) {
    return gMeme.lines.findIndex((line => {
        return lineId === line.id
    }))
}

function setMemeText(txt) {
    if (gMeme.lines.length <= 0) return;
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setMemeTextSize(val) {
    if (gMeme.lines.length <= 0) return;
    gMeme.lines[gMeme.selectedLineIdx].size += (val);
}

function setPosition(lineId, x, y) {
    var lineIdx = findLineIdx(lineId);
    if (lineIdx === -1) return;
    gMeme.lines[lineIdx].y = y;
    gMeme.lines[lineIdx].x = x;
}

function _saveMemesToStorage(meme) {
    var memes = loadFromStorage(KEY_MEMES);
    if (memes) gMemes = memes;
    gMemes.push(meme);
    saveToStorage(KEY_MEMES, gMemes);
}

function setColor(newColor) {
    if (gMeme.lines.length <= 0) {
        gColor = newColor;
        return;
    }
    gMeme.lines[gMeme.selectedLineIdx].color = newColor;
}

function setFont(newFont) {
    if (gMeme.lines.length <= 0) {
        gFontFamily = newFont;
        return;
    }
    gMeme.lines[gMeme.selectedLineIdx].font = newFont;
}

function removeLine() {
    if (gMeme.selectedLineIdx >= 0) {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1);
        document.querySelector('.input-text').value = '';
        gMeme.selectedLineIdx = 0;
    }
}

function setCurrLineIdx(lineId) {
    var lineIdx = findLineIdx(lineId);
    if (lineIdx === -1) return;
    gMeme.selectedLineIdx = lineIdx;
    document.querySelector('.input-text').value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function createSticker(id, url, size) {
    var canvasSize = getCanvasSize();
    return {
        id,
        x: canvasSize.width / 2,
        y: canvasSize.height / 2,
        size: size,
        url
    }
}

function setPositionSticker(id, newX, newY) {
    gMeme.stickers.forEach(sticker => {
        if (sticker.id === gMeme.selectedStickerIdx){
            sticker.x = newX;
            sticker.y = newY;
    }})
    // gMeme.stickers[id].x = newX;
    // gMeme.stickers[id].y = newY;
}

function getStickerSize(id) {
    return gMeme.stickers[id].size;
}

function setStickersSize(newSize) {
    gMeme.stickers.forEach(sticker => {
        if (sticker.id === gMeme.selectedStickerIdx) sticker.size += newSize;
    })
}

function deleteSticker() {
    gMeme.stickers.forEach(sticker => {
        if (sticker.id === gMeme.selectedStickerIdx) {
            gMeme.stickers.splice(sticker.id, 1);
        }
    })
}

function getMemesId(){
    return gId;
}