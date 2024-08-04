import React from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { addToCart } from "../Features/CartSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
const ViewProduct = () => {


    const Location = useLocation()
    const { data: Product } = Location.state
    console.log(Product, "Product")
    const Navigate = useNavigate()
    const Dispacth = useDispatch()
    const cart = useSelector(state => state.cart.cart)



    function AddtoCart(Product) {







        if (!cart.find(i => i.id == Product.id)) {
            Dispacth(addToCart(Product))
            alert(`${Product.title} Product has been added to the Cart`)

        }

        else {
            alert("Product is already in the Cart")
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

        </div>
    )
}
export default ViewProduct

