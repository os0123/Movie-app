
const apiKey = "97bed8f5";
const urlBase = `http://www.omdbapi.com/?apikey=${apiKey}`;

// Function to fetch and display movies
function fetchAndDisplayMovies(searchQuery = "Avengers") {
    const url = `${urlBase}&s=${searchQuery}`; // 's' is for searching multiple movies
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP status error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const moviesContainer = document.querySelector(".movies-container");
            moviesContainer.innerHTML = ""; // Clear previous content

            if (data.Search) {
                data.Search.forEach(movie => {
                    const movieElement = document.createElement("div");
                    movieElement.classList.add("movie");

                    movieElement.innerHTML = `
                        <h3>${movie.Title}</h3>
                        <p>Year: ${movie.Year}</p>
                        <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.png"}" alt="${movie.Title}">
                    `;

                    moviesContainer.appendChild(movieElement);
                });
            } else {
                moviesContainer.innerHTML = `<p>No movies found.</p>`;
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

// Default fetch on page load
fetchAndDisplayMovies();

// Search functionality
document.getElementById("searchButton").addEventListener("click", function () {
    const movieTitle = document.getElementById("titleInput").value.trim();
    if (movieTitle) {
        fetchAndDisplayMovies(movieTitle);
    }
});
