const gridContainer = document.querySelector(".grid-container");

function getMoviesByTitle(title) {
    return new Promise((resolve, reject) => {
        if (title) {
            fetch(`http://www.omdbapi.com/?apikey=e7b55c41&s=${title}&type=movie`)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(data => {
                    if (data.Response === "False") {
                        throw new Error(data.Error)
                    }
                    else {
                        resolve(data.Search);
                    }
                }).catch(err => reject(err))
        } else {
            gridContainer.innerHTML = ""
        }
    })
}

function getMovieDetailsById(id) {
    return new Promise((resolve, reject) => {
        fetch(`http://www.omdbapi.com/?apikey=e7b55c41&i=${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(data => {
                if (data.Response === "False") {
                    throw new Error(data.Error)
                }
                else {
                    resolve(data);
                }
            }).catch(err => reject(err))
    })
}

export { getMoviesByTitle, getMovieDetailsById };