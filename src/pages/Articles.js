import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import ArticlePreview from "../components/ArticlePreview";
import ArticleDetails from "./ArticleDetails";

export default function Articles(props) {
  const history = useHistory();
  const params = useParams();

  //   console.log(`this is history`, history);
  //   console.log(`this is params`, params);

  useEffect(() => {
    async function returnPage() {
      const routeParam = encodeURIComponent(params.searchText);
      if (params.searchText === undefined) {
        return props.set_result({ status: `idle`, data: [`initiating page`] });
      } else {
        const response = await axios.get(
          `http://newsapi.org/v2/everything?q=${routeParam}&from=2020-09-16&sortBy=publishedAt&language=en&apiKey=ebc07e739d214dee90b380add0ea86d0`
        );
        // props.set_result({ status: `Done`, data: response.response.docs });
        // console.log("I ran Else", response);
        const newArrayOfArticles = response.data.articles.map((art) => {
          return { ...art, likes: 0, comment: "", commentTally: 0 };
        });
        console.log("ARTICLES", newArrayOfArticles);
        props.set_result({ status: "done", data: newArrayOfArticles });
      }
    }
    returnPage();
  }, [params.searchText]);

  const addLike = (urlToLike) => {
    console.log(urlToLike);
    const updatedArticles = props.result.data.map((article) => {
      return article.url === urlToLike
        ? { ...article, likes: article.likes + 1 }
        : article;
    });

    console.log(updatedArticles);

    props.set_result({ status: "done", data: updatedArticles });
    // const addLikeToArticle = newArrayOfArticles.map((art) => {
    //   const { url, likes } = art;

    //   url === art.url ? { ...art, likes: likes + 1 } : art;
    // });
  };

  // <ArticleDetails id={url} addLike={addLike} />;

  const articlePrev = props.result.data.map((art) => {
    console.log(art);
    const { title, description, url, likes, comment, commentTally } = art;

    return (
      <div key={url}>
        <ArticlePreview
          key={url}
          title={title}
          description={description}
          id={title}
          like={likes}
          comment={comment}
          commentTally={commentTally}
        />
        <div className="interact-row">
          <p>{commentTally} Comments</p>
          <div style={{ width: "10px" }}> </div>
          <button onClick={() => addLike(url)}>{likes} Likes</button>
          <div style={{ width: "10px" }}> </div>
          <button>Share</button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <header>
        <h1>Articles</h1>
      </header>
      <div>{articlePrev}</div>
    </div>
  );
}
