import React, { useState } from "react";

export default function Comment(props) {
  const onClickRegister = (event) => {
    event.preventDefault();
    props.addComment(comment);
    return setComment("");
  };

  const [comment, setComment] = useState("");

  console.log(comment);

  const commentInput = (event) => {
    setComment(event.target.value);
  };

  // const onKeyRegister = (event) => {
  //   event.preventDefault();
  //   if (event.key === "Enter") {
  //     console.log("Yalla");
  //     props.addComment(comment);
  //     return setComment("");
  //   }
  // };

  return (
    <div>
      <h5 className="row">
        <input
          className="card"
          type="text"
          placeholder="Add your comments"
          onChange={commentInput}
          value={comment}
        />
        <button className="card" onClick={onClickRegister}>
          Add
        </button>
      </h5>
    </div>
  );
}
