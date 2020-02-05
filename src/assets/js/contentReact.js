const actionLike = document.getElementsByClassName("jsContentLike");
const video = document.getElementsByTagName("video");
const comment = document.getElementsByClassName("jsComment");
const reply = document.getElementsByClassName("jsShowReply ");
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
      const { body } = myJson;
      const {
        author: { avatarUrl, nickname }
      } = body;

      const replyCount = body.reply;
      reply.innerText = replyCount;
      const div = document.createElement("div");
      div.className = "comment__list";
      div.id = body.id;
      div.innerHTML = `
      <div class="list__list">
        <img class="miniAvatar2" src="${avatarUrl}"/>
        <div class="list__description">
          <span class="description__name">${nickname}</span>
          <span class="description__list">${text}</span>      
        </div>
      </div>
      <div class="list__react">
        <div class="comment__like jsCommentLike">
          좋아요
        </div>
        <div class="comment__infoLike">
          <span class="infoLike__count">0</span>
          <span class="infoLike__sub">개</span>
        </div>
        <div class="comment__show jsCommentShow">댓글보기
        </div>
      </div>
      <div class="comment__reComments" style="display:flex">
        <div class="reComments__user">
          <img class="miniAvatar2" src= "${avatarUrl}"/>
          <input class="user__text jsRecomment" type="text" name="comment" placeholder="please write comments">
        </div>
        <div class="reComments__lists">
        </div>
      </div>`;
      ul.appendChild(div);
    })
    .catch(error => {
      console.log(error);
    });
};
const handleReactLike = event => {
  event.preventDefault();
  const target = event.currentTarget;
  const homeReactLike = target.parentNode.previousSibling.children[0].lastChild;
  const homeContentId = target.parentNode.parentNode.id;
  upLike(homeContentId, homeReactLike);
};
const handleView = event => {
  event.preventDefault();
  const target = event.currentTarget;
  const homeContentId = target.parentNode.id;
  const reactView = target.nextSibling.children[1].lastChild;
  upView(homeContentId, reactView);
};
const handleComment = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const target = event.currentTarget;
    const text = target.value;
    const ul = target.parentNode.nextSibling;
    const reactReply =
      target.parentNode.parentNode.previousSibling.previousSibling.children[1]
        .children[1];
    const homeContentId = target.parentNode.parentNode.parentNode.id;
    upComment(homeContentId, text, ul, reactReply);
    target.value = "";
  }
};
const handleRelpy = event => {
  event.preventDefault();
  const target = event.currentTarget;
  const contentComments = target.parentNode.nextSibling;
  contentComments.style.display = "flex";
};
const init = () => {
  const actionList = Array.from(actionLike);
  const videoList = Array.from(video);
  const commentList = Array.from(comment);
  const replyList = Array.from(reply);
  actionList.forEach(a => a.addEventListener("click", handleReactLike));
  videoList.forEach(v => v.addEventListener("play", handleView));
  commentList.forEach(c => c.addEventListener("keyup", handleComment));
  replyList.forEach(r => r.addEventListener("click", handleRelpy));
};
if (actionLike) {
  init();
}
