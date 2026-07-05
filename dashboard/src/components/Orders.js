import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/allorders`, { withCredentials: true }).then((res) => {
      setAllOrders(res.data);
    });
  }, []);

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <h3 className="title">Orders ({allOrders.length})</h3>
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price.toFixed(2)}</td>
                    <td className={order.mode === "BUY" ? "profit" : "loss"}>{order.mode}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
