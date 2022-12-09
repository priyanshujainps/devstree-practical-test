import React from "react";
import "./Modal.css";

function Modal({ setOpenModal,data }) {
  const {name, email, dob}=data[0];
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        
       
        <h3>Username : {name}</h3>
        <h3>Email : {email} </h3>
  <h3>DOB :{dob}</h3>

      </div>
    </div>
  );
}

export default Modal;