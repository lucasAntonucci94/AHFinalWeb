import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as AnimalService from '../../../services/animalService'
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap';

// animals imports
// import AnimalList from '../../components/animals/animalList'


function View({}){
  const { id } = useParams()
  const [animal, setAnimal]  = useState({})

  useEffect(function(){
    AnimalService.findById(id)
    .then(data => setAnimal(data))
  }, [])
 
    return (
        <main className="container-fluid" style={{padding:'0px'}}>
            
        <div className="row  d-flex justify-content-center" style={{padding:'0px',margin:'0px',height: '90vh'}}>
        

            <div className="col-12 bg-dark pb-4 d-flex justify-content-center align-items-center"   style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('../../images/green-cat.jpg')",height: '250px'}}>
                
                
                <div className="row w-100">


                <div className="col-12 px-5">
                        <Link className="btn btn-warning text-center" to="/admin/animals">
                        <b>
                            VOLVER
                        </b>
                        </Link>
                </div>


                <div className="col-12 text-center">
                    <h1 className=" text-white">{animal?.name}</h1>
                </div>



                </div>

            

            </div>
           <div className="col-6 d-flex justify-content-center align-items-center">
                <ul >
                    <li style={{fontSize:'25px', listStyleType:'none'}}>
                        <p  > Nombre: <span>{animal?.name ?? ''}</span></p>
                    </li>
                    <li style={{fontSize:'25px', listStyleType:'none'}}>
                        <p >Edad: <span>{animal?.age ?? ''}</span></p>
                    </li>
                    <li style={{fontSize:'25px', listStyleType:'none'}}>
                        <p >Especie: <span>{animal?.specie?.name ?? ''}</span></p>
                    </li>
                    <li style={{fontSize:'25px', listStyleType:'none'}}>
                        <p >Raza: <span>{animal?.race?.name ?? ''}</span></p>
                    </li>
                    {/* <li>
                    <button className={`btn btn-primary text-white font-weight-bold mx-5`} onClick={handleClick}> ADOPTAR</button> 
                    </li> */}
                </ul>
            </div>
            <div className="col-6" style={{margin:'0px',padding:'0px'}}>
            <img 
                src={animal.image}
                alt=""
                className=".img-fluid"
                style={{maxHeight:'600px'}}
                />
            </div>
        </div>
    </main>
    )
}

export default View