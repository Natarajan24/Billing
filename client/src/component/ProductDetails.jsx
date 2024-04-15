import React, { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { saveProductDetails } from "../Action/productDetails.js";

const initialProductState = {
  productName: "",
  unitPrice: "",
  tax: "",
  description: "",
};

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state?.productData);

  const [view, setView] = useState(false);
  const [products, setProducts] = useState(productData ? productData : []);
  const [editIndex, setEditIndex] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState(initialProductState);

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    if (editIndex !== null) {
      setEditingProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    if (
      !newProduct.productName ||
      !newProduct.unitPrice ||
      !newProduct.tax ||
      !newProduct.description
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const existingProduct = products.find(
      (product) => product.productName === newProduct.productName
    );
    if (existingProduct) {
      alert("Product with the same name already exists.");
      return;
    }

    const productId = uuidv4();

    const newProductWithId = { ...newProduct, productId: productId };

    setProducts((prevProducts) => [...prevProducts, newProductWithId]);

    setNewProduct(initialProductState);
  };

  const handleUpdateProduct = (index) => {
    if (
      !editingProduct.productName ||
      !editingProduct.unitPrice ||
      !editingProduct.tax ||
      !editingProduct.description
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[index] = editingProduct;

    setProducts(updatedProducts);
    setEditIndex(null);
    setEditingProduct(null);
  };

  const handleEditProduct = (index) => {
    setEditIndex(index);
    setEditingProduct(products[index]);
  };

  const handleDeleteProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setEditingProduct(null);
    }
  };

  const handleSave = () => {
    dispatch(saveProductDetails(products));
  };

  const hideGrid = () => {
    setView(true);
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
      <Box textAlign="right">
        {productData.length  || products.length ? (
          <></>
        ) : (
          <div>
            <br />
            <Button variant="contained" color="primary" onClick={hideGrid}>
              Add Product
            </Button>
          </div>
        )}
      </Box>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#4dabf5" }}>
              <TableCell>S No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <TextField
                    name="productName"
                    label="Product Name"
                    value={
                      editIndex === index
                        ? editingProduct.productName
                        : product.productName
                    }
                    fullWidth
                    disabled={editIndex !== index}
                    onChange={handleProductChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="unitPrice"
                    label="Unit Price"
                    type="number"
                    value={
                      editIndex === index
                        ? editingProduct.unitPrice
                        : product.unitPrice
                    }
                    fullWidth
                    disabled={editIndex !== index}
                    onChange={handleProductChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="tax"
                    label="Tax"
                    type="number"
                    value={
                      editIndex === index ? editingProduct.tax : product.tax
                    }
                    fullWidth
                    disabled={editIndex !== index}
                    onChange={handleProductChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={
                      editIndex === index
                        ? editingProduct.description
                        : product.description
                    }
                    fullWidth
                    disabled={editIndex !== index}
                    onChange={handleProductChange}
                  />
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdateProduct(index)}
                      >
                        Save
                      </Button>{" "}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setEditIndex(null);
                          setEditingProduct(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditProduct(index)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteProduct(index)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {!view && !productData.length ? (
              <></>
            ) : (
              <TableRow>
                <TableCell>{products.length + 1}</TableCell>
                <TableCell>
                  <TextField
                    name="productName"
                    label="Product Name"
                    value={newProduct.productName}
                    onChange={handleProductChange}
                    fullWidth
                    required
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="unitPrice"
                    label="Unit Price"
                    type="number"
                    value={newProduct.unitPrice}
                    onChange={handleProductChange}
                    fullWidth
                    required
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="tax"
                    label="Tax"
                    type="number"
                    value={newProduct.tax}
                    onChange={handleProductChange}
                    fullWidth
                    required
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={newProduct.description}
                    onChange={handleProductChange}
                    fullWidth
                    required
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="submit" // Change the type to submit
                    variant="contained"
                    color="primary"
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box textAlign="right">
        {productData?.length || products?.length ? (
          <div>
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save Product
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
};

export default ProductDetails;
