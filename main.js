import { header, footer } from "/modules/header&footer"
import { getData, searchData } from "/modules/http.request";
let head = document.querySelector('.header')
let tr = document.querySelector('.tr')
let footer_cont = document.querySelector('.footer_cont')
let traile = document.querySelector(".traile");
let trai_movie_name = document.querySelector(".trai_movie_name");
let btns = document.querySelectorAll('.category a')
let sbtn = document.querySelector('.btn-settings')
let settings_prof = document.querySelector('#settings_prof')
let g_prof = document.querySelector('#g_prof')
let img = document.querySelector('#img');
let img1 = document.querySelector('#img1');
let inp = document.getElementById('input');
let perexod = document.getElementById('perexod');


header(head)
footer(footer_cont)


btns.forEach((btn) => {
    btn.onclick = (e) => {
        e.preventDefault()
        btns.forEach(el => el.classList.remove('active'))
        btns.forEach(el => el.classList.remove('fade'))
        btn.classList.add('active')
        btn.classList.add('fade')
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

        div.style.backgroundImage = `url(${import.meta.env.VITE_IMG_URL}${item.backdrop_path})`;
        div.classList.add("trai");
        place.append(div);
        div.onclick = () => {
            getData(`movie/${item.id}/videos`).then((res) => {
                let video = res.data.results[0];
                if (!res.data.results[0]) {
                    trai_movie_name.innerHTML = item.title + ' ' + '(Трейлер отсутствует)'
                    trai_movie_name.style.color = 'red'
                    tr.style.borderColor = 'red'
                } else {
                    trai_movie_name.innerHTML = item.title
                    trai_movie_name.style.color = 'white'
                    tr.style.borderColor = 'white'
                    tr.src = `https://www.youtube.com/embed/${video.key}`;
                }
            });
        };
    };
}
///profile
let user = JSON.parse(localStorage.getItem('user'))
document.querySelector('.userName').innerHTML = user.name + ' ' + user.surname

sbtn.onclick = () => {
    settings_prof.style.display = "block"
    g_prof.style.display = "none"
}

perexod.onclick = () => {
    location.assign('/pages/profile.html')
}

inp.onchange = (e) => {
    if (inp.files[0]) {
        if (/^image\//.test(inp.files[0].type)) {
            img.src = URL.createObjectURL(inp.files[0]);
            img1.src = URL.createObjectURL(inp.files[0]);
            localStorage.setItem('image', img.src);
        } else {
            alert('Выбранный файл не является изображением!');
        }
    }
};

if (localStorage.getItem('image')) {
    img.src = localStorage.getItem('image');
    img1.src = localStorage.getItem('image');
}