import React from "react";

function DeleteConfirmationModal({ show, onClose, onConfirm }) {
  console.log("Modal show prop:", show); // Add this line for debugging

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this medicine?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
