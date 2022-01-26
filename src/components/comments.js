import React, { useState, useCallback, useEffect } from "react";
import CommentForm from "./commentform";
import styled from "styled-components";
import Comment from "./comment";
import { query, getDocs, collection } from "firebase/firestore";
import db from "../firebase";

const CommentList = styled.div`
  div {
    margin-bottom: 20px;
  }
`;

const Comments = ({ comments, id }) => {
  const [commentsList, setCommentsList] = useState([]);

  const fetchComments = useCallback(async () => {
    const q = query(collection(db, "comments"));
    const docs = await getDocs(q);
    let allComments = [];
    docs.forEach((item) => {
      const data = item.data();
      allComments.push(data);
    });
    const postComments = allComments.filter((item, key) => {
      return item.pId === id;
    });
    setCommentsList(postComments);
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div style={{ height: 50, overflowInline: "scroll" }}>
      <h2>Join the discussion</h2>
      <CommentForm id={id} />
      <CommentList>
        {commentsList.length > 0 &&
          commentsList.map((comment) => {
            let child;
            if (comment.id) {
              child = comments.find((c) => comment.id === c.pId);
            }
            return (
              <Comment
                key={comment.id}
                child={child}
                comment={comment}
                id={id}
              />
            );
          })}
      </CommentList>
    </div>
  );
};
export default Comments;
