const token = localStorage.getItem('token')

async function find(){
   
    return fetch('http://localhost:2030/races',{
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
    return fetch(`http://localhost:2030/races/${id}`,{
        headers:{
            'auth-token':token
        },
    })
        .then(response => response.json())
        .then(function(data){
          
           return data
        })
}

async function create(race){
    return fetch('http://localhost:2030/races',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':token
        },
        body: JSON.stringify(race)
    })
    .then(response => response.json())
}


async function update(race){
    debugger
    return fetch('http://localhost:2030/races',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':token
        },
        body: JSON.stringify({
            _id: race.id,
            name:race.name,
            id_specie: race.id_specie
        })
    })
    .then(response =>{
        console.log(response)
        debugger
        return response.json()
    }).catch(err=>{
        console.log(err.message)
        
    })
}


async function deleteOne(id){
    return fetch(`http://localhost:2030/races/${id}`,{
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