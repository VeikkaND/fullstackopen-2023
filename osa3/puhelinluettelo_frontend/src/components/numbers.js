import axios from "axios";

const url = "/api/persons"

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = (numberObject) => {
    const request = axios.post(url, numberObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const deleteUrl = `${url}/${id}`
    const request = axios.delete(deleteUrl, id)
    return request.then(response => response.data)
}

const update = (updatedNumberObject, id) => {
    const updateUrl = `${url}/${id}`
    const request = axios.put(updateUrl, updatedNumberObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    remove,
    update
}