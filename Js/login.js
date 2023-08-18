// get user data from crudcrud
let apiUsers = 'https://crudcrud.com/api/d84c529ab2e940e0960378cb462f113a/users'

let data = fetch(apiUsers)
    .then(res=>res.json())
    .then((data)=>{
        
        data.filter(element => {
            let loginEl = document.getElementById('login')
            loginEl.addEventListener('submit', (e)=>{
                e.preventDefault();

                if (element.username === loginEl['username'].value && element.password === loginEl['password'].value) {
                    
                    // set user data to local storage of browser
                
                    const userData = {
                        username: element.username,
                        itemdata: []
                    }

                    localStorage.setItem('userData', JSON.stringify(userData))

                    // if username and password was found go to main page
                    window.location.replace("../html/index.html");                                   
                }
                else {
                    alert('Please enter correct username and password');
                }
            })
        });
    })



