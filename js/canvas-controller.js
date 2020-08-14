'use strict'


function onWrite(ev) {
    setMemeText(ev.value, ev);
    drawMeme();
}

function onDecrease() {
    setMemeTextSize(-1);
    drawMeme();
}

function onIncrease() {
    setMemeTextSize(+1);
    drawMeme();
}

function onMoveUp() {
    setMemePosition(-5)
    drawMeme();
}

function onMoveDown() {
    setMemePosition(5)
    drawMeme();
}

function onAddLine() {
    var elTxtInput = document.querySelector('.input-text');
    if (!elTxtInput.value) return;
    elTxtInput.value = '';
    addLine();
}

function onSave() {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    var meme = {
        img: imgContent,
        gMeme
    }
    _saveMemesToStorage(meme);
}

function onDownload(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}


function onOpenColors() {
    document.querySelector('.btn-color').classList.add('display');
    document.querySelector('.color').classList.remove('display');
}

function onChangeColor(newColor) {
    // document.querySelector('.btn-color').style.backgroundColor = newColor;
    document.querySelector('.btn-color').classList.remove('display');
    document.querySelector('.color').classList.add('display');
    setColor(newColor)
    drawMeme();
}

function onChangeFont(newFont) {
    setFont(newFont);
    drawMeme();
}

function onRemoveLine() {
    removeLine();
    drawMeme();
}

function onKeyWord(ev) {
    setKeyword(ev.innerText);
}

function onSwitchLines() {
    var meme = getMeme();
    if (meme.selectedLineIdx === 0) {
        if (meme.lines.length > 0) meme.selectedLineIdx = meme.lines.length - 1;
    } else {
        meme.selectedLineIdx = meme.selectedLineIdx - 1;
    }
    document.querySelector('.input-text').value = meme.lines[gMeme.selectedLineIdx].txt;
}


function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    var u = document.getElementById('imgData').src;
    var t = document.getElementById('imgData').getAttribute.alt;
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn share" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}&t=${encodeURIComponent(t)}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}



function onSaveMeme(elMeme){
    var memeId = +elMeme.dataset.id;
    setMemeID(memeId);
    var elGallery = document.querySelector('.gallery');
    elGallery.classList.add('display');
    var elMemeEdit = document.querySelector('.meme-editor');
    elMemeEdit.classList.remove('display');
    drawSaveImg(elMeme.src);
}

function drawSaveImg(imgSrc) {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
    img.src =imgSrc;
}

