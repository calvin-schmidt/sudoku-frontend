import { useGlobalContext } from "./context";

const DropdownSubmenu = () => {
  const {
    isSubmenuOpen,
    page: { page, puzzles },
    loadPuzzle,
    setShowLinks,
  } = useGlobalContext();

  const newPuzzle = (e) => {
    const name = e.target.textContent;
    loadPuzzle(page, name);
    setShowLinks(false);
  };

  return (
    <li className="dropdown-submenu">
      {puzzles.map((puzzle, index) => {
        return (
          <button
            key={index}
            onClick={newPuzzle}
            className="dropdown-submenu-btn"
          >
            {puzzle.name}
          </button>
        );
      })}
    </li>
  );
};

export default DropdownSubmenu;
