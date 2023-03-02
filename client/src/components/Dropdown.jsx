import { useState, createContext, useContext, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="relative">{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>

      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

const Content = ({
  align = "right",
  width = "48",
  contentClasses = "bg-white rounded-md",
  children,
}) => {
  const { open, setOpen } = useContext(DropDownContext);

  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "origin-top-left left-0";
  } else if (align === "right") {
    alignmentClasses = "origin-top-right right-0";
  }

  let widthClasses = "";

  if (width === "48") {
    widthClasses = "w-48";
  }

  return (
    <>
      <Transition
        as={Fragment}
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
        >
          <div
            className={`rounded-md  ` + contentClasses}
            onClick={() => setOpen(false)}
          >
            {children}
          </div>
        </div>
      </Transition>
    </>
  );
};

const DropdownLink = ({ children, to, className }) => {
  return (
    <Link
      to={to}
      className={`block w-full px-4 py-2 text-left text-lg md:text-sm leading-5 text-gray-700 hover:bg-primary hover:text-white focus:bg-primary transition duration-150 ease-in-out ${className}`}
    >
      {children}
    </Link>
  );
};

const DropdownButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="block rounded-b-md w-full px-4 py-2 text-left text-lg md:text-sm leading-5 text-gray-700 hover:bg-primary hover:text-white focus:bg-primary transition duration-150 ease-in-out"
    >
      {children}
    </button>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Button = DropdownButton;
Dropdown.Link = DropdownLink;

export default Dropdown;
