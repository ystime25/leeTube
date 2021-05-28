const startREC = document.getElementById("startREC");
const video = document.getElementById("preview");

const handleStart  = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio:true, video:true
    });
    video.srcObject = stream;
    video.play();
};

startREC.addEventListener("click", handleStart);