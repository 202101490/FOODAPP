import React, { createContext, useContext, useReducer } from 'react'
const CartstateContext = createContext();
const CartdispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE": 
            // console.log("adbmad cs") 
            let arr = [...state]
            // console.log(arr)
            // arr.find((food, index) => {
            //     console.log(food.id)
            //     if (food.id === action.id) {
            //         console.log(food.qty, parseInt(action.qty), action.price + food.price)
            //         arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
            //     }
            //     return arr
            // })
            arr = arr.map((food) => {
                if (food.id === action.id) {
                  console.log(food.qty, parseInt(action.qty), action.price + food.price);
                  return { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price };  // update the item properly
                }
                return food;  // return unchanged food if no match
              });
            return arr
        default:
            console.log("Error in Reducer")
    }
}
export const Cartprovider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartdispatchContext.Provider value={dispatch}>
            <CartstateContext.Provider value={state}>
                {children}
            </CartstateContext.Provider>
        </CartdispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartstateContext);
export const useDispatchCart = () => useContext(CartdispatchContext);
