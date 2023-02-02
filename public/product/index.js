

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

const getSpecificProductByProductId = async (id = params.product_id) => {
    // convert the page url to an object
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    let productId = id;
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
    let imageContainer = createElement('div');
    let productNameAndActionContainer = createElement('div')
    let name = createElement('p');
    let threeDots = createElement('i')
    let image = createElement('img');
    let description = createElement('p');
    let price = createElement('p');
    let category = createElement('p');
    let inventory = createElement('p');
    let buyButton = createElement('button');


    name.innerHTML = product.name;
    image.src = product.imageUrl;
    description.textContent = product.description;
    price.textContent = '$' + product.price;
    category.innerHTML = product.category;
    buyButton.textContent = 'BUY'
    inventory.textContent = product.inventory > 0 ? product.inventory + ' remaining' : "OUT OF STOCK"
    if (inventory.textContent == "OUT OF STOCK") {
        inventory.style.color = "red"
    }
    productNameAndActionContainer.setAttribute('id', 'name-action');

    name.setAttribute('class', 'product-name');
    name.data = product._id;

    threeDots.setAttribute('class', 'fa fa-ellipsis-v');
    threeDots.setAttribute('id', 'action-btn')

    image.setAttribute('class', 'img')
    image.data = product._id

    imageContainer.setAttribute('id', 'img-container')

    description.data = product._id
    description.setAttribute('class', 'description')

    price.data = product._id;
    price.setAttribute('class', 'price');
    category.setAttribute('class', 'category');
    buyButton.setAttribute('id', 'buy-btn');
    inventory.setAttribute('id', 'product-inventory')

    priceAndDescriptionContainer.appendChild(price);
    getElementById('product-category').textContent = product.category
    priceAndDescriptionContainer.appendChild(description);
    productNameAndActionContainer.appendChild(name);
    productNameAndActionContainer.appendChild(threeDots)
    imageContainer.appendChild(image)

    elementContainer.appendChild(productNameAndActionContainer)
    elementContainer.appendChild(imageContainer);
    elementContainer.appendChild(priceAndDescriptionContainer)
    elementContainer.appendChild(inventory)

    productContainer.appendChild(elementContainer);
    if (product.inventory > 0) {
        productContainer.appendChild(buyButton)
    }
}

const searchProducts = async () => {
    let nameSearch = getElementById('name-search').value;
    if (nameSearch !== '') {
        let response = await fetch(`/get_specific_item_by_name/${nameSearch}`);
        let parseData = await response.json();
        console.log(parseData[0]._id);
        if (parseData.length > 0) {
            window.location.href = `../product?product_id=${parseData[0]._id}`
        }
    }
}
let searchButton = getElementById('search-btn');
searchButton.addEventListener('click', searchProducts)

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
    getElementById('category-container').classList.replace('show2', 'hide')
    getSpecificProductByProductId();

    console.log('yes');
}
else {
    getElementById('container').setAttribute('class', 'hidden');

    let categoryContainer = getElementById('category-container');
    let containerChildren = Array.from(categoryContainer.children);
    containerChildren.forEach(div => {
        const getProductByCategory = async () => {
            let response = await fetch(`/get_product_by_category/?category=${div.id}`)
            let parseData = await response.json()
            for (let i = 0; i < parseData.length; i++) {
                if (i == 4) {
                    break
                }
                if (parseData[i].category == div.id) {
                    let imgDiv = createElement('div');
                    let img = createElement('img');
                    img.src = parseData[i].imageUrl
                    imgDiv.appendChild(img)
                    div.appendChild(imgDiv)

                }

            }

        }
        getProductByCategory()
        console.log(div.id);
    })
}

if (params.alert == 'yes') {
    let productContainer = getElementById('product-detail');
    getElementById('body').removeChild(getElementById('container'))
    while (productContainer.firstChild) {
        productContainer.removeChild(productContainer.firstChild)
    }
    let alert = createElement('p');
    alert.setAttribute('class', 'delete alert');
    alert.textContent = 'The product was deleted successfully!'

    getElementById('body').appendChild(alert)
    setTimeout(() => {
        window.location.href = '../'
    }, 2000);
}

const navbar = getElementById('navbar')
navbar.addEventListener('click', changePage)

const displayEditContainer = () => {
    let editContainer = getElementById('edit-container')
    editContainer.classList.remove('hidden');
    let actionContainer = getElementById('action');
    actionContainer.classList.replace('show', 'hidden');
    getElementById('delete-prompt').classList.replace('show', 'hidden')
}

const buyOneProduct = async () => {
    let response = await fetch(`/get_specific_product/${params.product_id}`)
    let parseData = await response.json()
    let newInventory
    if (Object.keys(parseData).length > 0) {
        newInventory = parseData.inventory - 1;
        getElementById('product-inventory').textContent = newInventory + ' remaining'
    }
    fetch(`/update_product/?product_id=${params.product_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inventory: newInventory })
    })
    window.location.href = '../'
    // let dataParse = await response.json()

}

setInterval(() => {
    let editAndDeleteContainer = getElementById('action')
    let actionButton = getElementById('action-btn');
    //container with edit and delete button
    let actionContainer = getElementById('action')
    if (actionContainer.classList.contains('hidden') === true && actionButton !== null) {
        actionButton.addEventListener('click', () => {
            // close the container with the edit and delete button
            editAndDeleteContainer.classList.replace('hidden', 'show');
            getElementById('edit-container').classList.add('hidden')

            if (editAndDeleteContainer.classList.contains('show') || !getElementById('edit-container').classList.contains('hidden')) {
                getElementById('buy-btn').setAttribute('disabled', '')
            }
        })
    }

    // buy the product
    if (getElementById('buy-btn')) {
        getElementById('buy-btn').addEventListener('click', buyOneProduct)
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

// close the container with the edit and delete button
getElementById('action-close').addEventListener('click', () => {
    getElementById('action').classList.replace('show', 'hidden');
    getElementById('delete-prompt').classList.replace('show', 'hidden')
    getElementById('buy-btn').removeAttribute('disabled', '')
});

getElementById('edit-btn').addEventListener('click', displayEditContainer)

//display the message to confirm deletion
getElementById('delete-btn').addEventListener('click', () => {
    getElementById('delete-prompt').classList.replace('hidden', 'show');

});

// hide the message to cinfirm deletion
getElementById('n').addEventListener('click', () => {
    getElementById('delete-prompt').classList.replace('show', 'hidden');
})

//delete product after confirmation and hide the confirmation container
getElementById('y').addEventListener('click', deleteProduct);
getElementById('update-btn').addEventListener('click',
    updateProduct);


//close the edit container
getElementById('close-btn').addEventListener('click', () => {
    getElementById('update-form').reset()
    getElementById('edit-container').classList.add('hidden')
    getElementById('buy-btn').removeAttribute('disabled', '')
})

//Update product
getElementById('update-btn').addEventListener('click', updateProduct);
