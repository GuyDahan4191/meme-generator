'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I sometimes eat Falafel',
        size: 20,
        color: 'red'
    }]
}
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

/////////////////////////// set functions  ///////////////////////////

function setCurrImage(imgIdx) {
    gMeme.selectedImgId = imgIdx
}

function setLineTxt(txt) {
    var currLine = getCurrLine()
    currLine.txt = txt
}

/////////////////////////// get functions  ///////////////////////////

function getMeme() {
    return gMeme
}

function getCurrLine() {
    return gMeme.lines[selectedLineIdx]
}

//////////////////////  handle the listeners  ///////////////////////

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

////////////////////////////  draw  /////////////////////////

function drawImg(idx) {
    const img = new Image()
    img.src = `img/${idx}.jpg`
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(line, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'top'

    gCtx.fillText(line.txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

////////////////////////////  get-pos  /////////////////////////

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function setCurrPos(pos) {
    gDrawing.currX = pos.x
    gDrawing.currY = pos.y
}

function setPrevPos(pos) {
    gDrawing.prevX = pos.x
    gDrawing.prevY = pos.y
}