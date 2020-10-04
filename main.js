const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e8666df3459d17283ac3835ccc32d859";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const MAINTAG = document.querySelector("main");
const FORMTAG = document.querySelector("form");
const MOVIES = document.querySelector(".movies");

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=e8666df3459d17283ac3835ccc32d859&query=";
const INPUTTAG = document.querySelector("input");

getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);
  return respData;
}

function showMovies(movies) {
  MAINTAG.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average } = movie;
    const MOVIE = document.createElement("div");
    MOVIE.classList.add("movie");
    MOVIE.innerHTML = `
          <img src="${IMGPATH + poster_path}" alt="" />
          <div class="movie-info">
            <h4 class="${vote_average >= 7 ? "" : "avarage"}">${
      vote_average >= 7 ? "Great Movie" : "Average Movie"
    } </h4>
            <h5>rating : ${vote_average}</h5>
            <h3>${title}</h3>
          </div>
    `;
    MAINTAG.appendChild(MOVIE);
  });
}

FORMTAG.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = INPUTTAG.value;
  if (search) {
    getMovies(SEARCHAPI + search);
  }
  INPUTTAG.value = "";
});

MOVIES.addEventListener("click", () => {
  location.reload();
});

document.querySelector(".theme").addEventListener("click", () => {
  document.body.classList.toggle("darkb");
  document.querySelector("header").classList.toggle("darkb");
  document.querySelectorAll("a").forEach((ea) => {
    ea.classList.toggle("darkb");
  });
  document.querySelectorAll(".movie-info").forEach((emi) => {
    emi.classList.toggle("darkb");
  });
  document.querySelectorAll(".movie").forEach((em) => {
    em.classList.toggle("darkb");
  });
  document.querySelector("input").classList.toggle("darkb");
  document.querySelector("ul").classList.toggle("darkb");
});

document.querySelector(".menu").addEventListener("click", () => {
  document.querySelector("ul").classList.toggle("active");
});
