import React from "react";
import PropTypes from "prop-types"; // Importando PropTypes

const TextInput = ({ text, setText }) => {
  return (
    <div>
      <label htmlFor="textInput">Adicione um texto à imagem:</label>
      <input
        type="text"
        id="textInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Texto opcional"
        aria-label="Adicione um texto à imagem"
      />
    </div>
  );
};

// Adicionando a validação de props
TextInput.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
};

export default TextInput;