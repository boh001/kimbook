const actionLike = document.getElementsByClassName("jsActionLike");
const video = document.getElementsByTagName("video");

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
  const homeContentId = element[1].id;
  const contentReact = element[1].children;
  const reactView = contentReact[4].lastElementChild;
  upView(homeContentId, reactView);
};
const init = () => {
  const actionList = Array.from(actionLike);
  const videoList = Array.from(video);
  actionList.map(a => a.addEventListener("click", handleReactLike));
  videoList.map(v => v.addEventListener("play", handleView));
};
if (actionLike) {
  init();
}
