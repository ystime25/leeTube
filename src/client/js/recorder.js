import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";
const recBtn = document.getElementById("recBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let recordedVideo;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

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

const handleRECDownload = async () => {
  recBtn.removeEventListener("click", handleRECDownload);
  recBtn.innerText = "Transcoding...";
  recBtn.disabled = true;

  const ffmeg = createFFmpeg({ log: true });
  await ffmeg.load();

  ffmeg.FS("writeFile", files.input, await fetchFile(recordedVideo));

  await ffmeg.run("-i", files.input, "-r", "60", files.output);

  await ffmeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  const mp4File = ffmeg.FS("readFile", files.output);
  const thumbFile = ffmeg.FS("readFile", files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "녹화영상.mp4");
  downloadFile(thumbUrl, "썸네일.jpg");

  ffmeg.FS("unlink", files.input);
  ffmeg.FS("unlink", files.output);
  ffmeg.FS("unlink", files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(recordedVideo);

  recBtn.disabled = false;
  recBtn.innerText = "Record Again";
  recBtn.addEventListener("click", handleRECstart);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  video.play();
};

init();

recBtn.addEventListener("click", handleRECstart);
