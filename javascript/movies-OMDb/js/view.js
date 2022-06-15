const gridContainer = document.querySelector(".grid-container");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

function appendMovies(movies) {
  const buttons = [];
  gridContainer.innerHTML = "";

  movies.forEach(movie => {
    const { imdbID, Title, Poster, Year } = movie;

    const cardBtn = document.createElement("button");
    cardBtn.innerText = "Show Details";
    cardBtn.classList = "btn btn-outline-dark btn-sm";
    cardBtn.id = imdbID;

    buttons.push(cardBtn);

    gridContainer.innerHTML += `<div class="grid-item">
                                  <div class="card">
                                    <img src=${Poster} class="card-img-top" alt=${Title} height="50%">
                                    <div class="card-body">
                                      <h5 class="card-title">${Title}</h5>
                                      <p class="card-text">year - ${Year}</p>
                                    </div>
                                </div>`
  })

  addButtonForCards(buttons);

  return buttons;
}

function addButtonForCards(buttons) {
  const cardsBody = document.querySelectorAll(".card-body");

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    cardsBody[i].appendChild(button);
  }
}

function showModal() {
  if (modal.style.display === "none") {
    modal.style.display = "block"
  } else {
    modal.style.display = "none"
  }
}

function appendModalDetails(details) {
  modalContent.innerHTML = `<div class="modal-header">
                              <h4 class="modal-title" id="exampleModalLongTitle">Title: ${details.Title}</h4>
                            </div>
                            <div class="modal-body" style="background: url(${details.Poster}) no-repeat center center">
                              <p>Directors: ${details.Director}</p>
                              <p>Actors: ${details.Actors}</p>
                              <p>Plot: ${details.Plot}</p>
                            </div>`
}

export { appendMovies, showModal, appendModalDetails };
