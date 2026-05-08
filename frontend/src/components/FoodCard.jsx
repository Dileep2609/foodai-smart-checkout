export default function FoodCard({ title, price, image, addToCart }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      <img src={image} alt={title} className="h-52 w-full object-cover" />

      <div className="p-5">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>

        <p className="text-green-600 font-bold text-xl mb-4">₹{price}</p>

        <button
          onClick={addToCart}
          className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-xl font-semibold"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
