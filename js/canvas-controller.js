'use strict'


function onWrite(ev) {
    setMemeText(ev.value);
    drawImg();
}


function onBackToGallery() {
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.remove('display');
    var elMemeEdit = document.querySelector('.meme-editor');
    elMemeEdit.classList.add('display');
}

function onDecrease() {
    setMemeTextSize(-1);
    drawImg();
}

function onIncrease() {
    setMemeTextSize(+1);
    drawImg();
}

function onMoveUp() {
    setMemePosition(-5)
    drawImg();
}
function onMoveDown() {
    setMemePosition(5)
    drawImg();
}

function onAddLine() {
    var elTxtInput = document.querySelector('.input-text');
    if(!elTxtInput.value) return;
    elTxtInput.value = '';
    setLineIdx();
}
//TODO: SWITCH BETWEEN LINES
// function onSwitchLines(){
//     setLinesPositions();
//     drawImg();
// }

// function onSave() {
//     _saveMemesToStorage();
// }

function onDownload(elLink){
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}


function onOpenColors(){
    document.querySelector('.btn-color').classList.add('display');
    document.querySelector('.color').classList.remove('display');

}

function onChangeColor(newColor){
    document.querySelector('.btn-color').style.backgroundColor = newColor;
    document.querySelector('.btn-color').classList.remove('display');
    document.querySelector('.color').classList.add('display');
    setColor(newColor)
    drawImg();
}

function onChangeFont(newFont){
    setFont(newFont);
    drawImg();
}