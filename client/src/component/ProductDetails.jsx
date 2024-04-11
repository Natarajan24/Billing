import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveProductDetails } from "../Action/productDetails.js";
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
import ProductTable from "./ProductTable.jsx";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const productData = useSelector((state) => state?.productData);

  const [view, setView] = useState(false);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    quantity: null,
    unitPrice: "",
    tax: "",
    description: "",
  });

  const [products, setProducts] = useState([]);

  const handleProductChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, productDetails]);

    const productId = uuidv4();

    dispatch(saveProductDetails({ ...productDetails, productId }));

    setProductDetails({
      productName: "",
      quantity: null,
      unitPrice: "",
      tax: "",
      description: "",
    });

    setView(false);
  };

  const hideGrid = () => {
    setView(true);
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
      <Box textAlign="right">
        <div>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={hideGrid}
          >
            Add Product
          </Button>
        </div>
      </Box>
      <Box>
        {view ? (
          <></>
        ) : (
          <div>
            <br />
            <br />
            <ProductTable products={productData ? productData : products} />
          </div>
        )}
      </Box>
      <Box>
        {!view ? (
          <></>
        ) : (
          <div>
            <Grid container spacing={3} sx={{ marginTop: "20px" }}>
              <Card sx={{ maxWidth: 400, margin: "auto" }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Product Details
                  </Typography>
                  <form onSubmit={handleAddProduct}>
                    <TextField
                      name="productName"
                      label="Product Name"
                      value={productDetails.productName}
                      onChange={handleProductChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="unitPrice"
                      label="Unit Price"
                      type="number"
                      value={productDetails.unitPrice}
                      onChange={handleProductChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="tax"
                      label="Tax"
                      type="number"
                      value={productDetails.tax}
                      onChange={handleProductChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      value={productDetails.description}
                      onChange={handleProductChange}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </div>
        )}
      </Box>

      <br />
    </div>
  );
};

export default ProductDetails;
