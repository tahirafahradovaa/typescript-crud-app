import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, { useState, useEffect, useRef } from "react";
import { Product } from "../models/product/ProductService";
import { ProductService } from "../network/products/productsService";

function Products(): ReactJSXElement {
  const NameRef = useRef<HTMLInputElement>(null);
  const NumberRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  let productService = new ProductService();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const newObj: Product = {
    name: NameRef.current?.value!,
    unitPrice: parseInt(NumberRef.current?.value!),
  };
  useEffect(() => {
    productService.getAll().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const deleteHandler = (id: number) => {
    if (localStorage.getItem("name")) {
      productService
        .delete(id)
        .then((res) =>
          productService.getAll().then((res) => setProducts(res.data))
        );
    } else {
      alert("PLEASE LOG IN FIRST");
    }
  };
  const handleUpdate = () => {
    if (localStorage.getItem("name")) {
      productService
        .add(newObj)
        .then((res) =>
          productService.getAll().then((res) => setProducts(res.data))
        );
      setIsClicked(false);
    } else {
      alert("PLEASE LOG IN FIRST");
    }
  };
  return (
    <>
      {isClicked ? (
        <div className="modalContainer">
          <div>
            <input
              ref={NameRef!}
              name="firstInput"
              type="text"
              placeholder={"enter something"}
            />
            <label htmlFor="firstInput">Name</label>
          </div>
          <div>
            <input
              ref={NumberRef!}
              name="secondInput"
              type="number"
              placeholder={"enter something"}
            />
            <label htmlFor="Second">Unit Price</label>
          </div>
          <button onClick={() => handleUpdate()} className="updateBtn">
            Update
          </button>
        </div>
      ) : (
        <></>
      )}
      <div
        className="container"
        style={{
          overflowX: "auto",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Supplier Id</th>
              <th>Unit Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <>
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.supplierId}</td>
                    <td>{item.unitPrice}</td>
                    <td>
                      <button
                        onClick={() => setIsClicked(!isClicked)}
                        className="updateBtn"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteHandler(item.id!)}
                        className="deleteBtn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
