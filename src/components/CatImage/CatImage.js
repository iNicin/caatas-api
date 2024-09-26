import React from "react";
import PropTypes from "prop-types"; // Importando PropTypes

const CatImage = ({ catImage, text, handleDownload }) => {
  return (
    <div>
      {catImage && (
        <>
          <img
            src={catImage}
            alt={`Imagem do Gato - ${text}`}
            className="cat-image"
          />
          <button onClick={handleDownload} className="download-button">
            Download
          </button>
        </>
      )}
    </div>
  );
};

// Adicionando a validação de props
CatImage.propTypes = {
  catImage: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleDownload: PropTypes.func.isRequired,
};

export default CatImage;