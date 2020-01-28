const actionLike = document.getElementsByClassName("jsCommentLike");
const comment = document.getElementsByClassName("jsReComment");
const commentShow = document.getElementsByClassName("jsCommentShow");
const reCommentShow = document.getElementsByClassName("jsReCommentShow");

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
const upComment = (id, text) => {
  fetch(`/api/${id}/reComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, text })
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
  const like = event.path[0].nextSibling.firstChild;
  const commentId = event.path[2].id;
  upLike(commentId, like);
};
const handleComment = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const text = event.path[0].value;
    const homeCommentId = event.path[3].id;
    console.log(event.path);

    upComment(homeCommentId, text);
    event.path[0].value = "";
  }
};
const handleCommentShow = event => {
  event.preventDefault();
  event.path[2].lastChild.style.display = "flex";
};
const handleReCommentShow = event => {
  event.preventDefault();
  const nickname =
    event.path[4].lastChild.lastChild.firstChild.lastChild.firstChild;
  const input = event.path[4].firstChild.lastChild;
  input.style.color = "#4267b2";
  input.value = `${nickname.innerHTML}  `;
};
const init = () => {
  const actionList = Array.from(actionLike);
  const commentList = Array.from(comment);
  const commentShowList = Array.from(commentShow);
  const reCommentShowList = Array.from(reCommentShow);
  actionList.map(a => a.addEventListener("click", handleReactLike));
  commentList.map(c => c.addEventListener("keyup", handleComment));
  commentShowList.map(s => s.addEventListener("click", handleCommentShow));
  reCommentShowList.map(r => r.addEventListener("click", handleReCommentShow));
};
if (actionLike) {
  init();
}
