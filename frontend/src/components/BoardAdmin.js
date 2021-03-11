import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";

import UserService from "../services/user.service";
import metricService from "../services/metric.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await metricService
      .getMetrics()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }

  async function resetClicks(id) {
    await metricService.resetClicks(id).then(() => {
      fetchData();
    });
  }

  return (
    <>
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
          {data.map((d) => (
            <p>
              {d.name} has been clicked {d.clicks} times{" "}
              <Button onClick={() => resetClicks(d._id)}>Reset Counter</Button>
            </p>
          ))}
        </header>
      </div>
    </>
  );
};

export default BoardAdmin;
