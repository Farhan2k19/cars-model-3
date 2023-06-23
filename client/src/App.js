import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'


function App() {

  const [cars, setCars] = useState("")
  const [newCar, setnewCar] = useState("")

  useEffect(() => {
    fetch("http://localhost:3000/cars")
    .then((res) => res.json())
    .then((data) => {
      setCars(data)
      console.log(data)
    })
  }, [])
    


  return (
    <div className="App">
              
    <div className="newCar">
      <input type="text" placeholder="name" onChange={(e) => setnewCar({...newCar, name: e.target.value})}/>
      <input type="text" placeholder="model" onChange={(e) => setnewCar({...newCar, model: e.target.value})}/>
      <input type="text" placeholder="color" onChange={(e) => setnewCar({...newCar, color: e.target.value})}/>
      <button onClick={() => {
        fetch("http://localhost:3000/newCar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCar),
        })
        .then((res) => res.json())
        .then((data) => {
          setCars([...cars, data])
        })
      }}>Add Car</button>
    {/* koasdlmsdlal */}
      
    </div>
     
        
    <div className="updateCar">
      <input type="text" placeholder="id" onChange={(e) => setnewCar({...newCar, _id: e.target.value})}/>
      <input type="text" placeholder="color" onChange={(e) => setnewCar({...newCar, color: e.target.value})}/>
      <button onClick={() => {
        fetch(`http://localhost:3000/updateCar/${newCar._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCar),
        })
        .then((res) => res.json())
        .then((data) => {
          // update the cars state
          const newCars = cars.map((car) => {
            if(car._id === data._id){
              return data
            } else {
              return car
            }
          }
          )
          setCars(newCars)

        })
      }}>Update Car</button>

      </div>
    <div className="cars">
      {cars && cars.map((car) => (
        <div className="car" key={car._id}>
          <h2>{car.name}</h2>
          <h2>{car._id}</h2>

          <h3>{car.model}</h3>
          <h3>{car.color}</h3>
          </div>
      ))}
          
       </div>
       </div>

      
  );
      }
  

export default App;
