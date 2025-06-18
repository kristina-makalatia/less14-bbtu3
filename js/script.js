let box = document.querySelector(".box");

box.addEventListener("click", function () {
  // console.log(event.target);
  console.log(this);
});

// ajax
// 1. xml http requist
// 2. fetch

let requist = new XMLHttpRequest();
requist.open("GET", "https://jsonplaceholder.typicode.com/users");

requist.addEventListener("load", function () {
  //   console.log(this.responseText);
  let response = this.responseText; //rogorc teksti
  let responseJs = JSON.parse(response); //rogorc js obiekti
  //   console.log(responseJs);

  let ulElement = document.createElement("ul");
  let liEl = document.createElement("li");
  liEl.textContent = responseJs[2].name;
  ulElement.appendChild(liEl);
  //   responseJs.forEach((element) => {
  //     let li = document.createElement("li");
  //     // li.textContent = element.name + " " + element.email;
  //     li.textContent = `${element.name} ${element.email}`;
  //     ulElement.appendChild(li);
  //   });

  document.getElementById("api").appendChild(ulElement);
});

requist.addEventListener("error", function () {
  let pError = document.createElement("p");
  pError.textContent = "Server Error";
  document.getElementById("api").appendChild(pError);
});

requist.send();

// fetch
// fetch("https://jsonplaceholder.typicode.com/users", {
//   method: "GET",
// })
//   .then(function (response) {
//     console.log(response);
//     if (!response.ok) {
//       throw response.status;
//     }
//     return response.json();
//   })
//   .then(function (infoJs) {
//     console.log(infoJs);
//     let ulElement = document.createElement("ul");
//     const fragment = document.createDocumentFragment();

//     infoJs.forEach((element) => {
//       let liElementNew = document.createElement("li");
//       liElementNew.textContent = `${element.email}`;
//       fragment.appendChild(liElementNew);
//     });

//     ulElement.appendChild(fragment);
//     document.getElementById("block-api").appendChild(ulElement);
//   })
//   .catch(function (error) {
//     console.log(error);
//     if (error === 404) {
//       let pError = document.createElement("p");
//       pError.textContent = "Page not Found";
//       document.getElementById("block-api").appendChild(pError);
//     }
//   });

//   users fetch example
let ulResult = document.getElementById("users-result");
let loadMore = document.getElementById("loadmore");
let loadPev = document.getElementById("loadPrev");
let currentPage = 1;
let totalPages;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
    headers: { "x-api-key": "reqres-free-v1" },
  })
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        throw response.status;
      }
      return response.json();
    })
    .then(function (infoJs) {
      console.log(infoJs);

      const fragment = document.createDocumentFragment();

      infoJs.data.forEach((element) => {
        let liElementNew = document.createElement("li");
        liElementNew.textContent = `${element.first_name} ${element.last_name}`;
        fragment.appendChild(liElementNew);
      });

      ulResult.innerHTML = " ";
      ulResult.appendChild(fragment);
      totalPages = infoJs.total_pages;
    })
    .catch(function (error) {
      console.log(error);
      if (error === 404) {
        let pError = document.createElement("p");
        pError.textContent = "Page not Found";
        document.getElementById("block-api").appendChild(pError);
      }
    });
}

getUsers(currentPage);

loadPev.addEventListener("click", function () {
  if (currentPage === 1) {
    return;
  }
  currentPage -= 1;
  getUsers(currentPage);
});

loadMore.addEventListener("click", function () {
  if (currentPage === totalPages) {
    return;
  }
  currentPage += 1;
  getUsers(currentPage);
});
