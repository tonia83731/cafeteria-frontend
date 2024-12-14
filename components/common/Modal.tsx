import { ReactNode, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
const Modal = ({
  children,
  title,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 z-[200] bg-dark-30 w-full h-[calc(100vh-75px)] mt-[75px] md:w-[calc(100%-60px)] md:h-screen md:mt-0 md:ml-[60px] lg:w-[calc(100%-240px)] lg:ml-[240px] flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white w-11/12 md:w-2/3 mx-auto rounded-md px-4 md:max-w-[800px]"
      >
        <header className="flex justify-between">
          <h2 className="font-italiana text-xl h-9 leading-9">{title}</h2>
          <button onClick={onClose} className="text-xl text-fern">
            <RxCross2 />
          </button>
        </header>
        <div className="py-4 flex flex-col gap-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
