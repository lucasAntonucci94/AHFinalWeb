async function getToken(){
    return localStorage.getItem('token');
}
async function find(){
    return fetch('http://localhost:2030/api/users',{
        headers:{
            'auth-token': await getToken()
        },
    })
        .then(response => response.json())
        .then(function(data){
           return data
        })
}

async function findById(id){
    return fetch(`http://localhost:2030/api/users/${id}`,{
        headers:{
            'auth-token': await getToken()
        },
    })
    .then(response => response.json())
    .then(function(data){
        
        return data
    })
}

async function findByEmail(email){
    return fetch(`http://localhost:2030/api/users/email/${email}`,{
        headers:{
            'auth-token': await getToken()
        },
    })
    .then(response => response.json())
    .then(function(data){
        return data
    })
}

async function create(user){
    return fetch('http://localhost:2030/api/users',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token': await getToken()
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(response.status === 200){
          return response.json()
        }  
        throw new Error('Error al crear el usuario.')
      })
}

async function update(user){
    return fetch('http://localhost:2030/api/users',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token': await getToken()
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
}

async function updateProfile(data){
    return fetch('http://localhost:2030/api/profile',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token': await getToken()
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
}

async function deleteOne(id){
    return fetch(`http://localhost:2030/api/users/${id}`,{
        method:'DELETE',
        headers:{
            'auth-token': await getToken()
        },
    })
    .then(response => response.json())
}

export{
    find,
    findById,
    findByEmail,
    create,
    update,
    updateProfile,
    deleteOne
}