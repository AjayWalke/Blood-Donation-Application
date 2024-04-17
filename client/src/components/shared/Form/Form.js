import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authServices";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rule, setRule] = useState("Donar");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [hospital, setHospital] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
    {/* onSubmit --> access the details using authServices.js */}
      <form onSubmit={(e) => {
        if(formType === 'login') return handleLogin(e, email, password, rule);
        else if(formType === 'register') return handleRegister(e, email, password, rule, name, organisation, hospital, website, address, phone);
      }}>
        <h1 className="text-center">{formTitle}</h1>
        <hr />

        {/* creating the role in this part and modify the form according dynamically */}
        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="rule"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRule(e.target.value)}
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="rule"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRule(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="rule"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRule(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="rule"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRule(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>
        </div>

        {/* switch statement we will use and directly call  cannot use directly because we have to return*/}
        {(() => {
          switch (true) {
            case formType === "login":
              return (
                <>
                  <InputType
                    labelFor={"forEmail"}
                    labelText={"Email"}
                    name={"email"}
                    inputType={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelFor={"forPassword"}
                    labelText={"Password"}
                    name={"password"}
                    inputType={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            case formType === "register":
              return (
                <>
                  {(rule === "admin" || rule === "donar") && (
                    <InputType
                      labelFor={"forName"}
                      labelText={"Name"}
                      name={"name"}
                      inputType={"text"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {rule === "organisation" && (
                    <InputType
                      labelFor={"forOrganisation"}
                      labelText={"Organisation Name"}
                      name={"organisation"}
                      inputType={"text"}
                      value={organisation}
                      onChange={(e) => setOrganisation(e.target.value)}
                    />
                  )}
                  {rule === "hospital" && (
                    <InputType
                      labelFor={"forHospital"}
                      labelText={"Hospital Name"}
                      name={"hospital"}
                      inputType={"text"}
                      value={hospital}
                      onChange={(e) => setHospital(e.target.value)}
                    />
                  )}
                  <InputType
                    labelFor={"forEmail"}
                    labelText={"Email"}
                    name={"email"}
                    inputType={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelFor={"forPassword"}
                    labelText={"Password"}
                    name={"password"}
                    inputType={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelFor={"forWebsite"}
                    labelText={"Website"}
                    name={"website"}
                    inputType={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelFor={"forAddress"}
                    labelText={"Address"}
                    name={"address"}
                    inputType={"text"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelFor={"forPhone"}
                    labelText={"Phone"}
                    name={"phone"}
                    inputType={"text"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {/* if login to register and register to login */}
          {formType === "login" ? (
            <p>
              Not Registered? 
              <Link to="/register"> Register</Link>
            </p>
          ) : (
            <p>
              Existing user? 
              <Link to="/login"> login</Link>
            </p>
          )}
          <button className="btn btn-dark" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
