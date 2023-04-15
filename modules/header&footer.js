import { searchModal } from "/modules/modal"

export function header(pl) {
  pl.innerHTML += `
    <div class="left">
      <a class="logo" href="/index.html"><img src="/img/wepro.svg" alt=""></a>
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

export function footer(pl) {
  pl.innerHTML += `
  <div class="center">
    <div class="logo">
      <img src="/img/wepro.svg" alt="">
    </div>
    <h1>Подпишитесь на E-mail рассылку</h1>
    <p class="endNews">Если хотиет быть в курсе последних новостей и новинок кино - заполните форму ниже и оформите
      бесплатную E-mail рассылку! </p>
    <form action="">
      <input type="text" placeholder="Введите свой E-mail адрес">
      <button>Подписаться</button>
    </form>
    <div class="sogl">
      <input type="checkbox">
      <p>Соглашаюсь на условия <span>политики конфиденциальности</span></p>
    </div>
  </div>
  <div class="fot_bot">
    <img src="/img/social.svg" alt="social">
    <div class="cent">
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
    <p>2023 © WePro.  Все права защищены</p>
    <a href="">Политика конфиденциальности</a>
  </div>`
}