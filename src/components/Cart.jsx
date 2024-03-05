import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function Cart({ cart }) {
    const [cartItems, setCartItems] = useState({
        pname: "",
        breed: "",
        amount: "",
    });
    useEffect(() => {
        // Retrieve data from local storage when the component mounts
        const storedData = localStorage.getItem("currentUser");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setCartItems(parsedData);
        }
    }, []);
    useEffect(() => {
        // Update cartItems whenever cart changes
        setCartItems({
            pname: cart.pname || "",
            breed: cart.breed || "",
            amount: cart.amount || "",
        });
    }, [cart]);

    // console.log(cartItems);

    return (
      <div className="mt-5">
    <table className='table shadow rounded container'>
        <thead>
            <tr style={{ backgroundColor: '#cacacae0' }} className="text-center">
                <th>Pet name</th>
                <th>Breed</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            {Array.isArray(cart) && cart.length > 0 ? (
                cart.map((item, index) => (
                    <tr key={index} className="text-center">
                        {/* Add a check for item existence before accessing properties */}
                        {item && (
                            <>
                                <td>{item.pname}</td>
                                <td>{item.breed}</td>
                                <td>{item.amount}</td>
                            </>
                        )}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="3" className="text-center">No items in the cart.</td>
                </tr>
            )}
        </tbody>
    </table>
</div>

  
    );
}

export default Cart;
