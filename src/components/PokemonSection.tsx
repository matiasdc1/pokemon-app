import Button from './ui/Button'
import Input from './ui/Input'
import Selector from './ui/Selector'
import Slider from './ui/Slider'
import validator from 'validator'
import { addPokemon, editPokemon, setSelectedPokemon } from '../store/pokemonSlice'
import { CreatePokemon, EditPokemon } from '../types'
import { createPokemonFromAPI, editPokemonByIdFromAPI } from '../api'
import { setModifyState } from '../store/appSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useEffect, useState } from 'react'

const ShowPokemon: React.FC = () => {
  const modifyState = useAppSelector((state) => state.app.modifyState)
  const selectedPokemon = useAppSelector((state) => state.pokemon.selectedPokemon)
  const dispatch = useAppDispatch()

  //States for form submit.
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [error, setError] = useState('')

  //States to track user input.
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [attack, setAttack] = useState(50)
  const [hp, setHp] = useState(50)
  const [defense, setDefense] = useState(50)
  const [type, setType] = useState('fire')

  //When a pokemon is selected for editing, inputs take the selected pokemon state.
  //Make sure the selected pokemon has the states before applying.
  useEffect(() => {
    setName(selectedPokemon?.name ? selectedPokemon.name : '')
    setImage(selectedPokemon?.image ? selectedPokemon.image : '')
    setAttack(selectedPokemon?.attack ? selectedPokemon.attack : 50)
    setDefense(selectedPokemon?.defense ? selectedPokemon.defense : 50)
    setHp(selectedPokemon?.hp ? selectedPokemon.hp : 50)
    setType(selectedPokemon?.type ? selectedPokemon.type : 'fire')
  }, [selectedPokemon])

  //Button enabled only when there is a name and image is '' or an url.
  useEffect(() => {
    setError('')
    if (name && (image.length === 0 || validator.isURL(image))) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [name, image])

  //Closes the Pokemon Create/Edit section.
  //The selected pokemon is returned to null.
  const handleClose = () => {
    dispatch(setModifyState(null))
    dispatch(setSelectedPokemon(null))
  }

  //Gets called when user will create a NEW Pokemon.
  //Hit API for pokemon creation.
  //Updates store with new pokemon.
  const handleCreateFormSubmit = async () => {
    //Safety check.
    if (!(name && (image.length === 0 || validator.isURL(image)))) return

    //Creates a pokemon with the CreatePokemon Type.
    //Manages loading state for the button.
    //Hits API and has error handling in case the API call fails.
    try {
      const _pkmn: CreatePokemon = {
        name,
        image,
        attack,
        defense,
        type,
        hp,
        idAuthor: 1,
      }
      setIsLoading(true)
      const res = await createPokemonFromAPI(_pkmn)
      dispatch(addPokemon(res))
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setError('Hubo un error. No se pudo crear el pokemon.')
    }
  }

  //Gets called when user will EDIT a Pokemon.
  //Hit API for pokemon editing.
  //Updates store with edited pokemon.
  const handleEditFormSubmit = async () => {
    //Safety check.
    if (!(name && (image.length === 0 || validator.isURL(image)))) return

    //Creates a pokemon with the EditPokemon Type.
    //Manages loading state for the button.
    //Hits API and has error handling in case the API call fails.
    try {
      //Safety check.
      if (!selectedPokemon) return
      const _editPokemon: EditPokemon = {
        ...selectedPokemon,
        name,
        image,
        attack,
        defense,
        hp,
        type,
      }
      setIsLoading(true)
      const res = await editPokemonByIdFromAPI(selectedPokemon.id, _editPokemon)
      dispatch(editPokemon({ id: selectedPokemon.id, pokemon: res }))
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setError('Hubo un error. No se pudo editar el pokemon.')
    }
  }

  return (
    <section className="flex flex-col items-center bg-white border-border border-[1px] p-3 ">
      <h1 className="text-lg font-semibold">
        {modifyState === 'create' ? 'Nuevo Pokemon' : 'Editando Pokemon'}
      </h1>
      <div className="flex flex-col justify-between w-full px-10 md:flex-row">
        <div className="flex flex-col">
          <Input
            text="Nombre"
            initialValue={selectedPokemon?.name}
            onChange={(e) => setName(e)}
            placeholder="Nombre del Pokemon"
          />
          <Input
            text="Imagen"
            initialValue={selectedPokemon?.image}
            onChange={(e) => setImage(e)}
            placeholder="Url de la imagen"
          />
          <Selector
            text="Tipo"
            onChange={(e) => setType(e)}
            initialValue={selectedPokemon?.type}
          />
        </div>
        <div>
          <Slider
            min={0}
            max={100}
            initialValue={selectedPokemon?.attack}
            text="Ataque"
            onChange={(e) => setAttack(e)}
          />
          <Slider
            min={0}
            max={100}
            initialValue={selectedPokemon?.defense}
            text="Defensa"
            onChange={(e) => setDefense(e)}
          />
          <Slider
            min={0}
            max={100}
            initialValue={selectedPokemon?.hp}
            text="HP"
            onChange={(e) => setHp(e)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
        <Button
          text="Guardar"
          icon="save"
          isLoading={isLoading}
          onClick={
            modifyState === 'create' ? handleCreateFormSubmit : handleEditFormSubmit
          }
          disabled={isDisabled}
        />
        <Button text="Cancelar" icon="close" onClick={handleClose} />
      </div>
      <p className="self-start mt-3 text-sm text-red">{error}</p>
    </section>
  )
}

export default ShowPokemon
