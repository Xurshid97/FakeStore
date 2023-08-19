let postFormEl = document.getElementById('postForm')
let loginEl = document.getElementById('login')

postFormEl.addEventListener('submit', (e)=>{
    e.preventDefault();

    fetch('https://crudcrud.com/api/8f6d8edb8963483a8ae4595f2560b30f/users', 
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


