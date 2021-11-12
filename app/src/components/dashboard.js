import React, {useState, useEffect} from 'react';
import Table from './table';

const Dashboard = () => {

    const [planets, setPlanets] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(()=>{
        const url = 'https://swapi.dev/api/planets/';

        const fetchData = async()=>{
            try{
                let response = await fetch(url);
                let json = await response.json();
                let array = json.results;
                // setPlanets(json.results);
                while(json.next){
                    response = await fetch(json.next);
                    json = await response.json();
                    array = array.concat(json.results);
                }
                array.sort((a,b) => {
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                });
                let temp = []
                for(let i = 0; i<array.length;i+=10){
                temp.push(array.slice(i,i+10));
                }
                setPlanets(temp);

            } catch(error){
                console.log("error", error);
            }
        };

        fetchData();

    }, []);

    if(planets.length === 0){
        return null;
    }

    console.log(planets);
    return(
        <div>
            <Table planets={planets[page]}/>
            <div onClick={()=>setPage(page>0 ? page - 1 : 0)}>Previous</div>
            <div onClick={()=>setPage(page < planets.length - 1 ? page + 1 : page)}>Next</div>
        </div>
    )
}

export default Dashboard;