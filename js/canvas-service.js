'use strict'
var gCanvas;
var gCtx;

function initCanvas() {
    // gCanvas = document.querySelector('#canvas');
    // gCtx = gCanvas.getContext('2d');
    
    // Check download in live server and not (work just in live server)
    // drawImgFromlocal()
    // drawText();
    // Check download in live server and not (does not work)
    // drawImgFromRemote()
}


function drawImg() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.addEventListener("click", canvasClicked);
    gCanvas.addEventListener("touch", canvasClicked);
    // gCanvas.addEventListener("mousedown", startDraw);

    drawImgFromlocal();
}

function drawImgFromlocal() {
    var meme = getMeme();
    var img = new Image();
    var myImgMeme = getImgById(meme.selectedImgId);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        drawText();
    }
    img.src = myImgMeme.url;
}


function drawText() {
    // console.log(gCanvas.width);
    // console.log(gCanvas.height);
    var meme = getMeme();
    meme.lines.forEach((line) => {
        var myText = line.txt;
        var mySize = line.size;
        var myAlign = line.align;
        var myColor = line.color;
        var myPosition = line.position;
        gCtx.lineWidth = '2';
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = myColor;
        var font = getFont();
        gCtx.font = `${mySize}px ${font}`;
        var xPos = gCanvas.width/2;
        gCtx.textAlign = myAlign;
        gCtx.fillText(myText, xPos, myPosition);
        gCtx.strokeText(myText, xPos, myPosition);
    })
}

function canvasClicked(ev) {
    ev.preventDefault();
        var offsetX = ev.offsetX;
    console.log("startDraw -> offsetX", offsetX)
    var offsetY = ev.offsetY;
    console.log("startDraw -> offsetY", offsetY)
}



// function drawImgFromRemote() {
//     var img = new Image()
//     img.src = 'https://steamcdn-a.akamaihd.net/steam/apps/431960/ss_39ed0a9730b67a930acb8ceed221cc968bee7731.1920x1080.jpg?t=1571786836';
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
//     }
// }

// function downloadCanvas(elLink) {
//     const data = gCanvas.toDataURL()
//     elLink.href = data
//     elLink.download = 'my-img.jpg'
// }