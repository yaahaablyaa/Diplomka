import { getData } from "/modules/http.request";
let iframe = document.querySelector("iframe");
const movie_id = location.search.split("=").at(-1);

// getData(`movie/${movie_id}/videos`).then((res) => {
//     let video = res.data.results[0];

//     iframe.src = `https://www.youtube.com/embed/${video.key}`;
// });
let left = document.querySelector('.l')
// getData(`movie/${movie_id}`)
//     .then(res => film(res.data))

// function film(data) {
//     data.forEach((item) => {
//         let img = document.createElement('img')

//         img.src = `url(${import.meta.env.VITE_IMG_URL}${elem.poster_path})`;
//         lo
//         left.append(img)
//     });
// }
