console.log('js connected');

const getElementById = (id) => {
    return document.getElementById(id)
}

const changePage = el => {
    window.location.href = `./${el.target.id}`
}

const navbar = getElementById('navbar')
navbar.addEventListener('click', changePage)