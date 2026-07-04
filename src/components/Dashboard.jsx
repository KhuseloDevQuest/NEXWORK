import { Link } from "react-router-dom";
import "../stylesheets/Dashboard.css";

export default function Dashboard({ categories }) {
  return (
    <ul className="category-grid">
      {categories.map((category) => (
        <li key={category.id}>
          <Link to={category.path} className="category-link">
            <article className="category-card">
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}