import { CreateStotre, createSlice } from "@reduxjs/toolkit"
import { SiTaketwointeractivesoftware } from "react-icons/si"
import { ToastContainer, toast, Bounce } from 'react-toastify';

const SuccessToast = () =>
    toast.success('Product has been added to the cart!', {
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

const WarningToast = () =>
    toast.warn('Product is already in the cart!', {
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




const initialState = {
    cart: [],
    total: 0

}


const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {


            let temp = { ...action.payload, Quantity: 1 }
            // temp["Quantity"] = 1
            temp["MultiplecountPrice"] = temp.price


            console.log(temp, "temp")

            let Index = state.cart.findIndex(i => i.id == action.payload.id)





            if (Index === -1) {

                state.cart.push(temp)
                state.total += temp.price
                console.log(state.total, "state.total-addcart")
                state.total = Math.floor(state.total * 100) / 100

                SuccessToast()


            }




            else {



                temp.Quantity++
                state.cart[Index].Quantity++
                state.cart[Index].MultiplecountPrice = state.cart[Index].Quantity * state.cart[Index].price
                state.total += state.cart[Index].price
                state.total = Math.floor(state.total * 100) / 100

                WarningToast()

            }
        },


        CartCountIncrease: (state, action) => {



            let Index = state.cart.findIndex(i => i.id == action.payload.id)
            console.log(Index, "incresecount")
            state.cart[Index].Quantity++


            state.cart[Index].MultiplecountPrice = state.cart[Index].Quantity * state.cart[Index].price

            state.total += state.cart[Index].price
            state.total = Math.floor(state.total * 100) / 100


        },

        CartCountDecrease(state, action) {
            let Index = state.cart.findIndex(i => i.id == action.payload.id)

            if (state.cart[Index

            ].Quantity > 1) {


                state.cart[Index].Quantity--
                state.cart[Index].MultiplecountPrice = state.cart[Index].Quantity * state.cart[Index].price
                state.total = state.total - state.cart[Index].price
                state.total = Math.floor(state.total * 100) / 100
            }
            else {


                let temp = state.cart
                state.total -= state.cart[Index].price
                state.total = Math.floor(state.total * 100) / 100
                state.cart = state.cart.filter(i => i.id !== action.payload.id)
                console.log(state.cart, "state.cart-decrease")




            }



        },
        DeleteProduct(state, action) {
            let TrashItem = action.payload

            state.total -= TrashItem.MultiplecountPrice
            state.total = Math.floor(state.total * 100) / 100
            state.cart = state.cart.filter(i => i.id !== TrashItem.id)




        }


    }



})


export const { addToCart, CartCountIncrease, CartCountDecrease, DeleteProduct } = CartSlice.actions
export default CartSlice.reducer
