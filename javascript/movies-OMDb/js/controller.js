import * as Model from './model.js';
import * as View from './view.js';

const searchInput = document.getElementById("search-input");
const modal = document.querySelector(".modal");

function init() {
    searchInput.addEventListener("input", (e) => {
        Model.getMoviesByTitle(e.target.value)
        .then(movies => {
            const buttons = View.appendMovies(movies);
            
            if (buttons.length > 0) {
                buttons.forEach(btn => {
                    btn.addEventListener("click", () => {
                        Model.getMovieDetailsById(btn.id)
                        .then(data => {
                            View.showModal();
                            View.appendModalDetails(data);
                        })
                        .catch(err => console.log(err));
                    })
                })
            }
            
        }).catch(err => console.log(err));
    })

    modal.addEventListener("click", View.showModal);
}

export { init };
