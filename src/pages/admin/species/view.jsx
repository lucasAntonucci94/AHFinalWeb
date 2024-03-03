import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as SpecieService from '../../../services/specieService'
import { Link } from "react-router-dom"

function View({}){
  const { id } = useParams()
  const [specie, setSpecie]  = useState({})

  useEffect(function(){
    SpecieService.findById(id)
    .then(data => setSpecie(data))
  }, [])
 
    return (
        <main className="container-fluid" style={{padding:'0px'}}>
            <div className="row  d-flex justify-content-center" style={{padding:'0px',margin:'0px',minHeight: '90vh'}}>
                <div className="col-12 bg-dark pb-4 d-flex justify-content-center align-items-center"   style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('../../images/orange-cat.jpg')",height: '250px'}}>
                    <div className="row w-100">
                        <div className="col-12 px-5">
                                <Link className="btn btn-warning text-center" to="/admin/species">
                                <b>
                                    VOLVER
                                </b>
                                </Link>
                        </div>
                        <div className="col-12 text-center">
                            <h1 className=" text-white">{specie?.name}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <ul >
                        <li style={{fontSize:'25px', listStyleType:'none'}}>
                            <p  > Nombre: <span>{specie?.name}</span></p>
                        </li>
                    </ul>
                </div>
                <div className="col-6" style={{margin:'0px',padding:'0px'}}>
                { specie?.name?.toLowerCase() !== 'gato' ? 
                    <img 
                    src="../../images/perrito_crazy.jpg"
                    alt=""
                    className=".img-fluid"
                    style={{width: '50%'}}
                    />
                    :
                    <img 
                    src="../../images/gato.jpg"
                    alt=""
                    className=".img-fluid"
                    style={{width: '70%'}}
                    />
                }
                </div>
            </div>
        </main>
    )
}

export default View