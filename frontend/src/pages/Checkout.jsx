import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";
import SuggestionCard from "../components/SuggestionCard";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);

    fetchSuggestions(storedCart);
  }, []);

  const fetchSuggestions = async (cartItems) => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai/suggestions", {
        cart: cartItems,
      });

      setSuggestions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // REMOVE ITEM

  const removeItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    fetchSuggestions(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <Navbar />

      <div
        className="
        p-10
        bg-gray-100
        min-h-screen
      "
      >
        <h1
          className="
          text-5xl
          font-bold
          mb-10
          text-center
        "
        >
          Smart AI Checkout
        </h1>

        <div
          className="
          grid
          lg:grid-cols-2
          gap-10
        "
        >
          {/* CART */}

          <div
            className="
            bg-white
            rounded-3xl
            p-8
            shadow-xl
          "
          >
            <h2
              className="
              text-3xl
              font-bold
              mb-8
            "
            >
              Your Cart
            </h2>

            {cart.length === 0 ? (
              <p
                className="
                text-gray-500
                text-lg
              "
              >
                Cart is empty
              </p>
            ) : (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="
                    border-b
                    pb-5
                    mb-5
                    flex
                    justify-between
                    items-center
                  "
                >
                  <div>
                    <h3
                      className="
                      text-xl
                      font-bold
                    "
                    >
                      {item.title}
                    </h3>

                    <p className="text-gray-500">{item.category}</p>
                  </div>

                  <div
                    className="
                    flex
                    items-center
                    gap-4
                  "
                  >
                    <h2
                      className="
                      font-bold
                      text-green-600
                      text-xl
                    "
                    >
                      ₹{item.price}
                    </h2>

                    <button
                      onClick={() => removeItem(index)}
                      className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-4
                        py-2
                        rounded-xl
                      "
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

            <div
              className="
              flex
              justify-between
              items-center
              mt-8
            "
            >
              <h2
                className="
                text-2xl
                font-bold
              "
              >
                Total
              </h2>

              <h2
                className="
                text-3xl
                font-bold
                text-green-600
              "
              >
                ₹{total}
              </h2>
            </div>

            <button
              className="
              bg-green-500
              hover:bg-green-600
              text-white
              w-full
              py-4
              rounded-2xl
              mt-8
              text-lg
              font-bold
            "
            >
              Place Order
            </button>
          </div>

          {/* AI SUGGESTIONS */}

          <div>
            <h2
              className="
              text-3xl
              font-bold
              mb-6
            "
            >
              AI Suggestions
            </h2>

            {suggestions.map((item, index) => (
              <SuggestionCard
                key={index}
                name={item.name}
                message={item.message}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
