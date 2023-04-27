import axios from "axios"
const base_url = import.meta.env.VITE_BASE_URL

export const getData = async (path) => {
    const res = await axios.get(base_url + path + `?api_key=${import.meta.env.VITE_API_KEY}&language=ru-RUS&page2`)

    return res
}

export const searchData = async (path, query) => {
    const res = await axios.get(base_url + path + `?api_key=${import.meta.env.VITE_API_KEY}&language=ru-RUS` + query)

    return res
}
