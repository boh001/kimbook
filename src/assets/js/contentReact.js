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
      like.innerText = parseInt(like.innerText) + 1;
    })
    .catch(error => {
      console.log(error);
    });
};
const upView = () => {
  console.log("hi");
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

  const homeContentId = element[3].id;
  upView(homeContentId);
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
