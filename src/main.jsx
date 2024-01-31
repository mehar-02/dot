import React, { useState, useEffect } from "react";
import "./main.css";

function Main() {
  const [numPoints, setNumPoints] = useState(0);
  const [inputText, setInputText] = useState("");
  const [points, setPoints] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = () => {
    const parsedNumber = parseInt(inputText);
    if (!isNaN(parsedNumber)) {
      setNumPoints(parsedNumber);
      setIsGenerating(true);
      generatePoints(parsedNumber);
    } else {
      alert("Please enter a valid number");
    }
  };

  const handleReset = () => {
    setNumPoints(0);
    setInputText("");
    setPoints([]);
    setIsGenerating(false);
  };

  const generatePoints = (numPoints) => {
    const squareSize = 400;
    const circleRadius = squareSize / 2;

    let counter = 0;
    const interval = setInterval(() => {
      if (counter >= numPoints) {
        clearInterval(interval);
        setIsGenerating(false);
      } else {
        const x = Math.random() * squareSize + 50;
        const y = Math.random() * squareSize + 50;
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - (50 + circleRadius), 2) + Math.pow(y - (50 + circleRadius), 2)
        );
        const isInsideCircle = distanceFromCenter <= circleRadius;
        const color = isInsideCircle ? "blue" : "red";
        const point = <circle key={counter} cx={x} cy={y} r="2" fill={color} />;
        setPoints((prevPoints) => [...prevPoints, point]);
        counter++;
      }
    }, 50);
  };

  return (
    <div className="num">
      <div className="input">
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button className="set-points" onClick={handleButtonClick} disabled={isGenerating}>
          Set Points
        </button>
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <svg width="500" height="500">
        <rect x="50" y="50" width="400" height="400" fill="none" stroke="black" strokeWidth="2" />
        <circle cx="250" cy="250" r="200" fill="none" stroke="black" strokeWidth="2" />
        {points}
      </svg>
    </div>
  );
}

export default Main;


