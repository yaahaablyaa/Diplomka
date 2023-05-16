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



function onChangeEvent() {
    var selectOption = document.getElementById("language-id").value;
    var result = document.getElementById("language-label");
    if (selectOption == "English") {
        var english = document.getElementById("english").value;
        result.innerHTML = english;
    } else if (selectOption == "German") {
        var germen = document.getElementById("german").value;
        result.innerHTML = germen;
    } else if (selectOption == "French") {
        var french = document.getElementById("french").value;
        result.innerHTML = french;
    }

}

let g_prof = document.querySelector('#g_prof')
let btn_active = document.querySelector(".btn-prof-active")
sbtn.onclick = () => {
    settings_prof.style.display = "block"
    g_prof.style.display = "none"
}

btn_active.onclick = () => {
    settings_prof.style.display = "none"
    g_prof.style.display = "block"
}
let img = document.querySelector('#img');
let img1 = document.querySelector('#img1');
let inp = document.getElementById('input');

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

const fileInput = document.getElementById("input");
fileInput.addEventListener("change", function () {
    const fileName = this.value.split("\\").pop();
});

btns.forEach((btn) => {
    btn.onclick = (e) => {
        e.preventDefault()
        btns.forEach(el => el.classList.remove('active'))
        btn.classList.add('active')
    }
})
