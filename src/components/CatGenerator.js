import React, { useState, useEffect } from "react";
import axios from "axios";
import "./catgenerator.css";

const tagsList = [
  "angry",
  "chubby",
  "curious",
  "cute",
  "funny",
  "happy",
  "playful",
  "sad",
  "sleepy",
  "surprised",
];

const CatGenerator = () => {
  const [selectedTag, setSelectedTag] = useState("");
  const [text, setText] = useState("");
  const [catImage, setCatImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      generateCatImage();
    }
  }, [loading]);

  const generateCatImage = async () => {
    try {
      setLoading(true);

      const apiUrl = "https://cataas.com/";
      const tagParam = `cat/${selectedTag}`;
      const textParam = `/says/${encodeURIComponent(text)}`;
      const url = textParam
        ? `${apiUrl}${tagParam}${textParam}`
        : `${apiUrl}${tagParam}`;
      const response = await axios.get(url, { responseType: "blob" });

      if (response.data) {
        setCatImage(URL.createObjectURL(response.data));
        setError("");
      } else {
        setError("Resposta da API sem dados de imagem.");
      }
    } catch (error) {
      console.error("Erro ao gerar a imagem do gato:", error);
      setError(
        `Erro ao tentar gerar a imagem do gato. Detalhes do erro: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (catImage) {
      const link = document.createElement("a");
      link.href = catImage;
      link.download = `${selectedTag}-cat`;
      link.click();
    }
  };

  return (
    <div className="cat-generator-container">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Gere imagens de gatos com texto usando a Caatas API. Crie memes de gatos de maneira fácil e divertida."
        />
        <title>Cataas API - Gerador de Gatos</title>
      </head>
      <h1>Caatas API</h1>
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
      <br />
      <label htmlFor="textInput">Adicione um texto à imagem:</label>
      <input
        type="text"
        id="textInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Texto opcional"
        aria-label="Adicione um texto à imagem"
      />
      <br />
      <button onClick={() => setLoading(true)}>Gerar Imagem</button>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}
      {catImage && (
        <img
          src={catImage}
          alt={`Imagem do Gato - ${text}`}
          className="cat-image"
        />
      )}
      {catImage && (
        <button onClick={handleDownload} className="download-button">
          Download
        </button>
      )}
    </div>
  );
};

export default CatGenerator;
