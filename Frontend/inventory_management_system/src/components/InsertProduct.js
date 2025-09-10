import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './InsertProduct.css';

export default function InsertProduct() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productBarcode, setProductBarcode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const setName = (e) => setProductName(e.target.value);
    const setPrice = (e) => setProductPrice(e.target.value);
    const setBarcode = (e) => setProductBarcode(e.target.value.slice(0, 12));

    const addProduct = async (e) => {
        e.preventDefault();
        if (!productName || !productPrice || !productBarcode) {
            setError('*Please fill in all fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:3001/insertproduct', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ProductName: productName,
                    ProductPrice: productPrice,
                    ProductBarcode: productBarcode
                })
            });

            const data = await res.json();

            if (res.status === 201) {
                alert('Product Inserted Successfully!');
                setProductName('');
                setProductPrice('');
                setProductBarcode('');
                navigate('/products');
            } else if (res.status === 422) {
                alert('Product already exists with this barcode.');
            } else {
                setError('Something went wrong. Try again.');
            }
        } catch (err) {
            setError('Network error. Please try later.');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="insert-wrapper">
            <div className="insert-card">
                <h1 className="title">Add New Product</h1>

                <form onSubmit={addProduct} className="insert-form">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" value={productName} onChange={setName} placeholder="Enter product name" required />
                    </div>

                    <div className="form-group">
                        <label>Product Price</label>
                        <input type="number" value={productPrice} onChange={setPrice} placeholder="Enter product price" required />
                    </div>

                    <div className="form-group">
                        <label>Product Barcode</label>
                        <input type="number" value={productBarcode} onChange={setBarcode} placeholder="Enter barcode (max 12 digits)" maxLength={12} required />
                    </div>

                    {error && <p className="error-msg">{error}</p>}

                    <div className="btn-group">
                        <NavLink to="/products" className="btn cancel">Cancel</NavLink>
                        <button type="submit" className="btn submit" disabled={loading}>
                            {loading ? 'Inserting...' : 'Insert'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
