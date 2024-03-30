import React, { useState } from "react";
import { useSelector } from "react-redux"; 
import axios from "axios";
import checkAuth from "../auth/checkAuth";

function SearchMedicine({ setFilteredMedicine }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);
  const user = useSelector(store => store.auth.user); 

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setNoResults(false);
    setEmptySearch(value === '');
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchTerm.trim() === '') {
      setEmptySearch(true);
      return;
    }
    try {
      const response = await axios.get(
        `https://medicalstore.mashupstack.com/api/medicine/search?keyword=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const filteredData = response.data;
      if (filteredData.length === 0) {
        setNoResults(true);
      } else {
        setFilteredMedicine(filteredData);
      }
    } catch (error) {
      console.error("Error searching medicines:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="d-flex align-items-center">
        <input
          type="text"
          value={searchTerm}
          className="form-control mr-2"
          onChange={handleSearchInputChange}
        />&nbsp;&nbsp;&nbsp;
        <button type="submit" className="btn btn-success">
          Search
        </button>
      </form>
      {emptySearch && <p>Please type medicine name to search</p>}
      {noResults && !emptySearch && <p>No matching medicines found.</p>}
    </div>
  );
}

export default checkAuth(SearchMedicine);
