import { useState, useEffect } from "react"
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import * as UserService from '../../services/userService'
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";

function UserList({users, toEdit, toDelete}){


    function handleEdit(ev, user){
        ev.preventDefault();
        toEdit(user)
    }


    function handleDelete(ev, id){
        ev.preventDefault();
        toDelete(id)
     
    }
   
    return (
        <div className="container-fluid p-5">
            <h1 className="d-none">LISTADO DE user</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, i) =>  
                        <tr key={i}>
                            <td>{i}</td>
                            <td>{user?.email ?? ''}</td>
                            <td>{user?.firstName ?? ''}</td>
                            <td>{user?.lastName ?? ''}</td>
                            <td>{user?.isAdmin ? 'Administrador' : 'Usuario'}</td>
                            <td>
                                <Link className="btn btn-primary text-white mx-1" to={`/admin/users/${user?._id ?? ''}`}>VER</Link>
                                <button className="btn btn-secondary text-white mx-1" onClick={(e) => handleEdit(e, user)}>EDITAR</button>
                                <button className="btn btn-danger text-white mx-1" onClick={(e) => handleDelete(e, user?._id)}>ELIMINAR</button>
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

export default UserList