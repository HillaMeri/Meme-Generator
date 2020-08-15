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
    var elFooter = document.querySelector('.main-footer');
    elFooter.classList.remove('display');
}

function openCanvas() {
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.add('display');
    var elMemeEdit = document.querySelector('.meme-editor');
    elMemeEdit.classList.remove('display');
    var elFooter = document.querySelector('.main-footer');
    elFooter.classList.add('display');
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
        return ` <img onclick="onChooseMeme(this)" class="meme" 
        data-id=${img.id} src=${img.url} data-title= ${img.keywords}>`
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
    var htmlCloseBtn = `<button data-trans="more" class="more-btn" onclick="onAllKeyWords()">More</button>`;
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

function onCloseKeyWords() {
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
    var elModal = document.querySelector('.modal');
    elModal.classList.add('slide-in-elliptic-right-bck');
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onSubmitMail() {
    toggleModal();
    var subject = document.querySelector('.email-subject').value;
    var messBody = document.querySelector('.email-mess-body').value;
    window.open(`//mail.google.com/mail/?view=cm&fs=1&to=hilla7070@gmail.com&su=${subject}&body=${messBody}`);
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
}

const shareData = {
    title: 'Meme Generetor',
    text: 'The best website!',
    url: window.location.href,
}

const btn = document.querySelector('.btn-web-share');
btn.addEventListener('click', async () => {
    try {
        await navigator.share(shareData)
        console.log('MDN shared successfully');
    } catch (err) {
        console.log('Error: ' + err);
    }
});

window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    var ellBtns = document.querySelectorAll('.btn-header');
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        ellBtns.forEach(function (btn) {
            btn.style.height = '50px';
        })
    } else {
        ellBtns.forEach(function (btn) {
            btn.style.height = '80px';
        })
    }
}


// function onViewTitle(elImg) {
//     var titleImg = [];
//     titleImg = elImg.dataset.title;
// }