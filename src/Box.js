import React, { useState, useEffect } from "react";
import { useGlobalContext } from "./context";
import { empty } from "./boardData";

function Box({ value, id }) {
  const {
    values,
    setValues,
    solution,
    handleMistakes,
    highlight,
    setHighlight,
    isNotesTrue,
    name,
    isCreateCustom,
  } = useGlobalContext();
  const [notesValues, setNotesValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    setNotesValues([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }, [name]);

  const handleChange = (value, values, id) => {
    let input = parseInt(value);
    if (isNotesTrue) {
      if (/[1-9]/.test(input)) {
        let newValues = [...notesValues];
        if (newValues[input - 1] === 0) {
          newValues[input - 1] = input;
        } else if (newValues[input - 1] === input) {
          newValues[input - 1] = 0;
        }
        setNotesValues(newValues);
      }
    } else if (/[1-9]/.test(input)) {
      let newValues = [];
      values.forEach((row, rowPos) => {
        let newRow = [];
        row.forEach((item, colPos) => {
          let pos = String(rowPos) + String(colPos);
          console.log(pos, id, typeof pos, typeof id);
          if (pos === id) {
            if (isCreateCustom) {
              newRow.push(input);
              console.log("1", input, isCreateCustom);
            } else if (solution[rowPos][colPos] === input) {
              newRow.push(input);
              console.log("2", input);
            } else if (solution[rowPos][colPos] !== input) {
              handleMistakes();
              newRow.push(item);
              console.log("3", item);
            }
          } else {
            newRow.push(item);
          }
        });
        newValues.push(newRow);
        console.log(newValues);
      });
      console.log(newValues);
      setValues(newValues);
    }
  };

  const checkAssist = (id) => {
    let row = parseInt(id[0]);
    let col = parseInt(id[1]);
    let newHighlight = [];
    for (let i = 0; i < empty.length; i++) {
      newHighlight[i] = empty[i].slice();
    }
    for (let y = 0; y <= 8; y++) {
      newHighlight[y][col] = true;
    }
    for (let x = 0; x <= 8; x++) {
      newHighlight[row][x] = true;
    }
    let boxRow = Math.floor(row / 3);
    let boxCol = Math.floor(col / 3);
    for (let i = boxCol * 3; i <= boxCol * 3 + 2; i++) {
      for (let j = boxRow * 3; j <= boxRow * 3 + 2; j++) {
        newHighlight[j][i] = true;
      }
    }
    setHighlight(newHighlight);
  };

  useEffect(() => {
    let row = parseInt(id[0]);
    let col = parseInt(id[1]);
    setHighlighted(highlight[row][col]);
  }, [highlight]);

  if (value === 0) {
    return (
      <div className="box">
        <input
          type="text"
          className={`${highlighted ? "box-input highlight" : "box-input"}`}
          value={value === 0 ? "" : value}
          onChange={(e) => handleChange(e.target.value, values, id)}
          onClick={() => checkAssist(id)}
          maxLength="1"
        />
        <div className="notes-container">
          {notesValues.map((value) => {
            if (value > 0) {
              return (
                <div
                  className={`${
                    highlighted ? "notes-box adjustContrast" : "notes-box"
                  }`}
                >
                  {value}
                </div>
              );
            }
            return (
              <div
                className={`${
                  highlighted ? "notes-box adjustContrast" : "notes-box"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="box">
      <input
        type="text"
        className={`${highlighted ? "box-input highlight" : "box-input"}`}
        value={value === 0 ? "" : value}
        onChange={(e) => handleChange(e.target.value, values, id)}
        onClick={() => checkAssist(id)}
        maxLength="1"
      />
    </div>
  );
}

export default Box;
