import { useState } from "react"
import { Link } from "react-router-dom"

function AnimalListItem({animal,onDelete}){

    // function handleClick(id){
    //     onDelete(id)
    // }

    return (
        <tr>
            <td>{}</td>
            <td><Link to={`/animals/${animal._id}`}>{animal.name}</Link></td>
            <td>{animal.age}</td>
            <td>{animal.type}</td>
            <td>{animal.race}</td>
            <td>{animal.genre}</td>
            <td><button className="btn btn-danger text-white" >Eliminar</button></td>
        </tr>
    )
}

export default AnimalListItem