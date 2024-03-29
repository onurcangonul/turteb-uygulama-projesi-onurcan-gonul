
import React from "react";
// Redux Import
import { useDispatch, useSelector } from "react-redux";
import { addToCart, markAsAdded, selectCartItems } from "../../redux/cartSlice";
// Thirtparty Import
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// Icons Import
import { FaRegCheckCircle } from "react-icons/fa";

const Product = (props) => {
  const { bookData } = props;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleAddToCart = (item) => {
    toast.success("Ürün Sepete Eklendi 📕");
    dispatch(
      addToCart({
        id: item.id,
        title: item.volumeInfo.title,
        price: item.saleInfo.listPrice,
        image: item.volumeInfo.imageLinks.thumbnail,
      })
    );
    // send the added item
    dispatch(markAsAdded({ id: item.id }));
  };

  return (
    <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-4">
      <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
        {bookData &&
          bookData.length > 0 &&
          bookData.map((val, index) => {
            const maxTitleLength = 20;
            const maxDescriptionLength = 100;
            const title =
              (val.volumeInfo.title ?? "").length > maxTitleLength
                ? (val.volumeInfo.title ?? "").substring(0, maxTitleLength) +
                  "..."
                : val.volumeInfo.title ?? "";

            const description =
              (val.volumeInfo.description ?? "").length > maxDescriptionLength
                ? (val.volumeInfo.description ?? "").substring(
                    0,
                    maxDescriptionLength
                  ) + "..."
                : val.volumeInfo.description ?? "";

            const priceVal =
              val.saleInfo.listPrice && val.saleInfo.listPrice.amount
                ? true
                : false;

            const addedToCart = cartItems.find(
              (item) => item.id === val.id
            )?.addedToCart;
            return (
              <React.Fragment key={val.id}>
                {val.volumeInfo.imageLinks &&
                val.volumeInfo.imageLinks.thumbnail ? (
                  <div>
                    <section className="p-5 py-10 rounded-lg bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
                      <Link to={`/product/${val.id}`}>
                        <img
                          className="mx-auto"
                          src={val.volumeInfo.imageLinks.thumbnail}
                          alt={title}
                        />
                        <h1 className="text-2xl my-5 font-semibold">{title}</h1>
                        <p className="mb-5">{description}</p>
                        <h2 className="font-semibold mb-5">
                          {`${
                            val.saleInfo.listPrice &&
                            val.saleInfo.listPrice.amount
                              ? val.saleInfo.listPrice.amount + " TL"
                              : ""
                          }`}
                        </h2>
                      </Link>
                      <button
                        disabled={addedToCart || !priceVal}
                        onClick={() => {
                          handleAddToCart(val);
                        }}
                        className={`p-2 px-6 cursor-pointer ${
                          addedToCart
                            ? "bg-blue-500"
                            : priceVal
                            ? "bg-purple-500 hover:bg-purple-600"
                            : "bg-gray-300 pointer-events-none"
                        } text-white rounded-md `}
                      >
                        {addedToCart ? (
                          <>
                            <span className="flex justify-center items-center gap-2">
                              Ürün Sepete Eklendi <FaRegCheckCircle />
                            </span>
                          </>
                        ) : priceVal ? (
                          "Sepete Ekle"
                        ) : (
                          "Stokta Yok"
                        )}
                      </button>
                    </section>
                  </div>
                ) : (
                  ""
                )}
              </React.Fragment>
            );
          })}
      </section>
    </section>
  );
};

export default Product;
