import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function InsertProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [productBarcode, setProductBarcode] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const setName = (e) => {
        setProductName(e.target.value);
    };

    const setPrice = (e) => {
        setProductPrice(e.target.value);
    };

    const setBarcode = (e) => {
        const value = e.target.value.slice(0, 12);
        setProductBarcode(value);
    };

    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3001/products/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await res.json();

                if (res.status === 200) {
                    setProductName(data.ProductName);
                    setProductPrice(data.ProductPrice);
                    setProductBarcode(data.ProductBarcode);
                } else {
                    setError("Unable to retrieve product details.");
                }
            } catch (err) {
                setError("An error occurred while fetching data.");
            }
        };

        getProduct();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/updateproduct/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "ProductName": productName,
                    "ProductPrice": productPrice,
                    "ProductBarcode": productBarcode,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                alert("Data Updated");
                navigate("/products");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-5">
            <h1 className="text-center text-primary fs-2 fw-bold mb-4">Update Product Information</h1>
            <div className="mt-5 col-lg-6 col-md-6 col-12 mx-auto">
                <label htmlFor="product_name" className="form-label fs-4 fw-bold text-dark">Product Name</label>
                <input
                    type="text"
                    onChange={setName}
                    value={productName}
                    className="form-control fs-5 p-3 border border-2 border-secondary rounded-3 shadow-sm"
                    id="product_name"
                    placeholder="Enter Product Name"
                    required
                />
            </div>

            <div className="mt-4 col-lg-6 col-md-6 col-12 mx-auto">
                <label htmlFor="product_price" className="form-label fs-4 fw-bold text-dark">Product Price</label>
                <input
                    type="number"
                    onChange={setPrice}
                    value={productPrice}
                    className="form-control fs-5 p-3 border border-2 border-secondary rounded-3 shadow-sm"
                    id="product_price"
                    placeholder="Enter Product Price"
                    required
                />
            </div>

            <div className="mt-4 mb-5 col-lg-6 col-md-6 col-12 mx-auto">
                <label htmlFor="product_barcode" className="form-label fs-4 fw-bold text-dark">Product Barcode</label>
                <input
                    type="number"
                    onChange={setBarcode}
                    value={productBarcode}
                    maxLength={12}
                    className="form-control fs-5 p-3 border border-2 border-secondary rounded-3 shadow-sm"
                    id="product_barcode"
                    placeholder="Enter Product Barcode"
                    required
                />
            </div>

            <div className="d-flex justify-content-center mt-4">
                <NavLink
                    to="/products"
                    className="btn btn-outline-danger fs-4 me-3 px-5 py-3 rounded-pill shadow-sm hover-zoom"
                >
                    Cancel
                </NavLink>
                <button
                    type="submit"
                    onClick={updateProduct}
                    className="btn btn-primary fs-4 px-5 py-3 rounded-pill shadow-lg hover-zoom"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </div>

            <div className="col text-center mt-4">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    );
}
