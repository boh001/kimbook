const actionLike = document.getElementsByClassName("jsContentLike");
const video = document.getElementsByTagName("video");
const comment = document.getElementsByClassName("jsComment");
const reply = document.getElementsByClassName("reply__button");
const upLike = (id, like) => {
  fetch(`/api/${id}/like`, {
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
const upView = (id, view) => {
  fetch(`/api/${id}/view`, {
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
      view.innerText = parseInt(view.innerText) + myJson.body;
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
  const element = event.path;
  const contentLike = element[2].previousSibling;
  const homeReactLike = contentLike.firstChild;
  const homeContentId = element[3].id;
  upLike(homeContentId, homeReactLike);
};
const handleView = event => {
  event.preventDefault();
  const element = event.path;
  console.log(element);
  const homeContentId = element[1].id;
  const contentReact = element[1].children[3];
  const reactInfo = contentReact.lastChild;
  console.log(reactInfo);

  if (video !== 0) {
    const reactView = reactInfo.lastChild;
    upView(homeContentId, reactView);
  } else {
    const reactView = reactInfo.children[1];
    upView(homeContentId, reactView);
  }
};
const handleComment = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const text = event.path[1].children[1].value;
    const ul = event.path[1].lastElementChild;
    const reactReply = event.path[2].children[4].children[1];
    const homeContentId = event.path[2].id;
    upComment(homeContentId, text, ul, reactReply);
    event.path[1].children[1].value = "";
  }
};
const handelRelpy = event => {
  event.preventDefault();
  const contentComments = event.path[2].nextElementSibling;
  contentComments.style.display = "block";
};
const init = () => {
  const actionList = Array.from(actionLike);
  const videoList = Array.from(video);
  const commentList = Array.from(comment);
  const replyList = Array.from(reply);
  actionList.map(a => a.addEventListener("click", handleReactLike));
  videoList.map(v => v.addEventListener("play", handleView));
  commentList.map(c => c.addEventListener("keyup", handleComment));
  replyList.map(r => r.addEventListener("click", handelRelpy));
};
if (actionLike) {
  init();
}
