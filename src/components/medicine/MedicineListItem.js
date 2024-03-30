import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

function MedicineListItem({ post, refresh }) {
    const user = useSelector(state => state.auth.user);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${post.id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(response => {
            refresh();
            setShowModal(false);
        })
        .catch(error => {
            console.error('Error deleting medicine:', error);
        });
    }
    
    console.log("showModal:", showModal);

    return (
        <>
            <div className="card border-dark">
                <div className="card-body">
                    <strong>{post.name}</strong>
                    <button className="btn btn-danger float-right" onClick={() => setShowModal(true)}>Delete</button> 
                    <Link to={`/edit/${post.id}`} className="btn btn-primary float-right mr-2">Edit</Link>
                    <Link to={`/view/${post.id}`} className="btn btn-info float-right mr-2">View</Link>
                </div>
            </div>
            <br />
            <DeleteConfirmationModal 
                show={showModal} 
                onClose={() => setShowModal(false)} 
                onConfirm={handleDelete} 
            />
        </>
    );
}

export default checkAuth(MedicineListItem);
