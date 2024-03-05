import { useState, useEffect } from "react"
import * as SpecieService from '../../services/specieService'

function SpecieForm({onSubmit, onClick, specie, buttonText}){
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
            <div>
              
            </div>
            <div className="d-flex justify-content-between">
                <button   button className="btn btn-secondary w-50 my-3 mx-1" onClick={handleClick}>Volver</button>
                <button className="btn btn-primary w-50 my-3 mx-1" type="submit">{buttonText}</button>
            </div>   
            </form>
        </div>
    )
}

export default SpecieForm