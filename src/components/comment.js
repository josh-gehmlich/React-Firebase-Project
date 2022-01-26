import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CommentForm from "./commentform";

const CommentBox = styled.article`
  border: 1px solid #ddd;
  margin: 25px 0 0 ${(props) => (props.child ? "20px" : "0")};
  padding: 35px;
  .flex-container {
    display: flex;
    align-items: flex-start;
    .flex + .flex {
      margin-left: 10px;
    }
  }
  .comment-author {
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-weight: 700;
    span {
      text-transform: none;
      font-weight: 400;
      font-style: italic;
    }
  }
`;

const SingleComment = ({ comment }) => (
  <div>
    <div className="flex-container">
      <div className="flex">
        <p className="comment-author">
          {comment.name} <span>commented</span>
        </p>
      </div>
    </div>
    <p>{comment.content}</p>
  </div>
);

const Comment = ({ comment, child, id }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  return (
    <CommentBox>
      <SingleComment comment={comment} />
      {child && (
        <CommentBox child>
          <SingleComment comment={child} />
        </CommentBox>
      )}
      {!child && (
        <div>
          {showReplyBox ? (
            <div>
              <button onClick={() => setShowReplyBox(false)}>
                Cancel Reply
              </button>
              <CommentForm parentId={comment.id} id={id} />
            </div>
          ) : (
            <button onClick={() => setShowReplyBox(true)}>Reply</button>
          )}
        </div>
      )}
    </CommentBox>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  slug: PropTypes.string,
  child: PropTypes.object,
};

export default Comment;
