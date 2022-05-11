import clienteAxios from '../config/clienteAxios'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'

const OlvidePassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setALerta] = useState({})


  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email === '' || email.length < 6) {
      setALerta({
        msg: "Es obligatorio ingresar su Correo Electronico",
        error: true
      });
      return;
    }
    try {
        const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {email})
        setALerta({
          msg: data.msg,
          error: false
        })

    } catch (error) {
        setALerta({
          msg: error.response.data.msg ,
          error: true
        })
    }
  }

  const { msg } = alerta


  return (
  <>
    <h1 className='text-sky-600 font-black text-6xl'>Recupera tu Acceso y no pierdas tus {""} 
      <span className='text-slate-700'>Proyectos</span>
    </h1>

    { msg && <Alerta alerta={alerta}/>}

    <form 
      className='my-10 bg-white shadow rounded-lg px-10 py-10'
      onSubmit={handleSubmit}
      >

      <div className='my-5'>
          <label 
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='email'
              >Correo Electronico</label>
          <input 
              id='email'
              type="email"
              placeholder='Introduzca su Correo Electronico'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              value={email}
              onChange={ e => setEmail(e.target.value)}
          />
      </div>

      <input 
          type="submit" 
          value="Enviar instrucciones"
          className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-sky-800'
      />
    </form>
    <nav className='lg:flex lg:justify-between'>
      <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/"
      >¿Ya tienes una Cuenta? Inicia Sesión</Link>
      <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/registrar"
      >¿No tienes una Cuenta? Registrate</Link>
    </nav>
  </>
  )
}

export default OlvidePassword