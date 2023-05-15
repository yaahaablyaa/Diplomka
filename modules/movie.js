import { getData } from "/modules/http.request";
let iframe = document.querySelector("iframe");
const movie_id = location.search.split("=").at(-1);
let movie = document.querySelector('.movie')
let center_prod = document.querySelector('.center_prod')
let title = document.querySelector('.title')
let movie_trailer = document.querySelector('.movie_trailer')

// console.log(cont_bg);

getData(`movie/${movie_id}/videos`)
    .then((res) => {
        let video = res.data.results[0];
        iframe.src = `https://www.youtube.com/embed/${video.key}`;
    });

getData(`movie/${movie_id}`)
    .then(res => film([res.data]));

getData(`movie/${movie_id}/credits`)
    .then(res => product([res.data]));




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
        title.innerHTML = item.title
        if (item.adult === false) {
            age_limit = '16+'
        } else {
            age_limit = '18+'
        }
        movie.innerHTML += `
        <div class="cont">
            <div class="height">
                <div class="img">
                    <img src="${import.meta.env.VITE_IMG_URL}${item.poster_path}">
                </div>
                <div class="right">
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
                     <p>Год:    </p>
                     <p>Страна: </p>
                     <p>Слоган: </p>
                     <p>Время:  </p>
                     <p>Сборы: </p>
                     <p>Статус:</p>
                     <p>Бюджет:</p>
                   </div>

                    <div class="span_info">
                      <span>${item.release_date.split('-').at(0)}</span>
                      <span>${item.origin_country}</span>
                      <span>${item.tagline}</span>
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
                    <p>Компания: </p>
                    <p>IMDB_id: </p>
                    <p>TMDB_id:    </p>
                    <p>Возраст: </p>
                   </div>

                    <div class="span_info">
                     <span class="genr"></span>
                     <span>${item.vote_average}</span>
                     <span>${item.vote_count}</span>
                     <span>${item.production_companies.name}</span>
                     <span>${item.imdb_id}</span>
                     <span>${item.id}</span>
                     <span>${age_limit}</span>
                    </div>

                </div>
            </div>
        </div>`
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
                        top: 1200,
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
                        '#293d10 '
                    ],
                    borderWidth: 0
                }],
            };
            
            var pieChart = new Chart(canvas, {
                type: 'doughnut',
                data: oilData
            });
        }
    }
    
    function product(data) {
    console.log(data);
    for (let item of data) {
        center_prod.innerHTML += `
        <div class="prod_info">
            <div class="director">
                <div class="dorector_img">
                    <img src="/img/Фото.png" alt="">
                </div>
                <div class="director_info">
                    <h3 class="ru_name"></h3>
                    <h4 class="en_name">${item``}</h3>
                    <p>Режисер</p>
                </div>
            </div>
            <div class="director">
                <div class="dorector_img">
                    <img src="/img/Фото.png" alt="">
                </div>
                <div class="director_info">
                    <h3 class="ru_name">Фрэнсис Аннан</h3>
                    <h4 class="en_name">Francis Annan</h3>        
                    <p>Режисер</p>
                </div>
            </div>
            <div class="production">
                <h4>Производство:</h4>
                <p>1. Arclight Films</p>
                <p>1. Arclight Films</p>
                <p>1. Arclight Films</p>
            </div>
            <div class="production">
                <h4>Спецэффекты:</h4>
                <p>1. Arclight Films</p>
                <p>1. Arclight Films</p>
                <p>1. Arclight Films</p>
            </div>
        </div>`
    }
}