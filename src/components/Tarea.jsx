import React from 'react'
import { formatearFecha } from '../helpers/FormatearFecha'
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin'

const Tarea = ({tarea}) => {

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()

    const admin = useAdmin()

    const {descripcion, nombre, fechaEntrega, prioridad, estado, _id} = tarea

  return (
    <div className='border-b p-5 flex justify-between items-center'>
        <div className='flex flex-col items-start'>
            <p className='mb-3 text-xl uppercase'>{nombre}</p>
            <p className='mb-1 text-sm text-gray-500'>{descripcion}</p>
            <p className='mb-1 text-sm'>Fecha de Entrega: {formatearFecha(fechaEntrega)}</p>
            {
                prioridad === "Alta" ? <p className='mb-1 text-sm '>Prioridad: {''}<span className='text-red-600 font-bold uppercase'>{prioridad}</span></p>
                : (
                    prioridad === "Media" ? <p className='mb-1 text-sm '>Prioridad: {''}<span className='text-yellow-600 font-bold uppercase'>{prioridad}</span></p> 
                    : <p className='mb-1 text-sm '>Prioridad: {''}<span className='text-green-600 font-bold uppercase'>{prioridad}</span></p>
                )
            }
            { estado && <p className='text-xs text-white rounded-lg p-1 bg-green-600 uppercase '>Completada por: {tarea.completado.nombre}</p>}
    
        </div>

        <div className='flex flex-col lg:flex-row gap-2'>
            {admin && (
            <button
                className='bg-sky-600 hover:bg-sky-700 transition-colors text-white px-4 py-3 uppercase font-bold text-sm rounded-lg'
                onClick={() => handleModalEditarTarea(tarea)}
            >Editar</button>
            )}

            <button
                className={`${estado ? "bg-sky-600" : "bg-gray-500"} hover:bg-sky-700 transition-colors text-white px-4 py-3 uppercase font-bold text-sm rounded-lg`}
                onClick={() => completarTarea(_id)}
            >{estado ? "Completa" : "Incompleta"}</button>

            {admin && (
            <button
                className='bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-3 uppercase font-bold text-sm rounded-lg'
                onClick={() => handleModalEliminarTarea(tarea) }
            >Eliminar</button>
            )}

        </div>
    </div>
  )
}

export default Tarea