// get user data from crudcrud
let apiUsers = 'https://crudcrud.com/api/34c0ff3f3dce4c0a867f94167026d549/users'

let data = fetch(apiUsers)
    .then(res=>res.json())
    .then((data)=>{        
        // get data from form outside of filter
        // when form submitted compare its values to data elements
        let loginEl = document.getElementById('login')
        loginEl.addEventListener('submit', (e)=>{
            e.preventDefault()

            let currentUser = data.filter((element)=>{
                return element.username == loginEl['username'].value && element.password == loginEl['password'].value
            })

            if (currentUser[0]) {
                // set user data to local storage of browser
                const userData = {
                    username: currentUser[0].username,
                    itemdata: []
                }
                localStorage.setItem('userData', JSON.stringify(userData))

                // if username and password was found go to main page
                window.location.replace("../index.html");                               
            }
            else {                    
                alert('Please enter correct username and password');                    
            }
        })
    })



