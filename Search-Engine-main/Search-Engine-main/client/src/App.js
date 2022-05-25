import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
// import JsonFind from "json-find";

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState()
  const [location, setLocation] = useState()
  // const [search, setSearch] = useState()
  const [searchData,setSearchData] = useState({})

  useEffect(() => {
    axios.get("http://localhost:8080/data")
    .then(function (data) {
      setData(data.data)
    }).catch(function (err) {
      console.log(err)
    })
  }, [])
  
  
  function submit() {
    try {
      const details={name,location};
      axios.post('http://localhost:8080/update/data',details)
      .then(function (data) {
        setData(data.data)
      })
    } catch (err) { console.log(err) }
  }
  
  function breathfirstsearch(){
    let items=[];
    for(let i=0; i<data.length; i++){
      if(data[i].name === searchData || data[i].location === searchData)
        items.push(data[i])
    }
    setData(items)
  }
  
  function display() {
    return (
      <div className="col">
        {data.map(items => <div className='bg-white br3 shadow-4 w-60 grow pointer tc center mt2 pa3'>
          <strong className='sans-serif mid-gray'>Name: </strong>{items.name}
          <strong className='ml2 sans-serif mid-gray'>Location: </strong>{items.location}
        </div>)}
      </div>
    );
  }
  
  return (
    <div className="App flex flex-column">
      <div className="wrap">
        <div className="search">
          <input onChange={(e) => setSearchData(e.target.value)} type="text" className="searchTerm" placeholder="Enter location or name to lookfor?" />
          <button onClick={breathfirstsearch}  className="searchButton">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className='mt6 tc mb4'>
        <h4 className='sans-serif mid-gray'>Add New Person with Location:</h4>
        <input onChange={(e) => setName(e.target.value)} placeholder='enter name:' className='pa2 br3 shadow-5 grow' />
        <input onChange={(e) => setLocation(e.target.value)} placeholder='enter location:' className='ml2 pa2 br3 shadow-5 grow' />
        <button onClick={submit} className='button ml3'>Add!</button>
      </div>
      <div className='mt1'>
        {display()}
      </div>
    </div>
  );
}

export default App;
