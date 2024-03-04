import React from "react"
// animals imports
// import AnimalList from '../../components/animals/animalList'

function View({}){
    return (
        <div  className="container-fluid bg-light" style={{minHeight: '90vh',margin:'0px',padding: '0px'}}>
            <div className="row"  style={{margin:'0px',padding:'0px'}}>
                <div className="col-12 d-flex justify-content-center align-items-center" style={{backgroundColor: '#f0f0f0'}}>
                    <h1 className="text-center d-none"> INICIO VOIR </h1>
                    <img
                        src="images/voirlogo.png"
                        alt=""
                        style={{height: '250px'}}
                    />
                </div>
                <div className="col-12 py-5" >
                    <div className="row align-items-center justify-content-center" style={{margin:'0px',padding:'0px'}}>
                        <div className="col-4 text-center">
                            <h2 className="py-5">
                                BIENVENIDO A VOIR
                            </h2>
                            <p  style={{maxWidth:'450px', margin:'0 auto', fontWeight:'bold'}}>
                                Nuestra web es ideal para refugios, organizaciones y cualquier rescatista o particular que quiera llevar un registro organizado de todos sus animalitos.
                            </p>
                            <br />
                            <p  style={{maxWidth:'450px', margin:'0 auto', fontWeight:'bold'}}>
                            Unite y conta con la posibilidad de registrar tus animales junto con todos sus datos necesarios.
                            </p>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <img
                                    src="images/P74AD91.png"
                                    alt=""
                                    style={{maxHeight:'450px'}}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View