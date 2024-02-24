import { useState, useEffect } from "react"
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import * as RaceService from '../../services/raceService'

function RaceList({races,species,toDelete, toEdit}){

    function handleEdit(ev, race){
        ev.preventDefault();
        toEdit(race)
    }

    function handleDelete(ev, id){
        ev.preventDefault();
        toDelete(id)
    }
   
    return (
        <div className="container-fluid p-5">
            <h1 className="d-none">LISTADO DE RAZAS</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Identificador</th>
                        <th>Nombre</th>
                        {/* <th>Identificador Especie</th> */}
                        <th>Especie</th>
                    </tr>
                </thead>
                <tbody>
                    {races.map((race, i) =>  
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{race?._id ?? ''}</td>
                            <td>{race?.name ?? ''}</td>
                            {/* <td>{race?.id_specie ?? ''}</td> */}
                            {/* Esto mapea el nombre de la especia al campo. Para no ver el identificador */}
                            {
                                
                                species?.map((element, i) =>  {
                                    if(element?._id == race?.id_specie) 
                                        return<td>{element?.name}</td>
                                })
                            }

                            
                            <td>
                                <Link className="btn btn-primary text-white mx-1" to={`/admin/races/${race?._id ?? ''}`}>VER</Link>
                                <button className="btn btn-secondary text-white mx-1" onClick={(e) => handleEdit(e, race)}>EDITAR</button>
                                <button className="btn btn-danger text-white mx-1" onClick={(e) => handleDelete(e, race._id)}>ELIMINAR</button>
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

export default RaceList