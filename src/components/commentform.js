import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";

const CommentBox = styled.div`
  input,
  textarea {
    display: block;
    background-color: #fff;
    border: 2px solid #ddd;
    font-size: 16px;
    font-family: "Hind", sans-serif;
    font-weight: 400;
    padding: 10px 12px 8px;
    width: 100%;
    font-variant-numeric: lining-nums;
    font-feature-settings: "lnum";
  }
  input[type="text"] {
    width: 50%;
  }
`;

const CommentForm = ({ parentId, id }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleCommentSubmission = async (e) => {
    e.preventDefault();
    let comment = {
      name: name,
      content: content,
      pId: id,
      time: new Date(),
    };
    const docRef = await addDoc(collection(db, "comments"), comment);
    setName("");
    setContent("");
    setTimeout(window.location.reload(), 3000);
  };

  return (
    <CommentBox>
      <form onSubmit={(e) => handleCommentSubmission(e)}>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="name..."
          style={{ marginBottom: 40 }}
        />
        <textarea
          style={{ marginBottom: 20 }}
          id="comment"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          name="comment"
          required="required"
          cols="45"
          rows="8"
          placeholder="Comment..."
        ></textarea>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </CommentBox>
  );
};

CommentForm.propTypes = {
  parentId: PropTypes.string,
  slug: PropTypes.string.isRequired,
};

export default CommentForm;
