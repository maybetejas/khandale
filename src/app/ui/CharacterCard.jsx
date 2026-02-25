import "./CharacterCard.css";

export default function CharacterCard() {
  return (
    <section className="character-card" id="fck">

      {/* Avatar / Portrait */}
      <div className="character-card__avatar">
        <div className="character-card__avatar-frame">
          {/* image goes here later */}
          <img
            src="pfp.png"
            alt="Teesha system portrait"
            className="character-card__avatar-image"
          />
        </div>
      </div>

      {/* Identity */}
      <div className="character-card__identity">
        <h1 className="character-card__name">
          TEESHA
        </h1>

        <p className="character-card__role">
          // FULL-STACK Web Dev //
        </p>
      </div>

      {/* Description / System Info */}
      <div className="character-card__description">
        <p>
         DESIGN-AWARE FULL-STACK WEB DEVELOPMENT
        </p>
        <p>FROM IDEA TO DEPLOYMENT ⚙️</p>
      </div>

      {/* Primary Action */}
      <div className="character-card__actions">
        <button className="character-card__cta">
          CONTACT ME
        </button>
      </div>
    </section>
  );
}
