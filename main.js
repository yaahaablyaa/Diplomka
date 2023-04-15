import { header,  footer } from "/modules/header&footer"
import { getData, searchData } from "/modules/http.request";
let head = document.querySelector('.header')
let tr = document.querySelector('.tr')
let footer_cont = document.querySelector('.footer_cont')
header(head)
footer(footer_cont)

getData(`movie/677179/videos`).then((res) => {
    let video = res.data.results[0];

    tr.src = `https://www.youtube.com/embed/${video.key}`;
});

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