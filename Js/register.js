let postFormEl = document.getElementById('postForm')
let loginEl = document.getElementById('login')

postFormEl.addEventListener('submit', (e)=>{
    e.preventDefault();

    fetch('https://crudcrud.com/api/a1a78efca87c4472a8bceb9024d325f6/users', 
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


