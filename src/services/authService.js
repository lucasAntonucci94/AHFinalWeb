async function login(email, password){
    return fetch('http://localhost:2030/api/login',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email,password})
    })
    .then(response => {
      if(response.status === 200){
        return response.json()
      }  
      throw new Error('Error de autenticación')
    })
}

async function register(user){
    return fetch('http://localhost:2030/api/register',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(    {
          email:user?.email ?? '',
          password:user?.password ?? '',
          firstName: user?.firstName ?? '',
          lastName: user?.lastName ?? '',
          isAdmin: false,
      })
    })
    .then(response => {
      if(response.status === 200){
        return response.json()
      }  
      throw new Error('Error de autenticación')
    })
}

async function resetPassword(email, password){
    const body = {
      email:email ?? '',
      password:password ?? '',
    }
    // if(email != null && !string.empty(email))
    return fetch('http://localhost:2030/api/reset-password',{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
      if(response.status === 200){
        return response.json()
      }  
      throw new Error('Error al modificar su contraseña')
    })
}

export{
    register,
    login,
    resetPassword,
}