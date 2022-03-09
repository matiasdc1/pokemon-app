import Loading from './ui/Loading'
import React, { useState } from 'react'
import TableRow from './TableRow'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BsCardImage } from 'react-icons/bs'
import { deletePokemonByIdFromAPI } from '../api'
import { MdOutlineImageNotSupported } from 'react-icons/md'
import { Pokemon } from '../types'
import { removeDeletedPokemon, setSelectedPokemon } from '../store/pokemonSlice'
import { setModifyState } from '../store/appSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useWindowSize } from '../hooks/useWindowResize'

const ShowTable: React.FC = () => {
  const pokemons = useAppSelector((state) => state.pokemon.pokemons)
  const loading = useAppSelector((state) => state.app.tableLoading)

  const dispatch = useAppDispatch()

  //Hook to manage the table columns.
  const size = useWindowSize()

  const [idDeleting, setIdDeleting] = useState<number | null>(null)

  //Navigation when clicked on image.
  const handleNavigation = (url?: string) => {
    if (!url) return
    window.open(url, '_blank')
  }

  //Handler to delete a pokemon.
  //Sets local loading state.
  //Hits the API to delete the pokemon, if sucessful, remove it from the store.
  const handleDelete = async (id: number) => {
    try {
      setIdDeleting(id)
      await deletePokemonByIdFromAPI(id)
      dispatch(removeDeletedPokemon(id))
      dispatch(setModifyState(null))
      setIdDeleting(null)
    } catch (e) {}
  }

  //Sets the app to edit state and selects the pokemon to be edited.
  //Uses the setTimeout to fix a bug where the edit state does not show the edited pokemon attributes.
  const handleEdit = (pkmn: Pokemon) => {
    dispatch(setSelectedPokemon(pkmn))
    dispatch(setModifyState(null))
    setTimeout(() => dispatch(setModifyState('edit')), 10)
  }

  return (
    <section className="flex flex-col items-center my-10">
      <table
        data-testid="table"
        className="w-full border-[1px] border-border border-spa my-5 text-sm md:text-base"
      >
        {/* Table headers */}
        <thead>
          <tr>
            <th className="border-r-[1px] border-b-[1px] border-border py-2">Nombre</th>
            {/* Image is conditionally rendered, hidden when screen width is small */}
            {size.width && size.width > 500 && (
              <th className="border-r-[1px] border-b-[1px] border-border">Imagen</th>
            )}
            <th className="border-r-[1px] border-b-[1px] border-border">Ataque</th>
            <th className="border-r-[1px] border-b-[1px] border-border">Defensa</th>
            <th className="border-b-[1px] border-border">Acciones</th>
          </tr>
        </thead>
        {/* Only show table body when the loading is completed, otherwise, show loading spinner*/}
        {!loading && (
          <tbody className="text-center bg-white">
            {pokemons.map((pkmn) => (
              <TableRow
                pkmn={pkmn}
                idDeleting={idDeleting}
                handleNavigation={handleNavigation}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </tbody>
        )}
      </table>
      <Loading loading={loading} />
    </section>
  )
}

export default ShowTable
