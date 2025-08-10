import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product, onAddProduct, isOutOfStock }) => {
  const { id, image, title, description, price } = product;

  const handleClick = () => {
    if (!isOutOfStock) {
      toast.success("Added to cart");
      onAddProduct(product);
    }
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <div
        className={`card border-0 shadow-sm h-100 d-flex flex-column position-relative ${
          isOutOfStock ? "out-of-stock" : ""
        }`}
        style={{ borderRadius: 12, overflow: "hidden" }}
      >
        {isOutOfStock && (
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 text-white fw-bold fs-4 d-flex justify-content-center align-items-center z-2">
            Out of Stock
          </div>
        )}

        <div className="ratio ratio-1x1 bg-light d-flex align-items-center justify-content-center">
          <img
            src={image}
            alt={title}
            className="img-fluid p-3"
            style={{ maxHeight: 260, objectFit: "contain" }}
          />
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-truncate" title={title}>
            {title}
          </h5>
          <p
            className="card-text text-muted"
            style={{
              fontSize: "0.9rem",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>

          <div className="mt-auto">
            <div className="fw-bold fs-5 mb-2">${price}</div>
            <div className="d-flex gap-2 flex-wrap">
              <Link
                to={`/product/${id}`}
                className={`btn btn-dark flex-grow-1 ${isOutOfStock && "disabled"}`}
              >
                Buy Now
              </Link>
              <button
                className="btn btn-outline-dark flex-grow-1"
                onClick={handleClick}
                disabled={isOutOfStock}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
