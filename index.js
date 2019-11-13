//React from scracth ->
//https://medium.com/@amanriquez.guitar/full-stack-react-node-application-from-scratch-2019-4023df0a37fb

//react-8uxfh9
import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './style.css';

// GitHub usernames: wnlima, las82, csdias, luisfdc, matheusbeserra
const testData = [
    { id: 1, name: "Willian Santos Lima", avatar_url: "https://avatars2.githubusercontent.com/u/11538626?v=4", company: "Banco Alfa"},
    { id: 2, name: "Leandro Alves Santos", avatar_url: "https://avatars2.githubusercontent.com/u/16105383?v=4", company: "Aubay"},
    { id: 3, name: "Carlos Soares Dias", avatar_url: "https://avatars2.githubusercontent.com/u/16576809?v=4", company: "Aubay"},
    { id: 4, name: "Luis Fernando Dias Campos", avatar_url: "https://avatars2.githubusercontent.com/u/18577267?v=4", company: "MarketUP"},    
    { id: 5, name: "Matheus Lima Beserra", avatar_url: "https://avatars0.githubusercontent.com/u/19615564?v=4", company: "Banco Alfa"}     
];

const CardList = (props) => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('houve uma renderização'); 

    return (() => { console.log('função de limpeza do hook useEffect'); });
    //or return () => { console.log('função de limpeza do hook useEffect'); }
  });
  

  return <div>
            {props.profiles.map( profile => <Card key={profile.id} {...profile}/> )}
            <button onClick={ () => setCount(count + 1)} >Click me!</button>
            <p> You clicked me {count} times</p>            
        </div>
}

const Card = (props) => {
  return <div className="github-profile">
  <img src={props.avatar_url}></img>
  <div className="info">
    <div className="name">{props.name}</div>
    <div className="company">{props.company}</div>
  </div>
  </div>
}

class Form extends React.Component {

  constructor(props){
    super(props);
    this.state = {userName : ''};
  }

  handleSubmit = async (event) => {

    event.preventDefault();

    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);

    props.onSubmit(resp.data);

    this.setState({userName : ''});

  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          value={this.state.userName} 
          onChange={ event => this.setState({userName: event.target.value}) }
          placeholder="GitHub user name">
        </input>
        <button>Search</button>
      </form>)
  }
}

//const App = (props) => {
  //const [valor, setValor] = React.useState(8);
  //return <div><div className="header">{valor}</div><button onClick={() => setValor(9)} ></button></div>
//}

//const App = (props) => <div className="header">{props.title}</div>

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { profiles : testData };
  }

  addNewProfile = (newProfile) => {
    this.setState(prevState => ({ profiles: [...prevState.profiles, newProfile]}));
  }

  render(){
    return (<div><div className="header">{this.props.title}</div><Form onSubmit={this.addNewProfile}/><CardList profiles={this.state.profiles}/></div>)
  }
}

render(<App title="The GitHub Cards App" />, document.getElementById('root'));

