import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveCustomerDetails } from "../Action/customerDetails.js";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import CommonTable from "./CommonTable.jsx";

const CustomerDetails = () => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state?.customerData);

  const [view, setView] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    street: "",
    cityVillage: "",
    district: "",
    state: "",
    pinCode: "",
  });

  const [userData, setUserData] = useState([]);

  const handleCustomerChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserData([...userData, customerDetails]);

    const customerId = uuidv4();
    dispatch(saveCustomerDetails({ ...customerDetails, customerId }));

    setCustomerDetails({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      street: "",
      cityVillage: "",
      district: "",
      state: "",
      pinCode: "",
    });

    setView(false);
  };

  const hideGrid = () => {
    setView(true);
  };

  const handleCancel = () => {
    setView(false);
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
      <Box textAlign="right">
        <div>
          <br />
          {view ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#ff6333", color: "white" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={hideGrid}
            >
              Add Customer
            </Button>
          )}
        </div>
      </Box>
      <Box>
        <br />
        {view ? (
          <></>
        ) : (
          <div>
            <CommonTable
              products={null}
              userData={customerData ? customerData : userData}
            />
          </div>
        )}
      </Box>
      <Box>
        {!view ? (
          <></>
        ) : (
          <div>
            <Grid container spacing={3} sx={{ marginTop: "20px" }}>
              <Card sx={{ maxWidth: 500, margin: "auto" }}>
                <CardContent sx={{ marginTop: "20px" }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Customer Details
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      name="firstName"
                      label="FirstName"
                      type="text"
                      value={customerDetails.firstName}
                      onChange={handleCustomerChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="lastName"
                      label="LastName"
                      type="text"
                      value={customerDetails.lastName}
                      onChange={handleCustomerChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      value={customerDetails.email}
                      onChange={handleCustomerChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="contactNumber"
                      label="Contact Number"
                      type="number"
                      value={customerDetails.contactNumber}
                      onChange={handleCustomerChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <Typography variant="h6" component="h5" gutterBottom>
                      Address
                    </Typography>
                    <TextField
                      name="street"
                      label="Street"
                      value={customerDetails.street}
                      onChange={handleCustomerChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="cityVillage"
                      label="City or Village"
                      value={customerDetails.cityVillage}
                      onChange={handleCustomerChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="district"
                      label="District"
                      value={customerDetails.district}
                      onChange={handleCustomerChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="state"
                      label="State"
                      value={customerDetails.state}
                      onChange={handleCustomerChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="pinCode"
                      label="PinCode"
                      type="number"
                      value={customerDetails.pinCode}
                      onChange={handleCustomerChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </div>
        )}
      </Box>
    </div>
  );
};

export default CustomerDetails;
