import React from "react"
import { useState, useEffect } from "react"
import AnimalCardList from '../../components/animals/animalCardList'
import * as AnimalService from '../../services/animalService'
import { send } from 'emailjs-com';

function Index({}){
  const [animals, setAnimals] = useState([])
  const [authUser, setAuthUser] = useState({})
  const serviceID = 'contact_service';
  const templateID = 'template_20rtxop';
  const userID = 'nttu7qY7UXAEALpcI';

  useEffect(function(){
    findAnimals()
    const user = JSON.parse(localStorage.getItem("user"))
    if(user !== null || user !== undefined){
        setAuthUser(user)
    }
  }, [])

  async function findAnimals(){
    await AnimalService.find()
    .then(data =>{
      setAnimals(data)
    })
  }

  const sendEmail = (animal) => {
    const params = {
      from_name: authUser.lastName+' '+authUser.firstName,
      reply_to: authUser.email,
      message: 'He visto un encantador animalito en la web y me gustaria adoptarlo.',
      animal_name: animal.name,
      animal_description: animal.description,
      animal_age: animal.age,
      animal_genre: animal.genre,
      animal_specie: animal.specie.name,
      animal_race: animal.race.name,
    };
    send(serviceID, templateID, params, userID)
        .then(() => {
          alert('Email sent successfully!');
        })
        .catch((error) => {
          console.log('Error sending email:', error);
      });
  };

  return (
    <div className="container-fluid" style={{padding:'0px', margin:'0px', minHeight:'90vh'}}>
        <div className="bg-primary d-flex align-items-center justify-content-center"  style={{ backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('images/orange-cat.jpg')",height:'250px'}}>
          <h1 className="text-center text-white">LISTADO DE ANIMALES</h1>
        </div>
        {animals.length > 0 && 
          <AnimalCardList animals={animals ?? []} sendEmail={sendEmail} />             
        }
    </div>
  )
}

export default Index