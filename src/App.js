import React, { useState } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import About from "./pages/About";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar";
import newsImage from "./news.jpg";

const NotFound = () => {
  return <h3>Oops, sorry. Page doesn't exist.</h3>;
};

function App() {
  const [result, set_result] = useState({
    status: `idle`,
    data: [],
  });

  return (
    <div className="App">
      <header className="App-header">
        <img className="newsImage" src={newsImage} alt="Today's News"></img>
      </header>
      <NavBar />
      <Switch>
        <Route exact path="/articles/:searchText?">
          <Articles result={result} set_result={set_result} />
        </Route>
        <Route exact path="/article/:articleId?">
          <ArticleDetails result={result} set_result={set_result} />
        </Route>
        <Route exact path="/profile/:profileId?" component={ProfilePage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/" component={Home} />
        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
