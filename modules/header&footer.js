import { searchModal } from "/modules/modal"
let user = JSON.parse(localStorage.getItem('user'))

export function header(pl) {
  pl.innerHTML += `
    <div class="left">
      <a class="logo" href="/index.html"><img src="/img/logo.png" alt=""></a>
      <img src="/img/social.svg" alt="social">
    </div>
    <div class="center">
      <ul>
        <li><a href="/pages/afisha.html">Афиша</a></li>
        <li><a href="#">Медиа</a></li>
        <li><a href="/pages/all_movies.html">Фильмы</a></li>
        <li><a href="/pages/tv.html">Сериалы</a></li>
        <li><a href="/pages/all_person.html">Актёры</a></li>
        <li><a href="#">Новости</a></li>
        <li><a href="#">Подборки</a></li>
        <li><a href="#">Категории</a></li>
      </ul>
    </div>
    <div class="right">
      <button class="search"><img src="/img/search_img.png" alt=""></button>
      <button class="login">Войти</button>
      <button class="user_name"></button>
    </div>`

  let search_btn = document.querySelector('.search')
  let login = document.querySelector(".login");
  let user_name = document.querySelector(".user_name");
  let hBtns = document.querySelectorAll('a')
  searchModal(search_btn)


  login.onclick = () => {
    location.assign('/pages/login.html')
  }
  user_name.onclick = () => {
    location.assign('/pages/profile.html')
  }
  if (user) {
    login.style.display = "none";
    user_name.innerHTML = user.name.slice(0, 5) + '...'
  } else {
    login.style.display = "block";
    user_name.style.display = 'none'
  }

  hBtns.forEach((btn) => {
    btn.onclick = () => {
      hBtns.forEach(el => el.classList.remove('active2'))
      hBtns.forEach(el => el.classList.remove('fade'))
      btn.classList.add('active2')
      btn.classList.add('fade')
    }
  })
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
        <li><a href="/pages/tv.html">Сериалы</a></li>
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