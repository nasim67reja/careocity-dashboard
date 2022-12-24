import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../App";
import "./productInfo.scss";

const ProductInfo = () => {
  const [product, setProduct] = useState();
  const params = useParams();

  const getProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${URL}/api/v1/products/${params.productId}`
      );
      // dispatch(productsActions.storeProducts(data.data.data));
      setProduct(data.data.data);
    } catch (error) {
      console.log(`error: `, error);
    }
  }, [params.productId]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="left">
      <div className="editButton">Edit</div>
      <h1 className="title">Information</h1>
      <div className="item">
        {product && (
          <>
            <img
              crossOrigin="anonymous"
              src={`${URL}/Products/${product.categories}/${product.images[0]}`}
              alt="userphoto"
              className="itemImg"
            />
            <div className="details">
              <h1 className="itemTitle">{product.name}</h1>
              <div className="detailItem">
                <span className="itemKey">Summary:</span>
                <span className="itemValue">{product.summary}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Categories:</span>
                <span className="itemValue">{product.categories}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Price:</span>
                <span className="itemValue">${product.price}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Ratings:</span>
                <span className="itemValue">${product.ratingsAverage}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Ratings Quantity:</span>
                <span className="itemValue">${product.ratingsQuantity}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Price Discount:</span>
                <span className="itemValue">${product.priceDiscount}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
