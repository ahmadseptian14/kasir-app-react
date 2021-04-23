import React, { Component } from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from '../utils/utils';

export default class Hasil extends Component {
  render() {
    const {carts} = this.props
    return (
      <Col md={3} className="mt-3">
        <h5 className="text-center">
          <strong>Hasil</strong>
        </h5>
        <hr />
        {carts.length !== 0 && (
            <ListGroup variant="flush">
            {carts.map((cartList) => (
                  <ListGroup.Item>
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
          </ListGroup>
        )}
        
      </Col>
    );
  }
}
