const { async } = require("regenerator-runtime");

const startREC = document.getElementById("startREC");
const video = document.getElementById("preview");

let stream;

const handleStop = () => {
    startREC.innerText = "Start Recording";
    startREC.removeEventListener("click", handleStop);
    startREC.addEventListener("click", handleStart);
}

const handleStart  = () => {
    startREC.innerText = "Stop Recording";
    startREC.removeEventListener("click", handleStart);
    startREC.addEventListener("click", handleStop);
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) =>{
        console.log("record done");
        console.log(e);
        console.log(e.data);
    };
    console.log(recorder);
    recorder.start();
    console.log(recorder);
    setTimeout(() => {
        recorder.stop();
    }, 10000);   
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio:true, video:true
    });
    video.srcObject = stream;
    video.play();
};

init();

startREC.addEventListener("click", handleStart);