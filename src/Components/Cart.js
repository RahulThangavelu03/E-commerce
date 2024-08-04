import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { CartCountIncrease } from "../Features/CartSlice"
import { CartCountDecrease } from "../Features/CartSlice"
import { FaBold, FaTrash } from "react-icons/fa";
import { DeleteProduct } from "../Features/CartSlice";
import { PiHandbagSimpleBold } from "react-icons/pi";
import { SiReaddotcv } from "react-icons/si";
import { MdOutlineSummarize } from "react-icons/md";





function Cart() {


    const cartItems = useSelector(state => state.cart.cart)
    const Total = useSelector(state => state.cart)

    const Dispacth = useDispatch()

    console.log(cartItems, "cartsection")


    function IncreaseCount(i) {

        Dispacth(CartCountIncrease(i))
    }



    function DecreaseCount(i) {

        Dispacth(CartCountDecrease(i))


    }


    function DeleteCartProduct(i) {
        Dispacth(DeleteProduct(i))



    }



    return (

        <div>
            <div>
                <h2>Cart Section</h2><br /><br />

                {cartItems.length >= 1 ? cartItems.map((i) => {
                    return (
                        <div id="cartSection" key={i.id}>

                            <div>


                                <img id="cartImage" src={i.image} alt={i.title}></img><br /><br />

                                <p>Title:{i.title}</p>
                                <p>Rating:{i.rating.rate}</p>
                                <p>Price:{i.price}</p><br />

                            </div>

                            <div>
                                <button type="button" class="btn calcultions-btn" onClick={() => IncreaseCount(i)}>+</button><br /><br />
                                <button type="button" class="btn calcultions-btn" onClick={() => DecreaseCount(i)}>-</button>
                            </div>
                            <p>{i.Quantity}<span style={{ margin: '10px' }}>X</span> {i.price}<span style={{ margin: '10px' }}>=</span></p>

                            <p>{i.MultiplecountPrice}{" "}$</p>

                            {<FaTrash onClick={(e) => DeleteCartProduct(i)} id="Deletebutton" />}



                        </div>



                    )
                })

                    : (<h5 style={{ textAlign: "center" }}>Cart is empty..</h5>)}


            </div><hr style={{ background: "lightcoral" }}></hr><br />
            {Total.total > 1 ? <p id="Total" style={{ fontWeight: "bold", height: "40px" }}> <MdOutlineSummarize style={{ height: "25px", width: "30px" }} />&nbsp;Total:{Total.total}{" "}$</p> : ""}
        </div>
    )

}
export default Cart