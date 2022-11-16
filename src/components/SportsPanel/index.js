import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";

import axios from "axios";

const SportsPanel = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const getSportsInfo = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://api.api-futebol.com.br/v1/campeonatos/33/tabela",
        {
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_SPORTS_KEY,
          },
        }
      );

      setError(false);
      setData(data);
    } catch (err) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    getSportsInfo();
  }, [getSportsInfo]);

  return (
    <section className="section">
      <h4 className="section-title">Sports Panel</h4>
      <div className="section-content">
        {data ? (
          <div className="sport">
            <div className="sport-leaguename">Brasileirão série B 2020</div>
            <div className="sport-table">
              {data.map((time) => (
                <div key={time.posicao} className="sport-table-item">
                  <span className="sport-table-item-value">
                    <strong>Posição: </strong>
                    <span>{time.posicao + "º" || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Pontos: </strong>
                    <span>{time.pontos || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Jogos: </strong>
                    <span>{time.jogos || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Vitorias: </strong>
                    <span>{time.vitorias || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Empates: </strong>
                    <span>{time.derrotas || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Derrotas: </strong>
                    <span>{time.empate || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Gols Pro: </strong>
                    <span>{time.gols_pro || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Gols Contra: </strong>
                    <span>{time.gols_contra || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Saldo Gols: </strong>
                    <span>{time.saldo_gols || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Aproveitamento: </strong>
                    <span>{time.aproveitamento || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Variação de posição: </strong>
                    <span>{time.variacao_posicao || "---"}</span>
                  </span>
                  <span className="sport-table-item-value">
                    <strong>Ultimos jogos: </strong>
                    <span style={{ textTransform: "uppercase" }}>
                      {time.ultimos_jogos.length > 0
                        ? time.ultimos_jogos.join("-")
                        : "---"}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="error">
            {error ? (
              <span>error searching for sports data</span>
            ) : (
              <span>no data found</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SportsPanel;
