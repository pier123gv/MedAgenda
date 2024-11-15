import './Header.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Header() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };  

  const goToLoginPage = () => {
    navigate('/Login');
  };
  const goToRegisterPage = () => {
    navigate('/Register');
  };
  const goBack = () => {
    navigate(-1); // Esto navega a la página anterior en el historial
  };

  return (
    <header>

        <nav>
            <img src="/src/img/logo.jpeg" alt="" height={100} width={100} onClick={goBack}/>
            <section id='section1'>
              <p>La Solución Integral para la Gestión de tu Clínica</p>
            </section>
            <section id='section2'>
                <SearchBar />
            </section>
            <section id='section3'>
                <button onClick={goToLoginPage}>Mi cuenta</button>
            </section>
        </nav>
    </header>
  )
}