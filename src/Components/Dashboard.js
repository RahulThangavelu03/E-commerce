
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from 'react-spinners';
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../Features/CartSlice.js";
import { GetProducts } from "../Features/ProductSlice.js";
import { BsCart2 } from "react-icons/bs";

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Products = useSelector(state => state.Product.data);
    const productStatus = useSelector(state => state.Product.status);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const cartItems = useSelector(state => state.cart.cart);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(GetProducts());
        }
    }, [dispatch, productStatus]);

    useEffect(() => {
        if (productStatus === 'succeeded') {
            setProducts(Products);
        }
    }, [Products, productStatus]);



    function handleChange(e) {
        const value = e.target.value;
        setSearch(value);
        if (value) {
            const filteredData = Products.filter(i =>
                i.title.toLowerCase().includes(value.toLowerCase())
            );
            setProducts(filteredData);
        } else {
            setProducts(Products);
        }
    }

    function handleClick(product) {
        dispatch(addToCart(product));
    }

    function viewDetails(product) {
        navigate("/ViewProduct", { state: { data: product } });
    }

    return (
        <div id="Dashboard">
            <nav className="navbar navbar-light justify-content-between">
                <h1>Dashboard</h1>
                <input
                    className="form-control mr-sm-2"
                    style={{ width: "300px" }}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={handleChange}
                />
                <Link to="/Cart" style={{ fontSize: "25px", fontFamily: "bold", color: "black" }}>
                    <BsCart2 />  Cart items({cartItems.length})
                </Link>
            </nav>
            <br />
            <hr style={{ backgroundColor: "lightcoral", width: "100%" }} />
            <br />
            <div className="Products">
                {productStatus === 'loading' ? (
                    <div className="spinner" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                        <FadeLoader height={75} width={10} radius={2} margin={2} />
                    </div>
                ) : productStatus === 'failed' ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                        <p>Error loading products</p>
                    </div>
                ) : products.length === 0 ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                        <p>No products available</p>
                    </div>
                ) : (
                    products.map(product => (
                        <div className="Products" key={product.id}>
                            <img id="DashImage" src={product.image} alt={product.title} /><br /><br />
                            <p>Title: {product.title}</p>
                            <p>Rating: {product.rating.rate}/5</p>
                            <p>Price: {product.price} $</p>
                            <p>
                                <button
                                    type="button"
                                    className="btn btn-color btn-sm"
                                    style={{ font: "bold", color: "white" }}
                                    onClick={() => handleClick(product)}
                                >
                                    Add to cart
                                </button>
                                {' '}
                                {' '}
                                <button
                                    type="button"
                                    className="btn btn-color btn-sm"
                                    style={{ font: "bold", color: "white" }}
                                    onClick={() => viewDetails(product)}
                                >
                                    View details
                                </button>
                            </p>
                            <br />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;
