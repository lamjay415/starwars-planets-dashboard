import React, {useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import './chart.css';

const Chart = ({planets}) => {
    
    const [attribute, setAttribute] = useState('population');
    const [page, setPage] = useState(0);
    const [planetsData,setPlanetsData] = useState({});
    const [colors, setColors] = useState([]);

    useEffect(()=>{
        setPlanetsData({
            name: planets.map((planet)=>planet[`name`]),
            population: planets.map((planet)=>planet[`population`]),
            rotation: planets.map((planet)=>planet[`rotation_period`]),
            orbital: planets.map((planet)=>planet[`orbital_period`]),
            diameter: planets.map((planet)=>planet[`diameter`]),
            water: planets.map((planet)=>planet[`surface_water`])
        });
        setColors( () => {
            let colors = [];
            for(let i = 0; i < planets.length; i++){
                const r = Math.round(Math.random() * 255);
                const g = Math.round(Math.random() * 255);
                const b = Math.round(Math.random() * 255);
                colors.push(`rgba(${r},${g},${b},0.5)`);
            }
            return colors
        });
    },[planets]);

    if(Object.keys(planetsData).length===0){
      return null;
    }

    const data = {
        labels: planetsData['name'].slice(page*30,(page+1)*30),
        // planets.slice(page*30,(page+1)*30).map(({name}) => name),
        datasets: [
            {
                label: `# of ${attribute.replace('_',' ').toUpperCase()}`,
                data: planetsData[attribute].slice(page*30,(page+1)*30),
                backgroundColor: colors.slice(page*30,(page+1)*30),
                borderWidth: 1,
            },
        ],
    };
      
    const options = {
        width: '750',
        maintainAspectRatio: false,
    };

    const viewAttribute = (attribute) => {
        setAttribute(attribute);
        setPage(0);
    }

    return (
      <div>
          <div className='chart-container'>
              <div className='header'>
                  <h1 className='title'>Star Wars Planets Stat Chart</h1>
              </div>
              <Bar data={data} options={options}/>
          </div>
          <div className='chart-nav'>
              <div onClick={()=>viewAttribute('population')} className='chart-button'>Population</div>
              <div onClick={()=>viewAttribute('rotation')} className='chart-button'>Rotational Period</div>
              <div onClick={()=>viewAttribute('orbital')} className='chart-button'>Orbital Period</div>
              <div onClick={()=>viewAttribute('diameter')} className='chart-button'>Diameter</div>
              <div onClick={()=>viewAttribute('water')} className='chart-button'>Surface Water</div>
              <div className='chart-page-nav'>
                  <button className='nav-button' onClick={()=>setPage(page-1)} disabled={page===0}>{'<'}</button>
                  <button className='nav-button' onClick={()=>setPage(page+1)} disabled={planets.slice((page+1)*30).length === 0}>{'>'}</button>
              </div>
          </div>
      </div>
    )

}

export default Chart;