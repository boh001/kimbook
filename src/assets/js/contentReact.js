const reactLike = document.getElementById("jsReact");
const actionLike = document.getElementById("jsActionLike");
const urlcode = document.getElementById("jsUsersJoin").href;
const upLike = () => {
  const userId = urlcode.split("/user")[1].split("/")[1];

  fetch(`/api/${userId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: userId })
  })
    .then(res => {
      reactLike.innerText = parseInt(reactLike.innerText) + 1;
    })
    .catch(error => {
      console.log(error);
    });
};
const handleReactLike = event => {
  event.preventDefault();
  upLike();
};
const init = () => {
  actionLike.addEventListener("click", handleReactLike);
};
if (actionLike) {
  init();
}
