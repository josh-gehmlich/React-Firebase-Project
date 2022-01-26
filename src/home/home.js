import React, { useState, useCallback, useEffect } from "react";
import Post from "../components/post";
import { query, getDocs, collection, addDoc } from "firebase/firestore";
import db from "../firebase";

import "./home.css";

const Home = () => {
  const [homeState, setHomeState] = useState("new_channel");
  const [postList, setPostList] = useState([]);
  const [postTitle, setTitle] = useState("");
  const [postId, setPostId] = useState("");

  const newChannel = () => {
    setHomeState("new_channel");
  };
  const myChannel = (pid) => {
    console.log(pid.target.innerText, pid);
    setTitle(pid.target.innerText);
    const text = pid.target.innerText.substring(1).trim();
    const currentPost = postList.find((post) => post.postTitle === text);
    setPostId(currentPost.postId);
    console.log(postList);
    setHomeState("my_post");
  };

  const fetchPosts = useCallback(async () => {
    const q = query(collection(db, "posts"));
    const docs = await getDocs(q);
    console.log(docs);
    let allPosts = [];
    docs.forEach((item) => {
      const data = item.data();
      allPosts.push(data);
    });
    setPostList(allPosts);
    console.log(postList);
  }, [postList]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div
      style={{
        borderStyle: "solid",
        marginTop: 20,
        marginRight: 70,
        marginLeft: 70,
        height: 1800,
      }}
    >
      <div className="row">
        <div className="column_1" style={{ marginTop: 70 }}>
          <SideView
            onClick={newChannel}
            myChannel={myChannel}
            posts={postList}
          />
        </div>
        <div className="column_2" style={{ marginTop: 70 }}>
          {homeState === "my_post" && (
            <MyPostView title={postTitle} id={postId} />
          )}
          {homeState === "new_channel" && <MyChannelView />}
        </div>
      </div>
    </div>
  );
};

function SideView({ onClick, myChannel, posts }) {
  const email = window.localStorage.getItem("email");
  const domain = !email ? "gmail.com" : email.split("@").pop();

  const allowedPosts = posts.filter(
    (post) => post.email.split("@").pop() === domain
  );

  console.log(domain, allowedPosts, posts);

  return (
    <>
      <p>{email}</p>
      <button style={{ marginTop: 20 }} onClick={onClick}>
        New Channel
      </button>
      <br></br>
      {allowedPosts.length > 0 &&
        allowedPosts.map((post) => {
          return (
            <div key={post.postId} onClick={myChannel}>
              <button style={{ marginTop: 20 }}># {post.postTitle}</button>
              <br></br>
            </div>
          );
        })}
    </>
  );
}

function MyChannelView() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const email = window.localStorage.getItem("email");

  const submitPost = async (e) => {
    e.preventDefault();
    let post = {
      postBody: body,
      postId: "id" + new Date().getTime(),
      postTitle: subject,
      email: email,
    };
    const docRef = await addDoc(collection(db, "posts"), post);

    setSubject("");
    setBody("");
    setTimeout(window.location.reload(), 3000);
  };
  return (
    <>
      <p>My Channel</p>
      <div
        style={{
          marginRight: 70,
        }}
      >
        <div
          style={{
            marginTop: 50,
          }}
        >
          <input
            onChange={(e) => setSubject(e.target.value)}
            style={{ marginLeft: 20 }}
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
          />
        </div>
        <div
          style={{
            marginTop: 50,
          }}
        >
          <textarea
            onChange={(e) => setBody(e.target.value)}
            style={{ marginLeft: 20 }}
            type="text"
            id="body"
            name="body"
            placeholder="Body"
            rows={6}
          />
        </div>
        <button style={{ marginTop: 20 }} onClick={submitPost}>
          Submit
        </button>
      </div>
    </>
  );
}

function MyPostView({ title, id }) {
  return (
    <>
      <div
        style={{
          height: 500,
          marginRight: 70,
        }}
      >
        <Post title={title} id={id} />
      </div>
    </>
  );
}

export default Home;
