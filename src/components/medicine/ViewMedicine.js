import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";

function ViewPost() {
  var { postId } = useParams();
  var [post, setPost] = useState({ name: "", company: "", expiry_date: "" });
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios
      .get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicine:", error);
      });
  }, [postId, user?.token]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header text-center">
                <h3>{post.name}</h3>
              </div>
              <div className="card-body">
                <p>
                  <strong>Company :</strong> {post.company}
                </p>
                <p>
                  <strong>Expiry Date :</strong> {post.expiry_date}
                </p>
              </div>
            </div>
            <br />
            <div class="container d-flex justify-content-center align-items-center">
              <Link to="/dashboard" className="btn btn-info">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ViewPost);
