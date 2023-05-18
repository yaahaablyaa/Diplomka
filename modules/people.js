import { getData } from "/modules/http.request";
const person_id = location.search.split("=").at(-1);
let aktor = document.querySelector('.aktor')
let title = document.querySelector('.pers_title')
let swiper_wrapper = document.querySelector(".swiper-wrapper");
let photo_block = document.querySelector(".photo_block");

getData(`person/${person_id}/movie_credits`)
  .then(res => pers_film(res.data.cast, swiper_wrapper))

getData(`person/${person_id}/images`)
  .then(res => pers_photo(res.data.profiles.slice(0, 8), photo_block))

getData(`person/${person_id}`)
  .then(res => person([res.data], aktor))

function person(data, pl) {
  for (let item of data) {
    title.innerHTML = item.name
    let age = new Date().getFullYear() - String(item.birthday.split('-').at(0))
    pl.innerHTML += `
          <div class="person_img">
            <img src="${import.meta.env.VITE_IMG_URL}${item.profile_path}" alt="" class="pers_img">
          </div>
          <div class="person_right">
            <div class="heigt">
              <p>Главная > Актеры > <span>${item.name}</span></p>
              <h1>${item.name}</h1>
              <h2>${item.name}</h2>
            </div>
            <div class="btns">
              <p class="active">Информация</p>
              <p>Биография</p>
            </div>
            <div class="tabcontent">
              <div class="informatsion">
                <div class="left">
                  <p>Карьера:</p>
                  <p>Место Рождения:</p>
                  <p>Год Рождения:</p>
                  <p>Пол:</p>
                  <p>Популярность:</p>
                  <p>IMDB_ID:</p>
                  <p>TMDB_ID:</p>
                </div>
                <div class="right">
                  <span>${item.known_for_department}</span>
                  <span>${item.place_of_birth}</span>
                  <span>${item.birthday.split('-').at(0)} (${age} лет)</span>
                  <span class="pol"></span>
                  <span>${item.popularity} человек</span>
                  <span>${item.imdb_id}</span>
                  <span>${item.id}</span>
                </div
              </div>
              </div>
            </div>
            <div class="tabcontent">
              <div class="biography">
                <p>${item.biography.slice(0, 1100)}...</p>
              </div>
            </div>
            <div class="izb">
                <button><img  class="heart" src="/img/heart.svg"></button>
                <p>В избранном у ${item.popularity} человек</p>
            </div>`
    let pol = document.querySelector('.pol')
    if (item.gender === 1) {
      pol.innerHTML = 'Женский'
    } else {
      pol.innerHTML = 'Мужской'
    }
  };

  let btns = document.querySelectorAll('.btns p')
  let tab_content = document.querySelectorAll('.tabcontent')

  function show(c = 0) {
    tab_content.forEach(elem => {
      elem.style.display = "none"
    })
    tab_content[c].style.display = "flex"
    tab_content[c].classList.add('fade')

    btns.forEach((btn, i) => {
      btn.onclick = () => {
        btns.forEach(el => el.classList.remove('active'))
        btn.classList.add('active')
        show(i)
      }
    })
  }
  show()
}

function pers_film(data, pl) {
  for (let item of data) {
    let swiper_slide = document.createElement("div");
    let kinocont = document.createElement("div");
    let kino = document.createElement("div");
    let hover = document.createElement("div");
    let hoverBtn = document.createElement("button");
    let infoKino = document.createElement("div");
    let rayting = document.createElement("div");
    let kinoName = document.createElement("p");
    let kinoType = document.createElement("p");

    if (item.vote_average < 5) {
      rayting.style.background = 'red'
    }

    rayting.innerHTML = item.vote_average;
    kinoName.innerHTML = item.title;
    kinoType.innerHTML = item.release_date
    hoverBtn.innerHTML = "Карточка фильма";

    kinocont.classList.add("kino-cont");
    kino.classList.add("kino");
    hover.classList.add("hover");
    hoverBtn.classList.add("info-card");
    rayting.classList.add("rayting");
    kinoType.classList.add("type-kino");
    swiper_slide.classList.add("swiper-slide");

    if (!item.poster_path) {
      kino.style.backgroundImage = `url('/img/nonPester.png')`;
    } else {
      kino.style.backgroundImage = `url(${import.meta.env.VITE_IMG_URL}${item.poster_path})`;
    }

    hoverBtn.onclick = () => {
      location.assign('/pages/movie.html?id=' + item.id)
    }

    pl.append(swiper_slide);
    swiper_slide.append(kinocont);
    infoKino.append(hoverBtn);
    kinocont.append(kino, kinoName, kinoType);
    hover.append(infoKino);
    kino.append(rayting, hover);

    // new Chart("line-chart", {
    //   type: 'line',
    //   data: {
    //     labels: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    //     datasets: [
    //       {
    //         data: [5, 7, 3, 2, 8, 1, 8, 7, 3, 4, 6, 2, 8, 3, 7, 6, 3, 5],
    //         label: '',
    //         borderColor: "#3657CB",
    //         fill: false
    //       }
    //     ]
    //   }
    // });
  }
}

const swiper = new Swiper(".persSwiper", {
  slidesPerView: 4,
  spaceBetween: 55,
  type: "fraction",
  pagination: {
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2000,
  },
  mousewhel: {
    sensitivity: 1,
    eventsTarget: '.swiper_slide'
  },
  keyboard: {
    enable: true,
    onlyInViewport: true
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true
  },
  simulateTouch: true,
  touchRatio: 1,
  grabCursor: true,
});

function pers_photo(data, pl) {
  for (let item of data) {
    let photo = document.createElement('div')
    photo.style.backgroundImage = `url(${import.meta.env.VITE_IMG_URL}${item.file_path})`
    photo.classList.add('photo')
    pl.append(photo)
  }
}