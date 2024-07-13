import React from "react";
import "./styles/Chart.css";
import { Pie } from "@ant-design/charts";
import { Line } from "@ant-design/charts";

const ChartComponent = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount, type: item.type };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return {
        category: transaction.category,
        amount: transaction.amount,
        date: transaction.date,
      };
    }
  });

  let finalSpendings1 = spendingData.reduce((acc, obj) => { // sebuah method untuk menfilter object array pada diagram pie
    let key = obj.category;
    if (!acc[key]) {
      acc[key] = { category: obj.category, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  let finalSpendings2 = spendingData.reduce((acc, obj) => { // sebuah method untuk menfilter object array pada diagram line
    let key = obj.date;
    // let keyy = obj.type
    if (!acc[key]) {
      acc[key] = { date: obj.date, amount: obj.amount, type: obj.type };
    } else {
      // {acc[key].type == obj.type ?  acc[key].amount += obj.amount : acc[key].amount -= obj.amount}
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});

  // console.log("final spending : ", Object.values(finalSpendings1)) 
  // console.log("final data : ", Object.values(finalSpendings2));

  const spendingConfig = {
    data: Object.values(finalSpendings1),
    width: 500,
    angleField: "amount",
    colorField: "category",
    label: {
      text: "amount",
      style: {
        fontWeight: "bold",
      },
    },
  };

  const config = {
    data: Object.values(finalSpendings2),
    width: 850,
    xField: "date",
    yField: "amount",
  };

  let pieChart;
  let lineChart;

  return (
    <div className="chart-wrapper">
      <div style={{}}>
        <h2>Your Analitics</h2>
        <Line
          {...config}
          onReady={(chartInstance) => (lineChart = chartInstance)}
        />
      </div>
      <div style={{}}>
        <h2>Your Spendings</h2>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );
};

export default ChartComponent;
