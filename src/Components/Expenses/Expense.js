import React, { useEffect, useState } from "react";
import axios from "axios";

const Expense = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [expenseData, setExpenseData] = useState([]);
    const [editingExpenseId, setEditingExpenseId] = useState(null);

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
                data = Object.entries(data).map(([key, value]) => ({ ...value, _id: key }));

                console.log("data", data);
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
                amount,
                description,
                category,
            };


            const emailId = localStorage.getItem("email");
            const userid = emailId.replace(/[^a-zA-Z0-9\s]/g, "");
            const response = await axios.post(`https://expense-tracker-e0688-default-rtdb.firebaseio.com/expenses/${userid}.json`, obj)

            if (response.ok) {
                setExpenseData([...expenseData, obj]);
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
            const emailId = localStorage.getItem("email");
            const userid = encodeURIComponent(emailId.replace(/[^a-zA-Z0-9\s]/g, ""));

            const response = await axios(
                `https://expense-tracker-e0688-default-rtdb.firebaseio.com/expenses/${userid}/${_id}.json`,
                {
                    method: 'DELETE',
                }
            );

            if (response.status === 200) {
                const updatedExpenseData = expenseData.filter(item => item._id !== _id);
                setExpenseData(updatedExpenseData);
            } else {
                throw new Error(`Failed to delete the expense with _id: ${_id}`);
            }

        } catch (err) {
            console.error("Delete Expense Error:", err.response);
        }
    };


    const EditExpenseHandler = (_id) => {
        setEditingExpenseId(_id);

        const expenseToEdit = expenseData.find((item) => item._id === _id);

        // Set state with the values from the expense to be edited
        setAmount(expenseToEdit.amount);
        setDescription(expenseToEdit.description);
        setCategory(expenseToEdit.category);

        // Create updatedData object

    };

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
          const updatedData = {
            amount,
            description,
            category,
          };
      
          // Construct the URL for the axios PATCH request
          const emailId = localStorage.getItem("email");
          const userid = emailId.replace(/[^a-zA-Z0-9\s]/g, "");
          const apiUrl = `https://expense-tracker-e0688-default-rtdb.firebaseio.com/expenses/${userid}/${editingExpenseId}.json`;
          console.log("API URL:", apiUrl);
      
          // Log data and identifier before making the request
          console.log("Updated Data:", updatedData);
          console.log("Editing Expense ID:", editingExpenseId);
      
          // Make axios PATCH request to update the expense in Firebase
          const response = await axios.put(apiUrl, updatedData);
      
          // Log the response
          console.log("Firebase Response:", response);
      
          if (response.status !== 200) {
            throw new Error("Failed to update expense in Firebase");
          }
      
          if (response.status === 200) {
            setExpenseData((prevExpenseData) =>
              prevExpenseData.map((expense) =>
                (expense._id === editingExpenseId) ? { _id:editingExpenseId, ...updatedData } : expense
              )
            );
      
            setEditingExpenseId(null);
            setAmount('');
            setCategory('');
            setDescription('');
          }
        } catch (error) {
          console.error("Error updating expense:", error);
        }
      };
      



    return (
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
                        {!editingExpenseId ? <button className="btn btn-primary"onClick={SubmitExpenseHandler}>Submit</button>
                        :<button className="btn btn-primary" onClick={updateHandler}>Update</button>}
                    </form>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-muted font-italic">Expense List</h2>

                {expenseData.map((item, index) => (
                    <div key={index} className="alert alert-info">
                        <p> Amount:- {item.amount}  Description:- {item.description}  Category:- {item.category}</p>
                        <button className="btn btn-primary" onClick={() => DeleteExpenseHandler(item._id)}>Delete</button><span> </span>
                        <button className="btn btn-primary" onClick={() => EditExpenseHandler(item._id)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Expense;