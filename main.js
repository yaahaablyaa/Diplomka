import { header, footer } from "/modules/header&footer"
import { getData, searchData } from "/modules/http.request";
let head = document.querySelector('.header')
let tr = document.querySelector('.tr')
let footer_cont = document.querySelector('.footer_cont')
let traile = document.querySelector(".traile");
let trai_movie_name = document.querySelector(".trai_movie_name");
let btns = document.querySelectorAll('.category a')
header(head)
footer(footer_cont)

btns.forEach((btn) => {
    btn.onclick = (e) => {
        e.preventDefault()
        btns.forEach(el => el.classList.remove('active'))
        btn.classList.add('active')
    }
})

const btnUp = {
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

getData(`movie/now_playing`).then((res) => trailers(res.data.results, traile));
function trailers(arr, place) {
    place.innerHTML = "";
    for (let item of arr) {
        let div = document.createElement("div");
        let h3 = document.createElement('h3')

        div.style.backgroundImage = `url(${import.meta.env.VITE_IMG_URL}${item.backdrop_path})`;
        div.classList.add("trai");
        h3.innerHTML = item.title
        div.append()
        place.append(div);

        div.onclick = () => {
            getData(`movie/${item.id}/videos`).then((res) => {
                let video = res.data.results[0];

                tr.src = `https://www.youtube.com/embed/${video.key}`;
                trai_movie_name.innerHTML = item.title
            });
        };
    };
}
