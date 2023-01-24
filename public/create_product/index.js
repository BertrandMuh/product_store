console.log('js connected');

const getElementById = (id) => {
    return document.getElementById(id)
}

const changePage = el => {
    let isParagraph = el.target.nodeName === 'P'
    if (isParagraph) {
        window.location.href = `./${el.target.id}`
    }
}

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
    if (name != '' && price != 0 && imageUrl != '' && inventory != 0 && category != '' && description != '') {
        let response = await fetch('/create_product', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        createButton
        console.log(response.status);
        setTimeout(() => {
            window.location.href = '../'
        }, 2000);
    }
    else {
        console.log('empty');
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