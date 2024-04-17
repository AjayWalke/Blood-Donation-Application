import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/Layout/Layout";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { Modal } from "../components/model/model";
import API from "../services/API";
import temp from "../components/shared/temp";
// import App from "../App";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]); // type converted in to array

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      // console.log(data);
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    // <><div className="temp">helloa</div></>
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {user?.rule !== "admin" ? (
            <>
              {" "}
              <h4
                className="ms-4"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ cursor: "pointer" }}
              >
                {/* <HiOutlineDocumentAdd/> */}
                <i class="fa-regular fa-square-plus py-3"></i>
                {"  "}
                Add Inventory
              </h4>

              <table class="table ms-3">
                <thead>
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Inventory Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donar Email</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((tt) => (
                    <tr key={tt._id}>
                      <td>{tt.bloodGroup}</td>
                      <td>{tt.inventoryType}</td>
                      <td>{tt.quantity}</td>
                      {/* <td colSpan=''></td> to blank data*/}
                      <td>{tt.email}</td>
                      <td>{tt.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Modal />
            </>
          ) : (
            <div className="ms-4">
              <h1> Welcome Admin, </h1>
              <h4>Have A good day</h4>

              <p>
                We are delighted to have you here. As an administrator, you play
                a crucial role in managing and overseeing the operations of our
                website. Your dedication and expertise contribute significantly
                to our success. Please feel free to explore and utilize the
                various tools and features at your disposal. Should you need any
                assistance or have any questions, our support team is ready to
                help. Thank you for being a vital part of our online community,
                and we hope you have a productive and rewarding experience on
                our platform.
              </p>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default HomePage;
