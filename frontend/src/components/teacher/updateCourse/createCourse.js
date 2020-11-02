const createCourseFormInit = {
  courseId: {
    value: "",
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
    touched: true,
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
    touched: true,
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
    touched: true,
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
    touched: true,
    helperText: "",
  },
  courseImageUrl: {
    value: "",
    clicked: false,
    validation: {
      required: {
        value: false,
        errMsg: "",
      },
    },
    invalid: false,
    touched: true,
    helperText: "Upload Limit:1 mb Supported Formats:JPG,PNG,JPEG Only",
  },

  isLock: {
    value: false,
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
