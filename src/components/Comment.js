import React from "react";

const Comment = ({ user, avatar, date, body }) => {
  return (
    <div className="comment-box">
      <div>
        <img src={avatar} alt="Avatar" />
      </div>
      <div>
        <h3>
          <b>{user}</b> commented on {date}
        </h3>
        <div
          dangerouslySetInnerHTML={{ __html: `${body}` }}
          className="issue-body"
        ></div>
      </div>
    </div>
  );
};

export default Comment;
