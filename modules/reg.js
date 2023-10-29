import axios from 'axios'
const fapi_url = 'http://localhost:9100'
let form = document.forms.reg

form.onsubmit = (event) => {
    event.preventDefault();

    let user = {}

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    })


    axios.post(fapi_url + "/users", user)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                location.assign('/pages/login.html')
            }
        })

}