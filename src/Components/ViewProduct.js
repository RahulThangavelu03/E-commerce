import React from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { addToCart } from "../Features/CartSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';







const ViewProduct = () => {


    const Location = useLocation()
    const { data: Product } = Location.state
    console.log(Product, "Product")
    const Navigate = useNavigate()
    const Dispacth = useDispatch()
    const cart = useSelector(state => state.cart.cart)


    const WarningToast = () =>
        toast.warn(` ${Product.title}is already in the cart`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });



    function AddtoCart(Product) {







        if (!cart.find(i => i.id == Product.id)) {
            Dispacth(addToCart(Product))



        }

        else {
            WarningToast()

        }

    }


    function GoToDashboard() {

        Navigate("/")
    }








    return (
        <div class="ViewProduct">

            <h2>{Product.title}</h2>

            <div><img src={Product.image} class="ViewProductImage" alt={Product.title}></img></div>
            <h3>Category-{Product.category}</h3>
            <h4>Description:{Product.description}</h4>
            <h4>Price:{Product.price}$</h4>
            <h4>Rating:{Product.rating.rate}/5</h4>
            <h5>Stock:{Product.rating.count} left</h5>
            <button class="btn btn-color btn-sm" style={{ font: "bold", color: "white" }} onClick={GoToDashboard}>Go back</button>{' '}
            <button class="btn btn-color btn-sm" style={{ font: "bold", color: "white" }} onClick={(e) => AddtoCart(Product)}>Add to cart</button>


            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce} />
        </div>
    )
}
export default ViewProduct

