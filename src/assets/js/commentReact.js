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
  const target = event.currentTarget;
  const like = target.nextSibling.firstChild;
  const commentId = target.parentNode.parentNode.id;
  upLike(commentId, like);
};
const handleComment = event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    const target = event.currentTarget;
    const text = target.value;
    const homeCommentId = target.parentNode.parentNode.parentNode.id;
    upComment(homeCommentId, text);
    target.value = "";
  }
};
const handleCommentShow = event => {
  event.preventDefault();
  const target = event.currentTarget;
  target.parentNode.nextSibling.style.display = "flex";
};
const handleReCommentShow = event => {
  event.preventDefault();
  const target = event.currentTarget;
  console.log(target);

  const nickname = target.parentNode.previousSibling.lastChild.firstChild;
  const input =
    target.parentNode.parentNode.parentNode.previousSibling.lastChild;
  console.log(nickname);

  input.style.color = "#4267b2";
  input.value = `${nickname.innerHTML}  `;
};
const init = () => {
  const actionList = Array.from(actionLike);
  const commentList = Array.from(comment);
  const commentShowList = Array.from(commentShow);
  const reCommentShowList = Array.from(reCommentShow);
  actionList.forEach(a => a.addEventListener("click", handleReactLike));
  commentList.forEach(c => c.addEventListener("keyup", handleComment));
  commentShowList.forEach(s => s.addEventListener("click", handleCommentShow));
  reCommentShowList.forEach(r =>
    r.addEventListener("click", handleReCommentShow)
  );
};
if (actionLike) {
  init();
}
