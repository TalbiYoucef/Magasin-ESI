import React, { useState } from 'react';
import Side from '../side/side.jsx';
import Nav from '../nav/nav.jsx';
import { MdNavigateNext } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import produit from '../data/CommandInterne.jsx'; //command interne data
import Per from './CommandInLig.jsx';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const username = "chahi";

function CommandInterne() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortClick = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredRoles = produit.filter(article =>
        article.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const rolesList = filteredRoles.sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a.date) - new Date(b.date);
        } else {
            return new Date(b.date) - new Date(a.date);
        }
    }).map((produit, index) => (
        <Per key={index} id={produit.id} service={produit.service} date={produit.date} />
    ));

    return (
        <div>
            <Nav username={username} />
            <div className='dwnrole'>
                <Side className='siddd' link="roles" />
                <div style={{ marginTop: "5vh", marginLeft: ' 60px', width: '100%', height: '92vh', padding: '60px' }}>
                    <div>
                        <div style={{ display: 'flex', gap: '60%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', width: '290px', height: '40px', borderRadius: '20px', boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)', padding: '20px', color: '#616262', marginTop: '30px', marginLeft: '40px' }}>
                                <BsSearch className='search-icon' />
                                <input
                                    type="search"
                                    placeholder='search command'
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className='search-input'
                                    style={{ border: 'none', height: '30px', width: '150px' }}
                                />
                            </div>
                            
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '95%',
                            height: '40px',
                            borderRadius: '20px',
                            boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
                            color: '#100B39',
                            border: 'none', // Changed text-decoration to border
                            marginTop: '30px',
                            marginLeft: '20px',
                            flex: 1
                        }}>
                            
                            <div style={{ display: 'flex', gap: '20px', marginLeft: '160px', width: '53%' }}>
                                <div style={{fontSize: '15px', width: '20%', color: 'rgba(58, 53, 65, 0.87)', marginTop: '10px', textAlign: 'center' }}>Command Id</div>
                                <div style={{ fontSize: '15px', width: '50%', color: 'rgba(58, 53, 65, 0.87)', marginTop: '10px', textAlign:'center' }}>Servie </div>
                                <div style={{   width: '30%', fontSize: '15px', width: '200px', color: 'rgba(58, 53, 65, 0.87)', marginTop: '-2px', textAlign: 'center' }}>Date<button onClick={handleSortClick} className='btndate28'><MdOutlineKeyboardArrowDown /></button></div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '70vh',
                        marginTop: '6vh'
                    }}>
                        {rolesList}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommandInterne;
