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
    const start_date = '2022-02-27';
    const end_date = '2022-03-01';
    const api_call = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`;
    const listDate = [];
    
    fetch(api_call)
      .then((res) => res.json())
      .then((data) => {
        for(const date in data.near_earth_objects){
          const newList = { ...this.state.asteroidList, date: data.near_earth_objects[date] };
          this.setState( { asteroidList : newList } )
    
          listDate.push(date);
        }
      });
  }

  generateTable = () => {

    const { asteroidList } = this.state;
    const asteroidInfo = [];

    for (const key in asteroidList) {
      console.log("before: ", asteroidInfo)
      for (const asteroid in asteroidList[key]) {
        asteroidInfo.push((
          <tr index={asteroid.name} key={asteroid.name}>
           <td>{asteroid.name}</td>
          </tr>)
        )
      }
      console.log(asteroidList[key]);
      console.log("after: ", asteroidInfo)
    }

    return asteroidInfo;
  }

  render() {

    //const asteroidInfo = this.generateTable();

    const { asteroidList } = this.state;
    const asteroidInfo = Object.entries(asteroidList).map(([key, value]) => {
      return value.map((asteroid) => {
        return (<tr index={asteroid.name} key={asteroid.name}>
          <td>{asteroid.name}</td>
         </tr>)
      })
    })

    console.log(asteroidInfo)

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