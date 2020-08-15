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
    { id: 18, url: 'imgs/18.jpg', keywords: ['suprise'] }
];
var gFilterBy = '';
var gKeyWords = [];

function getFilter() {
    return gFilterBy;
}

function setFilter(keyWord) {
    gFilterBy = keyWord;
}

function getImgs() {
    return gImgs;
}

function getImgsForDisplay() {
    if (gFilterBy === '') return gImgs;
    var imgs = gImgs.filter(function (img) {
        return (img.keywords.includes(gFilterBy))
    })
    return imgs;
}

function loadKeyWords() {
    var keyWords = [];
    gImgs.forEach((img) => {
        img.keywords.forEach((keyword) => {
            if (!keyWords.includes(keyword)) keyWords.push(keyword)
        })
    })
    setKeyWords(keyWords);
}

function getKeyWords() {
    return gKeyWords;
}

function setKeyWords(keyWords) {
    keyWords.forEach((keyword) => {
        gKeyWords.push({ word: keyword, search: 1 })
    })
}

function getImgById(imgId) {
    return gImgs.find((img) => img.id === imgId);
}

function setKeywordSearch(word) {
    gKeyWords.find(keyword => {
        if (keyword.word === word) {
            if(keyword.search < 4)  keyword.search += 0.2;
        }
    })
}

function addImg(url) {
    var newImg = {
        id: gImgs.length + 1,
        url: url,
        keywords: ['']
    }
    gImgs.push(newImg);
    return newImg.id;
}