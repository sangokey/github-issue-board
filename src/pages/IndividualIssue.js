import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment"; //moment for date format

// Component
import Comment from "../components/Comment";

// Badge from Boostrap
import Badge from "react-bootstrap/Badge";

const url = "https://api.github.com/repos/walmartlabs/thorax/issues/";

const IndividualIssue = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchIssue = async () => {
      try {
        // Get Issue Data
        const res = await axios.get(`${url}${id}`);

        // Check if issue is an existing issue
        if (res.data) {
          // Get title, state, creat_at, body from data
          const { title, state, created_at, body, labels } = res.data;
          // Get username
          const { login, avatar_url } = res.data["user"];
          // Label Data
          // Store into new variable
          const newIssue = {
            title,
            state,
            created_at,
            login,
            body,
            avatar_url,
            labels,
          };
          setIssue(newIssue);
        } else {
          setIssue(null);
        }

        // Get Comments Data
        const com = await axios.get(`${url}${id}/comments`);
        setComments(com.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  // Loading Page
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // If no issue, return error
  if (!issue) {
    return <h2>Invalid Issue</h2>;
  }

  const { title, state, created_at, login, body, avatar_url, labels } = issue;

  return (
    <div className="issue">
      {/* Title, Issue No. */}
      <h1>
        {title} #{id}{" "}
        {labels.map((label) => {
          return (
            <span
              style={{ backgroundColor: `#${label.color}`, color: "white" }}
              className="labels"
              key={label.id}
            >
              {label.name}
            </span>
          );
        })}
      </h1>

      {/* Status, Author, Date */}
      <Badge pill variant={state === "open" ? "success" : "danger"}>
        {state}
      </Badge>
      <span className="issue-author">
        <b>{login}</b> opened this issue on{" "}
        {moment(created_at).format("MMM D, YYYY")}
      </span>
      {/* Comment Section */}
      <section className="comments">
        {/* Comment by Issue Creater */}
        <div className="comment">
          <Comment
            user={login}
            avatar={avatar_url}
            date={moment(created_at).format("MMM D, YYYY")}
            body={body ? body : "No Description Provided"}
          />
        </div>
        {/* Map Comments and Call the Comment Component */}
        {comments.map((comment) => {
          return (
            <div className="comment" key={comment.id}>
              <Comment
                user={comment.user.login}
                avatar={comment.user.avatar_url}
                date={moment(comment.created_at).format("MMM D, YYYY")}
                body={comment.body ? comment.body : "No Description Provided"}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default IndividualIssue;
