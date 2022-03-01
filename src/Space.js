import React from 'react';
class Space extends React.Component {


  constructor(props){  
    super(props);
    this.state = {
      asteroidList : {}
    };
  }

componentDidMount(){
  this.fetchRock();
}
fetchRock(){
  const API_KEY = 'fwlvjihpE1XYyI7gG2eFtBYytWa8gUPSqOjdSh4g';
  let start_date = '2022-02-27';
  let end_date = '2022-03-01';
  let api_call = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`;
  let listDate = [];
  fetch(api_call)
      .then((res) => res.json())
        
      .then((data) => {
        console.log(data);
       for(const date in data.near_earth_objects){

        const newList = { ...this.state.asteroidList, date: data.near_earth_objects[date] };

        this.setState( { asteroidList : newList } )

        console.log("this is the date " + date);
  
        listDate.push(date);
        
       }

       console.log(this.state.asteroidList);
       console.log("this is it " + listDate);
       
        }
      )
}
  render() {
    
    
    const asteroidInfo = this.state.asteroidList.forEach( (list) =>{
      (list.map((asteroid) => 
        
        <tr index = {asteroid.name}>
          <td>{asteroid.name}</td>
        </tr>
        )
      )
    });

    

    return (
      
      <div>
        <h1>Asteroids Near Earth</h1>
       
        <table>
           <tbody>
             <tr>
               <th>Name</th>
             </tr>
             {asteroidInfo}
           </tbody>
        </table> 
          
       

      </div>
    )
  }
}
export default Space;