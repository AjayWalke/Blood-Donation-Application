import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../services/API";
import Layout from "./Layout";
import Spinner from "../shared/Spinner";

const Hospital = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const [data, setData] = useState();
  const getHospital = async () => {
    try {
      if (user?.rule === "admin") {
        // console.log('hospital admin')
        const { data } = await API.get("/admin/get-Hospital");
        console.log(data);
        if (data?.success) {
          setData(data?.hospital);
        }
      } else {
        const { data } = await API.get("/inventory/get-hospital");
        if (data?.success) {
          setData(data?.hospital);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHospital();
  }, []);
  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h4 className="ms-4">Hospital List</h4>

          <table class="table ms-3">
            <thead>
              <tr>
                <th scope="col">Hospital</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr key={record._id}>
                  <td>{record.hospital}</td>
                  <td>{record.email}</td>
                  <td>{record.phone}</td>
                  <td>{record.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Layout>
  );
};

export default Hospital;
