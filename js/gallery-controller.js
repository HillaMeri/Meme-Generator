'use strict'

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['politics'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['animals', 'love'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['animals', 'sleep'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['animals', 'sleep'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['success', 'beby'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['suprise', 'beby'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['eveil'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['politics'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['boys'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['tv'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['suprise'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['suprise'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['suprise'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['suprise', 'funny'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['politics'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['suprise'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['suprise'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['suprise'] }
];
var gFilterBy = '';

function init() {
    var elMemeEdit = document.querySelector('.meme-editor');
    elMemeEdit.classList.add('display');
    renderImgs();
    // window.addEventListener('resize', function(){
    //     resizeCanvas();
    // })
    // updateKeyWords();
}

function onOpenMememsGallery() {
    onBackToGallery();
    renderSavedImgs();
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onBackToGallery() {
    setColor('white')
    setFont('impact')
    gKeyWords = [];
    gMemes = [];
    gCurrLine = 0;
    gFilterBy = '';
    renderImgs();
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.remove('display');
    var elMemeEdit = document.querySelector('.meme-editor');
    elMemeEdit.classList.add('display');
    gMeme = creatMeme(1);
}

function renderImgs() {
    var imgs = getImgsForDisplay();
    var strHtmls = imgs.map(function (img) {
        return ` <img onclick="onChooseMeme(this)" class="meme" data-id=${img.id} src=${img.url}>`
    })
    document.querySelector('.image-gallery').innerHTML = strHtmls.join('')
}


function onChooseMeme(elMeme) {
    var memeId = +elMeme.dataset.id;
    setMemeID(memeId);
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.add('display');
    var elMemeEdit = document.querySelector('.meme-editor');
    elMemeEdit.classList.remove('display');
    drawMeme();
}


function renderSavedImgs() {
    var memes = loadFromStorage(KEY_MEMES);
    if (memes) {
        var strHtmls = memes.map(function (meme) {
            return ` <img onclick="onSaveMeme(this)" class="meme" data-id=${meme.gMeme.id} src=${meme.img}>`
        })
        document.querySelector('.image-gallery').innerHTML = strHtmls.join('')
    }
}

function renderKeyWords() {
    var keyWords = getKeyWords();
    var strHtmls = keyWords.map(function (keyWord) {
        return `<option value="${keyWord.word}">`
    })
    document.getElementById('search').innerHTML = strHtmls.join('')
}

function onFilterKeyWord(keyWord) {
    gFilterBy = keyWord;
    renderImgs();
}


function getImgsForDisplay() {
    if (gFilterBy === '') return gImgs;
    var imgs = gImgs.filter(function (img) {
        return (img.keywords.includes(gFilterBy))
    })
    return imgs;
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container');
//     gCanvas.width = elContainer.offsetWidth;
//     gCanvas.height = elContainer.offsetHeight;
//     drawMeme();
// }

function getImgs() {
    return gImgs;
}