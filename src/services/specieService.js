async function getToken(){
    return localStorage.getItem('token');
}
async function find(){
   
    return fetch('http://localhost:2030/species',{
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
    return fetch(`http://localhost:2030/species/${id}`,{
        headers:{
            'auth-token': await getToken()
        },
    })
        .then(response => response.json())
        .then(function(data){
          
           return data
        })
}

async function create(specie){
    return fetch('http://localhost:2030/species',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token': await getToken()
        },
        body: JSON.stringify({
            _id:specie.id,
            name:specie.name
        })
    })
    .then(response => response.json())
}

async function update(specie){
    return fetch('http://localhost:2030/species',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token': await getToken()
        },
        body: JSON.stringify({
            _id:specie.id,
            name:specie.name
        })
    })
    .then(response => response.json())
}

async function deleteOne(id){
    return fetch(`http://localhost:2030/species/${id}`,{
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
    create,
    update,
    deleteOne
}