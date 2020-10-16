import React, { useEffect, useState } from "react";
import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";

export default function NavBar() {
  const history = useHistory();
  const params = useParams();
  const [searchText, setSearchText] = useState(params.query || "");

  const searchArticles = (event) => {
    // console.log("What is event?", event);
    event.preventDefault(); // in case of using a <form> this is needed to prevent refreshing
    // localStorage.setItem("search", event.target.value);
    setSearchText(event.target.value);
  };

  const navigateToSearch = () => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/articles/${routeParam}`); // to push the search term to params which is assigned useHistory and shows up after the / in url
    setSearchText(routeParam);
  };

  return (
    <div className="NavBar">
      <div>
        <NavLink
          className="Home card"
          exact
          to="/"
          activeStyle={{
            fontWeight: "bold, underline",
          }}
        >
          Home
        </NavLink>
        <NavLink
          className="Articles card"
          exact
          to="/articles"
          activeStyle={{
            fontWeight: "bold, underline",
          }}
        >
          Articles
        </NavLink>
        <NavLink
          className="About card"
          exact
          to="/about"
          activeStyle={{
            fontWeight: "bold, underline",
          }}
        >
          About
        </NavLink>
      </div>
      <div>
        <form className="search-bar">
          <input
            className="search-field"
            value={searchText}
            placeholder="Search for.."
            onChange={searchArticles}
          />
          <input
            className="search-button"
            type="submit"
            value="Search"
            onClick={navigateToSearch}
          />
        </form>
      </div>
    </div>
  );
}
