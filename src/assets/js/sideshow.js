function fullScreen(el) {

    fullScreenImg.style.disply = "block";

    fullScreenImg.src = el.src;

    if (fullScreenImg.requestFullscreen) {
        fullScreenImg.requestFullscreen();
    } else if (fullScreenImg.webkitRequestFullscreen) {
        fullScreenImg.webkitRequestFullscreen();
    } else if (fullScreenImg.mozRequestFullScreen) {
        fullScreenImg.mozRequestFullScreen();
    } else if (fullScreenImg.msRequestFullscreen) {
        fullScreenImg.msRequestFullscreen();
    }

    document.addEventListener('keydown', function(e) {
        keyListner(e);
    });

}

document.body.insertAdjacentHTML('afterbegin', '<img alt="Cevi Züri 11 - Vollbild" style="height: 0" id="fullScreenImg" />');
var fullScreenImg = document.getElementById('fullScreenImg');

var imgs = document.getElementsByClassName('fullscreen');
Array.from(imgs).forEach((el) => {
    el.addEventListener('click', function(e) {
        fullScreen(e.target);
    });

});

function keyListner(event) {
    if (event.keyCode == 39) {
        var i = getIndex();
        console.log(i);
        if (i < imgs.length - 1) changeSrc(i + 1)
        else changeSrc(0);

    } else if (event.keyCode == 37) {
        var i = getIndex();
        if (i > 0) changeSrc(i - 1);
        else changeSrc(imgs.length - 1);

    }
}

function getIndex() {
    for (var j = 0; j < imgs.length; j++)
        if (imgs[j].currentSrc == fullScreenImg.src) return j
}

function changeSrc(indexOfImages) {
    //imgs[indexOfImages].currentSrc;
    fullScreenImg.src = imgs[indexOfImages].currentSrc;
}
