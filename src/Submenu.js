import { useGlobalContext } from "./context";

const Submenu = () => {
  const {
    isSubmenuOpen,
    page: { page, puzzles },
    loadPuzzle,
  } = useGlobalContext();

  const newPuzzle = (e) => {
    const name = e.target.textContent;
    loadPuzzle(page, name);
  };

  return (
    <aside className={`${isSubmenuOpen ? "submenu show" : "submenu"}`}>
      <div className="submenu-center">
        {puzzles.map((puzzle, index) => {
          return (
            <button key={index} onClick={newPuzzle} className="submenu-btn">
              {puzzle.name}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Submenu;
