import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import './chart.css';

const Chart = ({planets}) => {
    
    const [attribute, setAttribute] = useState('population');
    console.log(attribute);
    const data = {
        labels: planets.map(({name}) => name),
        datasets: [
          {
            label: '# of Votes',
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
        scales: {
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
        <div className='chart-container'>
            <div className='header'>
                <h1 className='title'>Vertical Bar Chart</h1>
                <div className='links'>
                <a
                    className='btn btn-gh'
                    href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/VerticalBar.js'
                >
                    Github Source
                </a>
                </div>
            </div>
            <Bar data={data} options={options}/>
        </div>
    )

}

export default Chart;