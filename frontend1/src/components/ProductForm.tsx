import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import { createProduct, getProduct, updateProduct } from '../api/productApi';
import { Product } from '../types/Product';

const ProductForm: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    productName: '',
    productPriceInUSD: 0,
    isAvailable: true,
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    const fetchedProduct = await getProduct(productId);
    setProduct(fetchedProduct);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateProduct(id, product);
    } else {
      await createProduct(product);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
      <TextField
        name="productName"
        label="Product Name"
        value={product.productName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="productPriceInUSD"
        label="Price (USD)"
        type="number"
        value={product.productPriceInUSD}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="isAvailable"
            checked={product.isAvailable}
            onChange={handleChange}
          />
        }
        label="Available"
      />
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update' : 'Create'} Product
      </Button>
    </form>
  );
};

export default ProductForm;