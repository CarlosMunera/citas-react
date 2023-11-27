import { useState, useEffect } from "react";
import Acerca from "./Acerca";
import Error from "./Error";

function Formulario( { pacientes, setPacientes, paciente, setPaciente } ) {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error,setError] = useState(false)

  useEffect( () => {
    if (Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
     
    }
  }, [paciente])

  const generarId = () => {
    const fecha = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return fecha+random
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar formulario
    if ([nombre,propietario,email,fecha,sintomas].includes('')) {
      setError(true)
      return
    }

    setError(false)

    //Objeto de pacientes
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }


    //Detectar Creacion o edicion de paciente 
    if (paciente.id){
      //Editando
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === 
      paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})

    }else{
      //Nuevo registro
      objetoPaciente.id=generarId();
      setPacientes([...pacientes,objetoPaciente]);
    }

    //Reiniciar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className=" font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-xl mt-5 text-center mb-10">
        Añade Paciente y{" "}
        <span className=" text-indigo-600 font-bold ">
          Administralos
        </span>
      </p>

      <form 
        className=" bg-white shadow-md rounded-lg py-10 px-5 mb-3 mx-5"
        onSubmit={handleSubmit}
      >
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">
            Nombre Mascota
          </label>
          <input
            id='mascota'
            type="text" 
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">
            Nombre Propietario
          </label>
          <input
            id='propietario'
            type="text" 
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ propietario }
            onChange= { (e) => setPropietario(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="email">
            Email
          </label>
          <input
            id='email'
            type="email" 
            placeholder="Email Contácto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ email }
            onChange= { (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">
            Fecha Alta
          </label>
          <input
            id='alta'
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ fecha }
            onChange= { (e) => setFecha(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">
            Síntomas
          </label>
          <textarea
            id='sintomas' 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los Síntomas"
            value={ sintomas }
            onChange= { (e) => setSintomas(e.target.value) }
          />
        </div>

        <input 
          type="submit"
          className=" bg-indigo-600 w-full p-3 text-white uppercase font-bold 
          hover:bg-indigo-700 cursor-pointer transition-all"
          value={ paciente.id ? 'Editar Paciente' : 'Agregar paciente' }
        />

      </form>
      <Acerca />
    </div>
  );
}

export default Formulario;
