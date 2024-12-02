import { StylesConfig } from "react-select";

export type SelectOptionTypes = {
  value: string;
  label: string;
};
const BASICSTYLES: StylesConfig<SelectOptionTypes> = {
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "rgb(66, 69, 48, .3)",
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
};

export const SELECTSTYLES: StylesConfig<SelectOptionTypes, false> = {
  ...BASICSTYLES,
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "transparent",
    height: "2.5rem",
    width: "100%",
    border: "1px solid #424530",
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
    backgroundColor: state.isSelected ? "rgb(255, 239, 205, .6)" : "white",
    color: "#424530",
    "&:hover": {
      backgroundColor: "rgb(255, 239, 205, .6)",
    },
  }),
};
export const MULTISELECTSTYLES: StylesConfig<SelectOptionTypes, true> = {
  ...BASICSTYLES,
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "transparent",
    width: "100%",
    border: "1px solid #424530",
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
    backgroundColor: state.isSelected ? "rgb(255, 239, 205, .6)" : "white",
    color: "#424530",
    "&:hover": {
      backgroundColor: "rgb(255, 239, 205, .6)",
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#ffefcd",
    color: "#424530",
    borderRadius: "0.25rem",
    fontSize: "12px",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: "#ffefcd",
    color: "rgb(166, 142, 116, .3)",
    fontSize: "12px",
    "&:hover": {
      backgroundColor: "#ffefcd",
      color: "rgb(166, 142, 116)",
    },
  }),
};
export const DEFAULTSELECTSTYLES: StylesConfig<SelectOptionTypes, false> = {
  ...BASICSTYLES,
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
    backgroundColor: state.isSelected ? "rgb(255, 239, 205, .6)" : "white",
    color: "#424530",
    "&:hover": {
      backgroundColor: "rgb(255, 239, 205, .6)",
    },
  }),
};
export const CARTSELECTSTYLES: StylesConfig<SelectOptionTypes, false> = {
  ...BASICSTYLES,
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "white",
    height: "2.5rem",
    color: "#424530",
    width: "100%",
    borderRadius: "0.5rem",
    caretColor: "transparent",
    paddingLeft: "0.5rem",
    paddingRight: "1rem",
    boxShadow: "none",
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected ? "rgb(255, 239, 205)" : "white",
    color: "#424530",
    "&:hover": {
      backgroundColor: "rgb(255, 239, 205)",
    },
  }),
};

export const handleOptions = (data: any, langauge: string) => {
  return data.map(({ code, title }: any): SelectOptionTypes => {
    return {
      value: code,
      label: title[langauge],
    };
  });
};
