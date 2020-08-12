'use strict'

renderImgs();
renderKeyWords();

function renderImgs() {
    var imgs = getImgs();
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
    drawImg();
}

function renderKeyWords() {
    let imgs = getImgs();
    let keyWords = [];
    imgs.forEach((img) => {
        img.keywords.forEach((keyword) => {
            if (!keyWords.includes(keyword)) keyWords.push(keyword)
        })
    })
    setKeyWords(keyWords);
}