import "./styles.css";
const api = "https://randomuser.me/api";
const addUser = document.getElementById("user-btn");
const mainApp = document.getElementById("app");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const dscSortBtn = document.getElementById("sort-dsc");
const ascSortBtn = document.getElementById("sort-asc");
const appState = [];

class User {
  constructor(title, firstname, lastname, gender, email) {
    this.name = `${title} ${firstname} ${lastname}`;
    this.email = email;
    this.gender = gender;
  }
}
addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  console.log(userJson.results[0]);
  const user = userJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );

  //appState.push(user);
  appState.push(classUser);
  console.log(appState);
  domRenderer(appState);
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div>
Name:${userObj.name.title} ${userObj.name.first} ${userObj.name.last}
<ol>
<li>${userObj.gender}</li>
<li>${userObj.email}</li>
</ol>
</div>`;
    userList.appendChild(userEl);
  });
};
searchInput.addEventListener("keyup", (e) => {
  console.log(e, searchInput.value);
  const filteredAppState = appState.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filteredAppState);
});

dscSortBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name.first < b.name.first ? 1 : -1));
  domRenderer(appStateCopy);
});

ascSortBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name.first < b.name.first ? -1 : 1));
  domRenderer(appStateCopy);
});
