import React from "react";

import Issue from "./Issue";

const Issues = ({ issues, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {issues.map((issue) => {
        return <Issue issue={issue} key={issue.id} />;
      })}
    </>
  );
};

export default Issues;
