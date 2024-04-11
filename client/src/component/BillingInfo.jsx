import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from "@mui/material";

const BillingInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const savedData = useSelector((state) => state.data);


  const taxRate = 0.01;
  

  const filteredData = savedData.filter((item) => item.id === id);

  const subtotal = filteredData[0]?.productDetails?.reduce(
    (acc, product) => acc + product.quantity * product.unitPrice,
    0
  );
  const calculateTotalTax = filteredData[0]?.productDetails?.reduce(
    (acc, product) => acc + product.quantity * product.unitPrice * product.tax * taxRate,
    0
  );

  const totalAmount = subtotal + calculateTotalTax;

  const handleBack = ()=>{
    navigate("/");
  }

  return (
    <div>  
    <Box m={1}>
      <Card variant="outlined" style={{ marginBottom: 20 }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Billing Information
          </Typography>
          <Typography variant="body2">Name: {`${filteredData[0]?.firstName} ${filteredData[0]?.lastName}`}</Typography>
          <Typography variant="body2">
            Email: {filteredData[0]?.email}
          </Typography>
          <Typography variant="body2">
            Contact Number: {filteredData[0]?.contactNumber}
          </Typography>
      
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Tax Rate</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
                {filteredData[0]?.productDetails?.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.unitPrice}</TableCell>
                    <TableCell>{(product.quantity * product.unitPrice * product.tax * taxRate).toFixed(2)}</TableCell>
                    <TableCell>${product.quantity * product.unitPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2}>
            <Typography variant="body1">
              Subtotal: ${subtotal.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              Tax :{calculateTotalTax}
            </Typography>
            <Typography variant="h6">
              Total Amount: ${totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
    <br/>
      <Button type="submit" variant="contained" color="primary" onClick={handleBack}>Back To BillingPage</Button>
    </div>
  );
};

export default BillingInfo;
