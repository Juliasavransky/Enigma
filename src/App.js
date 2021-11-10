import './App.css';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

//in this project i using axios fot fetching the data from the Bitstamp api
//bootstrap to design the table
//useEffect to make the call to api call 
//useState to save the data from the api
//Thank you

const App = () => {
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    axios.get('https://www.bitstamp.net/api/order_book/{btcusd}/')
      .then(res => {
        setCoin(res.data)
        console.log("all the data", res.data) //all the data from API
      }).catch(err => console.error(err, "Error!!!"))
  })// <= no dependency for running the updates

  const asks = coin.asks;
  const bids = coin.bids;
  console.log('asks' ,asks);
  console.log('bids',bids);

  return (
    <Container className="container">
      <h1 className="header" >BTC-USD</h1>

      <div className="tables">
        <div>
          <Table
            className="bids"
            striped bordered hover 
            size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Bid Price</th>
                <th>Bid Qty</th>
              </tr>
            </thead>
            <tbody>
              {bids && bids.map((item, index) => (
                <tr key={item[0]}>
                  <td>{index + 1}</td>
                  <td> {item[0]}</td>
                  <td>{item[1]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>
          <Table
            className="asks"
            striped bordered hover size="sm">
            <thead >
              <tr>

                <th>Ask Price</th>
                <th>Ask Qty</th>
              </tr>
            </thead>
            <tbody>
              {asks && asks.map(item => (
                <tr key={item[0]}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
}

export default App;
