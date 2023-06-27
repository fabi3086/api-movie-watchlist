const movieContainer = document.getElementById('watchlist-movies')

document.addEventListener('DOMContentLoaded', () => {
    let movies = JSON.parse(localStorage.getItem(`movies`))
    for (let i = 0; i < movies.length; i++) {
        const moviewatchList = document.createElement('div')
        moviewatchList.setAttribute('class', 'movie-box')
        moviewatchList.innerHTML = `
            <img class="movie-image" src=${movies[i].summary.Poster} />
                <div class="movie-detail">
                    <h1>${movies[i].summary.Title}</h1>
                    <p>⭐ ${movies[i].detail.rating}</p>
                    <p>${movies[i].detail.genre}</p>
                    <p>${movies[i].detail.runtime}</p>
                    <p>${movies[i].detail.plot}</p>
                    <button class="remove-btn" id="remove-watchlist-${i}" data-number=${i}>
                        <span class= "minus">-</span>
                        Remove
                    </button>
                </div>
        `
        movieContainer.append(moviewatchList);
    }
})



