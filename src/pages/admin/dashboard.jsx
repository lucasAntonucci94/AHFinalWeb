import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as AnimalService from '../../services/animalService'
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaUsers, FaDog,FaEarlybirds, FaLinux } from 'react-icons/fa';

// animals imports
// import AnimalList from '../../components/animals/animalList'


function Dashboard({}){
 
    return (   
        <div className="container p-5"  style={{height: '90vh'}}>
            <div className="row  justify-content-around pb-4" >
                <div className="col-5 m-4 p-5 bg-abmproducts text-center text-white rounded d-flex justify-content-center align-items-center"
                     style={{height:'350px', backgroundColor:'#ff903e'}}
                >
                    <Link className="nav-link text-white" to="/admin/animals">
                        <FaDog size={80}  />
                        <p className="pt-4 text-uppercase font-weight-bold h4">
                            ABM ANIMALES
                        </p>
                    </Link>
                </div>
                <div className="col-5  m-4 p-5 bg-users text-center text-center text-white rounded d-flex justify-content-center align-items-center"     style={{height:'350px', backgroundColor:'#b0cf44'}}>
                    <Link className="nav-link text-white" to="/admin/users">
                        <FaUsers  size={80}  />
                        <br/>
                        <p className="pt-4 text-uppercase font-weight-bold h4">
                            ABM USUARIOS
                        </p>
                    </Link>
                </div>
                <div className="col-5  m-4 p-5 bg-species text-center text-center text-white rounded d-flex justify-content-center align-items-center"     style={{height:'350px', backgroundColor:'#02bcae'}}>
                    <Link className="nav-link text-white" to="/admin/species">
                        <FaLinux  size={80}  />
                        <br/>
                        <p className="pt-4 text-uppercase font-weight-bold h4">
                            ABM ESPECIES
                        </p>
                    </Link>
                </div>
                <div className="col-5  m-4 p-5 bg-races text-center text-center text-white rounded d-flex justify-content-center align-items-center"     style={{height:'350px', backgroundColor:'#ffbd29'}}>
                    <Link className="nav-link text-white" to="/admin/races">
                        <FaEarlybirds  size={80}  />
                        <br/>
                        <p className="pt-4 text-uppercase font-weight-bold h4">
                            ABM RAZAS
                        </p>
                    </Link>
                </div>
          </div>
      </div>
    )
}

export default Dashboard