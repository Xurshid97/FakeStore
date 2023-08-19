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
    let allItemsOfCart = localStorageData.itemdata

    let apiUrlFakeStore = 'https://fakestoreapi.com/products'
    fetch(apiUrlFakeStore)
        .then(res=>res.json())
        .then((data)=>{      
            let item_card = document.querySelector('.items_page')      
            data.filter((element)=>{
                allItemsOfCart.forEach(e => {
                    if (element.id == e[0]) {
                        let order_infoEl = document.createElement('item_card')
                        order_infoEl.className = 'item_card'
                        order_infoEl.innerHTML = `
                                                    <div class="item_img">
                                                        <img src="${element.image}" alt="">
                                                    </div>
                                                    <div class="item_details">
                                                        ${element.title}
                                                    </div>
                                                    <div class="item_counter" data_id="${e[0]}">
                                                        <button class = 'subtr' data_id="${e[0]}">-</button>
                                                        <h6 class = 'presentNumOfEls'>${e[1]}</h6>
                                                        <button class = 'add' data_id="${e[0]}">+</button>
                                                        <button class = 'remove'>Remove</button>
                                                    </div>
                                                `
                        item_card.appendChild(order_infoEl)
                    }                    
                });
            })


            // let add = document.querySelectorAll('.add')
            let item_counterEls = document.querySelectorAll('.item_counter')
            
            item_counterEls.forEach((e)=>{
                let presentNumOfEls = e.querySelector('.presentNumOfEls')
                let addBtn = e.querySelector('.add')
                addBtn.addEventListener('click', ()=>{
                    allItemsOfCart.filter((idEl)=>{
                        if (idEl[0] == e.getAttribute('data_id')) {
                            idEl[1]++
                            presentNumOfEls.innerHTML = `${idEl[1]}`

                            let updateStorage = {
                                username: localStorageData['username'],
                                itemdata: allItemsOfCart
                            }

                            localStorage.setItem('userData', JSON.stringify(updateStorage))
                            location.reload()
                        }
                    })                    
                })
                
                let subtrBtn = e.querySelector('.subtr')
                subtrBtn.addEventListener('click', ()=>{
                    allItemsOfCart.filter((idEl)=>{
                        if (idEl[0] == e.getAttribute('data_id')) {
                            idEl[1]--
                            presentNumOfEls.innerHTML = `${idEl[1]}`

                            // if item is left 0 it will be removed
                            if (idEl[1] == 0) {
                                let indexOfRemover = allItemsOfCart.indexOf(idEl)
                                allItemsOfCart.splice(indexOfRemover, 1)

                                window.location.reload()                           
                            }
                            
                            let updateStorage = {
                                username: localStorageData['username'],
                                itemdata: allItemsOfCart
                            }
                            localStorage.setItem('userData', JSON.stringify(updateStorage))

                            location.reload()
                        }
                    })                    
                })

                let removeBtn = e.querySelector('.remove')
                removeBtn.addEventListener('click', ()=>{
                    allItemsOfCart.filter((idEl)=>{
                        if (idEl[0] == e.getAttribute('data_id')) {
                            let indexOfRemover = allItemsOfCart.indexOf(idEl)
                            allItemsOfCart.splice(indexOfRemover, 1)
                            
                            let updateStorage = {
                                username: localStorageData['username'],
                                itemdata: allItemsOfCart
                            }
                            localStorage.setItem('userData', JSON.stringify(updateStorage))
                            location.reload()
                        }
                    })                    
                })                
            })  
            

            // total number of items in cart
            let items_numberEl = document.querySelector('.items_number')
            let counter = 0
            allItemsOfCart.filter((item)=>{
                counter = counter + item[1]
            })            
            items_numberEl.innerHTML = `Soni umumiy ${counter} ta `

            // calculating and rendering total price
            let total_costEl = document.querySelector('.total_cost')
            let totalPrice = 0
            data.forEach((itemPrice)=>{
                allItemsOfCart.forEach((itemCart)=>{
                    if(itemCart[0] == itemPrice.id){
                        totalPrice = totalPrice + Math.round(itemPrice.price * itemCart[1])
                    }
                })                
            })

            total_costEl.innerHTML = `Umumiy narx ${totalPrice}$`
        })
})

