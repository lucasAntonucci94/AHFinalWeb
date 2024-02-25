import { useState, useEffect } from "react"
import AnimalListItem from './animalListItem'
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import * as AnimalService from '../../services/animalService'
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";

function AnimalList({animals,toDelete, toEdit}){
    function handleEdit(ev, animal){
        ev.preventDefault();
        toEdit(animal)
    }
    function handleDelete(ev, id){
        ev.preventDefault();
        toDelete(id)
    }
    return (
        <div className="container-fluid p-5">
            <h1 className="d-none">LISTADO DE ANIMALES</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Especie</th>
                        <th>Raza</th>
                    </tr>
                </thead>
                <tbody>
                    {animals.map((animal, i) =>  
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{animal?.name ?? ''}</td>
                            <td>{animal?.age ?? ''}</td>
                            <td>{animal?.specie?.name ?? ''}</td>
                            <td>{animal?.race?.name ?? ''}</td>
                            {/* <td>{animal?.genre ?? ''}</td> */}
                            <td>
                                <Link className="btn btn-primary text-white mx-1" to={`/admin/animals/${animal._id ?? ''}`}>VER</Link>
                                <button className="btn btn-secondary text-white mx-1" onClick={(e) => handleEdit(e, animal)}>EDITAR</button>
                                <button className="btn btn-danger text-white mx-1" onClick={(e) => handleDelete(e, animal._id)}>ELIMINAR</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            
            <ul>
               
            </ul>
        </div>
    )
}

export default AnimalList