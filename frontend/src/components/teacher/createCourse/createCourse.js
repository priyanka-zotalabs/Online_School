const createCourseFormInit = {
  name: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^[a-zA-Z]+/,
        errMsg: "Please enter Course Name",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  description: {
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

  subject: {
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
  format: {
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
  courseImageUrl: {
    value: "",
    name: "",
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
  isLock: {
    value: true,
    validation: {
      required: {
        value: false,
        errMsg: "",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
};

export default createCourseFormInit;
