// console.log('js connected');

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

const createProduct = async () => {
    let name = getElementById('name').value
    let price = +getElementById('price').value;
    let imageUrl = getElementById('img-url').value;
    let inventory = +getElementById('inventory').value;
    let category = getElementById('category').value;
    let description = getElementById('description').value.trim();

    let product = {
        name,
        price,
        imageUrl,
        inventory,
        category,
        description
    }
    if (name != '' && price != 0 && imageUrl != '' && inventory != 0 && category != '') {
        let response = await fetch('/create_product', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        if (response.status == 200) {
            let createContainer = getElementById('main');
            while (createContainer.firstChild) {
                createContainer.removeChild(createContainer.firstChild)
            }
            let alert = createElement('p');
            alert.setAttribute('class', 'create alert');
            alert.textContent = 'The product was created successfully!'

            createContainer.appendChild(alert)
            setTimeout(() => {
                window.location.href = '../'
            }, 2000);
        }
    }
}


const form = getElementById('create-form');
form.addEventListener('submit', (event) => {
    event.preventDefault()
})

const navbar = getElementById('navbar')
navbar.addEventListener('click', changePage);

const createButton = getElementById('create-btn')
createButton.addEventListener('click',
    createProduct)