import React from 'react';
import "./styles/Cards.css";
import { Row } from 'antd';
import Card from 'antd/es/card/Card';
import Button from './Button';

const Cards = ({income, expense, totalBalance, showExpenseModal, showIncomeModal}) => {
  return (
    <div>
      <Row className='row'>
        <Card className="card">
          <h2>Current Balance</h2>
          <p>Rp {totalBalance} </p>
          <Button text="Reset Balance" dark={true}/>
        </Card>
        <Card className="card" >
          <h2>Total Income</h2>
          <p>Rp {income}</p>
          <Button text="Add Income" onClick={showIncomeModal} dark={true}/>
        </Card>
        <Card className="card">
          <h2>Total Expense</h2>
          <p>Rp {expense}</p>
          <Button text="Add Expense" onClick={showExpenseModal} dark={true}/>
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
