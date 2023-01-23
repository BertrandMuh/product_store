console.log('js connected');


const getElementById = (id) => {
    return document.getElementById(id)
}

// displayPageButton.addEventListener('click', () => {
//     // change HTML files (from index to display_food.html)
//     window.location.href = "./display_food"
// })

const changePage = el => {
    window.location.href = `./${el.target.id}`

}

const navbar = getElementById('navbar')
navbar.addEventListener('click', changePage)