import { pushData } from "/modules/http.request";
let form = document.forms.login

form.onsubmit = (event) => {
    event.preventDefault();

    let user = {}

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    })

    pushData("/users?login=" + user.login)
        .then(res => {
            console.log(res);
            if (res.status === 200 || res.status === 201) {
                if (res.data.length !== 0) {
                    let resUser = res.data[0]
                    if (resUser.password === user.password) {
                        localStorage.setItem('user', JSON.stringify(resUser))
                        location.assign('/index.html')
                    } else {
                        alert('Wrong password')
                    }
                } else {
                    alert('Такой аккаунт не зарегистрирован')
                }
            }
        })
}