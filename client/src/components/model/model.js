import React, { useState } from "react";
import InputType from "../shared/Form/InputType";
import API from "../../services/API";
import { useSelector } from "react-redux";

export const Modal = () => {
  const [ inventoryType, setInventoryType ] = useState("in"); // set default values
  const [ bloodGroup, setBloodGroup ] = useState("");
  const [ quantity, setQuantity ] = useState(0);
  const [ email, setEmail ] = useState("");
  const {user} = useSelector(state => state.auth)

//   submit the data to the server
  const handleModelSubmit = async () => {
    try {
        if(!bloodGroup || !quantity || !email) {
            return alert('fulfill all the fields');
        }
        const {data} = await API.post('/inventory/create-inventory', 
        {inventoryType, bloodGroup, quantity, email, organisation:user?._id});
        // console.log({inventoryType, bloodGroup, quantity, donarEmail, email:user?.email, organisation:user?._id});
        if(data?.success) {
            alert('Inventory Added');
            window.location.reload();
        }
    }   
    catch(error) {
        alert(error.response.data.message);
        console.log(error);
        window.location.reload();
    }
  }

  return (
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-7" id="staticBackdropLabel">
              Inventory
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {/* content display */}
            <div className="d-flex mb-3">
              Blood Type : &nbsp;
              {/* in blood */}
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inRadio"
                  defaultChecked
                  value={"in"}
                  onChange={(e) => setInventoryType(e.target.value)}
                />
                <label htmlFor="in" className="form-check-label">
                  In
                </label>
              </div>
              {/* out blood */}
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inRadio" // same then
                  value={"out"}
                  onChange={(e) => setInventoryType(e.target.value)}
                />
                <label htmlFor="out" className="form-check-label">
                  Out
                </label>
              </div>
            </div>

            {/* blood group select */}
            <select
              class="form-select" aria-label="Default select example"
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option selected>Open this select menu</option>
              <option value={"O+"}>O+</option>
              <option value={"O-"}>O-</option>
              <option value={"AB+"}>AB+</option>
              <option value={"AB-"}>AB-</option>
              <option value={"A+"}>A+</option>
              <option value={"A-"}>A-</option>
              <option value={"B+"}>B+</option>
              <option value={"B-"}>B-</option>

            </select>

            {/* donar email */}
            <InputType
                labelFor={'forEmail'}
                labelText={'Email'}
                inputType={'String'}
                value={email}
                name={'email'}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* quantity */}
            <InputType
                labelFor={'forQuantity'}
                labelText={'Quantity'}
                inputType={'Number'}
                value={quantity}
                name={'Quantity'}
                onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" onClick={handleModelSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
