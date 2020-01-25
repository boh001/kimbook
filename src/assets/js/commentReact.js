const actionLike = document.getElementsByClassName("jsCommentLike");
const comment = document.getElementsByClassName("jsReComment");

const upLike = (id, like) => {
  fetch(`/api/${id}/commentLike`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  })
    .then(res => {
      return res.json();
    })
    .then(myJson => {
      like.innerText = parseInt(like.innerText) + myJson.body;
    })
    .catch(error => {
      console.log(error);
    });
};
const upComment = (id, text, ul, reply) => {
  fetch(`/api/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, text })
  })
    .then(res => {
      return res.json();
    })
    .then(myJson => {
      const avatarUrl = myJson.body.avatar;
      const replyCount = myJson.body.reply;
      reply.innerText = replyCount;
      const li = document.createElement("li");
      const img = document.createElement("img");
      li.innerHTML = text;
      img.src = `/${avatarUrl}`;
      img.style.width = "40px";
      img.style.height = "40px";
      ul.appendChild(img);
      ul.appendChild(li);
    })
    .catch(error => {
      console.log(error);
    });
};
const handleReactLike = event => {
  event.preventDefault();
  const like = event.path[0].nextElementSibling;
  const commentId = event.path[1].id;
  upLike(commentId, like);
};
const handleComment = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    console.log(event.path);
    const ul = event.path[3];
    const reactReply = event.path[5].children[4].children[1];
    const text = event.path[0].value;
    const homeContentId = event.path[5].id;
    upComment(homeContentId, text, ul, reactReply);
    event.path[0].value = "";
  }
};
const init = () => {
  const actionList = Array.from(actionLike);
  const commentList = Array.from(comment);
  actionList.map(a => a.addEventListener("click", handleReactLike));
  commentList.map(r => r.addEventListener("keyup", handleComment));
};
if (actionLike) {
  init();
}
