// src/fifa/FifaCard.jsx
import React from "react";
import "./fifa-card.css"; // ✅ só estilos da carta

export default function FifaCard({ player, active = false }) {
  return (
    <figure
      className={`fifa-card ${active ? "is-active" : ""}`}
      tabIndex={0}
      aria-label={`${player.name}, ${player.position}, camisa ${player.number}`}
    >
      <div className="fifa-card__frame">
        <i className="fifa-card__crest" aria-hidden="true" />
        <header className="fifa-card__header">
          <div className="fifa-card__rating">{player.number}</div>
          <div className="fifa-card__pos">{player.position}</div>
        </header>

        <div className="fifa-card__photoWrap">
          <img
            className="fifa-card__photo"
            src={player.photo}
            alt={`${player.name} - ${player.position}`}
            loading="lazy"
          />
        </div>

        <footer className="fifa-card__footer">
          <div className="fifa-card__name">{player.name}</div>
        </footer>
      </div>
    </figure>
  );
}
