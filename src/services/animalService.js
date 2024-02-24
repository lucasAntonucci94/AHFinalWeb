const token = localStorage.getItem('token')
async function find(){
    return fetch('http://localhost:2030/animals',{
        headers:{
            'auth-token':token
        },
    })
        .then(response => response.json())
        .then(function(data){
           return data
        })
}
async function findById(id){
    return fetch(`http://localhost:2030/animals/${id}`,{
        headers:{
            'auth-token':token
        },
    })
    .then(response => response.json())
    .then(function(data){
        
        return data
    })
}

async function create(animal){
    return fetch('http://localhost:2030/animals',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':token
        },
        body: JSON.stringify(animal)
    })
    .then(response => response.json())
}

async function update(animal){
    return fetch('http://localhost:2030/animals',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':token
        },
        body: JSON.stringify(animal)
    })
    .then(response =>{
        console.log(response)
        return response.json()
    }).catch(err=>{
        console.log(err.message)
        
    })
}

async function deleteOne(id){
    return fetch(`http://localhost:2030/animals/${id}`,{
        method:'DELETE',
        headers:{
            'auth-token':token
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