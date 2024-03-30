import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";

function AddMedicine() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const user = useSelector(store => store.auth.user);
    
    var navigate = useNavigate()
    function addMedicine() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine',{
            name: name,
            company: company,
            expiry_date: expiryDate
        },{headers: { 'Authorization': "Bearer " + user.token }}).then(response=>{
            navigate('/dashboard')
        })
    }
    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Add Medicine</h1>
                    <div className="form-group">
                        <label>Name : </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company :</label>
                        <input type="text"
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date :</label>
                        <input type="date" 
                        className="form-control" 
                        value={expiryDate} 
                        onChange={(event)=>{setExpiryDate(event.target.value)}}
                        />
                    </div>
                    <div className="align-item-center">
                        <button className="btn btn-primary float-right" onClick={addMedicine}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default checkAuth(AddMedicine);