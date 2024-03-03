import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as RaceService from '../../../services/raceService'
import * as SpecieService from '../../../services/specieService'
import { Link } from "react-router-dom"

function View({}){
  const { id } = useParams()
  const [race, setRace]  = useState({})
  const [species, setSpecies]  = useState([])
  const [specieName, setSpecieName]  = useState('')
  
  useEffect(function(){
    RaceService.findById(id)
    .then(data => setRace(data))
    SpecieService.find(id)
    .then(data => setSpecies(data))
  }, [])

  useEffect(function(){
    species?.filter(function(element){
        if(element._id == race.id_specie)
            setSpecieName(element.name)
    })
  }, [race])

    return (
        <main className="container-fluid" style={{padding:'0px'}}>
        <div className="row  d-flex justify-content-center" style={{padding:'0px',margin:'0px',minHeight: '90vh'}}>
            <div className="col-12 bg-dark pb-4 d-flex justify-content-center align-items-center"   style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('../../images/turquesa-cat.jpg')",height: '250px'}}>
                <div className="row w-100">
                    <div className="col-12 px-5">
                            <Link className="btn btn-warning text-center" to="/admin/races">
                            <b>
                                VOLVER
                            </b>
                            </Link>
                    </div>
                    <div className="col-12 text-center">
                        <h1 className=" text-white">{race?.name}</h1>
                    </div>
                </div>
            </div>
           <div className="col-6 d-flex justify-content-center align-items-center">
                <ul >
                    <li style={{fontSize:'25px', listStyleType:'none'}}>
                        <p  > Nombre: <span>{race?.name}</span></p>
                    </li>
                    <li style={{fontSize:'25px', listStyleType:'none'}}>
                        <p  > Especie: <span>{specieName}</span></p>
                    </li>
                </ul>
            </div>
            <div className="col-6" style={{margin:'0px',padding:'0px'}}>
            { race.id_specie != '62bccf9d6999561de1461262' ? 
                <img 
                src="../../images/perrito_crazy.jpg"
                alt=""
                className=".img-fluid"
                style={{width: '50%'}}
                />
                :
                <img 
                src="../../images/michifury.jpg"
                alt=""
                className=".img-fluid"
                style={{maxHeight:'500px'}}
                />
            }
            </div>
        </div>
</main>
    )
}

export default View