import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Products.css'; // Custom styles (optional but recommended for glass effect)

export default function Products() {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await fetch("http://localhost:3001/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            if (res.status === 201) {
                setProductData(data);
            } else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteProduct = async (id) => {
        const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await response.json();
        if (response.status === 422 || !deletedata) {
            console.log("Error");
        } else {
            getProducts();
        }
    };

    return (
        <div className='container-fluid p-4'>
            <div className="rounded-4 p-4 mb-4 text-white bg-gradient" style={{ background: 'linear-gradient(to right, #2c3e50, #3498db)' }}>
                <h1 className="fw-bold display-5">📦 Products Inventory</h1>
                <NavLink to="/insertproduct" className='btn btn-light shadow-lg fw-semibold mt-3'>
                    + Add New Product
                </NavLink>
            </div>

            <div className="table-responsive glass-effect rounded-4 p-3 shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}>
                <table className="table table-hover text-center align-middle table-bordered text-white">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Barcode</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((element, id) => (
                            <tr key={element._id}>
                                <td>{id + 1}</td>
                                <td className="fw-bold">{element.ProductName}</td>
                                <td>₹{element.ProductPrice}</td>
                                <td>{element.ProductBarcode}</td>
                                <td>
                                    <NavLink to={`/updateproduct/${element._id}`} className="btn btn-outline-warning">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </NavLink>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => deleteProduct(element._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {productData.length === 0 && (
                    <div className="text-center fs-5 fw-semibold text-light mt-3">No Products Found.</div>
                )}
            </div>
        </div>
    );
}
