import React from "react";

const ProductList = ({ products = [], onEdit, onDelete }) => {
  if (!products.length) return <p className="p-4">No products available.</p>;

  return (
    <div className="overflow-x-auto border rounded shadow-md bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price (Br)</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Category</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Stock</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Image</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-800">{p.name || "-"}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{p.description || "-"}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{p.price ?? "-"}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{p.category || "-"}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{p.stock ?? "-"}</td>
              <td className="px-4 py-2">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No Image</span>
                )}
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  onClick={() => onEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => onDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
