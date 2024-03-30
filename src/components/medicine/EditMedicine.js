import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate ,Link } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";

function EditMedine() {
    const { postId } = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const user = useSelector(store => store.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.token) {
            axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(response => {
                setName(response.data.name);
                setCompany(response.data.company);
                setExpiryDate(response.data.expiry_date);
            }).catch(error => {
                console.error('Error fetching medicine:', error);
            });
        }
    }, [postId, user]);

    function updateMedicine() {
        axios.post(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            name: name,
            company: company,
            expiry_date: expiryDate
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            alert(response.data.message);
            navigate('/dashboard');
        }).catch(error => {
            console.error('Error updating medicine:', error);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Edit Medicine</h1>
                        <div className="form-group">
                            <label>Name :</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Content :</label>
                            <input type="text"
                                className="form-control"
                                value={company}
                                onChange={(event) => { setCompany(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date :</label>
                            <input type="date"
                                className="form-control"
                                value={expiryDate}
                                onChange={(event) => { setExpiryDate(event.target.value) }}
                            />
                        </div>
                        <div className="form-group text-center">
                            <button className="btn btn-primary" onClick={updateMedicine}>Submit</button>&nbsp;&nbsp;&nbsp;
                            <Link to={'/dashboard'} className="btn btn-warning">Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(EditMedine);
