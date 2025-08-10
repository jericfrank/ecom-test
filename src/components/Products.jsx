import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import ProductCard from "./ProductCard";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={300} />
        </div>
        {Array(8)
          .fill()
          .map((_, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
              <div
                className="card border-0 shadow-sm h-100 d-flex flex-column"
                style={{ borderRadius: "12px", overflow: "hidden" }}
              >
                <div className="ratio ratio-1x1 bg-light">
                  <Skeleton height="100%" />
                </div>
                <div className="card-body d-flex flex-column flex-grow-1">
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={15} width="100%" />
                  <Skeleton height={15} width="90%" />
                  <Skeleton height={15} width="70%" />
                  <div className="mt-auto">
                    <Skeleton height={25} width={60} />
                    <div className="d-flex gap-2 flex-wrap mt-2">
                      <Skeleton height={38} width="48%" />
                      <Skeleton height={38} width="48%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              isOutOfStock={product.id === 4}
              onAddProduct={addProduct}
            />
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
