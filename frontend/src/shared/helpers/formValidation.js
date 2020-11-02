import moment from "moment";

const validate = (validationType, validationValue, value) => {
  let result = false;
  switch (validationType) {
    case "regex":
      result = new RegExp(validationValue).test(value);
      break;
    case "minLength":
      result = value.trim().length >= validationValue;
      break;
    case "maxLength":
      result = value.trim().length <= validationValue;
      break;
    case "exactLength":
      result = value.trim().length === validationValue;
      break;
    case "required":
      if (typeof value === "string") {
        result = validationValue ? value.trim().length > 0 : true;
      } else {
        result = validationValue ? value.toString().length > 0 : true;
      }
      break;
    case "alpha":
      result = /^[a-zA-Z ]*$/.test(value);
      break;
    case "numeric":
      result = /^[0-9]*$/.test(value);
      break;
    case "alphaNumeric":
      result = /^[a-zA-Z0-9]*$/.test(value);
      break;
    case "match":
      result = value === validationValue;
      break;
    case "date":
      const [dd, mm, yyyy] = value.split("/");
      if (
        yyyy &&
        yyyy.length === 4 &&
        mm &&
        mm.length === 2 &&
        dd &&
        dd.length === 2
      ) {
        result = moment(value, "DD/MM/YYYY").isValid();
      }
      break;
    default:
      console.log("Default Case");
  }
  return result;
};
export { validate };
