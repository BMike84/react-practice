import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.scss";
import Button from "react-bootstrap/Button";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const local = "http://localhost:3000";
  const addEmployee = () => {
    Axios.post(`${local}/create`, {
      name,
      age,
      country,
      position,
      wage,
    }).then(() => console.log("Success"));
  };

  const showEmployee = () => {
    Axios.get("http://localhost:3000/show").then((res) =>
      setEmployeeList(res.data)
    );
  };

  return (
    <div className="App">
      <div className="info">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => setAge(event.target.value)}
        ></input>
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => setCountry(event.target.value)}
        ></input>
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => setPosition(event.target.value)}
        ></input>
        <label>Wage:</label>
        <input
          type="number"
          onChange={(event) => setWage(event.target.value)}
        ></input>
        <div className="btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addEmployee}
          >
            Add Employee
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={showEmployee}
          >
            Show Employee
          </button>
          <div className="employees">
            <h2>Employees</h2>
            {employeeList.map((val, key) => {
              return (
                <div key={val.name} className="employee">
                  <h4>Name: {val.name}</h4>
                  <h4>Age: {val.age}</h4>
                  <h4>Country: {val.country}</h4>
                  <h4>Position: {val.position}</h4>
                  <h4>Wage: {val.wage}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
