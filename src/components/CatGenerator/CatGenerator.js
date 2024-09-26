import React, { useState, useEffect } from "react";
import axios from "axios";
import CatSelector from "../CatSelector/CatSelector";
import TextInput from "../TextInput/TextInput";
import CatImage from "../CatImage/CatImage";
import "./catgenerator.css";

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
      const url = textParam ? `${apiUrl}${tagParam}${textParam}` : `${apiUrl}${tagParam}`;
      const response = await axios.get(url, { responseType: "blob" });

      if (response.data) {
        setCatImage(URL.createObjectURL(response.data));
        setError("");
      } else {
        setError("Resposta da API sem dados de imagem.");
      }
    } catch (error) {
      console.error("Erro ao gerar a imagem do gato:", error);
      setError(`Erro ao tentar gerar a imagem do gato. Detalhes do erro: ${error.message}`);
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
      <h1>Caatas API</h1>
      <CatSelector selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <TextInput text={text} setText={setText} />
      <button onClick={() => setLoading(true)}>Gerar Imagem</button>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}
      <CatImage catImage={catImage} text={text} handleDownload={handleDownload} />
    </div>
  );
};

export default CatGenerator;