import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { format } from "date-fns";

const TwitterPanel = () => {
  const [data, setData] = useState([]);
  const [asOf, setAsOf] = useState("");
  const [location, setLocation] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [error, setError] = useState(false);

  const getTrendTopics = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axios.get("https://psw-n2-back.herokuapp.com/api/trends", {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
        },
      });

      setData(data.trends);
      setLocation(data.locations[0]);
      setAsOf(data.as_of);
      setCreatedAt(data.created_at);
      setError(false);
    } catch (err) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    getTrendTopics();
  }, [getTrendTopics]);

  return (
    <section className="section">
      <h4 className="section-title">Twitter Panel {location.name}</h4>
      <h6 className="section-subtitle">
        <span className="section-subtitle--text">
          Trends em: {asOf ? format(new Date(asOf), "dd/MM/yyyy HH:mm") : "---"}{" "}
        </span>
        <span className="section-subtitle--text">
          Última trend criada em:{" "}
          {createdAt ? format(new Date(createdAt), "dd/MM/yyyy HH:mm") : "---"}
        </span>
      </h6>
      <div className="section-content">
        <div className="trend-grid">
          {data.length > 0 ? (
            data.map((trend) => (
              <div key={trend.query} className="trend">
                <a className="trend-name" href={trend.url} target="blank">
                  {trend.name}
                </a>
                <span className="trend-tweets">
                  Nº de Curtidas: {trend.tweet_volume || "---"}
                </span>
              </div>
            ))
          ) : (
            <span className="not-found">
              {error ? "Erro ao buscar trends" : "Nenhuma trend encontrada"}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default TwitterPanel;
