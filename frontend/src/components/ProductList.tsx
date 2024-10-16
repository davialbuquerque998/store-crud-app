import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getProducts, deleteProduct } from '../api/productApi';
import { Product } from '../types/Product';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h1>Product List</h1>
      <Button component={Link} to="/add" variant="contained" color="primary">
        Add Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price (USD)</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>${product.productPriceInUSD}</TableCell>
                <TableCell>{product.isAvailable ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/edit/${product._id}`} variant="outlined" color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(product._id!)} variant="outlined" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;