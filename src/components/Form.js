import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransaction } from '../features/transaction/transactionSlice';

const Form = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [editMode, setEditMode] = useState(false);
    const { isLoading, isError, error, editing } = useSelector(state => state.transaction);
    
    const reset = () => {
        setName("");
        setType("");
        setAmount("");
    }
    
    // listen for edit mode active
    useEffect(() => {
        const { id, name, amount, type } = editing || {};
        if (editing?.id) {
            setEditMode(true);
            setName(name);
            setType(type);
            setAmount(amount);
        } else {
            reset()
        }
    }, [editing]);


    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(
            createTransaction({
                name,
                type,
                amount: Number(amount),
            })
        );
        reset();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(changeTransaction({
            id: editing.id,
            data: {
                name: name,
                amount: amount,
                type: type,
            }
        }))
        reset()
        setEditMode(false);
    }

    const cancelEditMode = () => {
        reset();
        setEditMode(false);
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="enter title"
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="type"
                            name="type"
                            checked={type === 'income'}
                            onChange={e => setType('income')}
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === 'expense'}
                            onChange={e => setType('expense')}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        placeholder="enter amount"
                        name="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                    />
                </div>

                <button className="btn" type='submit' disabled={isLoading}>
                    {editMode ? "Update Transaction" : "Add Transaction"}
                </button>

                {
                    !isLoading && isError && <p className="error">An Error Occured: {error}</p>
                }
            </form>


            {editMode && <button className="btn cancel_edit" onClick={cancelEditMode}>Cancel Edit</button> }
        </div>
    );
};

export default Form;