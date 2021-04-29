import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListCategories, Hasil, Menus, NavbarComponent } from "../components";
import { API_URL } from "../utils/contants";
import axios from "axios";
import swal from "sweetalert";
import Login from './Login';

export default class Home extends Component {

  state = {};
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      chooseCategory: "Makanan",
      carts: [],
    };
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };

    axios.get("http://localhost:8000/api/user", config).then(
      res => {
        this.setState({
          user: res.data
        });
      },
      err => {
        console.log(err);
      }
    );

    axios
      .get(API_URL + "products?category.nama=" + this.state.chooseCategory)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getListCart();
  }

  getListCart = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const carts = res.data;
        this.setState({ carts });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      chooseCategory: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  inCarts = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const cart = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", cart)
            .then((res) => {
              this.getListCart();
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang" + cart.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const cart = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, cart)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang" + cart.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, chooseCategory, carts } = this.state;

   if(this.state.user) {
    return (
      <div>
        <NavbarComponent user={this.state.user} />
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              chooseCategory={chooseCategory}
            />
            <Col className="mt-3">
              <h5>
                <strong>Daftar Produk</strong>
              </h5>
              <hr />
              <Row className="overflow-auto menu">
                {menus &&
                  menus.map((menu) => (
                    <Menus key={menu.id} menu={menu} inCarts={this.inCarts} />
                  ))}
              </Row>
            </Col>
            <Hasil
              carts={carts}
              {...this.props}
              getListCart={this.getListCart}
            />
          </Row>
        </Container>
      </div>
    );
   }
   
   return (
     <div>
        <Login />
     </div>
     
   );
  }
}
