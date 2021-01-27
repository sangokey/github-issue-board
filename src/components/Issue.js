import moment from "moment";
import React from "react";
import Badge from "react-bootstrap/Badge";

import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";

const Issue = ({ issue }) => {
  return (
    <div className="issueBox">
      {/* Open/Close Icon, Issue #, Issue Type (pull, normal) */}
      <div className="issue-header">
        <h4>
          {issue.state === "open" ? (
            <GoIssueOpened size={20} style={{ color: "green" }} />
          ) : (
            <GoIssueClosed size={20} style={{ color: "red" }} />
          )}
          Issue #{issue.number}
          <Badge pill variant={`${issue.pull_request ? "primary" : "success"}`}>
            {issue.pull_request ? "Pull Request" : "Normal Issue"}
          </Badge>
        </h4>
        {/* Comments */}
        {issue.comments ? (
          <a href={`/issue/${issue.number}`}>
            <GoComment size={20} /> {issue.comments}
          </a>
        ) : (
          ""
        )}
      </div>
      {/* Title that links to issue */}
      <a href={`/issue/${issue.number}`}>{issue.title}</a>
      {issue.labels.map((label) => {
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
      {/* Issue Create Time */}
      <h6>
        <br />
        Created: {moment(issue.created_at).format("MMM D, YYYY")}
      </h6>
    </div>
  );
};

export default Issue;
