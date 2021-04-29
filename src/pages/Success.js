import React, { Component } from 'react'
import {Button, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/contants';


export default class Success extends Component {
    componentDidMount(){
        axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          const carts = res.data;
          carts.map(function(item) {
            return axios
            .delete(API_URL+"keranjangs/"+item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
          }) 
        })
        .catch((error) => {
          console.log(error);
        });
    }

    render() {
        return (
            <div className="mt-4 text-center">
                <Image src="assets/images/Success2.png" width="500" />
                <h2>Sukses Pesan</h2>
                <p>Terimakasih Sudah Memesan</p>
                <Button variant="primary" as={Link} to="/">
                    Kembali
                </Button>
            </div>
        )
    }
}
