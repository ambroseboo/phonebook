import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {

   // new line start
  const [data, setData] = useState(null)

  function getData() {
    axios.get('/data')
    .then((response) => {
      const res = response.data
      console.log(res)
      setData(({
        name: res[0].name,
        phone_number: res[0].phone_number,
        address_field: res[0].address_field
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    //end of new line 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* new line start*/}
        <p>To get your details: </p><button onClick={getData}>Click me</button>
        {data && <div>
              <p>Name: {data.name}</p>
              <p>Phone Number: {data.phone_number}</p>
              <p>Address Field: {data.address_field}</p>
            </div>
        }
         {/* end of new line */}
      </header>
    </div>
  );
}

export default App;