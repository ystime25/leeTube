import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".deleteBtn");

const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  const icon = document.createElement("i");
  const span = document.createElement("span");
  const deleteSpan = document.createElement("span");
  icon.className = "fas fa-location-arrow";
  deleteSpan.innerText = "❌";
  span.innerText = `  ${text}  `;
  newComment.dataset.id = newCommentId;
  newComment.className = "video__comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteSpan);
  deleteSpan.addEventListener("click", deleteComment);
  videoComments.prepend(newComment);
};

const deleteComment = async (event) => {
  event.preventDefault();
  const comment = event.target.parentElement;
  const videoId = videoContainer.dataset.id;
  const { id } = comment.dataset;
  const response = await fetch(`/api/${videoId}/comment/${id}/delete`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    comment.remove();
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

for (const btn of deleteBtns) {
  btn.addEventListener("click", deleteComment);
}

if (form) {
  form.addEventListener("submit", handleSubmit);
}
