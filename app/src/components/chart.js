import React, {useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import './chart.css';

const Chart = ({planets}) => {

    const [attribute, setAttribute] = useState('population');
    const [page, setPage] = useState(0);
    const [planetsData,setPlanetsData] = useState({});
    const [colors, setColors] = useState([]);

    //on mount, store planets' attributes into state and assign initial colors for each planet
    useEffect(()=>{
 
        //create temp obj with empty attribute arrays
        let tempObj = {name:[], population: [], rotation: [], orbital: [], diameter: [], water: []};

        //for each planet, push data into corresponding arrays and assign tempObj to state
        setPlanetsData(planets.reduce((prev,curr)=>{
            prev['name'].push(curr[`name`]);
            prev['population'].push(curr[`population`]);
            prev['rotation'].push(curr[`rotation_period`]);
            prev['orbital'].push(curr[`orbital_period`]);
            prev['diameter'].push(curr[`diameter`]);
            prev['water'].push(curr[`surface_water`]);
            return prev;
        },tempObj));

        //assign colors for all planet
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

    //return null on first render if planetsData is empty
    if(Object.keys(planetsData).length===0){
      return null;
    }

    //assign state to actual chart data obj, limiting 30 planets per page 
    const data = {
        labels: planetsData['name'].slice(page*30,(page+1)*30),
        datasets: [
            {
                label: `# of ${attribute.replace('_',' ').toUpperCase()}`,
                data: planetsData[attribute].slice(page*30,(page+1)*30),
                backgroundColor: colors.slice(page*30,(page+1)*30),
                borderWidth: 1,
            },
        ],
    };
      
    //chart options
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true // SET SCROOL ZOOM TO TRUE
                },
                mode: "xy",
                speed: 100
              },
              enabled: true,
              drag:true,
              pan: {
                enabled: true,
                mode: "xy",
                speed: 100
              }
            }
        }
    };

    //function to view different chart attributes
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