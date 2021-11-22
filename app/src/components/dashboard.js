import React, {useState, useEffect} from 'react';
import PlanetsTable from './table/PlanetsTable';
import PlanetsChart from './chart/PlanetsChart';
import './dashboard.css'


const Dashboard = () => {

    const [planets, setPlanets] = useState([]);
    const [content, setContent] = useState('table');

    //on mount, fetch all data from api, sort it alphabetically, and set it to state
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

    //while data is fetching, display loading gif
    if(planets.length === 0){
        return (
            <div className='loading-page'>
                <img src='https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif' className='loading-gif' alt=''/>
            </div>
        )
    }

    //display table or chart depending on user selection
    const mainContent = content === 'table' ? <PlanetsTable planets={planets}/> : <PlanetsChart planets={planets}/>

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