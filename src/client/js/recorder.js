const recBtn = document.getElementById("recBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let recordedVideo;

const handleRECstart = () => {
  recBtn.innerText = "Stop Recording";
  recBtn.removeEventListener("click", handleRECstart);
  recBtn.addEventListener("click", handleRECstop);
  //
  recorder = new MediaRecorder(stream, { MimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    recordedVideo = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = recordedVideo;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const handleRECstop = () => {
  recBtn.innerText = "Download Recording";
  recBtn.removeEventListener("click", handleRECstop);
  recBtn.addEventListener("click", handleRECDownload);
  recorder.stop();
};

const handleRECDownload = () => {
  const downloadLink = document.createElement("a");
  downloadLink.href = recordedVideo;
  downloadLink.download = "녹화영상.webm";
  document.body.appendChild(downloadLink);
  downloadLink.click();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 400, height: 300 },
  });
  video.srcObject = stream;
  video.play();
};

init();

recBtn.addEventListener("click", handleRECstart);
