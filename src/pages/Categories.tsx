import React, { useState, useEffect, useRef } from "react";
import { Categories } from "../models/categories/CategoriesService";
import { Product } from "../models/product/ProductService";
import { CategoriesService } from "../network/category/categoryService";

function Category() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const NameRef = useRef<HTMLInputElement>(null);
  const NumberRef = useRef<HTMLInputElement>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  let categoryService = new CategoriesService();
  useEffect(() => {
    categoryService.getAll().then((res) => {
      setCategories(res.data);
      setKeys(Object.keys(res.data[0]));
    });
  }, []);
  const deleteHandler = (id: number) => {
    if (localStorage.getItem("name")) {
      categoryService
        .delete(id)
        .then((res) =>
          categoryService.getAll().then((res) => setCategories(res.data))
        );
    } else {
      alert("PLEASE LOG IN FIRST");
    }
  };
  const handleUpdate = () => {
    if (localStorage.getItem("name")) {
      const newObj: Categories = {
        name: NameRef.current?.value!,
        description: NumberRef.current?.value!,
      };
      categoryService
        .add(newObj)
        .then((res) =>
          categoryService.getAll().then((res) => setCategories(res.data))
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
              name="firstInput"
              type="text"
              ref={NumberRef}
              placeholder={"enter something"}
            />
            <label htmlFor="firstInput">Name</label>
          </div>
          <div>
            <input
              ref={NameRef}
              name="secondInput"
              type="text"
              placeholder={"enter something"}
            />
            <label htmlFor="Second">Description</label>
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
              {keys.map((name) => {
                return (
                  <>
                    <th key={name}> {name.toLocaleUpperCase()} </th>
                  </>
                );
              })}
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => {
              return (
                <>
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <td>{item.name}</td>
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

export default Category;
