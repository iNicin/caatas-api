import React from "react";
import PropTypes from "prop-types";

const tagsList = [
  "angry", "chubby", "curious", "cute", "funny",
  "happy", "playful", "sad", "sleepy", "surprised",
];

const CatSelector = ({ selectedTag, setSelectedTag }) => {
  return (
    <div>
      <label htmlFor="tagSelect">Selecione uma tag:</label>
      <select
        id="tagSelect"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        aria-label="Selecione uma tag"
      >
        <option value="">Selecione uma tag</option>
        {tagsList.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};
CatSelector.propTypes = {
  selectedTag: PropTypes.string.isRequired,
  setSelectedTag: PropTypes.func.isRequired,
};

export default CatSelector;