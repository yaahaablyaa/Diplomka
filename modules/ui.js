import { getData, searchData } from "/modules/http.request";
let kinoCont = document.querySelector(".kino-container");
let body = document.querySelector('body')
let films = document.querySelector(".films");
let person = document.querySelector(".person");
let search_inp = document.querySelector('.search_inp')

getData(`movie/popular`)
    .then(res => movie(res.data.results))

search_inp.oninput = () => {
    searchData(`search/movie`, `&query=${search_inp.value}&page=1&include_adult=false&language=ru-RUS`)
        .then(res => searchMovie(res.data.results))

    searchData(`search/person`, `&query=${search_inp.value}&page=1&include_adult=false&language=ru-RUS`)
        .then(res => searchPerson(res.data.results))
}


export function movie(arr) {
    arr.forEach((elem) => {
        let kinocont = document.createElement("div");
        let kino = document.createElement("div");
        let hover = document.createElement("div");
        let hoverBtn = document.createElement("button");
        let infoKino = document.createElement("div");
        let rayting = document.createElement("div");
        let kinoName = document.createElement("p");
        let kinoType = document.createElement("p");
        let img = document.createElement("img");

        rayting.innerHTML = elem.vote_average;
        kinoName.innerHTML = elem.title;
        kinoType.innerHTML = 'Подробнее'
        hoverBtn.innerHTML = "Карточка фильма";

        kinocont.classList.add("kino-cont");
        kino.classList.add("kino");
        hover.classList.add("hover");
        hoverBtn.classList.add("info-card");
        rayting.classList.add("rayting");
        kinoType.classList.add("type-kino");

        kino.style.backgroundImage = `url(${import.meta.env.VITE_IMG_URL}${elem.poster_path})`;

        hoverBtn.onclick = () => {
            location.assign('/pages/trailer.html?id=' + elem.id)
        }

        kinoType.onclick = () => {
            location.assign('/pages/trailer.html?id=' + elem.id)
        }

        kinocont.onclick = () => {
            body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${elem.backdrop_path})`
        }

        kinoCont.append(kinocont);
        infoKino.append(hoverBtn);
        kinocont.append(kino, kinoName, kinoType);
        hover.append(infoKino);
        kino.append(rayting, hover);
    });
}

export function searchMovie(data) {
    data.forEach((item) => {
        let box = document.createElement('div')
        let film_img = document.createElement("div");
        let film_info = document.createElement("div");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let span = document.createElement("span");

        box.classList.add('box')
        film_img.classList.add('film_img')
        film_info.classList.add('film_info')
        img.classList.add('img')

        img.src = `${import.meta.env.VITE_IMG_URL}${item.poster_path}`
        h3.innerHTML = item.title;
        span.innerHTML = item.vote_average;;

        film_info.append(h3, span)
        box.append(img, film_info)
        films.prepend(box)
    });
}

export function searchPerson(data) {
    data.forEach((item) => {
        let box = document.createElement('div')
        let pers_img = document.createElement("div");
        let pers_info = document.createElement("div");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");

        box.classList.add('box')
        pers_img.classList.add('pers_img')
        pers_info.classList.add('pers_info')

        img.src = `${import.meta.env.VITE_IMG_URL}${item.profile_path}`
        h3.innerHTML = item.original_name;

        pers_img.append(img)
        pers_info.append(h3)
        box.append(pers_img, pers_info)
        person.prepend(box)
    });
}