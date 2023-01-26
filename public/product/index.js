

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

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});


if (window.location.href == 'http://localhost:5000/product/') {

}

const getSpecificProductByProductId = async () => {
    // convert the page url to an object

    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"

    let productId = params.product_id;

    // const url = new URL(window.location.href);
    // // get the product id
    // const searchParams3 = new URLSearchParams(url.search);
    // let productId = searchParams3.get('product_id');

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
    let deleteButton = createElement('button')

    name.innerHTML = product.name;
    image.src = product.imageUrl;
    description.textContent = product.description;
    price.textContent = '$' + product.price;
    deleteButton.textContent = 'DELETE'

    name.setAttribute('class', 'product-name');
    name.data = product._id

    image.setAttribute('class', 'img')
    image.data = product._id

    description.data = product._id
    description.setAttribute('class', 'description')

    price.data = product._id;
    price.setAttribute('class', 'price')

    deleteButton.data = product._id
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('id', 'delete-btn'),

        priceAndDescriptionContainer.appendChild(price);
    priceAndDescriptionContainer.appendChild(description);
    elementContainer.appendChild(name)
    elementContainer.appendChild(image);
    elementContainer.appendChild(priceAndDescriptionContainer)
    elementContainer.appendChild(deleteButton)
    productContainer.appendChild(elementContainer)
}

const deleteProduct = async () => {
    let productId = params.product_id;
    let response = await fetch(`/delete_product/?product_id=${productId}`, {
        method: "DELETE"
    })
    let parseData = await response.json()
    if (parseData.deletedCount == 1) {
        window.location.href = '../product/?alert=yes';
    }

}
let deleteButton
setInterval(() => {
    deleteButton = getElementById('delete-btn');
    if (deleteButton !== null) {
        deleteButton.addEventListener('click', deleteProduct);
    }
}, 1000);



// convert the page url to an object
const url = new URL(window.location.href);
// get the product id
const searchParams3 = new URLSearchParams(url.search);
let hasProductId = searchParams3.has('product_id');

if (hasProductId) {
    getSpecificProductByProductId()
}

if (params.alert == 'yes') {
    let productContainer = getElementById('product-detail');
    while (productContainer.firstChild) {
        productContainer.remove(productContainer.firstChild)
    }
    let alert = createElement('p');
    alert.setAttribute('id', 'alert');
    alert.textContent = 'The product was deleted successfully!'

    productContainer.appendChild(alert)
    setTimeout(() => {
        window.location.href = '../'
    }, 2000);
}


const navbar = getElementById('navbar')
navbar.addEventListener('click', changePage)