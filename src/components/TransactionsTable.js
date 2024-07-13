import { Radio, Select, Table } from 'antd';
import { Option } from 'antd/es/mentions';
import React, { useState } from 'react';
import "./styles/TransactionsTable.css"
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';

const TransactionsTable = ({transactions, addTransaction, fetchTransactions}) => {
  const {Option} = Select;
  const [sortKey, setSortKey] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const columns = [
    {
      title: "Name",  
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
  ]
  
  let filteredTransactions = transactions.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)) ;//sebuah variabel untuk menfilter pencarian dan opsi tipe transaksi
  let sortedTransactions = [...filteredTransactions].sort((a,b) => { //sebuah variabel untuk sortir data transaksi berdasarkan waktu dan nominal menggunakan teknik Subtraction
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    }else if (sortKey === "amount") {
      return a.amount - b.amount;
    }else{
      return 0;
    }
  })

  function exportCSV() {//sebuah fungsi untuk menkonversi data objek javaScript menjadi format csv
    var csv = unparse({
      fields: ["name", "type","category", "amount", "date"],
      data: transactions,
    });
    const blob = new Blob([csv],{ type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCSV(event) {//sebuah fungsi untuk mengkonversi data csv menjadi objek array javaScript
    event.preventDefault();
    try{
      parse(event.target.files[0],{
        header: true,
        complete: async function (results) {
          for (const transaction of results.data){
            const newTransaction = {
              ...transaction,
              amount:parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true)
          }
        },
      });
      toast.success("All Transaction Added");
      fetchTransactions();
      event.target.files = null;
    }catch(e){
      toast.error(e.message);
    }
  }

  return (
    <div className='' style={{ width:"95%",padding:"0rem 2rem", margin:"auto"}}>
      <div className='' style={{ display:"flex", justifyContent:"space-between", gap:"1rem", alignItems:"center", marginBottom:"1rem" }}>
        <div className='input-flex'>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by name'/>
        </div>
        <Select className='select-input' onChange={(value)=>setTypeFilter(value)} value={typeFilter} placeholder= "Filter" allowClear>
          <Option value='' >All</Option>
          <Option value='income'>Income</Option>
          <Option value='expense'>Expense</Option>
        </Select>
      </div>
      <div className='my-table'>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%", marginBottom:"1rem"}}>
          <h2 style={{ marginLeft:"1rem" }}>My Transactions</h2>
          <Radio.Group className='input-radio' onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
              <Radio.Button value=""  style={{ borderRadius:"0"}}>No Sort</Radio.Button>
              <Radio.Button value="date" style={{ borderRadius:"0" }}>Sort by Date</Radio.Button>
              <Radio.Button value="amount" style={{ borderRadius:"0" }}>Sort by Amount</Radio.Button>
            </Radio.Group>
            <div style={{ display:"flex", justifyContent:"center", gap: "0.5rem", width:"250px"}}>
              <button className='button' onClick={exportCSV}>Export to CSV</button>
              <label for="file-csv" className='button'>Import to CSV</label>
              <input onChange={importFromCSV} id="file-csv" type="file" accept=".csv" required style={{ display:"none" }} />
            </div>
          </div>
          <Table dataSource={sortedTransactions} columns={columns}/>
      </div>
    </div>
    
    
  )
}

export default TransactionsTable;
