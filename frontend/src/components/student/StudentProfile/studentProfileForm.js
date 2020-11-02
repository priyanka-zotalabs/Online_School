const StudentProfileFormInit = {
  name: {
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
  // email: {
  //   value: "",
  //   validation: {
  //     required: {
  //       value: true,
  //       errMsg: "This field is required",
  //     },
  //     regex: {
  //       value: /^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
  //       errMsg: "Enter valid email id",
  //     },
  //   },
  //   invalid: false,
  //   touched: false,
  //   helperText: "",
  // },
  contactNumber: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^([0-9]{10})$/,
        errMsg: "Mobile Number should 10 digit number",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  class: {
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
  board: {
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
  school: {
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
  location: {
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

  profileImage: {
    value: "",
    preview: "",
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

export default StudentProfileFormInit;
