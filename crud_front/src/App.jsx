import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { PencilSquare, Trash, PlusCircle } from "react-bootstrap-icons";
import "./App.css";

function App() {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    os: "",
    price: "",
  });

  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const BASE_URL = "http://localhost:8080/springapp1";


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${BASE_URL}/update`, product);
        alert("✅ Update successful!");
        setIsEditing(false);
      } else {
        await axios.post(`${BASE_URL}/insert`, product);
        alert("✅ Insert successful!");
      }
      setProduct({ id: "", name: "", os: "", price: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Operation failed");
    }
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${BASE_URL}/display`);
    setProducts(res.data);
  };

  const editProduct = (p) => {
    setProduct(p);
    setIsEditing(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container py-4">
      {/* Card for form */}
      <div className="card shadow-lg border-0 mb-4">
        <div className="card-header bg-primary text-white text-center fs-5 fw-bold">
          {isEditing ? "✏️ Edit Product" : "➕ Add Product"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="id" className="form-label fw-semibold">
                ID
              </label>
              <input
                type="number"
                name="id"
                id="id"
                className="form-control"
                value={product.id}
                onChange={handleChange}
                required
                disabled={isEditing}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="name" className="form-label fw-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="os" className="form-label fw-semibold">
                OS
              </label>
              <input
                type="text"
                name="os"
                id="os"
                className="form-control"
                value={product.os}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="price" className="form-label fw-semibold">
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                className="form-control"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-success px-4">
                {isEditing ? "💾 Update" : "➕ Insert"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2 px-4"
                  onClick={() => {
                    setIsEditing(false);
                    setProduct({ id: "", name: "", os: "", price: "" });
                  }}
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Product Table */}
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white text-center fs-5 fw-bold">
          📦 Product List
        </div>
        <div className="card-body p-0">
          <table className="table table-hover table-bordered mb-0">
            <thead className="table-primary text-center">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>OS</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.os}</td>
                    <td>{p.price}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editProduct(p)}
                      >
                        <PencilSquare /> Edit
                      </button>
                      {/* Uncomment when delete is ready
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteProduct(p.id)}
                      >
                        <Trash /> Delete
                      </button>
                      */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-muted">
                    🚫 No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
