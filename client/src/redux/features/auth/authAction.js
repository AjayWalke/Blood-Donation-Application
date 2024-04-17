import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";

// login page axios call
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password, rule }, { rejectWithValue }) => {
    try {
      // we will call axios
      console.log({ email, password, rule });
      const { data } = await API.post("/auth/login", { email, password, rule });
      if (data.success) {
        localStorage.setItem("token", data.token);
        alert("Login Successfully");
        // if (rule === "organisation") {
        // }
        window.location.replace("/");
        // if (rule === "admin") {
        //   window.location.replace("/donar");
        // }
        // else {
        // }
        // if (rule === "hospital") {
        //   window.location.replace("/donar");
        // }
        // if (rule === "donar") {
        //   window.location.replace("/organisation");
        // }
      }
      return data;
    } catch (error) {
      // we will return response from api
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// now sending the registered details
export const userRegister = createAsyncThunk(
  "auth/Register",
  async (
    {
      email,
      password,
      rule,
      name,
      organisation,
      hospital,
      website,
      address,
      phone,
    },
    { rejectWithValue }
  ) => {
    try {
      const {data} = await API.post("/auth/register", {
        email,
        password,
        rule,
        name,
        organisation,
        hospital,
        website,
        address,
        phone,
      });
      if (data.success) {
        alert("Registered Successfully");
        window.location.replace("/login");
        return data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// get the current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      // console.log("hello ::: ");
      // console.log(`this is res ${res}`);
      if (res?.data) {
        // console.log(res);
        return res?.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
