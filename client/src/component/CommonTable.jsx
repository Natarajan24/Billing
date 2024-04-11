import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const CommonTable = ({ products, userData, handleProductAction }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {products !== null ? (
            <TableRow style={{ backgroundColor: "#4dabf5" }}>
              <TableCell>S No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total Value</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          ) : (
            <TableRow style={{ backgroundColor: "#4dabf5" }}>
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

                  {handleProductAction && (
                    <TableCell>
                      <Button
                        color="primary"
                        style={{ backgroundColor: "#ff3d00", color: "white" }}
                        onClick={() => handleProductAction(product)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            : userData?.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.contactNumber}</TableCell>
                  {handleProductAction && (
                    <TableCell>
                      {/* Add your action button here */}
                      <Button onClick={() => handleProductAction(user)}>
                        Action
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
