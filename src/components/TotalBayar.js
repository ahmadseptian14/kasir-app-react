import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Col, Row, } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from '../utils/contants';
import axios from 'axios'

export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.carts
        }

        axios
        .post(API_URL+"pesanans", pesanan)
        .then((res) => {
            this.props.history.push('/success')
        }) 
    }; 
  render() {
    const totalBayar = this.props.carts.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <>
      {/* Desktop */}
      <div className="fixed-bottom mr-2 d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }}>
              <h4>
                Total:{" "}
                <strong className="float-right">
                  Rp.{numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <Button variant="success" block className="mb-2 mt-2 mr-2" onClick={ () => this.submitTotalBayar(totalBayar) }>
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                <strong>Bayar</strong>
              </Button>
          </Col>
        </Row>
      </div>

      {/* Mobile */}
      <div className="mr-2 d-sm-block d-md-none">
        <Row>
          <Col md={{ span: 3, offset: 9 }}>
              <h4>
                Total:{" "}
                <strong className="float-right">
                  Rp.{numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <Button variant="success" block className="mb-2 mt-2 mr-2" onClick={ () => this.submitTotalBayar(totalBayar) }>
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                <strong>Bayar</strong>
              </Button>
          </Col>
        </Row>
      </div>
      </>
    );
  }
}
