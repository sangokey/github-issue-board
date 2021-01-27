import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import Issues from "../components/Issues";
import Pagination from "../components/Pagination";

// Button from Bootstrap
import Button from "react-bootstrap/Button";

const org = "walmartlabs";
const repo = "thorax";

const Home = () => {
  const [issues, setIssues] = useState([]);
  const [nextIssues, setNextIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage, setIssuesPerPage] = useState(10);
  const [status, setStatus] = useState("open");
  const [pageGroup, setPageGroup] = useState(1);

  useEffect(() => {
    setLoading(true);
    const fetchIssues = async () => {
      // Get first 100 issues
      const res1 = await axios.get(
        "https://api.github.com/repos/" +
          org +
          "/" +
          repo +
          "/issues?per_page=100&state=" +
          status +
          "&page=" +
          String(pageGroup)
      );
      setIssues(res1.data);

      // Get next 100 issues
      const res2 = await axios.get(
        "https://api.github.com/repos/" +
          org +
          "/" +
          repo +
          "/issues?per_page=100&state=" +
          status +
          "&page=" +
          String(pageGroup + 1)
      );
      setNextIssues(res2.data);

      setLoading(false);
    };

    fetchIssues();
  }, [status, pageGroup]);

  // Get current posts
  const indexOfLastIssue = (currentPage - (pageGroup - 1) * 10) * issuesPerPage; //index of last issue = page # * issues per page
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage; //index of first issue = index of last - issues per page
  const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue); //slice issues from first issue to last issue

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); //set current page
    setPageGroup(Math.ceil(pageNumber / 10)); //page group is ceiling of pagenumber / 10
  };

  // Loading Page
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="home">
      {/* Organization and Repository */}
      <h1>
        {org} / {repo}
      </h1>

      {/* Open or Closed Issues*/}
      <div className="home-status">
        <h2>{`${status === "open" ? "Open" : "Closed"}`} Issues</h2>
        {/* Buttons to Change Issue Type */}
        <Button
          variant={`${status === "open" ? "secondary" : "dark"}`}
          onClick={() => {
            setStatus("open");
            setCurrentPage(1);
            setPageGroup(1);
          }}
        >
          Open
        </Button>{" "}
        <Button
          variant={`${status === "closed" ? "secondary" : "dark"}`}
          onClick={() => {
            setStatus("closed");
            setCurrentPage(1);
            setPageGroup(1);
          }}
        >
          Closed
        </Button>{" "}
      </div>

      <Issues issues={currentIssues} loading={loading} />
      <Pagination
        currentPage={currentPage}
        pageGroup={pageGroup}
        totalIssues={issues.length}
        nextIssues={nextIssues.length}
        issuesPerPage={issuesPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
