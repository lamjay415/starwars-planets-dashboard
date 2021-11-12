import React from 'react';
import './table.css';

const Table = ({planets}) =>{
    const rows = planets.map((planet,idx) => {

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
    })

    return (
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
    )
}

export default Table;