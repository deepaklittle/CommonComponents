import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const totalProducts = products.length;
  const numberOfPages = Math.ceil(totalProducts / pageSize);
  const start = currentPage * pageSize;
  const end = start + pageSize;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pagination</h1>

      <div style={styles.pageSizeContainer}>
        <label style={styles.label}>Items per page: </label>
        <select
          style={styles.select}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.gridContainer}>
        {products.slice(start, end).map((product) => (
          <ProductCard
            key={product.id}
            image={product.thumbnail}
            title={product.title}
          />
        ))}
      </div>

      <div style={styles.paginationContainer}>
        <button
          style={styles.button}
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          PREVIOUS
        </button>

        {[...Array(numberOfPages).keys()].map((n) => (
          <span
            key={n}
            style={{
              ...styles.pageNumber,
              backgroundColor: currentPage === n ? "#007bff" : "white",
              color: currentPage === n ? "white" : "black",
            }}
            onClick={() => setCurrentPage(n)}
          >
            {n + 1}
          </span>
        ))}

        <button
          style={styles.button}
          disabled={currentPage === numberOfPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ image, title }) => {
  return (
    <div style={styles.card}>
      <img style={styles.image} src={image} alt={title} />
      <p style={styles.title}>{title}</p>
    </div>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  pageSizeContainer: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "16px",
    marginRight: "10px",
  },
  select: {
    padding: "5px",
    fontSize: "16px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
    justifyContent: "center",
  },
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  paginationContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: "8px 15px",
    margin: "0 5px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "0.3s",
    outline: "none",
    disabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
  },
  pageNumber: {
    padding: "8px 12px",
    margin: "0 3px",
    cursor: "pointer",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    transition: "0.3s",
  },
};

export default Pagination;
