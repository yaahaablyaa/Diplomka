import { searchModal } from "/modules/modal"

export function header(pl) {
  pl.innerHTML += `
    <div class="left">
      <a class="logo" href="/index.html"><img src="/img/Логотип.png" alt=""></a>
      <img src="/img/social.svg" alt="social">
    </div>
    <div class="center">
      <ul>
        <li><a href="/pages/afisha.html">Афиша</a></li>
        <li><a href="#">Медиа</a></li>
        <li><a href="#">Фильмы</a></li>
        <li><a href="#">Актёры</a></li>
        <li><a href="#">Новости</a></li>
        <li><a href="#">Подборки</a></li>
        <li><a href="#">Категории</a></li>
      </ul>
    </div>
    <div class="right">
      <button class="search"><img src="/img/search_img.png" alt=""></button>
      <button class="login">Войти</button>
    </div>`

    let search_btn = document.querySelector('.search')
    searchModal(search_btn)
}