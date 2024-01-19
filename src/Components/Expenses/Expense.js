import React, { useEffect, useState } from "react";
import axios from "axios";
import './Expense.css'

import Papa from 'papaparse';
import { saveAs } from 'file-saver';


import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../../store/store";
import { toggleTheme } from "../../store/store";

const Expense = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.auth.userId);
  const expenses = useSelector((state) => state.expenses.expenses);
  const isDarkTheme = useSelector((state)=> state.theme.isDarkTheme)


  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  // const [expenseData, setExpenseData] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [activatePremium, setActivatePremium] = useState(false)


  const categories = ["Food", "Petrol", "Salary", "Other"];


  const calculateTotalExpenses = () => {
    const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    // dispatch(setExpenses(expenseData));
    return totalExpenses;
  };


  useEffect(() => {
    // const emailId = localStorage.getItem("email");
    // const userid = emailId.replace(/[^a-zA-Z0-9\s]/g, "");
    // console.log("Expenses from Redux Store:", expenses);

    const fetchExpenses = async () => {
      try {

        const response = await axios.get(
          `https://expense-tracker-e0688-default-rtdb.firebaseio.com/expenses/${userid}.json`
        );


        let data = response.data;
        data = Object.entries(data).map(([key, value]) => ({ ...value, _id: key }));

        dispatch(setExpenses(data));
        // console.log("data", data);
        // setExpenseData(data);

      } catch (err) {
        console.log(err);
      }
    }

    fetchExpenses();
  }, [dispatch]);

  const SubmitExpenseHandler = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        amount,
        description,
        category,
      };


      const response = await axios.post(`https://expense-tracker-e0688-default-rtdb.firebaseio.com/expenses/${userid}.json`, obj)

      if (response.status === 200) {
        // setExpenseData([...expenseData, obj]);
        dispatch(setExpenses([...expenses, obj]));
      } else {

        console.log("Error while posting");
      }

      // console.log(response);

      setAmount("");
      setDescription("");
      setCategory("");
    } catch (err) {
      console.log(err);

    }

  };

  const DeleteExpenseHandler = async (_id) => {
    try {

      const response = await axios(
        `https://expense-tracker-e0688-default-rtdb.firebaseio.com/expenses/${userid}/${_id}.json`,
        {
          method: 'DELETE',
        }
      );

      if (response.status === 200) {
        const updatedExpenseData = expenses.filter(item => item._id !== _id);
        dispatch(setExpenses(updatedExpenseData));
        calculateTotalExpenses();
      } else {
        throw new Error(`Failed to delete the expense with _id: ${_id}`);
      }

    } catch (err) {
      console.error("Delete Expense Error:", err.response);
    }
  };


  const EditExpenseHandler = (_id) => {
    setEditingExpenseId(_id);

    const expenseToEdit = expenses.find((item) => item._id === _id);

    setAmount(expenseToEdit.amount);
    setDescription(expenseToEdit.description);
    setCategory(expenseToEdit.category);
    calculateTotalExpenses();


  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        amount,
        description,
        category,
      };


      const apiUrl = `https://expense-tracker-e0688-default-rtdb.firebaseio.com/expenses/${userid}/${editingExpenseId}.json`;
      console.log("API URL:", apiUrl);

      console.log("Updated Data:", updatedData);
      console.log("Editing Expense ID:", editingExpenseId);

      const response = await axios.put(apiUrl, updatedData);

      // Log the response
      console.log("Firebase Response:", response);

      if (response.status !== 200) {
        throw new Error("Failed to update expense in Firebase");
      }

      if (response.status === 200) {
        setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          (expense._id === editingExpenseId) ? { _id: editingExpenseId, ...updatedData } : expense
        ))
      

        setEditingExpenseId(null);
        setAmount('');
        setCategory('');
        setDescription('');
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const PremiumHandler=()=>{
    dispatch(toggleTheme());
    setActivatePremium(!activatePremium);
  }

  const downloadCSV = () => {
    // Convert expenses data to CSV format
    const csvData = Papa.unparse(expenses);

    // Create a Blob with the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    // Use file-saver to save the Blob as a CSV file
    saveAs(blob, 'expenses.csv');
  };
  const totalExpenses = calculateTotalExpenses();
 

  return (
    <div className={`container text-center mt-5 ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
    <div className="container text-center mt-5">
      <h1 className="display-4">Expense Data</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form >
            <div className="form-group">
              <label htmlFor="amount">Expense:</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((categoryOption) => (
                  <option key={categoryOption} value={categoryOption}>
                    {categoryOption}
                  </option>
                ))}
              </select>
            </div>
            {!editingExpenseId ? <button className="btn btn-primary" onClick={SubmitExpenseHandler}>Submit</button>
              : <button className="btn btn-primary" onClick={updateHandler}>Update</button>}
          </form>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-muted font-italic">Expense List</h2>


        {expenses.map((item, index) => (
          <div key={index} className="alert alert-info">
            <p> Amount:- {item.amount}  Description:- {item.description}  Category:- {item.category}</p>
            <button className="btn btn-primary" onClick={() => DeleteExpenseHandler(item._id)}>Delete</button><span> </span>
            <button className="btn btn-primary" onClick={() => EditExpenseHandler(item._id)}>Edit</button>
          </div>
        ))}

      </div>


      <p className="alert alert-danger"><strong> Total Amount:-</strong> {totalExpenses}</p>
      {totalExpenses > 10000 && (
        <button type="button" className="btn btn-success" onClick={PremiumHandler}>
          Activate Premium
        </button>
      )}
      <span> </span>
      {activatePremium && <button className="btn btn-success" onClick={downloadCSV}>Download Expense</button>}


    </div>
    </div>
  );
};

export default Expense;