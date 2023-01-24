

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
        window.location.href = `${el.target.id}`
    }
}

const getSpecificProductByProductId = async () => {
    // convert the page url to an object
    const url = new URL(window.location.href);
    // get the product id
    const searchParams3 = new URLSearchParams(url.search);
    let productId = searchParams3.get('product_id');

    let response = await fetch(`/get_specific_product/${productId}`)
    let product = await response.json()
    let productContainer = getElementById('product-detail');

    let elementContainer = createElement('div');
    elementContainer.data = product._id

    let priceAndDescriptionContainer = createElement('div')
    let name = createElement('p')
    let image = createElement('img');
    let description = createElement('p');
    let price = createElement('p')
    name.innerHTML = product.name;
    image.src = product.imageUrl;
    description.textContent = product.description;
    price.textContent = '$' + product.price;

    name.setAttribute('class', 'product-name');
    name.data = product._id

    image.setAttribute('class', 'img')
    image.data = product._id

    description.data = product._id
    description.setAttribute('class', 'description')

    price.data = product._id;
    price.setAttribute('class', 'price')

    priceAndDescriptionContainer.appendChild(price);
    priceAndDescriptionContainer.appendChild(description);
    elementContainer.appendChild(name)
    elementContainer.appendChild(image);
    elementContainer.appendChild(priceAndDescriptionContainer)
    productContainer.appendChild(elementContainer)
}


// convert the page url to an object
const url = new URL(window.location.href);
// get the product id
const searchParams3 = new URLSearchParams(url.search);
let hasProductId = searchParams3.has('product_id');

if (hasProductId) {
    getSpecificProductByProductId()
}


const navbar = getElementById('navbar')
navbar.addEventListener('click', changePage)