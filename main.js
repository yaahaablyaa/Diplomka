import { header } from "./modules/header"
import { getData, searchData } from "/modules/http.request";
import { searchMovie, searchPerson } from "/modules/ui"
let head = document.querySelector('.header')
let tr = document.querySelector('.tr')
let search_inp = document.querySelector('.search_inp')
header(head)


search_inp.oninput = () => {
    searchData(`search/movie`, `&query=${search_inp.value}&page=1&include_adult=false&language=ru-RUS`)
        .then(res => searchMovie(res.data.results))

    searchData(`search/person`, `&query=${search_inp.value}&page=1&include_adult=false&language=ru-RUS`)
        .then(res => searchPerson(res.data.results))
}


getData(`movie/677179/videos`).then((res) => {
    let video = res.data.results[0];

    tr.src = `https://www.youtube.com/embed/${video.key}`;
});

const btnUp = {
    el: document.querySelector('.vverx'),
    addEventListener() {
        document.querySelector('.vverx').onclick = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}

btnUp.addEventListener();