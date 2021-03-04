import Box from "./Box";
import { useGlobalContext } from "./context";
import { empty } from "./boardData";
import React, { useState, useEffect } from "react";

function Game() {
  const {
    mistakes,
    solveSudoku,
    values,
    closeSubmenu,
    name,
    setHighlight,
    isNotesTrue,
    setIsNotesTrue,
    isCustom,
    setIsCreateCustom,
    findSolution,
  } = useGlobalContext();

  const [isCustomCreated, setIsCustomCreated] = useState(false);

  const handleHighlight = (e) => {
    if (!e.target.classList.contains("box-input")) {
      setHighlight(empty);
    }
  };

  useEffect(() => {
    console.log(values);
    if (isCustomCreated) {
      findSolution(values);
      setIsCreateCustom(false);
    } else {
      setIsCreateCustom(true);
    }
  }, [isCustomCreated]);

  return (
    <main onMouseOver={closeSubmenu} onClick={handleHighlight}>
      <div className="container">
        <header className="game-header">
          <h2>{name}</h2>
        </header>
        <div className="game-container">
          <div className="sudoku">
            {values.map((row, rowPos) => {
              // return <Box />;
              return row.map((value, colPos) => {
                let id = String(rowPos) + String(colPos);
                return <Box value={value} key={id} id={id} />;
              });
            })}
            <div className="layout-line col-1"></div>
            <div className="layout-line col-2"></div>
            <div className="layout-line row-1"></div>
            <div className="layout-line row-2"></div>
          </div>
        </div>
        <div className="game-controls">
          <div className="toggle-notes">
            <label class="switch">
              <input
                type="checkbox"
                onClick={() => {
                  setIsNotesTrue(!isNotesTrue);
                }}
              />
              <span class="slider round"></span>
            </label>
            <h4 id="toggle-heading">Toggle Notes</h4>
          </div>
          <div className="mistakes">
            <h3 id="mistakes">{mistakes}/3</h3>
            <h4 id="mistakes-heading">Mistakes</h4>
          </div>
          <div className="solve-container">
            <div className="finish-btn-container">
              <input
                type="checkbox"
                className={`${isCustom ? "finish-btn" : "hidden"}`}
                onClick={() => setIsCustomCreated(!isCustomCreated)}
              />
              <h4 className={`${isCustom ? "finish-heading" : "hidden"}`}>
                Finished Entering
              </h4>
            </div>
            <div className="solve-btn-container">
              <button className="solve-btn" onClick={solveSudoku}>
                Solve
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Game;
