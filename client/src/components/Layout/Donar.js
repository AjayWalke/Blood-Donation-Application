import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import API from "../../services/API";
import { useSelector } from "react-redux";
import Spinner from "../shared/Spinner";

const Donar = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState();
  const getDonar = async () => {
    try {
      console.log(user?.rule)
      if (user?.rule === "admin") {
        // console.log('donar admin')
        const { data } = await API.get("/admin/get-Donar");
        console.log(API.get('/admin/get-Donar'));
        console.log(data);
        if (data?.success) {
          setData(data?.donar);
        }
      } else if(user?.rule !== 'admin'){
        const { data } = await API.get('/inventory/get-donar');
        if (data?.success) {
          setData(data?.donars);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDonar();
  }, []);
  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h4 className="ms-4">
            Donar List
          </h4>

          <table class="table ms-3">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr key={record._id}>
                  <td>{record.name || record.organisation}</td>
                  <td>{record.email}</td>
                  <td>{record.phone}</td>
                  <td>{record.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Layout>
  );
};

export default Donar;
