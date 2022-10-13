import { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CreateProposalContext } from "../../context/CreateProposalContext";

const Dropdown = (props: { submenus: any; dropdown: boolean }) => {
  const { submenus, dropdown } = props;
  const depthLevel = 1;

  return (
    <ul
      className={`flex ${
        dropdown ? "" : "hidden"
      } absolute text-white bg-[#8168ff] rounded-[4px] right-[auto] top-[3.5rem] -mx-16 my-1 py-2 z-50`}
    >
      {submenus.map((submenu: any, index: any) => (
        <NavItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

const NavItems = (props: { items: any; depthLevel: number }) => {
  const { items, depthLevel } = props;
  const [dropdown, setDropdown] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setFormComponent } = useContext(CreateProposalContext);

  let ref = useRef<any>();

  useEffect(() => {
    const handler = (event: any) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    // console.log(dropdown);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  return (
    <li
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`flex items-center ${
        depthLevel > 0 ? "mx-5" : "xl:mx-10 lg:mx-5 mx-2"
      } font-semibold cursor-pointer `}
    >
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            className="hover:text-[#6341ff] py-2"
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : items.title === "Governance" &&
        window.location.pathname === "/Governance" ? (
        <button
          onClick={() => {
            console.log("hello");
            setFormComponent("ChooseDao");
            console.log(setFormComponent);
          }}
        >
          Governance
        </button>
      ) : items.title !== "Docs" ? (
        <NavLink className="hover:text-[#6341ff]" to={`/${items.name}`}>
          {items.title}
        </NavLink>
      ) : (
        <a
          className="hover:text-[#6341ff]"
          href="http://docs.keezprotocol.io"
          target="_blank"
          rel="noreferrer noopener"
        >
          {items.title}
        </a>
      )}
    </li>
  );
};

export default NavItems;
