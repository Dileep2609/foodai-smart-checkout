import { FaShoppingCart } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();

  useEffect(() => {
    updateCartCount();
  }, [location]);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    setCartCount(cart.length);
  };

  return (
    <nav
      className="
      bg-white
      shadow-md
      px-8
      py-4
      flex
      items-center
      justify-between
    "
    >
      {/* LOGO */}

      <Link to="/">
        <h1
          className="
          text-3xl
          font-bold
          text-green-600
          cursor-pointer
        "
        >
          FoodAI
        </h1>
      </Link>

      {/* MENU */}

      <div
        className="
        flex
        items-center
        gap-6
      "
      >
        <Link to="/">
          <button
            className="
            text-gray-600
            font-medium
            hover:text-green-600
          "
          >
            Home
          </button>
        </Link>

        <Link to="/checkout">
          <button
            className="
            text-gray-600
            font-medium
            hover:text-green-600
          "
          >
            Checkout
          </button>
        </Link>

        {/* CART */}

        <Link to="/checkout">
          <div
            className="
            relative
            cursor-pointer
          "
          >
            <FaShoppingCart
              className="
              text-2xl
              text-green-600
            "
            />

            <span
              className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-xs
              px-2
              py-1
              rounded-full
            "
            >
              {cartCount}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
