import { useState, useEffect } from "react"
import * as SpecieService from '../../services/specieService'

function SpecieForm({onSubmit, specie, buttonText}){
    const [idSpecie, setIdSpecie] = useState('')
    const [name, setName] = useState('')
        
    useEffect(function(){
        if(specie != null || specie != undefined )
        {
            setIdSpecie(specie?._id)
            setName(specie?.name)
        }
    }, [specie])
        
    function handleSubmit(ev){
        ev.preventDefault()
        onSubmit({
            id: idSpecie,
            name: name,
        })
    }

    function handleName(ev){
        setName(ev.target.value)
    }
    
    return (
        <div>   
            <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">  
                <label className="form-label" htmlFor="">Nombre</label>
                <input className="form-control" type="text" name="name" onChange={handleName} value={name} />
                {/* <p className="text-small text-danger">Verifique este campo</p> */}
            </div>
            <div>
               <button className="btn btn-primary w-100 my-3" type="submit">{buttonText}</button>
            </div>
            </form>
        </div>
    )
}

export default SpecieForm