let data = []
axios.get('http://localhost:3000/api/products')
    .then(res => {
        data = res.data.products;
        render(data)
    })
    .catch(err => {
        console.log(err);
        container.innerText = 'There is a problem'
    })

let formDetails = {}

const container = document.querySelector('#container')
const search = document.querySelector('#search')
const select = document.querySelector('#select')

const render = productsArr => {
    container.innerHTML = ''
    productsArr.map(product => {
        container.appendChild(createCard(product))
    })
}

select.addEventListener('click', e => {
    const { value } = e.target //const value = e.target.value

    switch (value) {
        case 'low':
            render(data.toSorted((a, b) => a.price - b.price))
            break;
        case 'high':
            render(data.toSorted((a, b) => b.price - a.price))
            break;
        default:
            render(data)
            break;
    }
})

search.addEventListener('input', e => {
    const { value } = e.target //const value = e.target.value
    if (value == '') {
        render(data)
    } else {
        const filteredData = data.filter(product => product.name.toLowerCase().includes(value.toLowerCase()))
        render(filteredData)
    }
})

const createCard = product => {
    const card = document.createElement('div')
    card.className = 'card'
    const img = document.createElement('img')
    img.src = product.image
    card.appendChild(img)
    const title = document.createElement('div')
    title.innerText = product.name
    title.className = 'title'
    card.appendChild(title)
    const category = document.createElement('div')
    category.innerText = product.cat
    category.className = 'description'
    card.appendChild(category)
    const price = document.createElement('div')
    price.innerText = product.price
    price.className = 'price'
    card.appendChild(price)
    const button = document.createElement('button')
    button.innerText = 'Buy now'
    button.addEventListener('click', e => {
        alert('heyy')
    })
    card.appendChild(button)
    return card
}
