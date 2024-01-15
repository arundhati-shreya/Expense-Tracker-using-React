import React, { useState } from "react";

const Expense = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [expenseData, setExpenseData] = useState([]);

    const categories = ["Food", "Petrol", "Salary", "Other"];

    const SubmitExpenseHandler = (e) => {
        e.preventDefault();
        const newExpense ={
            Amount: amount,
            Des: description,
            Cat: category
        };

        setExpenseData([...expenseData, newExpense]);
        setDescription('');
        setAmount('');
        setCategory('');
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
                        {item.Des} - {item.Amount} - {item.Cat}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Expense;