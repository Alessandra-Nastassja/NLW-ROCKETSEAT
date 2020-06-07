import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker,  } from 'react-leaflet'; 
import { LeafletMouseEvent } from 'leaflet'
import axios from 'axios';

import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import './styles.css';

interface Item {
    id: number,
    title: string,
    image_url: string,
}

interface IBGEUFResponse {
    sigla: string,
}

interface IBGECityResponse {
    nome: string,
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })
    
    const [seletedUf, setSeletedUf] = useState('0');
    const [seletedCity, setSeletedCity] = useState('0');
    const [seletedItems, setSeletedItems] = useState<number[]>([]);
    const [seletedPosition, setSeletedPosition] = useState<[number, number]>([0,0]);
    const [inicialPosition, setInicialPosition] = useState<[number, number]>([0,0]);

    const history = useHistory();

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials)            
        })
    }, [])

    useEffect(() => {
        if (seletedUf === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${seletedUf}/municipios`).then(response => {
            const cityNames  = response.data.map(city => city.nome);

            setCities(cityNames)            
        })
    }, [seletedUf])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;      
            
            setInicialPosition([latitude, longitude]);
        })
    }, [])

    function handleSeletUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        
        setSeletedUf(uf);
    }
    function handleSeletCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        
        setSeletedCity(city);
    }
    function handleMapClick(event: LeafletMouseEvent) {
        setSeletedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({...formData, [name]: value})
    }   
    function handleSeletecItem(id: number) {
        const alreadySeleted = seletedItems.findIndex(item => item === id);

        if (alreadySeleted >= 0) {
         const filteredItems = seletedItems.filter(item => item != id);
         
         setSeletedItems(filteredItems);
        }else{
            setSeletedItems([...seletedItems, id]);
        }
    }   
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = seletedUf;
        const city = seletedCity;
        const [latitude, longitude] = seletedPosition;
        const items = seletedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        };

        await api.post('points', data);
        
        alert('Parabéns! Ponto de coleta criado com sucesso.');

        history.push('/');
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Logo da Ecoleta"/>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                {/* Sessões */}
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name"
                            onChange={handleInputChange}/>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text" 
                                name="whatsapp" 
                                id="whatsapp"
                                onChange={handleInputChange}/>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    {/* -23.8091209,-46.6995142 */}
                    <Map center={[-23.8091209,-46.6995142]} zoom={15} onClick={handleMapClick}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={seletedPosition} />
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={seletedUf} onChange={handleSeletUf}>
                                <option value="0">Selecione uma uf</option>
                                {
                                    ufs.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={seletedCity} onChange={handleSeletCity}>
                                <option value="0">Selecione uma cidade</option>
                                {
                                    cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {
                            items.map(item => (
                                <li 
                                    key={item.id} 
                                    onClick={() => handleSeletecItem(item.id)}
                                    className={seletedItems.includes(item.id) ? 'selected': ''}>
                                    <img src={item.image_url} alt={item.title} />
                                    <span>{item.title}</span>
                                </li>   
                            ))
                        }
                    </ul>
                </fieldset>
                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
}

export default CreatePoint;