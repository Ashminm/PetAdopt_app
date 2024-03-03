import React from 'react'
import { Link } from 'react-router-dom'
function Cart() {
  return (
    <div>

      <div className=" text-center p-5">
        <h2>Your cart is empty!!</h2>
        <Link to={'/List'} className='btn border border-dark m-4'>Continue Shop</Link>
      </div>
    </div>
  )
}

export default Cart