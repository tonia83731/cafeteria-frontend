import { FileInputProps } from "@/types/input-type";
import { FaImage } from "react-icons/fa6";
import { RiFolderUploadFill } from "react-icons/ri";

const DefaultFileInput = ({ accept, onFileChange }: FileInputProps) => {
  return (
    <label className="w-full" htmlFor="file">
      <div className="w-full h-full text-6xl md:h-[120px] text-center bg-ivory text-brown rounded-t-lg flex justify-center items-center py-2 md:py-0.5">
        <FaImage />
      </div>
      <div className="w-full h-full md:h-[30px] flex justify-center items-center gap-1.5 bg-brown text-white rounded-b-lg py-0.5 md:py-0">
        <div>
          <RiFolderUploadFill />
        </div>
        <div className="text-base">Upload Image</div>
      </div>
      <input
        type="file"
        name="file"
        id="file"
        className="hidden"
        accept={accept}
        onChange={(e) => onFileChange(e)}
      />
    </label>
  );
};

export default DefaultFileInput;
