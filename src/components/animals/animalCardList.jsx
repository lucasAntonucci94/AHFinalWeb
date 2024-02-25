import { useState, useEffect } from "react"
import AnimalListItem from './animalListItem'
import { Button, Table, Card } from 'react-bootstrap';
import { Link } from "react-router-dom"
import * as AnimalService from '../../services/animalService'

function AnimalCardList({animals,refreshGrid}){

    function handleDelete(ev, id){
        ev.preventDefault();
        AnimalService.deleteOne(id)
          .then(data =>{
            console.log(data)
            if(data.deletedCount > 0)
                refreshGrid()
          })
    }
   
    return (
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-12">            
                    <h3 className="d-none">LISTADO DE ANIMALES</h3>
                </div>
                {animals?.map((animal, i) =>  
                    <div className="col-3  d-flex justify-content-center">

                <Card style={{ width: '18rem', margin:'10px' }}>
                <Card.Img variant="top"  src={animal?.image} />
                {/* { animal?.specie?.name.toLowerCase()  != 'gato' ? 
                    <Card.Img variant="top" src="images/perrito_crazy.jpg" />
                    :
                    <Card.Img variant="top" src="images/gato.jpg" />
                } */}
                    <Card.Body>
                        <Card.Title className="px-2">{animal?.name ?? ''}</Card.Title>
                        <Card.Text>
                            <ul key={i} style={{textDecoration:'none'}}>
                                <li>Especie: {animal?.specie?.name ?? ''}</li>
                                <li>Edad: {animal?.age ?? ''}</li>
                                {/* <li>Raza: {animal.race ?? ''}</li> */}
                                {/* <li>Género: {animal.genre ?? ''}</li> */}
                            
                            </ul>
                                
                        </Card.Text>
                        <Link className="btn btn-warning text-white w-100" to={`/animals/${animal?._id ?? ''}`}>
                            <b>
                                VER
                            </b>
                            </Link>
                        </Card.Body>
                    </Card>            
                    </div>
                    )}
                </div>
        </div>
    )
}

export default AnimalCardList