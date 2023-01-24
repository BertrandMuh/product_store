console.log('js connected');


const getElementById = (id) => {
    return document.getElementById(id)
}

const createElement = (tag) => {
    return document.createElement(tag)
}

// This function is used on the navbar and will get the element id which I set to be the same as the folder I am trying to display html the page from.
const changePage = el => {
    // the target element id will be used here 
    window.location.href = `./${el.target.id}`
}

const getAllProducts = async () => {
    let productContainer = getElementById('product-container');
    let response = await fetch('/get_products');
    let parseData = await response.json()
    parseData.forEach(el => {
        let elementContainer = createElement('div');
        elementContainer.id = el._id;

        let priceAndDescriptionContainer = createElement('div')
        let image = createElement('img');
        let description = createElement('p');
        let price = createElement('p')
        image.src = el.imageUrl;
        description.textContent = el.description;
        price.textContent = '$' + el.price;
        description.id = 'product-description';
        price.id = 'price';
        priceAndDescriptionContainer.appendChild(price);
        priceAndDescriptionContainer.appendChild(description);
        elementContainer.appendChild(image);
        elementContainer.appendChild(priceAndDescriptionContainer)
        productContainer.appendChild(elementContainer)
    })
}
getAllProducts()

// 
const navbar = getElementById('navbar')

// will activate here
navbar.addEventListener('click', changePage)