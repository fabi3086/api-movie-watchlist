const moviesContainer = document.getElementById("movies")
const searchText = document.getElementById("search-text")
const movieContainer = document.getElementById('watchlist-movies')

const apiKey = "ad2ae515"
let url;

searchText.addEventListener("input", (e) => {
    url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${e.target.value}`;
});

document.getElementById("search").addEventListener("click", async () => {

    moviesContainer.innerHTML = ""
    const response = await fetch(url);
    const data = await response.json();

    for (let i = 0; i < data.Search.length; i ++) {
        // fetch details
        const movieDetailUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${data.Search[i].imdbID}`
        const movieDetailRes = await fetch(movieDetailUrl)
        const movieDetailData = await movieDetailRes.json()
        let moviePlot = movieDetailData.Plot
        let movieRating = movieDetailData.Ratings[0].Value
        let movieGenre = movieDetailData.Genre
        let movieRunTime = movieDetailData.Runtime

        const movieBox = document.createElement('div')
        movieBox.setAttribute('class', 'movie-box')
        movieBox.innerHTML = `
            <img class="movie-image" src=${data.Search[i].Poster} />
            <div class="movie-detail">
                <h1>${data.Search[i].Title}</h1>
                <p>⭐ ${movieRating}</p>
                <p>${movieGenre}</p>
                <p>${movieRunTime}</p>
                <button class="add-btn" id="add-watchlist-${i}" data-number=${i} >
                    <span class="add" data-number=${i}> + </span>
                    Watchlist 
                </button>
                <p>${moviePlot}</p>
            </div>
        `
        moviesContainer.append(movieBox);

        let watchlistBtn = document.getElementById(`add-watchlist-${i}`);
        watchlistBtn.addEventListener("click", (e) => {
            console.log(e.target.dataset.number)
            // create object to pass
            let infoMovie = {
                "summary" : data.Search[e.target.dataset.number],
                "detail" : {
                    "plot" : moviePlot,
                    "rating": movieRating,
                    "runtime": movieRunTime,
                    "genre": movieGenre
                }
            }
        
            if(localStorage.getItem("movies")){
                movieWatchlist = JSON.parse(localStorage.getItem("movies"))
                movieWatchlist.push(infoMovie)
                localStorage.setItem(`movies`, JSON.stringify(movieWatchlist));
            }else {
                movieWatchlist = [];
                movieWatchlist.push(infoMovie)
                localStorage.setItem(`movies`, JSON.stringify(movieWatchlist));
            }
            
        })
    }
})