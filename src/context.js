import React, { useState, useContext, useEffect } from "react";
import { boardData, sublinks, empty } from "./boardData";
import solve from "./solveSudoku";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [values, setValues] = useState(empty);
  const [mistakes, setMistakes] = useState(3);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isDropdownSubmenuOpen, setIsDropdownSubmenuOpen] = useState(false);
  const [page, setPage] = useState({ page: "", puzzles: [] });
  const [name, setName] = useState("Beginner 1");
  const [solution, setSolution] = useState([]);
  const [highlight, setHighlight] = useState(empty);
  const [isNotesTrue, setIsNotesTrue] = useState(false);
  const [isCreateCustom, setIsCreateCustom] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const solveSudoku = (e) => {
    e.preventDefault();
    setValues(solution);
  };

  const openSubmenu = (text) => {
    const tab = sublinks.find((category) => category.page === text);
    setPage(tab);
    setIsSubmenuOpen(true);
  };

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  const openDropdownSubmenu = (text) => {
    const tab = sublinks.find((category) => category.page === text);
    setPage(tab);
    setIsDropdownSubmenuOpen(true);
  };

  const closeDropdownSubmenu = () => {
    setIsDropdownSubmenuOpen(false);
  };

  const loadCustom = () => {
    let board = sublinks.find((category) => category.page === "Custom").board;
    setValues(board);
    setName("Custom");
    setMistakes(3);
    setHighlight(empty);
    setShowLinks(false);
  };

  useEffect(() => {
    if (name === "Custom") {
      setIsCreateCustom(true);
      setIsCustom(true);
    } else {
      findSolution(values);
      setIsCustom(false);
    }
  }, [name]);

  useEffect(() => {
    loadPuzzle("Beginner", "beginner 1");
  }, []);

  const findSolution = (values) => {
    let copy = [];
    for (let i = 0; i < values.length; i++) {
      copy[i] = values[i].slice();
    }
    solve(copy);
    setSolution(copy);
  };

  const loadPuzzle = (page, name) => {
    let board = sublinks
      .find((category) => category.page === page)
      .puzzles.find((puzzle) => puzzle.name === name).board;
    setValues(board);
    setName(name);
    setIsCreateCustom(false);
    setMistakes(3);
    setHighlight(empty);
  };

  const handleMistakes = () => {
    if (mistakes > 0) {
      setMistakes(mistakes - 1);
    }
  };

  return (
    <AppContext.Provider
      value={{
        values,
        setValues,
        mistakes,
        setMistakes,
        solveSudoku,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        loadCustom,
        loadPuzzle,
        name,
        setSolution,
        solution,
        handleMistakes,
        highlight,
        setHighlight,
        isNotesTrue,
        setIsNotesTrue,
        isCreateCustom,
        setIsCreateCustom,
        isCustom,
        findSolution,
        isDropdownSubmenuOpen,
        setIsDropdownSubmenuOpen,
        openDropdownSubmenu,
        closeDropdownSubmenu,
        showLinks,
        setShowLinks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
