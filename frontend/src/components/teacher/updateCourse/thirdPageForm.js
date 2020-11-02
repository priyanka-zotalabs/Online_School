const createCourseFormInit = {
  contentType: {
    value: "Document",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  title: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  documentLink: {
    value: "",
    url: "",
    clicked: false,
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
  details: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
  link: {
    value: "",
    url: "",
    clicked: false,
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
};

export default createCourseFormInit;
