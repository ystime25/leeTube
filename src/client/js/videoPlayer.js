const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlayClick = () => {
    if (video.paused) {
        video.play();
    } else { 
        video.pause();
    }
};

const handlePause = () => (playBtn.innerText = "Play");

const handlePlay = () => (playBtn.innerText = "Pause");

const handleMute = (e) => {
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText ="Mute";
    } else {
        video.muted = true;
        muteBtn.innerText ="Unmute";
    }
};

playBtn.addEventListener("click",handlePlayClick);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);

muteBtn.addEventListener("click",handleMute);


