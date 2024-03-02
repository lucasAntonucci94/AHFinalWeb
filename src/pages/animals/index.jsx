import React from "react"
import { useState, useEffect } from "react"
import AnimalCardList from '../../components/animals/animalCardList'
import * as AnimalService from '../../services/animalService'

function Index({}){
  const [animals, setAnimals] = useState([])
  useEffect(function(){
    findAnimals()
  }, [])

  async function findAnimals(){
    debugger
    await AnimalService.find()
    .then(data =>{
      debugger
      setAnimals(data)
    })
  }

  return (
    <div className="container-fluid" style={{padding:'0px', margin:'0px', minHeight:'90vh'}}>
        <div className="bg-primary d-flex align-items-center justify-content-center"  style={{    backgroundPosition: 'center',backgroundSize: 'cover', overflow: 'hidden', backgroundImage:"url('images/orange-cat.jpg')",height:'250px'}}>
          <h1 className="text-center text-white">LISTADO DE ANIMALES</h1>
        </div>
        {animals.length > 0 && 
          <AnimalCardList animals={animals ?? []} refreshGrid={findAnimals} />             
        }
    </div>
  )
}

export default Index