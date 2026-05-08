import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";

import { Link } from "react-router-dom";

import foods from "../data/foods";

export default function Home() {
  const addToCart = (food) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push(food);

    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert(`${food.title} added to cart`);
  };

  return (
    <div>
      <Navbar />

      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white px-10 py-20 text-center">
        <h1 className="text-6xl font-bold mb-5">AI Food Ordering</h1>

        <p className="text-xl mb-8">Smart AI-powered food recommendations</p>

        <Link to="/checkout">
          <button className="bg-white text-green-700 px-8 py-4 rounded-2xl text-lg font-bold">
            Go To Checkout
          </button>
        </Link>
      </section>

      <section className="px-10 py-14">
        <h1 className="text-4xl font-bold mb-10">Popular Foods</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              title={food.title}
              price={food.price}
              image={food.image}
              addToCart={() => addToCart(food)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
