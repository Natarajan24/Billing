import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveData } from "../Action/dataSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

import CommonTable from "./CommonTable.jsx";
import { v4 as uuidv4 } from "uuid";

const CustomerDetailsForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerData = useSelector((state) => state?.customerData);
  const productData = useSelector((state) => state?.productData);

  const [selectedData, setSelectedData] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [products, setProducts] = useState([]);

  const handleSave = () => {
    const customerDetails = customerData.filter(
      (item) => item.customerId === selectedData
    );

    const billingData = {
      firstName: customerDetails[0]?.firstName,
      lastName: customerDetails[0]?.lastName,
      street: customerDetails[0]?.street,
      cityVillage: customerDetails[0]?.cityVillage,
      district: customerDetails[0]?.state,
      state: customerDetails[0]?.address,
      pinCode: customerDetails[0]?.pinCode,
      email: customerDetails[0]?.email,
      contactNumber: customerDetails[0]?.contactNumber,
      productDetails: products,
    };

    const id = uuidv4();
    dispatch(saveData({ ...billingData, id }));

    setProducts([]);
    setSelectedData("");

    navigate(`/billingInfo/${id}`);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productDetails = productData.filter(
      (item) => item.productId === selectedProduct
    );

    if (
      productDetails?.length &&
      productQuantity &&
      selectedProduct &&
      selectedData
    ) {
      setProducts([
        ...products,
        {
          tempId: uuidv4(),
          productName: productDetails[0].productName,
          unitPrice: productDetails[0].unitPrice,
          tax: productDetails[0].tax,
          description: productDetails[0].description,
          quantity: productQuantity,
        },
      ]);
    } else {
      alert("Please filled all field");
      return null;
    }

    setSelectedProduct("");
    setProductQuantity("");
  };

  const handleCancelCheckOut = () => {
    setProducts([]);
    setSelectedData("");
  };

  const handleProductAction = (data) => {
    const filteredProducts = products.filter(
      (product) => product.tempId !== data?.tempId
    );
    setProducts(filteredProducts);
  };

  const handleNavigate = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap: "wrap"}}>
        {customerData?.length !== 0 ? (
          <FormControl style={{ margin: "8px", minWidth: "220px" }}>
            <InputLabel id="customer-label-1"> Select Customer</InputLabel>
            <Select
              labelId="dropdown-label"
              value={selectedData}
              onChange={(e) => setSelectedData(e.target.value)}
              disabled={products.length}
            >
              {customerData?.map((item, index) => (
                <MenuItem key={index} value={item.customerId}>
                  {item.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "8px", minWidth: "200px" }}
            onClick={() => handleNavigate("customer")}
          >
            Add Customer Details
          </Button>
        )}
        {productData?.length !== 0 ? (
          <FormControl style={{ margin: "8px", minWidth: "220px" }}>
            <InputLabel id="Product-label-2">Select Product</InputLabel>
            <Select
              labelId="dropdown-label"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {productData?.map((item, index) => (
                <MenuItem key={index} value={item.productId}>
                  {item.productName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "8px", minWidth: "220px" }}
            onClick={() => handleNavigate("products")}
          >
            Add Product Details
          </Button>
        )}
        <TextField
          label="Product Quantity"
          style={{ margin: "8px" ,minWidth: "200px" }}
          type="number"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
        />
        <Button
        variant="contained"
        color="primary"
        style={{ margin: "8px" }}
        onClick={handleAddProduct}
      >
        Add Product
      </Button>
      </div>
      <br />
      <br />
      <CommonTable
        products={products}
        handleProductAction={handleProductAction}
      />

      <Box textAlign="right">
        <div>
          <br />
          <br />
          {products.length ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#ff6333", color: "white" }}
              onClick={handleCancelCheckOut}
            >
              Cancel CheckOut
            </Button>
          ) : (
            <></>
          )}{" "}
          {products.length ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              CheckOut
            </Button>
          ) : (
            <></>
          )}
        </div>
      </Box>
    </div>
  );
};

export default CustomerDetailsForm;
