let API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=d4a23d31&s=";
let API_URL_SEARCH = "http://www.omdbapi.com/?apikey=d4a23d31&i=";

let searchInput = document.getElementById("search-input");
let card = document.getElementsByClassName("movie-cards")[0];

function movie_display(imovie){
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie-card");
    movieEl.innerHTML = `
        <div class ="card">
            <img src ="${imovie.Poster}" alt= "poster" width ="300px" height ="300px"/>
            <br/>
            <div class = "movie-description"
                <span class="movie-title"><br>Title</br><span class = "value">${imovie.Title}</span></span>
                <span class="movie-title"><br>Rating</br><span class = "value">${imovie.imbdRating}</span></span>
                <span class="movie-title"><br>Director</br><span class = "value">${imovie.Director}</span></span>
                <span class="movie-title"><br>Released Date</br><span class = "value">${imovie.Released}</span></span>
                <span class="movie-title"><br>Genre</br><span class = "value">${imovie.Genre}</span></span>
            </div>
        </div>
    `;
    card.appendChild(movieEl);
}

function showMovies(movies){
    card.innerHTML="";
    movies.forEach(async function(movie){
        const movieData = await fetch(API_URL_SEARCH+movie.imdbID);
        const movieDataobj = await movieData.json();
        movie_display(movieDataobj);
    })
}

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.Search)
}

document.getElementsByClassName("search")[0].addEventListener("click", function() {
    console.log(searchInput.value);
    let query = searchInput.value;
    if (query) {
        getMovies(API_URL+query);
    }
});