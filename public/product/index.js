

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

    let priceAndDescriptionContainer = createElement('div');
    let buttonContainer = createElement('div');
    let imageContainer = createElement('div');
    let name = createElement('p');
    let image = createElement('img');
    let description = createElement('p');
    let price = createElement('p');
    let category = createElement('p');
    let deleteButton = createElement('button');
    let editButton = createElement('button');

    name.innerHTML = product.name;
    image.src = product.imageUrl;
    description.textContent = product.description;
    price.textContent = '$' + product.price;
    category.innerHTML = product.category;
    deleteButton.textContent = 'DELETE'
    editButton.textContent = 'EDIT'

    name.setAttribute('class', 'product-name');
    name.data = product._id

    image.setAttribute('class', 'img')
    image.data = product._id

    imageContainer.setAttribute('id', 'img-container')

    description.data = product._id
    description.setAttribute('class', 'description')

    price.data = product._id;
    price.setAttribute('class', 'price');
    category.setAttribute('class', 'category')

    deleteButton.data = product._id
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('id', 'delete-btn');

    editButton.setAttribute('type', 'button');
    editButton.setAttribute('id', 'edit-btn');

    buttonContainer.setAttribute('class', 'btn-container')


    priceAndDescriptionContainer.appendChild(price);
    priceAndDescriptionContainer.appendChild(category)
    priceAndDescriptionContainer.appendChild(description);

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    imageContainer.appendChild(image)

    elementContainer.appendChild(name)
    elementContainer.appendChild(imageContainer);
    elementContainer.appendChild(priceAndDescriptionContainer)
    elementContainer.appendChild(buttonContainer);

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
        productContainer.removeChild(productContainer.firstChild)
    }
    let alert = createElement('p');
    alert.setAttribute('class', 'delete alert');
    alert.textContent = 'The product was deleted successfully!'

    productContainer.appendChild(alert)
    setTimeout(() => {
        window.location.href = '../'
    }, 2000);
}

const navbar = getElementById('navbar')
navbar.addEventListener('click', changePage)

const editButtonClicked = () => {
    let editContainer = getElementById('edit-container')
    editContainer.classList.remove('hidden');
}


setInterval(() => {
    let deleteButton = getElementById('delete-btn');
    let editButton = getElementById('edit-btn');
    let closeButton = getElementById('close-btn')
    let editContainer = getElementById('edit-container')
    if (deleteButton !== null) {
        deleteButton.addEventListener('click', deleteProduct);
    }
    if (editButton !== null) {
        editButton.addEventListener('click', editButtonClicked)
    }
    if (editContainer.classList.contains('hidden') === false) {
        closeButton.addEventListener('click', () => {
            getElementById('update-form').reset()
            editContainer.classList.add('hidden')
        })
    }
}, 1000);



const updateProduct = async () => {
    let body = {
        name: getElementById('name').value,
        imageUrl: getElementById('img-url').value,
        price: getElementById('price').value,
        inventory: getElementById('inventory').value,
        category: getElementById('category').value,
        description: getElementById('description').value,
    }

    // Delete empty keys
    Object.keys(body).forEach(key => {
        if (body[key] === '') {
            delete body[key];
        }
    });
    if (Object.keys(body).length > 0) {
        let response = await fetch(`/update_product/?product_id=${params.product_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if (response.status == 200) {

            window.location.href = window.location.search
        }
    }
}

getElementById('update-btn').addEventListener('click',
    updateProduct)