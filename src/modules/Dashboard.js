import React, { useEffect, useState } from 'react';
import "./styles/Dashboard.css"
import Cards from '../components/Cards';
import AddExpense from '../components/AddExpense';
import AddIncome from '../components/AddIncome';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import TransactionsTable from '../components/TransactionsTable';
import ChartComponent from '../components/ChartComponent';
import NoTransactions from '../components/NoTransactions';

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [TotalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState([]);
  const [user]= useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  }
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  }
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  }
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values, type) => { //fungsi untuk menyimpan data object dari form 
    // console.log("On Finish", values, type)
    const newTransaction = {
      type: type,
      date: values.date.format("DD-MM-YYYY"),
      amount: parseFloat(values.amount),
      category: values.category,
      name: values.name,
    };
    addTransaction(newTransaction); 
  };

  async function addTransaction(transaction, many) { //fungsi untuk menambah data transaksi ke doc
    try{
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if(!many) toast.success("Transaction Added!");
      let newArr = transactions; //menambah transaksi terbaru ke yang sudah ada 
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    }catch(e){
      console.error("Error adding document: ", e);
      if(!many) toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {//sebuah hook untuk mengambil semua dokumen pada koleksi
  fetchTransactions();
  }, [user]);

  async function fetchTransactions(){//fungsi untuk query dokumen dari koleksi ke objek array
    setLoading(true);
    if (user) {
      const q = query(collection(db,`users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc)=> {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      // console.log("Transactions Array ", transactionsArray);
      // toast.success("Transaction Fetched!");
    }
    setLoading(false);
  }

  useEffect(() => { //sebuah hook yang berjalan jika ada perubahan pada state transaksi 
    calculateBalance();
  }, [transactions]);

  const calculateBalance  = () => { //sebuah fungsi untuk kalkulasi pada data transaksi 
    let incomeTotal = 0;
    let expenseTotal = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      }else{
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  };

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (  
    <>
      <div className='dashboard'>
        {loading?(<p>Loading...</p>):(<>
          <Cards showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal} income={income} expense={expense} totalBalance={TotalBalance} />
          {transactions.length !=0 ? <ChartComponent sortedTransactions={sortedTransactions}/>:<NoTransactions />}
          <AddExpense isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish}/>
          <AddIncome isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish}/>
          <TransactionsTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions}/>
        </>)}
      </div>
    </>
  );
}

export default Dashboard;