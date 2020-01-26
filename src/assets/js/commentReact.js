const actionLike = document.getElementsByClassName("jsCommentLike");
const comment = document.getElementsByClassName("jsReComment");
const commentShow = document.getElementsByClassName("comment__show");

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
const upComment = id => {
  fetch(`/api/${id}/reComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  })
    .then(res => {
      return res.json();
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
    const homeCommentId = event.path[3].id;
    upComment(homeCommentId);
    event.path[0].value = "";
  }
};
const handleCommentShow = event => {
  event.preventDefault();
  event.path[2].lastChild.style.display = "flex";
};
const init = () => {
  const actionList = Array.from(actionLike);
  const commentList = Array.from(comment);
  const commentShowList = Array.from(commentShow);
  actionList.map(a => a.addEventListener("click", handleReactLike));
  commentList.map(c => c.addEventListener("keyup", handleComment));
  commentShowList.map(r => r.addEventListener("click", handleCommentShow));
};
if (actionLike) {
  init();
}
