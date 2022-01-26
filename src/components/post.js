import React from "react";
import Comments from "./comments";

const Post = ({ title, id }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Comments id={id} />
    </div>
  );
};

export default Post;
