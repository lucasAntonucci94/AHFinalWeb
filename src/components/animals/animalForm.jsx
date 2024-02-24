import { useState, useEffect } from "react"

function AnimalForm({onSubmit, animal, species, races, buttonText}){
    const [idAnimal, setIdAnimal] = useState(null)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [description, setDescription] = useState('')
    const [specie, setSpecie] = useState({})
    const [race, setRace] = useState({})
    const [flagHasRace, setFlagHasRace] = useState(false)
    const [arraySpecies, setArraySpecies] = useState([])
    const [arrayRaces, setArrayRaces] = useState([])
  
    useEffect(function(){
        setArraySpecies(species ?? [])
        setArrayRaces(races ?? [])
    }, [species,races])
        
    useEffect(function(){
        if(animal != null || animal != undefined )
        {
            setIdAnimal(animal?._id)
            setName(animal?.name)
            setAge(animal?.age)
            setDescription(animal?.description)
            setSpecie(animal?.specie)
            setRace(animal?.race)
        }
    }, [animal])
    
    function handleSubmit(ev){
        ev.preventDefault()
        onSubmit({
            id: idAnimal,
            name: name,
            description: description,
            age: age,
            specie: specie,
            race: race,
        })
    }

    function handleName(ev){
        setName(ev.target.value)
    }
    function handleAge(ev){
        setAge(ev.target.value)
    }
    function handleDescription(ev){
        setDescription(ev.target.value)
    }
    function handleSpecie(ev){
        
        const thisSpecie = species?.filter(function(element){
            if(element?._id == ev.target.value)
                return element
        })
        // filtro razas por especie para mostrar solo las necesarias
        const hasRaces = races?.filter(function(element){
            if(element?.id_specie == ev.target.value)
                return element
        })
        if(thisSpecie != null)
            setSpecie(thisSpecie[0])

            debugger
        if(hasRaces != null){
            setArrayRaces(hasRaces)
            setFlagHasRace(true)
        }
    }
    function handleRace(ev){
        const thisRace = races?.filter(function(element){
            if(element?._id == ev.target.value)
                return element
        })
        if(thisRace != null)
            setRace(thisRace[0])
      
    }
   
    return (
        <div>   
            <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">  
                <label className="form-label" htmlFor="">Nombre</label>
                <input className="form-control" type="text" name="name" onChange={handleName} value={name} />
                {/* <p className="text-small text-danger">Verifique este campo</p> */}
            </div>
            <div className="form-group">  
                <label className="form-label" htmlFor="description">Descripción</label>
                <input className="form-control" type="text" name="description" onChange={handleDescription} value={description}/>
                {/* <p className="text-small text-danger">Verifique este campo</p> */}
            </div>
            <div className="form-group">  
                <label className="form-label" htmlFor="age">Edad</label>
                <input className="form-control" type="text" name="age" onChange={handleAge} value={age}/>
                {/* <p className="text-small text-danger">Verifique este campo</p> */}
            </div>
            <div className="form-group">  
                <label className="form-label" htmlFor="specie">Especie</label>
                <select className="form-control" name="specie" value={specie?._id} onChange={handleSpecie}>
                    <option value="0">Seleccione una especie</option>
                    {arraySpecies.map((element,i) => (
                        <option key={i} value={element?._id}>{element.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">  
                <label className="form-label" htmlFor="race">Raza</label>
                <select
                     className="form-control"
                     name="race"
                     value={race?._id}
                     onChange={handleRace}
                     disabled={!flagHasRace}
                    >
                    <option value="0">Seleccione una raza</option>
                    {arrayRaces.map((element,i) => (
                        <option key={i} value={element?._id}>{element?.name}</option>
                    ))}
                </select>
            </div>
            <div>

            <button className="btn btn-primary w-100 my-3" type="submit">{buttonText}</button>
            </div>
            </form>
        </div>
    )
}

export default AnimalForm