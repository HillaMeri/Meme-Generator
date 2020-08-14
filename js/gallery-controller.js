'use strict'

function init() {
    openGellary();
    loadKeyWords();
    renderImgs();
    renderKeywords();
    renderKeyWordsSearch();
}

function openGellary() {
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.remove('display');
    var elMemeEdit = document.querySelector('.meme-editor');
    elMemeEdit.classList.add('display');
}

function openCanvas() {
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.add('display');
    var elMemeEdit = document.querySelector('.meme-editor');
    elMemeEdit.classList.remove('display');
}

function onBackToGallery() {
    setFilter('');
    openGellary();
    renderImgs();
}

function onOpenMememsGallery() {
    openGellary();
    renderSavedImgs();
}

function renderImgs() {
    var imgs = getImgsForDisplay();
    var strHtmls = imgs.map(function (img) {
        return ` <img onclick="onChooseMeme(this)" class="meme" data-id=${img.id} src=${img.url}>`
    })
    document.querySelector('.image-gallery').innerHTML = strHtmls.join('')
}

function renderSavedImgs() {
    var memes = loadFromStorage(KEY_MEMES);
    if (memes) {
        var strHtmls = memes.map(function (meme) {
            return ` <img onclick="onSaveMeme(this)" class="meme" data-id='${meme.id}' src=${meme.img}>`
        })
        document.querySelector('.image-gallery').innerHTML = strHtmls.join('')
    }
}

function onFilterKeyWord(keyWord) {
    setKeywordSearch(keyWord)
    setFilter(keyWord);
    renderImgs();
    renderKeyWordsSearch();
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function renderKeywords() {
    var keyWords = getKeyWords();
    var strHtmls = keyWords.map(function (keyWord) {
        return `<option value="${keyWord.word}">`
    })
    document.getElementById('search').innerHTML = strHtmls.join('')
}

function renderKeyWordsSearch() {
    var keyWords = getKeyWords();
    var strHtmls = ``;
    for (let i = 0; i < 5; i++) {
        strHtmls += `<button class="btn-key" onclick="onKeyWord(this)" 
        style="font-size:${keyWords[i].search}rem">${keyWords[i].word}</button>`
    }
    document.querySelector('.key-words').innerHTML = strHtmls;
    var htmlCloseBtn = `<button class="more-btn" onclick="onAllKeyWords()">More</button>`;
    document.querySelector('.key-words').innerHTML += htmlCloseBtn;
}

function onAllKeyWords() {
    var keyWords = getKeyWords();
    var strHtmls = keyWords.map(function (keyWord) {
        return `<button class="btn-key" onclick="onKeyWord(this)"
         style="font-size:${keyWord.search}rem">${keyWord.word}</button>`
    })
    document.querySelector('.key-words').innerHTML = strHtmls.join('');
    var htmlCloseBtn = `<button class = "close-btn" onclick="onCloseKeyWords()">X</button>`;
    document.querySelector('.key-words').innerHTML += htmlCloseBtn;
}


function onCloseKeyWords(){
    renderKeyWordsSearch();
}

function onKeyWord(elKeyword) {
    onFilterKeyWord(elKeyword.innerText);
}


function onChooseMeme(elMeme) {
    openCanvas();
    var memeId = +elMeme.dataset.id;
    clearInput();
    initCanvas();
    var meme = creatMeme(memeId);
    setMeme(meme);
    drawMeme();
}

function clearInput() {
    var elInput = document.querySelector('.input-text');
    elInput.value = '';
}


function toggleModal() {
    document.body.classList.toggle('modal-open');
}