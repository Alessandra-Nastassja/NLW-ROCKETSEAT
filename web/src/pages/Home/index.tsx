import React from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import './styles.css';

const Home = () => {
    return (
        <>
            <div id="page-home">
                <div className="content">
                    <header>
                        <img src={logo} alt="Logo do Ecoleta"/>
                        <Link to="/create-point">
                            <FiLogIn/>
                            Cadastre um ponto
                        </Link>
                    </header>
                    <main>
                        <h1>Seu marketplace de coleta de resíduos.</h1>
                        <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                        <Link to="/list-point">
                            <span>
                                <FiSearch/>
                            </span>
                            <strong>Pesquisar pontos de coleta</strong>
                        </Link>
                    </main>
                </div>
            </div>
            <div id="popup-home">
                <div className="content">
                    <label>Pontos de coleta</label>
                    <div>
                        <input type="text" />
                        <button>    
                            <FiSearch id="lupa"/>
                        </button>
                    </div>
                </div>
            </div>         
        </>
    );
}

export default Home;