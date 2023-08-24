let postFormEl = document.getElementById('postForm')
let loginEl = document.getElementById('login')

postFormEl.addEventListener('submit', (e)=>{
    e.preventDefault();

    fetch('https://crudcrud.com/api/34c0ff3f3dce4c0a867f94167026d549/users', 
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


