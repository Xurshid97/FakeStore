// render cart on page
let cartItemsEl = document.querySelector('.cartItems')

let storedUserData = localStorage.getItem('userData')
let userDataLocal = JSON.parse(storedUserData) 



let api = 'https://fakestoreapi.com/products'
fetch(api)
    .then((res)=>{return res.json()})
    .then((data) => {
        data.map((e)=>{
            let productsEl = document.getElementById('products')
            let product_cardEl = document.createElement('div')
            product_cardEl.className = 'product_card'
            
            // rendering cards with function
            let cardCallFunction = (m)=>{
                product_cardEl.innerHTML = `
                                            <div class="product_img">
                                                <img src="${m.image}" alt="">
                                            </div>
                                            <div class="title">
                                                ${m.title}
                                            </div>
                                            <div class="price">
                                                ${m.price} $$$
                                            </div>
                                    `
                product_cardEl.className += ` - ${m.category}`
                productsEl.appendChild(product_cardEl)
            }
            // by default all cards will be visible
            cardCallFunction(e)

            // get user data from local storage
            let storedUserData = localStorage.getItem('userData')
            let userDataLocal = JSON.parse(storedUserData)
            if(userDataLocal) {
                // render username and cart items on page
                let userInfoEl = document.getElementById('userInfo')
                userInfoEl.innerHTML = `Hi, ${userDataLocal.username}`

                let cartItemsEl = document.querySelector('.cartItems')
                cartItemsEl.innerHTML = `${Object.keys(userDataLocal['itemdata']).length}`
                cartItemsEl.style.display = 'flex'

                // hide login and register links if user is already logged in
                let loginRemove = document.querySelector('.login')
                loginRemove.style.display = 'none'

                let registerRemove = document.querySelector('.register')
                registerRemove.style.display = 'none'

                // make visible buy button to all cards
                let buyBtn = document.createElement('div')
                buyBtn.textContent = `Buy`
                buyBtn.className = 'buyBtn'
                buyBtn.setAttribute('data_id', e.id)
                product_cardEl.appendChild(buyBtn)
                
            }
        })
        return fetch(api)
    })
    .then(()=>{
        // word count on title
        let titleEl = document.querySelectorAll('.title')
        titleEl.forEach((title)=>{
            let newStr = ''
            for (let index = 0; index < title.textContent.trim().length; index++) {
                if (index < 25) {
                    newStr += title.textContent.trim()[index];
                }                    
            }
            title.textContent = newStr + '...'
        })

        const newListCart = userDataLocal.itemdata
        let buyBtns = document.querySelectorAll('.buyBtn')
        buyBtns.forEach((buyBtn)=>{
            buyBtn.addEventListener('click', ()=>{
                if (newListCart[`${(buyBtn.getAttribute('data_id'))}`]) {
                    alert('Item already in cart')
                }
                else {
                    newListCart[`${(buyBtn.getAttribute('data_id'))}`] = 1
    
                    userDataLocal.itemdata = newListCart
                    localStorage.setItem('userData', JSON.stringify(userDataLocal))
                    cartItemsEl.innerHTML = `${Object.keys(userDataLocal['itemdata']).length}`
                    cartItemsEl.style.display = 'flex'
                    
                }
            })
        })
    })
    .catch((err)=>{
        console.log(err);
    })

document.addEventListener('DOMContentLoaded', ()=>{
    let allCardsEl = document.getElementsByClassName('product_card')

    // general function to make cards visible or not by category
    let filterFunction = (classofParent)=>{
        for (let index = 0; index < allCardsEl.length; index++) {
            const element = allCardsEl[index];
            let classArr = element.classList.value.split('-')

            if (classofParent.value === classArr[1].trimStart()) {
                element.style.display = 'flex'
            }
            else if(classofParent.value == 'All') {
                element.style.display = 'flex'
            }
            else{
                element.style.display = 'none'
            }
        }
    }

    let allEl = document.getElementById('all')
    allEl.addEventListener('click', ()=>{
        filterFunction(allEl)
    })

    let electronicsEl = document.getElementById('electronics')
    electronicsEl.addEventListener('click', ()=>{
        filterFunction(electronicsEl)
    })

    let womenEl = document.getElementById("women's clothing")
    womenEl.addEventListener('click', ()=>{
        filterFunction(womenEl)
    })

    let jeweleryEl = document.getElementById("jewelery")
    jeweleryEl.addEventListener('click', ()=>{
        filterFunction(jeweleryEl)
    })

    let menEl = document.getElementById("men's clothing")
    menEl.addEventListener('click', ()=>{
        filterFunction(menEl)
    })
    
})


