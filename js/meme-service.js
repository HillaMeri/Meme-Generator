'use strict'
const CANVAS_POS = 50;

const KEY_MEMES = 'memes';
var gColor = 'white';
var gFontFamily = 'impact';
var gKeyWords = [];
var gMemes = [];
var gCurrLine = 0;
var gMeme = creatMeme(1);
// var gMeme = creatMeme(1);
// var gId;


function creatMeme(id) {
    return {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            {
                id: 0,
                txt: '',
                size: 40,
                align: 'center',
                color: gColor,
                x: 200,
                y: CANVAS_POS
            }
        ],
        selectedStickerIdx: -1,
        stickers: []
    }
}


function getMeme() {
    return gMeme;
}

function getImgById(imgId) {
    return gImgs.find((img) => img.id === imgId);
}


function setMemeID(memeId) {
    gMeme.selectedImgId = memeId;
}

function setMemeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setMemeTextSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += (val);
}

function setMemePosition(val) {
    gMeme.lines[gMeme.selectedLineIdx].y += (val);
}

function addLine() {
    gMeme.selectedLineIdx = gMeme.lines.length;
    var position;
    if (gMeme.selectedLineIdx === 0) position = CANVAS_POS;
    else if (gMeme.selectedLineIdx === 1) position = gCanvas.height - CANVAS_POS;
    else position = gCanvas.height / 2;
    var line = {
        id: gMeme.lines.length,
        txt: '',
        size: 40,
        align: 'center',
        color: gColor,
        x: 200,
        y: position
    }
    if (gMeme.lines.length === 0) {
        gMeme.lines[0] = line;
    } else gMeme.lines.push(line);
}


function setPosition(lineId, x, y) {
    if (lineId < gMeme.lines.length) {
        gMeme.lines[lineId].y = y;
        gMeme.lines[lineId].x = x;
        // gMeme.lines[lineId].position = y;
    }
}

// function onSave() {
//     var imgContent = gCanvas.toDataURL('image/jpeg');
//     _saveMemesToStorage(imgContent);
// }

function _saveMemesToStorage(meme) {
    var memes = loadFromStorage(KEY_MEMES);
    if (memes) gMemes = memes;
    gMemes.push(meme);
    saveToStorage(KEY_MEMES, gMemes);
}

function setColor(newColor) {
    gColor = newColor;
    gMeme.lines.forEach((line) => {
        line.color = newColor;
    })
}

function getFont() {
    return gFontFamily;
}

function setFont(newFont) {
    gFontFamily = newFont;
}

function setKeyWords(keyWords) {
    keyWords.forEach((keyword) => {
        gKeyWords.push({ word: keyword, search: 0 })
    })
    renderKeyWords();
}

function updateKeyWords() {
    var words = [];
    var imgs = getImgs();
    imgs.forEach((img) => {
        img.keywords.forEach((keyword) => {
            if (!words.includes(keyword)) words.push(keyword)
        })
    })
    setKeyWords(words);
}

function getKeyWords(){
    return gKeyWords;
}

function setKeyword(word) {
    var findword = gKeyWords.find((keyword) => {
        return keyword.word === word;
    })
    findword.search++;
}

function removeLine() {
    if (gMeme.selectedLineIdx - 1 >= 0) {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1);
        gMeme.selectedLineIdx--;
    }
}

function setCurrLineIdx(lineId) {
    gMeme.selectedLineIdx = lineId;
    document.querySelector('.input-text').value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function setStickerSize(id, val) {
    gMeme.stickers[id].width += val;
    gMeme.stickers[id].height += val;
}

