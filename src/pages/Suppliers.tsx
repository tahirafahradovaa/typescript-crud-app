import React, { useState, useEffect, useRef } from "react";
import { Supplier } from "../models/suppliers/SupplierService";
import { SupplierService } from "../network/suppliers/supplierService";

function Suppliers() {
  const NameRef = useRef<HTMLInputElement>(null);
  const NumberRef = useRef<HTMLInputElement>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  let supplierService = new SupplierService();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const newObj: Supplier = {
    companyName: NameRef.current?.value!,
    contactTitle: NumberRef.current?.value!,
  };
  useEffect(() => {
    supplierService.getAll().then((res) => {
      setSuppliers(res.data);
    });
  });
  const deleteHandler = (id: number) => {
    if (localStorage.getItem("name")) {
      supplierService
        .delete(id)
        .then((res) =>
          supplierService.getAll().then((res) => setSuppliers(res.data))
        );
    } else {
      alert("PLEASE LOG IN FIRST");
    }
  };
  const handleUpdate = () => {
    if (localStorage.getItem("name")) {
      supplierService.add(newObj).then((res) => supplierService.getAll());
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
            <label htmlFor="firstInput">Company Name</label>
          </div>
          <div>
            <input
              ref={NumberRef!}
              name="secondInput"
              type="text"
              placeholder={"enter something"}
            />
            <label htmlFor="Second">Contact Name</label>
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
              <th>Company Name</th>
              <th>Contact Name</th>
              <th>Contact Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {suppliers &&
              suppliers.map((item) => {
                return (
                  <>
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.companyName}</td>
                      <td>{item.contactName}</td>
                      <td>{item.contactTitle}</td>
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

export default Suppliers;
