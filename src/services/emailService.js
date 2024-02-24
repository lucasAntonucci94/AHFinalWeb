// const token = localStorage.getItem('token')
async function sendMail(){
    return fetch('http://localhost:2030/api/users',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':token
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

export{
    sendMail,
}