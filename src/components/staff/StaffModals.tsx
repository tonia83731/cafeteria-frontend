"use client";
import { ReactNode, useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
type StaffModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

const StaffModals = ({ title, children, onClose }: StaffModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);
  return (
    <div className="fixed top-0 left-0 z-[200] bg-dark-30 w-full h-[calc(100vh-75px)] mt-[75px] md:full flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white w-11/12 md:w-2/3 mx-auto rounded-lg md:max-w-[800px]"
      >
        <header className="flex justify-between px-4">
          <h2 className="font-noto_sans text-xl font-bold h-9 leading-9">
            {title}
          </h2>
          <button onClick={onClose} className="text-xl text-fern">
            <RxCross2 />
          </button>
        </header>
        <div className="py-4 flex flex-col gap-8">{children}</div>
      </div>
    </div>
  );
};

export default StaffModals;
