import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import Spinner from "../shared/Spinner";
import API from "../../services/API";

const BloodData = () => {
  const { loading } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const getBloodData = async () => {
    try {
      const { data } = await API.get("/blood/blood-data");
      console.log(data);
      if (data?.success) {
        setData(data?.BloodData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodData();
  }, []);
  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h3 className="ms-4">Blood Records</h3>
          <div className="d-flex">
            {data.map((record) => (
              <div class="card ms-4">
                <div class="card-body" style={{backgroundColor : '#EDE5F1'}}>
                  <h5 class="card-title" style={{textAlign:'center', color:'black'}}><b>{record.bloodGroup}</b></h5>
                  <p class="card-text text-secondary">Total In : <b>{record.In}</b></p>
                  <p class="card-text text-secondary">Total Out : <b>{record.Out}</b></p>
                  <div className="bg-info text-white">Available : <b className="text-black">{record.Total}</b></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default BloodData;
