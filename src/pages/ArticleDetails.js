import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comment from "../components/Comment";

export default function ArticleDetails(props) {
  const params = useParams();
  //   const [articleId, setArticleId] = useState(params.articleId);
  const [articleDetails, setArticleDetails] = useState("");
  const [numLikes, set_numLikes] = useState(0);

  useEffect(() => {
    const articleFromGlobalState = props.result.data.find((article) => {
      console.log(article.title, params.articleId);
      return article.title === decodeURIComponent(params.articleId);
    });

    console.log(articleFromGlobalState);
    async function fetchArticleDetails() {
      const url = `http://newsapi.org/v2/everything?qInTitle=${params.articleId}&sortBy=publishedAt&language=en&apiKey=ebc07e739d214dee90b380add0ea86d0`;
      const response = await axios.get(url);
      console.log("Data fetched by id:", response);
      props.set_result({
        status: "done",
        data: [...props.result.data, response.data.articles[0]],
      });
      //   console.log("RESPONSE", response);
    }

    if (articleFromGlobalState) {
      setArticleDetails(articleFromGlobalState);
    } else {
      fetchArticleDetails();
    }
  }, [params]);

  //   const { title, content } = articleDetails[0];

  console.log("ARTICLE DETAILS", articleDetails[0]);

  const onClickAddLike = (id) => {
    // console.log("Yes, clicked! Current number of likes:", numLikes);
    // addLike(id);
  };

  return (
    <div>
      <h2>{articleDetails?.title}</h2>
      <p>{articleDetails?.content}</p>
      <p>
        To read the full article, click <a href={articleDetails?.url}>here!</a>
      </p>
      <p>
        <b></b> {articleDetails?.likes}likes - comments
        <button className="mr-2 ml-2" onClick={onClickAddLike}>
          Like
        </button>
      </p>
      <Comment />
    </div>
  );
}
