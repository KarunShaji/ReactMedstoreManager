import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import MedicineListItem from "./MedicineListItem";
import SearchMedicine from "./SearchMedicine";
import checkAuth from "../auth/checkAuth";

function ListMedicines() {
  const [medicine, setMedicine] = useState([]);
  const [filteredMedicine, setFilteredMedicine] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const fetchMedicine = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://medicalstore.mashupstack.com/api/medicine",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMedicine(response.data);
      setFilteredMedicine(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.token) {
      fetchMedicine();
    }
  }, [fetchMedicine, user]);

  const handleFilteredMedicine = (filteredData) => {
    setFilteredMedicine(filteredData);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Medicines Inventory</h1>
          </div>
        </div>
        <div>
          <SearchMedicine setFilteredMedicine={handleFilteredMedicine} />
          <br />
          <div className="container d-flex justify-content-center align-items-center">
            <Link to="/create" className="btn btn-dark mb-4">
              Add Medicine
            </Link>
          </div>
          <div className="col">
            {filteredMedicine.map((post) => (
              <MedicineListItem
                key={post.id}
                post={post}
                refresh={fetchMedicine}
              />
            ))}
          </div>
        </div>
        <div className="row">
          <div>
            {!filteredMedicine.length &&
              medicine.map((post) => (
                <MedicineListItem
                  key={post.id}
                  post={post}
                  refresh={fetchMedicine}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListMedicines);
