import { useState, useEffect } from "react"
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import * as SpecieService from '../../services/specieService'

function SpecieList({species,toDelete, toEdit}){

    function handleEdit(ev, specie){
        ev.preventDefault();
        toEdit(specie)
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
                    {species.map((specie, i) =>  
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{specie?._id ?? ''}</td>
                            <td>{specie?.name ?? ''}</td>
                            {/* <td>{specie?.id_specie ?? ''}</td> */}
                            {/* Esto mapea el nombre de la especia al campo. Para no ver el identificador */}
                            {
                                
                                species?.map((element, i) =>  {
                                    if(element?._id == specie?.id_specie) 
                                        return<td>{element?.name}</td>
                                })
                            }

                            
                            <td>
                                <Link className="btn btn-primary text-white mx-1" to={`/admin/species/${specie?._id ?? ''}`}>VER</Link>
                                <button className="btn btn-secondary text-white mx-1" onClick={(e) => handleEdit(e, specie)}>EDITAR</button>
                                <button className="btn btn-danger text-white mx-1" onClick={(e) => handleDelete(e, specie._id)}>ELIMINAR</button>
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

export default SpecieList