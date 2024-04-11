import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ProductTable = ({ products, userData }) => {
  console.log("products", products);
  console.log("userData", userData);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {products !== null ? (
            <TableRow style={{ backgroundColor: '#4dabf5'}}>
              <TableCell>S No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Value</TableCell>
            </TableRow>
          ) : (
            <TableRow style={{ backgroundColor: '#4dabf5'}}>
              <TableCell>S No</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact Number</TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {products !== null
            ? products?.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.unitPrice}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.unitPrice * product.quantity}</TableCell>
                </TableRow>
              ))
            : userData?.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contactNumber}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
