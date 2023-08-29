document.addEventListener('DOMContentLoaded', ()=>{
    /* 
    1. get info about user and array of cart items from local storage 
    2. render it on cart page with every bought item
        a: receive user order id's from local storage and render them in page
    3. add + and - buttons to current element update local storge
        a: create map to every element id as key, and its number as value
        b: update value every time + button pressed, otherwise - pressed
        c: if remove button pressed remove current element from map and array
        d: update cart_calculator where total cost and number of items will be shown
    */
    let localStorageData = JSON.parse(localStorage.getItem('userData')) 
    let allItemsOfCartObject = localStorageData.itemdata

    let apiUrlFakeStore = 'https://fakestoreapi.com/products'
    fetch(apiUrlFakeStore)
        .then(res=>res.json())
        .then((data)=>{      
            let allItemsOfCart = Object.keys(allItemsOfCartObject)
            renderCards(data, allItemsOfCart, allItemsOfCartObject)

            // total number of items in cart and updating them by function
            let items_numberEl = document.querySelector('.items_number')
            let counter = 0
            allItemsOfCart.filter((item)=>{
                counter = counter + allItemsOfCartObject[`${item}`]
            })            
            items_numberEl.innerHTML = `Soni umumiy ${counter} ta `

            function itemNums(className, remove) {
                if(className === 'add'){
                    counter++
                }else if(className === 'subtr'){
                    counter--
                }else {
                    counter = counter - remove
                }                
                items_numberEl.innerHTML = `Soni umumiy ${counter} ta `
            }

            cartUpdate(data, allItemsOfCart, allItemsOfCartObject, localStorageData, itemNums)            
            totalCost(data, allItemsOfCart, allItemsOfCartObject)            
            placeOrder(allItemsOfCart, data)                       
        })
})

/* Get all data from api, compare it with local storage data if equal render it on page */
function renderCards(data, allItemsOfCart, allItemsOfCartObject){
    let item_card = document.querySelector('.items_page') 
    data.filter((element)=>{
        allItemsOfCart.forEach(e => {
            if (element.id == e) {
                let order_infoEl = document.createElement('item_card')
                order_infoEl.className = 'item_card'
                order_infoEl.innerHTML = `
                                            <div class="item_img">
                                                <img src="${element.image}" alt="">
                                            </div>
                                            <div class="item_details">
                                                ${element.title}
                                            </div>
                                            <div class="item_counter" data_id="${e}">
                                                <button class = 'subtr' data_id="${e}">-</button>
                                                <h6 class = 'presentNumOfEls'>${allItemsOfCartObject[e]}</h6>
                                                <button class = 'add' data_id="${e}">+</button>
                                                <button class = 'remove'>Remove</button>
                                            </div>
                                        `
                order_infoEl.setAttribute('data_id', `${element.id}`)
                item_card.appendChild(order_infoEl)
            }                    
        });
    })
}

/*calculating and rendering total price, each time function called, data from local storage will be received */ 
function totalCost(data) {
    let localStorageData = JSON.parse(localStorage.getItem('userData')) 
    let allItemsOfCartObject = localStorageData.itemdata
    let allItemsOfCart = Object.keys(allItemsOfCartObject)

    let total_costEl = document.querySelector('.total_cost')
    let totalPrice = 0
    data.forEach((itemPrice)=>{
        allItemsOfCart.forEach((itemCart)=>{
            if(itemCart == itemPrice.id){
                totalPrice = totalPrice + Math.round(itemPrice.price * allItemsOfCartObject[`${itemPrice.id}`])
            }
        })                
    })
    total_costEl.innerHTML = `Umumiy narx ${totalPrice}$`
}

/* Adding, subtracting and removing items from a cart page */
function cartUpdate(data, allItemsOfCart, allItemsOfCartObject, localStorageData, itemNums){
    let item_counterEls = document.querySelectorAll('.item_counter') 
    item_counterEls.forEach((e)=>{
        let presentNumOfEls = e.querySelector('.presentNumOfEls')
        let addBtn = e.querySelector('.add')
        addBtn.addEventListener('click', ()=>{
            if (allItemsOfCart.includes(e.getAttribute('data_id'))) {
                let idEl = e.getAttribute('data_id')
                allItemsOfCartObject[`${idEl}`]++
                localStorageData.itemdata = allItemsOfCartObject
                localStorage.setItem('userData', JSON.stringify(localStorageData))
                presentNumOfEls.innerHTML = `${allItemsOfCartObject[`${idEl}`]}`
                totalCost(data)
                itemNums(addBtn.className)
            }                    
        })
        
        let subtrBtn = e.querySelector('.subtr')
        subtrBtn.addEventListener('click', ()=>{
            if (allItemsOfCart.includes(e.getAttribute('data_id'))) {
                let idEl = e.getAttribute('data_id')
                allItemsOfCartObject[`${idEl}`]--

                let itemsOfCard = document.querySelectorAll('.item_card')
                if (allItemsOfCartObject[`${idEl}`] === 0) {                                
                    itemsOfCard.forEach((cardItem)=>{
                        if (cardItem.getAttribute('data_id') === idEl) {
                            delete allItemsOfCartObject[`${idEl}`]
                            cardItem.style.display = 'none'
                            return allItemsOfCartObject
                        }                                   
                    })
                }

                localStorageData.itemdata = allItemsOfCartObject
                localStorage.setItem('userData', JSON.stringify(localStorageData))
                presentNumOfEls.innerHTML = `${allItemsOfCartObject[`${idEl}`]}`
                totalCost(data)
                itemNums(subtrBtn.className)
            }
        })

        let removeBtn = e.querySelector('.remove')
        removeBtn.addEventListener('click', ()=>{
            if (allItemsOfCart.includes(e.getAttribute('data_id'))) {
                let idEl = e.getAttribute('data_id')
                let itemsOfCard = document.querySelectorAll('.item_card')                             
                    itemsOfCard.forEach((cardItem)=>{
                        if (cardItem.getAttribute('data_id') === idEl) {
                            itemNums(removeBtn.className, allItemsOfCartObject[`${idEl}`])
                            delete allItemsOfCartObject[`${idEl}`]
                            cardItem.style.display = 'none'
                        }                                   
                    })
                    localStorageData.itemdata = allItemsOfCartObject
                    localStorage.setItem('userData', JSON.stringify(localStorageData))

                    totalCost(data)
            }                   
        })
    })
}

// placing order
function placeOrder(allItemsOfCart, data){    
    let placeEl = document.getElementById('place_order')            
    placeEl.addEventListener('click', ()=>{
        let boughtEl = []
        data.filter((item)=>{
            if(allItemsOfCart.includes(String(item.id))) {
                boughtEl.push(` ${item.title}`)
            }
        })
        alert(`You have bought the ${boughtEl}`)
    })
} 