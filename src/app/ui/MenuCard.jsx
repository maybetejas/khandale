import "./MenuCard.css";

export default function MenuCard({
  title = "PROJECT DELTA",
  tagline = "// HIGH PRIORITY",
  color = "#9b5cff",
  icon = "/ss.svg"
}) {
  return (
    <div
      className="menu-card"
      style={{ "--card-accent": color }}
    >
      <div className="menu-card__content">
        <div className="menu-card__text">
          <h3 className="menu-card__title">{title}</h3>
          <p className="menu-card__tag">{tagline}</p>
        </div>

        <div className="menu-card__icon">
          <img src={icon} alt={`${title} icon`} />
        </div>
      </div>
    </div>
  );
}
