const plusFriend = document.getElementsByClassName("jsPlusFriend");

const upFriend = id => {
  fetch(`/api/${id}/plusFriend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};
const handlePlus = event => {
  event.preventDefault();
  event.stopPropagation();
  const friend = event.path[4].id;
  upFriend(friend);
};
const init = () => {
  const plusList = Array.from(plusFriend);
  plusList.forEach(p => p.addEventListener("click", handlePlus));
};
if (plusFriend) {
  init();
}
