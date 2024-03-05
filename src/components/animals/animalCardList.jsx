import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function AnimalCardList({animals = [],sendEmail}){
    function handleClick(animal){
        sendEmail(animal)
    }
    
    return (
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-12">            
                    <h3 className="d-none">LISTADO DE ANIMALES</h3>
                </div>
                {animals.length > 0 && animals?.map((animal, i) =>  
                <div className="col-3  d-flex justify-content-center">
                    <Card style={{ width: '18rem', margin:'10px' }}>
                        <Card.Img variant="top"  src={animal?.image} />
                        <Card.Body>
                            <Card.Title className="px-2">{animal?.name ?? ''}</Card.Title>
                            <Card.Text>
                                <ul key={i} style={{textDecoration:'none'}}>
                                    <li>Especie: {animal?.specie?.name ?? ''}</li>
                                    <li>Edad: {animal?.age ?? ''}</li>
                                    <li>Género: {animal?.genre ?? ''}</li>
                                    {/* <li>Raza: {animal.race ?? ''}</li> */}
                                    {/* <li>Género: {animal.genre ?? ''}</li> */}
                                </ul>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Link className="btn btn-warning text-white w-100 mb-1" to={`/animals/${animal?._id ?? ''}`}>
                                <b>
                                    VER
                                </b>
                            </Link>
                            <button className={`btn w-100 btn-info text-white font-weight-bold`} onClick={() => handleClick(animal)} > ADOPTAR</button> 
                        </Card.Footer>
                    </Card>            
                </div>
                )}
            </div>
        </div>
    )
}

export default AnimalCardList