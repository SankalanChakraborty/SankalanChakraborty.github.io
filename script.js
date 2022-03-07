let userList = document.querySelector(".all-users");
let inputField = document.querySelector(".header input");
const apiURL = "https://randomuser.me/api/?results=50";

inputField.addEventListener("input", function (e) {
  searchUsers(e.target.value);
});

function searchUsers(searchValue) {
  var listElements = document.querySelectorAll(".all-users li");
  listElements.forEach((element) => {
    if (element.innerText.toLowerCase().includes(searchValue.toLowerCase())) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
}

getData();

async function getData() {
  const res = await fetch(apiURL);
  const data = await res.json();

  userList.innerHTML = "";

  const resultsArr = data.results;
  resultsArr.forEach((person) => {
    let listElement = document.createElement("li");
    listElement.classList.add("hide");
    const imageElement = document.createElement("img");
    const imageSource = person.picture.medium;
    imageElement.setAttribute("src", imageSource);
    const personName = `${person.name.first} ${person.name.last}`;
    const city = `${person.location.city}`;
    const country = `${person.location.country}`;
    let userDiv = document.createElement("div");
    userDiv.setAttribute("class", "user-info");
    let h1Name = document.createElement("h1");
    h1Name.innerText = personName;
    userDiv.appendChild(h1Name);
    let paragraghElement = document.createElement("p");
    paragraghElement.innerText = `${city}, ${country}`;
    userDiv.appendChild(paragraghElement);
    listElement.appendChild(imageElement);
    listElement.appendChild(userDiv);
    userList.appendChild(listElement);
  });
}
