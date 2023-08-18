let postFormEl = document.getElementById('postForm')
let loginEl = document.getElementById('login')

postFormEl.addEventListener('submit', (e)=>{
    e.preventDefault();

    fetch('https://crudcrud.com/api/d84c529ab2e940e0960378cb462f113a/users', 
        {
            method: 'POST',
            headers: { "Content-Type": "application/json"},            
            body: JSON.stringify({
                        username: `${postFormEl['username'].value}`,
                        password: `${postFormEl['password'].value}`,
                        data: new Map(),
                    })
        }
    ).then(()=>{
        window.location.replace("../html/login.html");
    })
})


