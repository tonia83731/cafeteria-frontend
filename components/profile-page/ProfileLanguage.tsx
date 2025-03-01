import Select from "react-select";
import { language_options } from "@/data/language-options";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updatedInputChange } from "@/slices/authSlice";

const ProfileLanguage = () => {
  const t = useTranslations("Profile");
  const dispatch = useDispatch();
  const { userInput } = useSelector((state: RootState) => state.auth);

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedInputChange({ type: "userInput", name, value }));
  };

  return (
    <div className="h-fit border border-apricot rounded-lg p-4 flex flex-col gap-4">
      <h5 className="font-medium uppercase text-lg">{t("language")}</h5>
      <div className="flex flex-col gap-4">
        <Select
          options={language_options}
          value={userInput.language}
          styles={{
            indicatorSeparator: (styles) => ({
              ...styles,
              display: "none",
            }),
            placeholder: (styles) => ({
              ...styles,
              color: "#a68e74",
              fontSize: "0.875rem",
            }),
            clearIndicator: (styles) => ({
              ...styles,
              display: "none",
            }),
            dropdownIndicator: (styles) => ({
              ...styles,
              display: "none",
            }),
            menu: (styles) => ({
              ...styles,
              borderRadius: "0.25rem",
            }),
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "#ffefcd",
              height: "2.5rem",
              width: "100%",

              border: "none",
              borderRadius: "0.5rem",
              caretColor: "transparent",
              paddingLeft: "0.5rem",
              paddingRight: "1rem",
              boxShadow: "none",
              "&:hover": {
                border: "1px solid #424530",
              },
              "&:focus": {
                border: "1px solid #424530",
              },
              "&:active": {
                border: "1px solid #424530",
              },
            }),
            option: (styles, state) => ({
              ...styles,
              backgroundColor: state.isSelected
                ? "rgb(255, 239, 205, .6)"
                : "white",
              color: "#424530",
              "&:hover": {
                backgroundColor: "rgb(255, 239, 205, .6)",
              },
            }),
          }}
          onChange={(newValue) => {
            handleInputChange("language", newValue);
          }}
        />
      </div>
    </div>
  );
};

export default ProfileLanguage;
