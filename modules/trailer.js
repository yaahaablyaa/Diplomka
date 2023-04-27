import { getData } from "/modules/http.request";
let iframe = document.querySelector("iframe");
const movie_id = location.search.split("=").at(-1);
let body = document.querySelector('body')
let movie = document.querySelector('.movie')

getData(`movie/${movie_id}/videos`)
    .then((res) => {
        let video = res.data.results[0];
        iframe.src = `https://www.youtube.com/embed/${video.key}`;
    });

getData(`movie/${movie_id}`)
    .then(res => film([res.data]));

function film(data) {
    console.log(data);
    for (let item of data) {
        movie.innerHTML += `
        <div class="cont">
            <div class="height">
                <div class="img">
                    <img src="${import.meta.env.VITE_IMG_URL}${item.poster_path}" alt="">
                </div>
                <div class="right">
                    <h1 class="movie_name">${item.title}</h1>
                    <h2 class="org_name">${item.original_title}</h2>
                    <div class="doghnut">
                        <canvas class="imdb"></canvas>
                    </div>
                    <p>${item.overview}</p>
                    <div class="btn">
                        <button class="show_trailer"><img src="/img/play.svg">Показать трейлер</button>
                        <img src="/img/social.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="like">
                <button><img src="/img/like.svg" alt=""></button>
                <button><img src="/img/dislike.svg" alt=""></button>
                <button class="rayting">Рейтинг ожиданий</button>
                <button><img src="/img/heart.svg"></button>
            </div>
            <div class="movie_info">
                <div class="left_info">
                    <p>Дата Релиза:  <span>${item.release_date}</span></p>
                    <p>Страна:  <span>${item.origin_country}</span></p>
                    <p>Слоган:  <span>${item.tagline}</span></p>
                    <p>Время:  <span>${item.runtime}</span></p>
                    <p>Сборы:  <span>${item.revenue}$</span></p>
                    <p>Статус:  <span>${item.status}</span></p>
                    <p>Бюджет:  <span>${item.budget}$</span></p>
                </div>
                <div class="right_info">
                    <p>Жанр:  <span>${item.genres.name}</span></p>
                    <p>Средняя Оценка:  <span>${item.vote_average}</span></p>
                    <p>Количество Голосов:  <span>${item.vote_count}</span></p>
                    <p>Компания:  <span>${item.production_companies.name}</span></p>
                    <p>IMDB_id:  <span>${item.imdb_id}</span></p>
                    <p>TMDB_id:  <span>${item.id}</span></p>
                </div>
            </div>
        </div>`
        let canvas = document.querySelector('.imdb')
        const btnUp = {
            addEventListener() {
                document.querySelector('.show_trailer').onclick = () => {
                    console.log('click');
                    window.scrollTo({
                        top: 1200,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }
        }
        btnUp.addEventListener();

        body.style.backgroundImage = `url(${import.meta.env.VITE_IMG_URL}${item.backdrop_path})`;

        var oilData = {
            datasets: [
            {
                label: 'Vote',
                data: [item.vote_average],
                backgroundColor: [
                    '#89CB36',
                    '#293d10'
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


