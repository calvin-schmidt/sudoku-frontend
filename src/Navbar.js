import { useGlobalContext } from "./context";
import logo from "./icons/logo.svg";
import { FaBars } from "react-icons/fa";
import React, { useRef, useEffect } from "react";
import DropdownSubmenu from "./DropdownSubmenu";

const Navbar = () => {
  const {
    openSubmenu,
    closeSubmenu,
    loadCustom,
    page,
    isDropdownSubmenuOpen,
    openDropdownSubmenu,
    closeDropdownSubmenu,
    showLinks,
    setShowLinks,
  } = useGlobalContext();

  const displaySubmenu = (e) => {
    const page = e.target.textContent;
    openSubmenu(page);
  };
  const displayDropdownSubmenu = (e) => {
    const page = e.target.textContent;
    openDropdownSubmenu(page);
  };

  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks, isDropdownSubmenuOpen]);

  const handleSubmenu = (e) => {
    if (
      !e.target.classList.contains("link-btn") &&
      !e.target.classList.contains("dropdown-link-btn")
    ) {
      closeSubmenu();
    }
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
    if (!showLinks) {
      closeDropdownSubmenu();
    }
  };

  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
      <div className="nav-center">
        <div className="nav-header">
          <div className="logo-container">
            <img id="logo" src={logo} alt="Sudoku" />
            <h2>Sudoku</h2>
          </div>
          <div className="toggle-container">
            <button className="nav-toggle" onClick={() => handleShowLinks()}>
              <FaBars />
            </button>
          </div>
        </div>

        <div className="links-container">
          <ul className="nav-links">
            <li>
              <button className="link-btn" onMouseOver={displaySubmenu}>
                Beginner
              </button>
            </li>
            <li>
              <button className="link-btn" onMouseOver={displaySubmenu}>
                Intermediate
              </button>
            </li>
            <li>
              <button className="link-btn" onMouseOver={displaySubmenu}>
                Advanced
              </button>
            </li>
            <li>
              <button
                className="link-btn"
                onClick={loadCustom}
                onMouseOver={closeSubmenu}
                style={{ cursor: "pointer" }}
              >
                Custom
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="dropdown-container" ref={linksContainerRef}>
        <ul className="dropdown-links" ref={linksRef}>
          <li>
            <button
              className="dropdown-link-btn"
              onClick={displayDropdownSubmenu}
            >
              Beginner
            </button>
          </li>
          {page.page === "Beginner" && isDropdownSubmenuOpen && (
            <DropdownSubmenu />
          )}
          <li>
            <button
              className="dropdown-link-btn"
              onClick={displayDropdownSubmenu}
            >
              Intermediate
            </button>
          </li>
          {page.page === "Intermediate" && isDropdownSubmenuOpen && (
            <DropdownSubmenu />
          )}
          <li>
            <button
              className="dropdown-link-btn"
              onClick={displayDropdownSubmenu}
            >
              Advanced
            </button>
          </li>
          {page.page === "Advanced" && isDropdownSubmenuOpen && (
            <DropdownSubmenu />
          )}
          <li>
            <button
              className="dropdown-link-btn"
              onClick={loadCustom}
              onMouseOver={closeSubmenu}
            >
              Custom
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
