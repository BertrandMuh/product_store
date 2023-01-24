

console.log('js connected');


const getElementById = (id) => {
    return document.getElementById(id)
}

const createElement = (tag) => {
    return document.createElement(tag)
}

const changePage = el => {
    let isParagraph = el.target.nodeName === 'P'
    if (isParagraph) {
        // Go to this page
        window.location.href = `${el.target.id}`
    }
}

const getAllProducts = async () => {
    let productContainer = getElementById('product-container');
    let response = await fetch('/get_products');
    let parseData = await response.json()
    parseData.forEach(el => {
        let elementContainer = createElement('div');
        elementContainer.data = el._id

        let priceAndDescriptionContainer = createElement('div')
        let name = createElement('p')
        let image = createElement('img');
        let description = createElement('p');
        let price = createElement('p')

        name.innerHTML = el.name;
        image.src = el.imageUrl;
        description.textContent = el.description;
        price.textContent = '$' + el.price;

        name.setAttribute('class', 'product-name');
        name.data = el._id

        image.setAttribute('class', 'img')
        image.data = el._id

        description.data = el._id
        description.setAttribute('class', 'description')

        price.data = el._id;
        price.setAttribute('class', 'price')

        priceAndDescriptionContainer.appendChild(price);
        priceAndDescriptionContainer.appendChild(description);
        elementContainer.appendChild(name)
        elementContainer.appendChild(image);
        elementContainer.appendChild(priceAndDescriptionContainer)
        productContainer.appendChild(elementContainer)
    })
}
getAllProducts()

const getProductDetail = async (el) => {
    let isElementConatiner = el.target.data !== undefined;
    if (isElementConatiner) {
        // go to the page with the product id attached to the url
        window.location.href = `./product?product_id=${el.target.data}`
    }
}

let productContainer = getElementById('product-container');
productContainer.addEventListener('click', getProductDetail)

// 
const navbar = getElementById('navbar')

// will activate here
navbar.addEventListener('click', changePage)