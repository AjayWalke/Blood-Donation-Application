import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../services/API";
import Layout from "./Layout";
import Spinner from "../shared/Spinner";

const Organization = () => {
  const { loading, user} = useSelector((state) => state.auth);
  const [data, setData] = useState();
  const getOrganization = async () => {
    try {
      if (user?.rule === "admin") {
        // console.log('organisation admin')
        const { data } = await API.get("/admin/get-Organisation");
        console.log(data)
        if (data?.success) {
          setData(data?.organisation);
        }
      } else {
        const { data } = await API.get('/inventory/get-organization');
        if (data?.success) {
          setData(data?.organizations);
        }
      }
    }
    catch(error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrganization();
  }, []);
  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h4 class="ms-4">
            Organization List
          </h4>

          <table class="table ms-3">
            <thead>
              <tr>
                <th scope="col">Organization</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr key={record._id}>
                  <td>{record.organisation}</td>
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

export default Organization;
