import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import './chart.css';

const Chart = ({planets}) => {
    
    const [attribute, setAttribute] = useState('population');

    const data = {
      labels: planets.map(({name}) => name),
      datasets: [
        {
          label: `# of ${attribute.replace('_',' ').toUpperCase()}`,
          data: planets.map((planet) => planet[`${attribute}`]),
          backgroundColor: planets.map(planet => {
            const r = Math.round(Math.random() * 255);
            const g = Math.round(Math.random() * 255);
            const b = Math.round(Math.random() * 255);
            return `rgba(${r},${g},${b},0.2)`;
          }),
          borderWidth: 1,
        },
      ],
    };
      
    const options = {
      width: '750',
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip:false,
              minRotation: 90
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <div>
        <div className='chart-container'>
            <div className='header'>
                <h1 className='title'>Star Wars Planets Stat Chart</h1>
            </div>
            <Bar data={data} options={options}/>
        </div>
        <div className='chart-nav'>
          <div onClick={()=>setAttribute('population')} class='chart-button'>Population</div>
          <div onClick={()=>setAttribute('rotation_period')} class='chart-button'>Rotational Period</div>
          <div onClick={()=>setAttribute('orbital_period')} class='chart-button'>Orbital Period</div>
          <div onClick={()=>setAttribute('diameter')} class='chart-button'>Diameter</div>
          <div onClick={()=>setAttribute('surface_water')} class='chart-button'>Surface Water</div>
        </div>
      </div>
    )

}

export default Chart;