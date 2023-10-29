import { getData } from "/modules/http.request";
let iframe = document.querySelector("iframe");
const movie_id = location.search.split("=").at(-1);
let movie = document.querySelector('.movie')
let title = document.querySelector('.title')
let body = document.querySelector('body')
let bllock = document.querySelector('.bllock')
let dirname = document.querySelector('.ru_name')
let en_name = document.querySelector('.en_name')
let vfx = document.querySelector('.vfx')
let artt = document.querySelector('.art')
let soundd = document.querySelector('.sound')
let scenari = document.querySelector('.scenario')
let produserr = document.querySelector('.produserr')
let vfx2 = document.querySelector('.vfx2')
let artt2 = document.querySelector('.art2')
let soundd2 = document.querySelector('.sound2')
let scenari2 = document.querySelector('.scenario2')
let produserr2 = document.querySelector('.produserr2')


getData(`movie/${movie_id}/videos`)
    .then((res) => {
        let video = res.data.results[0];
        iframe.src = `https://www.youtube.com/embed/${video.key}`;
    });

getData(`movie/${movie_id}`)
    .then(res => film([res.data]));


showMovie(1, 451048, 'abc')
async function getApiData(url, cb) {
    const resp = await fetch(url);
    const respData = await resp.json();
    cb(respData);
}

function showMovie(i, id, title) {
    const movApi = `${import.meta.env.VITE_BASE_URL}movie/${movie_id}?api_key=${import.meta.env.VITE_API_KEY}&language=ru-RUS`;
    getApiData(movApi, (movie) => showGenres.call(null, movie, i, id, title));
}

function showGenres(movie, i, id, title) {
    movie.genres.forEach((genre) => {
        const { name } = genre;
        let genr = document.querySelector('.genr').innerHTML = name
    })
}

let age_limit = ''
function film(data) {
    for (let item of data) {
        console.log(item);
        title.innerHTML = item.title
        if (item.adult === false) {
            age_limit = '16+'
        } else {
            age_limit = '18+'
        }
        body.style.backgroundImage = `url(${import.meta.env.VITE_IMG_URL}${item.backdrop_path})`
        movie.innerHTML += `
            <div class="cont">
                <div class="height">
                    <div class="img">
                        <img src="${import.meta.env.VITE_IMG_URL}${item.poster_path}">
                    </div>
                    <div class="right">
                        <p class="pere">Главная > Актеры > <span>${item.title}</span></p>
                        <h1 class="movie_name">${item.title}</h1>
                        <h2 class="org_name">${item.original_title}</h2>
                        <div class="doghnut">
                            <canvas class="imdb"></canvas>
                        </div>
                        <p>${item.overview.slice(0, 300)}...</p>
                        <div class="btn">
                            <button class="show_trailer"><img src="/img/play.svg">Показать трейлер</button>
                            <img src="/img/social.svg">
                        </div>
                    </div>
                </div>
                <div class="like">
                    <button><img src="/img/like.svg"></button>
                    <button><img src="/img/dislike.svg"></button>
                    <button class="rayting">Рейтинг ожиданий</button>
                    <div class="izb">
                        <button><img  class="heart" src="/img/heart.svg"></button>
                        <p>В избранном у ${Math.round(item.popularity)} человек</p>
                    </div>
                </div>
                <div class="info">
                    <div class="left_info">
                       <div class="p_info">
                         <p>Год:</p>
                         <p>Страна:</p>
                         <p>Слоган:</p>
                         <p>Время:</p>
                         <p>Сборы:</p>
                         <p>Статус:</p>
                         <p>Бюджет:</p>
                       </div>
                        <div class="span_info">
                          <span>${item.release_date.split('-').at(0)}</span>
                          <span>${item.production_countries[0].name}</span>
                          <span>${item.tagline}....</span>
                          <span>${item.runtime}мин</span>
                          <span>${item.revenue}</span>
                          <span>${item.status}</span>
                          <span>${item.budget}</span>
                        </div>
                    </div>
                    <div class="right_info">
                      <div class="p_info">
                        <p>Жанр:</p>
                        <p>Средняя Оценка:</p>
                        <p>Количество Голосов:</p>
                        <p>Компания:</p>
                        <p>IMDB_id:</p>
                        <p>TMDB_id:</p>
                        <p>Возраст:</p>
                       </div>
                        <div class="span_info">
                         <span class="genr"></span>
                         <span>${item.vote_average}</span>
                         <span>${item.vote_count}</span>
                         <span>${item.production_companies[0].name}</span>
                         <span>${item.imdb_id}</span>
                         <span>${item.id}</span>
                         <span>${age_limit}</span>
                        </div>
                    </div>
                </div>
            </div>`
        // console.log(item.production_countries[1].name);
        let canvas = document.querySelector('.imdb')
        let heart = document.querySelector('.heart')

        heart.onclick = () => {
            heart.src = '/img/heart2.svg'
        }
        heart.ondblclick = () => {
            heart.src = '/img/heart.svg'
        }
        let btn = document.querySelector('.show_trailer')
        const btnUp = {
            addEventListener() {
                btn.onclick = () => {
                    window.scrollTo({
                        top: 2200,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }
        }
        btnUp.addEventListener();

        let minus_vote = Math.abs(item.vote_average - 10)

        var oilData = {
            datasets: [
                {
                    label: 'Vote',
                    data: [item.vote_average, minus_vote],
                    backgroundColor: [
                        '#89CB36',
                        '#293d10'
                    ],
                    borderWidth: 0
                }]
        };

        var pieChart = new Chart(canvas, {
            type: 'doughnut',
            data: oilData
        });
    }
}

getData(`movie/${movie_id}/credits`)
    .then(res => {
        let dirFil = res.data.crew.filter(el => el.known_for_department === 'Directing')
        let art = res.data.crew.filter(el => el.known_for_department === 'Art')
        let scenario = res.data.crew.filter(el => el.known_for_department === 'Writing')
        let producer = res.data.crew.filter(el => el.known_for_department === 'Production')
        let viEff = res.data.crew.filter(el => el.known_for_department === 'Visual Effects')
        let sound = res.data.crew.filter(el => el.known_for_department === 'Sound')
        dirname.innerHTML = dirFil[0].name
        produserr.innerHTML = producer[0].name
        vfx.innerHTML = viEff[0].name
        artt.innerHTML = art[0].name
        soundd.innerHTML = sound[0].name
        scenari.innerHTML = scenario[0].name
        en_name.innerHTML = dirFil[1].name
        produserr2.innerHTML = producer[1].name
        vfx2.innerHTML = viEff[1].name
        artt2.innerHTML = art[1].name
        soundd2.innerHTML = sound[1].name
        scenari2.innerHTML = scenario[1].name
        aktors(res.data.cast, bllock)
    });


function aktors(data, pl) {
    for (let item of data.slice(0, 8)) {
        let persson = document.createElement('div')
        let persson_img = document.createElement('div')
        let persson_txt = document.createElement('h2')
        let p = document.createElement('p')

        persson.classList.add('persson')
        persson_img.classList.add('persson_img')
        persson_txt.classList.add('persson_txt')

        persson_img.style.backgroundImage = `url(${import.meta.env.VITE_IMG_URL}${item.profile_path})`;
        persson_txt.innerHTML = item.name
        p.innerHTML = item.character

        persson.onclick = () => {
            location.assign('/pages/people.html?id=' + item.id)
        }

        pl.append(persson)
        persson.append(persson_img, persson_txt, p)
    }
}