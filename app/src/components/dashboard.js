import React, {useState, useEffect} from 'react';
import Table from './table';
import './dashboard.css'


const Dashboard = () => {

    const [planets, setPlanets] = useState([]);
    // const [page, setPage] = useState(0);

    useEffect(()=>{
        const url = 'https://swapi.dev/api/planets/';

        const fetchData = async()=>{
            try{
                let response = await fetch(url);
                let json = await response.json();
                let data = json.results;
                // setPlanets(json.results);
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
                <img src='https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif' className='loading-gif'/>
            </div>
        )
    }

    console.log(planets);
    return(
        <div>
            <Table planets={planets}/>
        </div>
    )
}

export default Dashboard;