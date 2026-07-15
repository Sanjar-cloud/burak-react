// @ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  changeDetail = () => {
    this.setState({ color: "blue", brand: "Tesla", model: "Model S", year: 2027 });
  };

  componentDidMount() {
  console.log("componentDidMount");
  //  page ochilganda =>  data base dan malumot olish uchun
}

 componentWillUnmount() {
  console.log("componentWillUnmount");
  // Page ni yashirishdan oldin qilinadigan mantiq 
}

 componentDidUpdate() {}


  render() {
    return (
      <div>
        <h1>My car is {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model}
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}

export default Test;
