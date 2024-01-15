import React, { useEffect, useState } from "react";
import axios from "axios";

const Expense = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [expenseData, setExpenseData] = useState([]);

    const categories = ["Food", "Petrol", "Salary", "Other"];

    useEffect(() => {
        const emailId = localStorage.getItem("email");
        const userid = emailId.replace(/[^a-zA-Z0-9\s]/g, "");
    
        async function fetchExpenses() {
          try {
            const response = await axios.get(
              `https://expense-tracker-e0688-default-rtdb.firebaseio.com/expenses/${userid}.json`
            );
        
            let data = response.data;
            data = Object.values(data);
            console.log("data=", data);
            setExpenseData(data);
          
          } catch (err) {
            console.log(err);
          }
        }
    
        fetchExpenses();
      }, []);

    const SubmitExpenseHandler = async (e) => {
        e.preventDefault();
        try {
            const obj = {
                id: Math.random().toString(),
                amount,
                description,
                category,
            };
            const emailId = localStorage.getItem("email");
            const userid = emailId.replace(/[^a-zA-Z0-9\s]/g, "");
            const response = await fetch(`https://expense-tracker-e0688-default-rtdb.firebaseio.com/expenses/${userid}.json`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                }
            )
            const data = await response.json(); ;
            console.log(data);
            setAmount("");
            setDescription("");
            setCategory("");
        } catch(err) {
            console.log(err);

        }

    };

    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Expense Data</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={SubmitExpenseHandler}>
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
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-muted font-italic">Expense List</h2>

                {expenseData.map((item, index) => (
                    <div key={index} className="alert alert-info">
                        <p> Amount:- {item.amount}  Description:- {item.description}  Category:- {item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Expense;