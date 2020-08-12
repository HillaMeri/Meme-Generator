'use strict'
const CANVAS_POS = 50;
const KEY_MEMS = 'memes';
var gColor = 'white';
var gFontFamily = 'impact';
var gKeyWords = [];

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['politics'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['animals','love'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['animals'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['animals'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['success'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['suprise'] },
];


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 40,
            align: 'center',
            color: gColor,
            position: CANVAS_POS
        }
    ]
}

function getMeme() {
    return gMeme;
}

function getImgById(imgId) {
    return gImgs.find((img) => img.id === imgId);
}

// function getMemeById(imgId){
//     return gMeme.find((meme)=>meme.id === imgId);
// }

function getImgs() {
    return gImgs;
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
    gMeme.lines[gMeme.selectedLineIdx].position += (val);
}

function setLineIdx() {
    gMeme.selectedLineIdx++;
    var position = 0;
    if (gMeme.selectedLineIdx === 1) position = gCanvas.height - CANVAS_POS;
    else position = CANVAS_POS * gMeme.selectedLineIdx;
    var line = {
        txt: '',
        size: 40,
        align: 'center',
        color: gColor,
        position: position
    }
    console.log(line.position);
    gMeme.lines.push(line);

}


//TODO: SWITCH BETWEEN LINES
// function setLinesPositions(){
//     gMeme.line.forEach((line)=> {
//         line.position = 
//     })
// }

// function _saveMemesToStorage() {
//     var memes = loadFromStorage(KEY_MEMS)
//     if (!memes || !memes.length) {
//         saveToStorage(KEY_MEMS, gMemes);
//     }
// }


function setColor(newColor) {
    gColor = newColor;
    gMeme.lines.forEach((line)=>{
        line.color = newColor;
    })
}

function getFont(){
    return gFontFamily;
}

function setFont(newFont) {
    gFontFamily = newFont;
}

function setKeyWords(keyWords){
    keyWords.forEach((keyword)=>{
        gKeyWords.push({keyword: keyword, search: 0})
    })
}