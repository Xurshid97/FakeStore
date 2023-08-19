// get user data from crudcrud
let apiUsers = 'https://crudcrud.com/api/8f6d8edb8963483a8ae4595f2560b30f/users'

let data = fetch(apiUsers)
    .then(res=>res.json())
    .then((data)=>{
        
        data.filter(element => {
            let loginEl = document.getElementById('login')
            loginEl.addEventListener('submit', (e)=>{
                e.preventDefault();

                if (!element.username == loginEl['username'].value) {
                    alert('Please enter correct username and password');                              
                }
                else {                    
                    // set user data to local storage of browser
                    
                    const userData = {
                        username: loginEl['username'].value,
                        itemdata: []
                    }

                    localStorage.setItem('userData', JSON.stringify(userData))

                    // if username and password was found go to main page
                    window.location.replace("../index.html");  
                    
                }
            })
        });
    })



