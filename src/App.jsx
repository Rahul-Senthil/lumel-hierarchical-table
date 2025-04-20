import Table from "./components/Table";
import './App.css'


const App = () => {
  return (
    <div className="App">
      <h3 style={{textAlign: "center"}}>Hierarchical Table</h3>
      <div className="heirarchical-table">
        <Table/>
      </div>
    </div>
  )
}

export default App;