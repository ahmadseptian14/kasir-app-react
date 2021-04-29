import React, { Component } from "react";
import { Col, ListGroup, Row, Badge, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { ModalCart } from "./ModalCart";
import TotalBayar from "./TotalBayar";
import axios from "axios";
import { API_URL } from "../utils/contants";
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cartDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (cartList) => {
    this.setState({
      showModal: true,
      cartDetail: cartList,
      jumlah: cartList.jumlah,
      keterangan: cartList.keterangan,
      totalHarga: cartList.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.cartDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.cartDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.cartDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.cartDetail.id, data)
      .then((res) => {
        this.props.getListCart();
        swal({
          title: "Update Pesanan",
          text: "Sukses Update Pesanan" + data.product.nama,
          icon: "success",
          button: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        this.props.getListCart();
        swal({
          title: "Hapus Pesanan",
          text: "Sukses Update Pesanan" + this.state.cartDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { carts } = this.props;
    return (
      <Col md={3} className="mt-3">
        <h5 className="text-center">
          <strong>Pesanan</strong>
        </h5>
        <hr />
        {carts.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {carts.map((cartList) => (
                <ListGroup.Item
                  key={cartList.id}
                  onClick={() => this.handleShow(cartList)}
                  style={{ cursor: "pointer" }}
                >
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {cartList.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{cartList.product.nama}</h5>
                      <p>Rp. {numberWithCommas(cartList.product.harga)}</p>
                    </Col>
                    <Col>
                      <p>Rp. {numberWithCommas(cartList.total_harga)}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ModalCart
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                hapusPesanan={this.hapusPesanan}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar carts={carts} {...this.props} />
      </Col>
    );
  }
}
