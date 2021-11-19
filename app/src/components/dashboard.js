import React, {useState, useEffect} from 'react';
import Table from './table';
import Chart from './chart';
import './dashboard.css'


const Dashboard = () => {

    const [planets, setPlanets] = useState([]);
    // const [page, setPage] = useState(0);
    const [content, setContent] = useState('table');

    useEffect(()=>{
        const url = 'https://swapi.dev/api/planets/';

        const fetchData = async()=>{
            try{
                let response = await fetch(url);
                let json = await response.json();
                let data = json.results;

                while(json.next){
                    response = await fetch(json.next);
                    json = await response.json();
                    data = data.concat(json.results);
                }
                data.sort((a,b) => {
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                });

                setPlanets(data);
            } catch(error){
                console.log("error", error);
            }
        };

        fetchData();

    }, []);

    if(planets.length === 0){
        return (
            <div className='loading-page'>
                <img src='https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif' className='loading-gif' alt=''/>
            </div>
        )
    }

    const mainContent = content === 'table' ? <Table planets={planets}/> : <Chart planets={planets}/>

    return(
        <div>
            <div className='main-header'>
                <div className='main-title'>Star Wars Galaxy Statistics</div>
                <div className='main-nav'>
                    <div onClick={()=>setContent('table')}>Table</div>
                    <div onClick={()=>setContent('chart')}>Chart</div>
                </div>
            </div>
            {mainContent}
        </div>
    )
}

export default Dashboard;