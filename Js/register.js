let postFormEl = document.getElementById('postForm')
let loginEl = document.getElementById('login')

postFormEl.addEventListener('submit', (e)=>{
    e.preventDefault();

    fetch('https://crudcrud.com/api/abcd7b747a6f42ac93ccbc2cc6c0b747/users', 
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
        window.location.replace("../login.html");
    })
})


