import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom"

function AnimalCardList({animals = []}){
    debugger
    // function handleDelete(ev, id){
    //     ev.preventDefault();
    //     AnimalService.deleteOne(id)
    //       .then(data =>{
    //         if(data.deletedCount > 0)
    //             refreshGrid()
    //       })
    // }
    
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