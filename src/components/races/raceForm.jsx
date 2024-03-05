import { useState, useEffect } from "react"
import * as RaceService from '../../services/raceService'

function RaceForm({onSubmit, onClick, species, race, buttonText}){
    const [idRace, setIdRace] = useState(null)
    const [name, setName] = useState('')
    const [idSpecie, setIdSpecie] = useState('')

    const [arraySpecies, setArraySpecies] = useState([])
  
    useEffect(function(){
        setArraySpecies(species ?? [])
    }, [species])
        
    useEffect(function(){
        if(race != null || race != undefined )
        {
            setIdRace(race?._id)
            setName(race?.name)
            setIdSpecie(race?.id_specie)
        }
    }, [race])
        
    function handleSubmit(ev){
        ev.preventDefault()
        onSubmit({
            id: idRace,
            name: name,
            id_specie: idSpecie,
        })
    }

    function handleName(ev){
        setName(ev.target.value)
    }
    function handleSpecie(ev){
        setIdSpecie(ev.target.value)
    }
    function handleClick(){
        onClick()
    }
    
    return (
        <div className="d-flex justify-content-center align-items-center">   
            <form className="form" onSubmit={handleSubmit}  style={{ width: "750px" }}>
            <div className="form-group">  
                <label className="form-label" htmlFor="">Nombre</label>
                <input className="form-control" type="text" name="name" onChange={handleName} value={name} />
                {/* <p className="text-small text-danger">Verifique este campo</p> */}
            </div>
            <div className="form-group">  
                <label className="form-label" htmlFor="specie">Especie</label>
                <select className="form-control" name="specie" value={race?.id_specie} onChange={handleSpecie}>
                    <option value="0">Seleccione una especie</option>
                    {arraySpecies.map((element,i) => (
                        <option key={i} value={element?._id}>{element.name}</option>
                    ))}
                </select>
            </div>
            <div className="d-flex justify-content-between">
                <button   button className="btn btn-secondary w-50 my-3 mx-1" onClick={handleClick}>Volver</button>
                <button className="btn btn-primary w-50 my-3 mx-1" type="submit">{buttonText}</button>
            </div>  
            </form>
        </div>
    )
}

export default RaceForm