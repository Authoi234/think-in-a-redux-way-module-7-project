import React from 'react';
import editImg from '../../assets/images/edit.svg';
import deleteImg from '../../assets/images/delete.svg';
import { useDispatch } from 'react-redux';
import { editActive, removeTransaction } from '../../features/transaction/transactionSlice';
import numberWithCommas from '../../utils/numberWithCommas';

const Transaction = ({transaction}) => {
    const { name, amount, type, id } = transaction || {};

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(editActive(transaction))
    };

    const handleDelete = () => {
        dispatch(removeTransaction(id))
    };

    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {numberWithCommas(amount)}</p>
                <button className="link" onClick={handleEdit}>
                    <img
                        className="icon"
                        alt='Edit'
                        src={editImg}
                    />
                </button>
                <button className="link" onClick={handleDelete}>
                    <img
                        className="icon"
                        alt='Delete'
                        src={deleteImg}
                    />
                </button>
            </div>
        </li>
    );
};

export default Transaction;