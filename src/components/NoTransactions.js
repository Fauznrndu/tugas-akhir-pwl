import React from 'react';
import transaction from "../assets/transaction.png";
import "./styles/NoTransaction.css"

const NoTransactions = () => {
  return (
    <div className='NoTransaction'>
      <img src={transaction} style={{ width:"300px", margin: "4rem" }}/>
      <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
        You Have No Transactions Currently
      </p>
    </div>
  );
}

export default NoTransactions;
