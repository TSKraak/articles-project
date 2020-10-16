import React from "react";
import "../App.scss";
import { Link, useHistory } from "react-router-dom";

export default function ArticlePreview(props) {
  const history = useHistory();

  const navigateToSearch = async () => {
    const routeParam = encodeURIComponent(props.id);
    history.push(`/article/${routeParam}`);
    localStorage.setItem("searchText", routeParam);
  };

  return (
    <Link
      to={`/article/${encodeURIComponent(props.id)}`}
      onClick={navigateToSearch}
    >
      <div>
        <h2>{props.title}</h2>
        <h4>{props.description}</h4>
      </div>
    </Link>
  );
}
