import React, {useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import './chart.css';

const PlanetsChart = ({planets}) => {

    const [attribute, setAttribute] = useState('population');
    const [page, setPage] = useState(0);
    const [planetsData,setPlanetsData] = useState({});
    const [colors, setColors] = useState([]);

    //on mount, store planets' attributes into state and assign initial colors for each planet
    useEffect(()=>{
 
        //create temp obj with empty attribute arrays
        let tempObj = {name:[], population: [], 'rotation period': [], 'orbital period': [], diameter: [], 'surface water': []};

        //for each planet, push data into corresponding arrays and assign tempObj to state's planetsData
        setPlanetsData(planets.reduce((prev,curr)=>{
            prev['name'].push(curr[`name`]);
            prev['population'].push(curr[`population`]);
            prev['rotation period'].push(curr[`rotation_period`]);
            prev['orbital period'].push(curr[`orbital_period`]);
            prev['diameter'].push(curr[`diameter`]);
            prev['surface water'].push(curr[`surface_water`]);
            return prev;
        },tempObj));

        // assign colors for all planet
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

    // return null on first render if planetsData is empty
    if(Object.keys(planetsData).length===0){
      return null;
    }

    // assign state's planet data to actual chart data obj based on selected attribute, 
    // limiting 30 planets per page 
    const data = {
        labels: planetsData['name'].slice(page*30,(page+1)*30),
        datasets: [
            {
                label: `# of ${attribute.toUpperCase()}; blank = unknown`,
                data: planetsData[attribute].slice(page*30,(page+1)*30),
                backgroundColor: colors.slice(page*30,(page+1)*30),
                borderWidth: 1,
            },
        ],
    };
      
    // chart options
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales:{
            x:{
                display: true,
            },
            y:{
                display:true,
                type: 'linear'
            }
        }
    };

    // change y-axis scale to log only for population attribute 
    // due to huge difference in population between planets
    if(attribute === 'population'){
        options.scales = {
            y:{
                type: 'logarithmic'
            }
        }
    }

    // function to view different chart attributes by changing state
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
              <div onClick={()=>viewAttribute('rotation period')} className='chart-button'>Rotation Period</div>
              <div onClick={()=>viewAttribute('orbital period')} className='chart-button'>Orbital Period</div>
              <div onClick={()=>viewAttribute('diameter')} className='chart-button'>Diameter</div>
              <div onClick={()=>viewAttribute('surface water')} className='chart-button'>Surface Water</div>
              <div className='chart-page-nav'>
                  <button className='nav-button' onClick={()=>setPage(page-1)} disabled={page===0}>{'<'}</button>
                  <button className='nav-button' onClick={()=>setPage(page+1)} disabled={planets.slice((page+1)*30).length === 0}>{'>'}</button>
              </div>
          </div>
      </div>
    )

}

export default PlanetsChart;