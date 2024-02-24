import React from "react"
import Header from '../../components/common/header'
import Footer from '../../components/common/footer'

function MasterPage({children, onLogout}){
    let hasLogin = false
    let isAdmin = false
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    if(token != null) hasLogin = true
    if(user != null){
        if(user.isAdmin)
            isAdmin = true
    } 

    return(
        <>
            <Header onLogout={onLogout} hasLogin={hasLogin} isAdmin={isAdmin} />

                <div className="container-fluid bg-light" style={{padding:'0px', margin:'0px', minHeight:'90vh'}}>
                    {/* Mostrará la pagina que se pase como child al template MasterPage, en App.js */}
                    {children}
                </div>
                
            <Footer/>
        </>
    )
}

export default MasterPage