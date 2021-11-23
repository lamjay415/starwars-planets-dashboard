import React, {useState} from 'react';
import './table.css';

const PlanetsTable = ({planets}) =>{

    const [page, setPage] = useState(0);

    // select 10 planets to display depending on page number 
    const rows = planets ? planets.slice(page*10,(page+1)*10).map((planet,idx) => {
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
    }): null;

    return (
        <div className='table-container'>
            <div className='planets-table'>
                <div className='table-header'>
                    <div>Name</div>
                    <div>Population</div>
                    <div>Rotation Period</div>
                    <div>Orbital Period</div>
                    <div>Diameter</div>
                    <div>Climate</div>
                    <div>Surface Water</div>
                </div>
                {rows}
            </div>
            <div className='page-nav'>
                <button onClick={()=>setPage(page-1)} className='nav-button' disabled={page===0}>{'<'}</button>
                <div className='page-num'>{page+1}</div>
                <button onClick={()=>setPage(page+1) }className='nav-button' disabled={planets.slice((page+1)*10).length === 0}>{'>'}</button>
            </div>
        </div>
    )
}

export default PlanetsTable;