import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
interface PaginationProps {
  currPage: number;
  totalPage: number;
  onArrowClick: (type: "prev" | "next") => void;
  onNumClick: (num: number) => void;
}
const Pagination = ({
  currPage,
  totalPage,
  onArrowClick,
  onNumClick,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPage }, (data, index) => index + 1);
  return (
    <div className="flex items-center gap-2 font-medium">
      <button
        className="border border-fern text-fern rounded-md w-7 h-7 flex justify-center items-center disabled:bg-default-gray disabled:text-white disabled:border-0"
        onClick={() => onArrowClick("prev")}
        disabled={currPage === 1}
      >
        <IoIosArrowBack />
      </button>

      {pages.map((page) => {
        return (
          <button
            key={`page-${page}`}
            className={`border rounded-md w-7 h-7 flex justify-center items-center disabled:bg-default-gray disabled:text-white disabled:border-0 ${
              currPage === page
                ? "border-apricot text-apricot font-bold"
                : "border-fern text-fern"
            }`}
            onClick={() => onNumClick(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className="border border-fern text-fern rounded-md w-7 h-7 flex justify-center items-center disabled:bg-default-gray disabled:text-white disabled:border-0"
        onClick={() => onArrowClick("next")}
        disabled={currPage === totalPage}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
