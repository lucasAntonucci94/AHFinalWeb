import { useState, useEffect } from "react"
import StyledDropzone from '../common/StyledDropzone'
import { Form, FormGroup, FormControl, InputGroup, Button } from "react-bootstrap";

function AnimalForm({onSubmit, animal, species, races, onClick, buttonText}){
    const [idAnimal, setIdAnimal] = useState(null)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [description, setDescription] = useState('')
    const [specie, setSpecie] = useState({})
    const [race, setRace] = useState({})
    const [genre, setGenre] = useState({})
    const [selectedGenre, setSelectedGenre] = useState({})
    const [flagHasRace, setFlagHasRace] = useState(false)
    const [arraySpecies, setArraySpecies] = useState([])
    const [arrayRaces, setArrayRaces] = useState([])
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidAge, setIsValidAge] = useState(true);
    const [isValidDescription, setIsValidDescription] = useState(true);
    const [isValidGenre, setIsValidGenre] = useState(true);
    const [isValidSpecie, setIsValidSpecie] = useState(true);
    const [isValidRace, setIsValidRace] = useState(true);
    const [selectedSpecie, setSelectedSpecie] = useState("");
    const [selectedRace, setSelectedRace] = useState("");
    const [arrayGenres, setArrayGenre] = useState([]);
  
    useEffect(function(){
        setArrayGenre([
                { id: 0, name: "Seleccione un género" },
                { id: 1, name: "Masculino" },
                { id: 2, name: "Femenino" },
            ])
    }, [])

    useEffect(function(){
        setArraySpecies(species ?? [])
        setArrayRaces(races ?? [])
    }, [species,races])
        
    useEffect(function(){
        if(animal !== null && animal !== undefined && animal._id !== null && animal._id !== undefined )
        {
            setIdAnimal(animal?._id)
            setName(animal?.name)
            setAge(animal?.age)
            setDescription(animal?.description)
            setSpecie(animal?.specie)
            setRace(animal?.race)
            setGenre(animal?.genre)
            setImage(animal?.image)
            setPreview(animal?.image)
            if(animal?.genre !== null){
                var genresList = (arrayGenres === null ||arrayGenres === undefined ||arrayGenres.length < 1 || arrayGenres instanceof Object ) ?  [
                    { id: 0, name: "Seleccione un género" },
                    { id: 1, name: "Masculino" },
                    { id: 2, name: "Femenino" },
                ]
                :
                    arrayGenres
                ;
                const genre = genresList.find(genre => genre.name === animal?.genre);
                if(genre !== null){
                    setSelectedGenre(genre.id)
                }
            }
            if(animal?.specie !== null){
                // filtro razas por especie para mostrar solo las necesarias
                const racesBySpecie = races?.filter(function(element){
                    if(element?.id_specie === animal?.specie._id)
                        return element
                })
                setArrayRaces(racesBySpecie || [])
                if(racesBySpecie.length > 0){
                    setFlagHasRace(true)
                }
            } 
            setIsValidName(true);
            setIsValidAge(true);
            setIsValidDescription(true);
            setIsValidGenre(true);
            setIsValidSpecie(true);
            setIsValidRace(true);
        } else {
            setIsValidName(false);
            setIsValidAge(false);
            setIsValidDescription(false);
            setIsValidGenre(false);
            setIsValidSpecie(false);
            setIsValidRace(false);
        }
    }, [animal])
    
    function handleSubmit(ev){
        ev.preventDefault()
        if(specie?.name === undefined || genre === "" || name.length < 3 || description.length < 10 || age < 1 || race.name === undefined){
            return
        }
        onSubmit({
            id: idAnimal,
            name: name,
            description: description,
            age: age,
            specie: specie,
            race: race,
            genre: genre,
            image: image,
        })
    }
    function handleClick(){
        onClick()
    }
    function handleName(ev){
        setName(ev.target.value)
        setIsValidName(validateName(ev.target.value))
        
    }
    function handleAge(ev){
        setAge(ev.target.value)
        setIsValidAge(validateAge(ev.target.value))
    }
    function handleDescription(ev){
        setDescription(ev.target.value)
        setIsValidDescription(validateDescription(ev.target.value))
    }
    function handleSpecie(ev){
        const thisSpecie = species?.filter(function(element){
            if(element?._id === ev.target.value)
                return element
        })
        // filtro razas por especie para mostrar solo las necesarias
        const hasRaces = races?.filter(function(element){
            if(element?.id_specie === ev.target.value)
                return element
        })
        if(thisSpecie.length > 0){
            setSpecie(thisSpecie[0] || {})
            setIsValidSpecie(true)
        }else{
            setSpecie({})
            setIsValidSpecie(false)
        }

        if(hasRaces.length > 0){
            setArrayRaces(hasRaces || [])
            setFlagHasRace(true)
        }else{
            setArrayRaces([])
            setFlagHasRace(false)
        }

    }
    function handleRace(ev) {
        const selectedRaceId = ev.target.value;
        if (selectedRaceId === "0") {
            setRace({})
            setIsValidRace(false)
          return;
        }
    
        const thisRace = races.find(element => element._id === selectedRaceId);
        if (thisRace) {
          setRace(thisRace);
          setIsValidRace(true)
        } else {
          console.error("Race not found:", selectedRaceId);
        }
      }
      function handleGenre(ev) {
        const selectedGenreId = ev.target.value;
        if (selectedGenreId === "0") {
            setSelectedGenre("");
            setGenre("");
            setIsValidGenre(false)
            return;
        }else{
            setIsValidGenre(true)
        }
      
        const genre = arrayGenres.find(element => element.id === parseInt(selectedGenreId));
        if (genre) {
          setSelectedGenre(genre.id);
          setGenre(genre.name);
          setIsValidGenre(true)
        } else {
            setIsValidGenre(false)
        }
      }
    function handleOnDrop(base64){
        setImage(base64);
    }
    function validateName(text) {
        return text.length >= 3;
    }

    function validateAge(number) {
        return number >= 1;
    }

    function validateDescription(text) {
        return text.length >= 10;
    }

    function validateGenre(genre) {
        return genre !== "Seleccione un género";
    }
    return (
        <div className="d-flex justify-content-center align-items-center">   
           
            <Form className="form border rounded p-5 mt-3" style={{ width: "750px" }} onSubmit={handleSubmit}>
                <FormGroup className={isValidName ? "my-1" : "my-1 has-error"}>
                        <label className="form-label" htmlFor="name">
                            <b>Nombre</b>
                        </label>
                        <InputGroup>
                            <FormControl
                            type="text"
                            placeholder="ingrese su nombre"
                            name="name"
                            onChange={handleName}
                            value={name}
                            isInvalid={!isValidName}
                            isValid={isValidName}
                            />
                            <FormControl.Feedback type="invalid">
                                El nombre debe tener al menos 3 caracteres.
                            </FormControl.Feedback>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup className={isValidDescription ? "my-1" : "my-1 has-error"}>
                    <label className="form-label" htmlFor="description">
                        <b>Descripcion</b>
                    </label>
                    <InputGroup>
                        <FormControl
                        type="text"
                        placeholder="ingrese su descripcion"
                        name="description"
                        onChange={handleDescription}
                        value={description}
                        isInvalid={!isValidDescription}
                        isValid={isValidDescription}
                        />
                        <FormControl.Feedback type="invalid">
                            La descripcion debe tener al menos 10 caracteres.
                        </FormControl.Feedback>
                    </InputGroup>
                </FormGroup>
                <FormGroup className={isValidAge ? "my-1" : "my-1 has-error"}>
                    <label className="form-label" htmlFor="age">
                        <b>Edad</b>
                    </label>
                    <InputGroup>
                        <FormControl
                        type="number"
                        placeholder="ingrese su edad"
                        name="age"
                        onChange={handleAge}
                        value={age}
                        isInvalid={!isValidAge}
                        isValid={isValidAge}
                        />
                        <FormControl.Feedback type="invalid">
                            La edad no es correcta.
                        </FormControl.Feedback>
                    </InputGroup>
                </FormGroup>
                <FormGroup className={isValidGenre ? "my-1" : "my-1 has-error"}>
                    <label className="form-label" htmlFor="genre">
                        <b>Género</b>
                    </label>
                    <FormControl
                        as="select"
                        name="genre"
                        value={selectedGenre || "0"}
                        onChange={handleGenre}
                        isInvalid={!isValidGenre}
                        isValid={isValidGenre}
                    >
                        {arrayGenres.map((element, i) => (
                        <option key={i} value={element.id}>{element.name}</option>
                        ))}
                    </FormControl>
                </FormGroup>
                <FormGroup className={isValidSpecie ? "my-1" : "my-1 has-error"}>
                    <label className="form-label" htmlFor="specie">
                        <b>Especie</b>
                    </label>
                    <FormControl
                        as="select"
                        name="specie"
                        value={specie?._id || "0"}
                        onChange={handleSpecie}
                        isInvalid={!isValidSpecie}
                        isValid={isValidSpecie}
                    >
                        <option value="0">Seleccione una especie</option>
                        {arraySpecies.map((element, i) => (
                        <option key={i} value={element._id}>{element.name}</option>
                        ))}
                    </FormControl>
                </FormGroup>
                <FormGroup className={isValidRace ? "my-1" : "my-1 has-error"}>
                    <label className="form-label" htmlFor="race">
                        <b>Raza</b>
                    </label>
                    <FormControl
                        as="select"
                        name="race"
                        value={race?._id || "0"} 
                        onChange={handleRace}
                        disabled={!flagHasRace}
                        isInvalid={!isValidRace}
                        isValid={isValidRace}
                    >
                        <option value="0">Seleccione una raza</option>
                        {arrayRaces.map((element, i) => (
                        <option key={i} value={element._id}>{element.name}</option>
                        ))}
                    </FormControl>
                </FormGroup>
                <StyledDropzone onDrop={handleOnDrop} preview={preview} />
                <div className="d-flex justify-content-between">
                    <Button className="btn btn-secondary w-50 mt-2 mx-1" onClick={handleClick}>
                        Volver
                    </Button>
                    <Button className="btn btn-primary w-50 mt-2 mx-1" type="submit">
                        {buttonText}
                    </Button>
                </div>   
        </Form>
    </div>   
    )
}

export default AnimalForm