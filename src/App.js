import React, { Component } from 'react'
import { Row, Col } from "react-bootstrap";
import {ListCategories, Hasil, NavbarComponent, Menus} from './components';
import {API_URL} from './utils/contants'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: [],
       chooseCategory: 'Makanan'
    }
  }

  componentDidMount() {
    axios
    .get(API_URL+"products?category.nama="+this.state.chooseCategory)
    .then(res => {
      const menus = res.data;
      this.setState({ menus });
    })
    .catch(error => {
      console.log(error);
    })
  }

  changeCategory = (value) => {
      this.setState({
        chooseCategory: value,
        menus: []
      })

      axios
      .get(API_URL+"products?category.nama="+value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      })
  }

  
  render() {
    const {menus, chooseCategory} = this.state
    return (
      <div className="App">
      <NavbarComponent />
      <Row>
          <ListCategories changeCategory={this.changeCategory} chooseCategory={chooseCategory}/>
          <Col className="mt-3">
            <h5>
              <strong>Daftar Produk</strong>
            </h5>
            <hr />
            <Row>
              { menus && menus.map((menu) => (
                <Menus
                  key={menu.id}
                  menu={menu}
                />
              ))}
            </Row>
          </Col>
          <Hasil />
      </Row>
    </div>
    )
  }
}
