import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Dropdown = ( props: {submenus:any, dropdown:boolean} ) => {
  const {submenus, dropdown } = props;
  const depthLevel = 1;

  return (    
    <ul className={`flex ${dropdown ? "" : "hidden"} absolute text-black bg-white rounded-[4px] right-[auto] top-[3.5rem] -mx-16 my-1 py-2 z-50`}> 
      {submenus.map((submenu:any, index:any) => (
        <NavItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

const NavItems = ( props: {items: any, depthLevel:number} ) => {
  const { items, depthLevel } = props;
  const [dropdown, setDropdown] = useState<boolean>(false);
  
  let ref = useRef<any>();

  useEffect(() => {
    const handler = (event:any) => {
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
      className={`flex items-center ${depthLevel > 0 ? "mx-5":"lg:mx-10 mx-3"} font-semibold cursor-pointer `}
    >
      {items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            className="hover:text-[#ac0537] py-2"
          >
            {items.title}{" "}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        // <NavLink className="hover:text-[#ac0537]" to={`/${items.name}`}>{items.title}</NavLink>
        <NavLink className="hover:text-[#ac0537]" to={`/${items.name}`}>{items.title}</NavLink>
      )}
    </li>
  );
};

export default NavItems;


  