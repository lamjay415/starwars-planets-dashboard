import React, {useEffect, useState} from 'react';
import './table.css';

const Table = ({planets}) =>{

    const [pages] = useState([]);
    const [page, setPage] = useState(0);

    // let rows = [];

    useEffect(() => {
        for(let i = 0; i<planets.length;i+=10){
            pages.push(planets.slice(i,i+10));
        }

    }, []);

    const rows = pages[page].map((planet,idx) => {

        return(
            <div className='table-row' key={`row-${idx}`}>
                <div>{planet.name}</div>
                <div>{planet.population}</div>
                <div>{planet.rotation_period}</div>
                <div>{planet.orbital_period}</div>
                <div>{planet.diameter}</div>
                <div>{planet.climate}</div>
                <div>{planet.surface_water}</div>
            </div>
        )
    });

    return (
        <div className='table-container'>
            <div className='planets-table'>
                <div className='table-header'>
                    <div>Name</div>
                    <div>Population</div>
                    <div>Rotational Period</div>
                    <div>Orbital Period</div>
                    <div>Diameter</div>
                    <div>Climate</div>
                    <div>Surface Water</div>
                </div>
                {rows}
            </div>
            <div onClick={()=>setPage(page>0 ? page - 1 : 0)}>Previous</div>
            <div onClick={()=>setPage(page < planets.length - 1 ? page + 1 : page)}>Next</div>
        </div>
    )
}

export default Table;