//Components
import { Button } from "./Components/Button"
import { Frame } from "./Components/Frame"
import TextArray from "./Components/Comentarios"
import { Allpoke } from "./Components/Allpoke"
//Styles
import './sass/App.scss'
//Icons
import { ImUndo2 } from "react-icons/im";
import { ImRedo2 } from "react-icons/im";
//Hooks
import { useState, useEffect, useCallback } from "react";

const App = () => {

     //Obtiene todos los pokemones en orden
    const [allPokemons, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
 
    const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()
 
    setLoadMore(data.next)
    
    function createPokemonObject(results)  {
        results.forEach( async pokemon => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data =  await res.json()
          setAllPokemons( currentList => [...currentList, data])
          await allPokemons.sort((a, b) => a.id - b.id)
        })
      }
      createPokemonObject(data.results)
    }
  
   useEffect(() => {
    getAllPokemons()
   }, [])
     

    //Obtener pokemones con sus evoluciones 
    const [pokeId, setPokeId] = useState(1);
    const [pokeEvo, setPokeEvo] = useState([]);
    
    useEffect(()=>{
        obtenerPoke(pokeId); 
    },[pokeId])

      
    async function obtenerPoke (id){
        const respuesta = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data = await respuesta.json()
        
        let pokeArray = []
        let guardaVotos = []
        
        let pokeEvo1 = data.chain.species.name
        let pokeImg1 = await obtenerPokeImg(pokeEvo1)
        pokeArray.push([pokeEvo1,pokeImg1])



        if(data.chain.evolves_to.length !== 0){
            let pokeEvo2 = data.chain.evolves_to[0].species.name;
            let pokeImg2 = await obtenerPokeImg(pokeEvo2)
            pokeArray.push([pokeEvo2,pokeImg2]) 
           
            
        if(data.chain.evolves_to[0].evolves_to.length !==0){
            let pokeEvo3 = data.chain.evolves_to[0].evolves_to[0].species.name;
            let pokeImg3 = await obtenerPokeImg(pokeEvo3)
            pokeArray.push([pokeEvo3,pokeImg3]) 
            
        }

      }
      setPokeEvo(pokeArray)     
    }

   
    async function obtenerPokeImg(name){
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await respuesta.json()
        return data.sprites.other['official-artwork'].front_default
    }
    function antClick(){
        if(pokeId === 1){
            setPokeId(1)
        }else{
            setPokeId(pokeId - 1)
        }
    }
    function sigClick(){
        setPokeId(pokeId + 1)
    }
//Retorna en pantalla todos los pokemones y evoluciones
  return (

    <div className="app">

        <div className="app__container">
            <h1>PokeDesk</h1>
        <div className="pokemon__container">
        <div className="all__container">
          {allPokemons.map( (pokemonStats, index) => 
            <Allpoke
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
          
        </div>
          <button className="btncargar__mas" onClick={() => getAllPokemons()}>Cargar Más</button>
        </div>
        </div>
        <h1>Poke Evolutions</h1>
        <div className={`frame__container frame${pokeEvo.length}`}>
            {pokeEvo.map(pokemon =>  
            <Frame 
            key={pokemon[0]}
            name = {pokemon[0]}
            img = {pokemon[1]}
            />)}
            
        </div>
            
        <div className="btn__container">
            <Button 
            icon={<ImUndo2 />} 
            handleClick={antClick}
            />
            
            <Button 
            icon={<ImRedo2 />}
            handleClick={sigClick} 
            />
        </div>
        <div>
            <>Ingresa tus comentarios</>
            <TextArray />
                
        </div>
            
            
    </div>

  )
}

export {App}