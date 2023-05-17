const GATEWAY = 'http://localhost:3000'
const API_URL = `${GATEWAY}/posts`;

export function login(dtoIn) {
    return fetch(`${GATEWAY}/login`, {
        method: 'POST',
        body: JSON.stringify(dtoIn),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json());
}

export function register(dtoIn) {
    return fetch(`${GATEWAY}/registration`, {
        method: 'POST',
        body: JSON.stringify(dtoIn),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json());
}

export function getAllPosts(dtoIn) {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(dtoIn),
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.json());
}

export function getPost(id) {
    return fetch(`${API_URL}/${id}`, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json());
}

export function createPost(post) {
    return fetch(`${API_URL}/create`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.json());
}

export function updatePost(id, post) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.json());
}

export function deletePost(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.json());
}
