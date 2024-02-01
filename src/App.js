import Papa from "papaparse";
import food from"./foodlist2.csv"
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Markdown from "react-markdown";

async function fetchModalData(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}

function Food(props){
  const food = props.food
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    setShow(true);
    const fetchData = await fetchModalData(`recipes/${food.Recipe}`);
    setData(fetchData);
    console.log(fetchData)
  };
  //console.log(data)
  return(
    <div key={food.Dish} style={{margin: "10px",}} >
         <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`images/${food.Image}`}
          alt={food.Dish}
        />
        <Card.Body>
          <Card.Title>{food.Dish}</Card.Title>
          <Button variant="primary" onClick={handleShow}>
          Recipe
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{food.Dish}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Markdown>{data}</Markdown>
        </Modal.Body>
      </Modal>

    </div>
  )
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      search: "",
      root: "",
      spirit: "",
    };
  }
  async componentDidMount() {
    const response = await fetch(food);
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, { header: true }).data;
    this.setState({ data: parsedData });
  }
  render(){
    const { data ,root,spirit,search} = this.state;
    if (data === null) {
      return "loading...";
      }
    const foods = data.map((food)=>{
      return<Food food={food} key={food.Dish} />
    })

    return(
      <div>
        {/* <h1>rrrrrrrrrrrrrr</h1>
        <ul>
          {data.map(cocktail => <li>{cocktail['Dish']}</li>)}
        </ul>  */}
        <div 
          className="App"
          style={{
            display: "flex",
            width: "80%",
            margin: "10px auto",
            flexWrap: "wrap",
            justifyContent: "center",
            
          }}
        >
          {foods}

        </div>

      </div>
    )
  }
}

export default App;
