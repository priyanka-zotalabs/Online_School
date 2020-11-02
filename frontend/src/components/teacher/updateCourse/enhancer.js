import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { validate } from "../../../shared/helpers/formValidation";
import firstPageInIt from "./createCourse";
import thirdPageInIt from "./thirdPageForm";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import { toast } from "react-toastify";
import * as tus from "tus-js-client";

export let enhancer = compose(
  connect(({ teacherCurrentCourse }) => ({ teacherCurrentCourse })),
  withRouter,
  (UpdateCourse) => ({ teacherCurrentCourse, ...props }) => {
    let [formActivePanel1, setFormActivePanel1] = useState(1);
    let [formActivePanel1Changed, setFormActivePanel1Changed] = useState(false);
    const [moduleList, setModuleList] = useState([]);

    const [lastPage, setLastPage] = useState(thirdPageInIt);

    const [modalShow, setModalShow] = useState(false);
    const [firstPageData, setFirstPageData] = useState(firstPageInIt);
    const [contentModuleIndex, setConetentModuleIndex] = useState(0);
    const [contentChapterIndex, setContentChapterIndex] = useState(0);
    const [loader, setLoader] = useState(false);
    const [progress, setProgress] = useState(0);
    const [moduleData, setModuleData] = useState({
      moduleName: {
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
      moduleImage: {
        value: "",
        name: "",
        clicked: false,
        validation: {
          required: {
            value: true,
            errMsg: "This field is required",
          },
        },
        invalid: false,
        touched: true,
        helperText: "Upload Limit:1 mb Supported Formats:JPG,PNG,JPEG Only",
      },
      moduleDescription: {
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
    });
    const [chapterData, setChapterData] = useState({
      firstName: {
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
      lastName: {
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
    });
    const [contentData, setContentData] = useState({ ...thirdPageInIt });

    useEffect(() => {
      clearFirstForm();
      onLoad();
    }, []);
    // console.log("enhancer", teacherCurrentCourse);
    const onLoad = () => {
      const startPageData = {
        ...firstPageData,
        courseId: {
          ...firstPageData.courseImageUrl,
          value: teacherCurrentCourse._id,
        },
        name: { ...firstPageData.name, value: teacherCurrentCourse.name },
        description: {
          ...firstPageData.description,
          value: teacherCurrentCourse.description,
        },
        subject: {
          ...firstPageData.subject,
          value: teacherCurrentCourse.subject,
        },
        format: { ...firstPageData.format, value: teacherCurrentCourse.format },
        courseImageUrl: {
          ...firstPageData.courseImageUrl,
          value: teacherCurrentCourse.courseImageUrl,
        },
        isLock: {
          ...firstPageData.courseImageUrl,
          value: teacherCurrentCourse.isActive,
        },
      };
      setFirstPageData({ ...startPageData });
      //copy moduleList data
      let tempModuleData = [];
      //Module
      // debugger;
      teacherCurrentCourse.modules.map((module, mi) => {
        let tempModule = {
          ...moduleData,
          moduleName: { ...moduleData.moduleName, value: module.name },
          moduleDescription: {
            ...moduleData.moduleDescription,
            value: module.description,
          },
          moduleImage: {
            ...moduleData.moduleImage,
            value: module.modulesImageUrl,
          },
        };
        tempModuleData.push({ ...tempModule });
        let tempChapterData = [];
        //Chapter
        module.chapters.map((chapter, ci) => {
          let tempChap = {
            ...chapterData,
            firstName: { ...chapterData.firstName, value: chapter.name },
            lastName: { ...chapterData.lastName, value: chapter.description },
          };
          tempChapterData.push({ ...tempChap });
          let tempContentData = [];
          //Content
          chapter.content.map((cont, cci) => {
            let tempCont;
            if (cont.typeOfContent === "Document") {
              tempCont = {
                ...contentData,
                contentType: {
                  ...contentData.contentType,
                  value: cont.typeOfContent,
                },
                title: { ...contentData.title, value: cont.title },
                details: { ...contentData.details, value: cont.description },
                documentLink: {
                  ...contentData.documentLink,
                  url: cont.value,
                },
              };
            } else {
              tempCont = {
                ...contentData,
                contentType: {
                  ...contentData.contentType,
                  value: cont.typeOfContent,
                },
                title: { ...contentData.title, value: cont.title },
                details: { ...contentData.details, value: cont.description },
                link: {
                  ...contentData.documentLink,
                  url: cont.value,
                },
              };
            }

            tempContentData.push({ ...tempCont });
          });
          tempChapterData[ci]["content"] = tempContentData;
        });
        tempModuleData[mi]["chapter"] = tempChapterData;
      });
      setModuleList([...tempModuleData]);
    };

    const clearFirstForm = () => {
      let allFormKeys = Object.keys(firstPageData);
      let formData = { ...firstPageData };

      allFormKeys.forEach((formKey) => {
        formData[formKey].value = "";
        formData[formKey].invalid = false;
        formData[formKey].helperText = "";
      });
      setFirstPageData(formData);
    };

    const inputFirstPageBlurHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...firstPageData,
      };
      const updatedFormElement = {
        ...updatedForm[inputIdentifier],
      };
      let validationResult = true;
      let helperText = "";
      updatedFormElement.value = event.target.value;
      for (const key in updatedFormElement.validation) {
        validationResult = validate(
          key,
          updatedFormElement.validation[key].value,
          event.target.value
        );

        if (!validationResult) {
          helperText = updatedFormElement.validation[key].errMsg;
          break;
        }
      }
      updatedFormElement.invalid = !validationResult;
      updatedFormElement.helperText = helperText;
      updatedForm[inputIdentifier] = updatedFormElement;

      setFirstPageData({ ...updatedForm });
    };

    const inputFirstPageChangedHandler = (event, inputIdentifier) => {
      const updatedForm = {
        ...firstPageData,
      };

      if (inputIdentifier === "isLock") {
        updatedForm[inputIdentifier].value = !updatedForm[inputIdentifier]
          .value;
      } else {
        updatedForm[inputIdentifier].value = event.target.value;
      }

      updatedForm[inputIdentifier].invalid = false;
      updatedForm[inputIdentifier].helperText = "";
      updatedForm[inputIdentifier].touched = true;

      setFirstPageData({
        ...updatedForm,
      });
    };

    const inputFirstPageImageUpload = (event, inputIdentifier) => {
      const updatedForm = {
        ...firstPageData,
      };

      let formData = new FormData();
      updatedForm[inputIdentifier].clicked = true;
      if (event.target.files.length) {
        let uploadFileExtensions = event.target.files[0].name.split(".")[1];
        if (event.target.files[0].size > 1000000) {
          updatedForm[inputIdentifier].invalid = true;
          updatedForm[inputIdentifier].helperText =
            "Size Should be less than 1 MB";
          updatedForm[inputIdentifier].touched = true;
        } else {
          if (["jpg", "jpeg", "png"].includes(uploadFileExtensions)) {
            formData.append("document", event.target.files[0]);
            console.log("fileName", event.target.files[0]);
            updatedForm[inputIdentifier].name = event.target.files[0].name;
            axios({
              method: "post",
              url: `${appConfig.host}${urls.fileUpload}`,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then((success) => {
                updatedForm[inputIdentifier].value = success.data.url;
                updatedForm[inputIdentifier].invalid = false;
                updatedForm[inputIdentifier].helperText = "";
                updatedForm[inputIdentifier].touched = true;
                console.log("success.data.url", success.data.url);
                toast.success("Course Image Uploaded");
                setFirstPageData({
                  ...updatedForm,
                });
              })
              .catch((error) => {
                toast.error("Course Image Upload Fail");
              });
          } else {
            updatedForm[inputIdentifier].invalid = true;
            updatedForm[inputIdentifier].helperText = "Invalid file format";
            updatedForm[inputIdentifier].touched = true;
          }
        }
      }
      setFirstPageData({
        ...updatedForm,
      });
    };

    const inputBlurHandlerForModule = (event, fieldName, mi) => {
      const updatedForm = [...moduleList];

      const updatedFormElement = {
        ...updatedForm[mi][fieldName],
      };
      let validationResult = true;
      let helperText;
      updatedFormElement.value = event.target.value;

      for (const key in updatedFormElement.validation) {
        validationResult = validate(
          key,
          updatedFormElement.validation[key].value,
          event.target.value
        );

        if (!validationResult) {
          helperText = updatedFormElement.validation[key].errMsg;
          break;
        }
      }
      updatedFormElement.invalid = !validationResult;
      updatedFormElement.helperText = helperText;
      updatedForm[mi][fieldName] = updatedFormElement;

      setModuleList(updatedForm);
    };

    const handleInput = (e, fieldName, mi) => {
      let temp = [
        ...moduleList,
        ((moduleList[mi][fieldName].value = e.target.value),
        (moduleList[mi][fieldName].invalid = false),
        (moduleList[mi][fieldName].helperText = ""),
        (moduleList[mi][fieldName].touched = true)),
      ];

      setModuleList(temp.slice(0, -1));
    };

    const inputModulePageFileUpload = (event, fieldName, mi) => {
      let formData = new FormData();
      if (event.target.files.length) {
        let uploadFileExtensions = event.target.files[0].name.split(".")[1];
        if (event.target.files[0].size > 1000000) {
          let temp = [
            ...moduleList,
            ((moduleList[mi][fieldName].clicked = true),
            (moduleList[mi][fieldName].invalid = true),
            (moduleList[mi][fieldName].helperText =
              "Size Should be less than 1 MB"),
            (moduleList[mi][fieldName].touched = true)),
          ];

          setModuleList(temp.slice(0, -1));
        } else {
          if (["jpg", "jpeg", "png"].includes(uploadFileExtensions)) {
            formData.append("document", event.target.files[0]);
            let temp = [
              ...moduleList,
              ((moduleList[mi][fieldName].clicked = true),
              (moduleList[mi][fieldName].name = event.target.files[0].name)),
            ];

            setModuleList(temp.slice(0, -1));
            axios({
              method: "post",
              url: `${appConfig.host}${urls.fileUpload}`,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then((success) => {
                let temp = [
                  ...moduleList,
                  ((moduleList[mi][fieldName].value = success.data.url),
                  (moduleList[mi][fieldName].invalid = false),
                  (moduleList[mi][fieldName].helperText = ""),
                  (moduleList[mi][fieldName].touched = true)),
                ];

                setModuleList(temp.slice(0, -1));
                console.log("success.data.url", success.data.url);
                toast.success("Module Image Uploaded");
              })
              .catch((error) => {
                toast.error("Module Image Upload Fail");
              });
          } else {
            let temp = [
              ...moduleList,
              ((moduleList[mi][fieldName].invalid = true),
              (moduleList[mi][fieldName].helperText = "Invalid File Format"),
              (moduleList[mi][fieldName].touched = true)),
            ];
            setModuleList(temp.slice(0, -1));
          }
        }
      }
    };

    const inputBlurHandlerForChapter = (event, fieldName, mi, chapterIndex) => {
      const updatedForm = [...moduleList];

      const updatedFormElement = {
        ...updatedForm[mi]["chapter"][chapterIndex][fieldName],
      };
      let validationResult = true;
      let helperText;

      updatedFormElement.value = event.target.value;

      for (const key in updatedFormElement.validation) {
        validationResult = validate(
          key,
          updatedFormElement.validation[key].value,
          event.target.value
        );

        if (!validationResult) {
          helperText = updatedFormElement.validation[key].errMsg;
          break;
        }
      }
      updatedFormElement.invalid = !validationResult;
      updatedFormElement.helperText = helperText;

      updatedForm[mi]["chapter"][chapterIndex][fieldName] = updatedFormElement;

      setModuleList(updatedForm);
    };

    const handleChapterInput = (e, fieldName, moduleIndex, chapterIndex) => {
      let temp = [
        ...moduleList,
        ((moduleList[moduleIndex].chapter[chapterIndex][fieldName].value =
          e.target.value),
        (moduleList[moduleIndex].chapter[chapterIndex][
          fieldName
        ].invalid = false),
        (moduleList[moduleIndex].chapter[chapterIndex][fieldName].helperText =
          ""),
        (moduleList[moduleIndex].chapter[chapterIndex][
          fieldName
        ].touched = true)),
      ];
      // console.log("temp", temp);
      setModuleList(temp.slice(0, -1));
    };

    const isFormValid = (updatedForm) => {
      let tempFormIsValid = true;
      updatedForm.forEach((element) => {
        for (const key in element) {
          // console.log("loop", element);
          if (key != "chapter") {
            tempFormIsValid =
              !element[key].invalid && element[key].touched && tempFormIsValid;
          } else {
            // console.log("else", element[key]);
            element[key].forEach((chapter) => {
              for (const key in chapter) {
                if (key != "content") {
                  tempFormIsValid =
                    !chapter[key].invalid &&
                    chapter[key].touched &&
                    tempFormIsValid;
                }
              }
            });
          }
        }
      });
      // console.log("tempFormIsValid", tempFormIsValid);
      return tempFormIsValid;
    };

    const showAllInputFieldError = (updatedForm) => {
      const updatedCourseForm = updatedForm;
      updatedForm.forEach((element) => {
        // console.log("element", element);
        for (const key in element) {
          // console.log("key", key);
          if (key != "chapter") {
            if (!element[key].touched) {
              let helperText = "";
              for (const validationKey in element[key].validation) {
                const validationResult = validate(
                  validationKey,
                  element[key].validation[validationKey].value,
                  element[key].value
                );
                if (!validationResult) {
                  helperText = element[key].validation[validationKey].errMsg;
                }
                element[key].invalid = true;
                element[key].helperText = helperText;
              }
            }
          } else {
            // console.log("else key", key);
            // console.log("else", element[key]);
            // console.log("else2", element);
            element[key].forEach((chapter) => {
              for (const key in chapter) {
                if (!chapter[key].touched && key != "content") {
                  let helperText = "";
                  for (const validationKey in chapter[key].validation) {
                    const validationResult = validate(
                      validationKey,
                      chapter[key].validation[validationKey].value,
                      chapter[key].value
                    );
                    if (!validationResult) {
                      helperText =
                        chapter[key].validation[validationKey].errMsg;
                    }
                    chapter[key].invalid = true;
                    chapter[key].helperText = helperText;
                  }
                }
              }
            });
          }
        }
      });
      // console.log("show All error", updatedCourseForm);
      setModuleList(updatedCourseForm);
    };

    const isFirstPageFormValid = (updatedForm) => {
      let tempFormIsValid = true;
      for (const key in updatedForm) {
        tempFormIsValid =
          !updatedForm[key].invalid &&
          updatedForm[key].touched &&
          tempFormIsValid;
      }
      return tempFormIsValid;
    };

    const showAllFirstPageInputFieldError = () => {
      const updatedCourseForm = {
        ...firstPageData,
      };
      for (const key in updatedCourseForm) {
        if (!updatedCourseForm[key].touched) {
          let helperText = "";
          for (const validationKey in updatedCourseForm[key].validation) {
            const validationResult = validate(
              validationKey,
              updatedCourseForm[key].validation[validationKey].value,
              updatedCourseForm[key].value
            );
            if (!validationResult) {
              helperText =
                updatedCourseForm[key].validation[validationKey].errMsg;
              break;
            }
          }

          updatedCourseForm[key].invalid = true;
          updatedCourseForm[key].helperText = helperText;
        }
      }
      setFirstPageData({ ...updatedCourseForm });
    };

    const swapFormActive = (a) => (param) => (e) => {
      if (param === 3) {
        if (isFormValid(moduleList)) {
          setFormActivePanel1(param);
          setFormActivePanel1Changed(true);
        } else {
          showAllInputFieldError(moduleList);
          setFormActivePanel1(2);
          setFormActivePanel1Changed(false);
        }
      }
      if (param === 2) {
        if (isFirstPageFormValid(firstPageData)) {
          setFormActivePanel1(param);
          setFormActivePanel1Changed(true);
        } else {
          showAllFirstPageInputFieldError();
          setFormActivePanel1(1);
          setFormActivePanel1Changed(false);
        }
      }
      // setFormActivePanel1(param);
      // setFormActivePanel1Changed(true);
    };

    const swapFormActiveBack = (a) => (param) => (e) => {
      // console.log("param");
      setFormActivePanel1(param);
      setFormActivePanel1Changed(true);
    };

    const handleRemoveClick = (index, ci) => {
      // console.log("remove", index, ci);
      // let temp = [
      //   ...moduleList,
      //   (moduleList[index].chapter = moduleList[index].chapter.slice(0, -1)),
      // ];
      // console.log("after", moduleList);
      moduleList[index].chapter.splice(ci, 1);
      setModuleList([...moduleList]);
    };

    const handleAddClick = (mi) => {
      let temp = [
        ...moduleList,
        moduleList[mi].chapter.push({
          firstName: {
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
          lastName: {
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
          content: [{ ...thirdPageInIt }],
        }),
      ];
      setModuleList(temp.slice(0, -1));
    };

    const handleModuleRemoveClick = (index) => {
      moduleList.splice(index, 1);
      setModuleList([...moduleList]);
      // setModuleList(moduleList.filter((value_, index_) => index_ !== index));
    };

    const handleModuleAddClick = () => {
      setModuleList([
        ...moduleList,
        {
          moduleName: {
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
          moduleImage: {
            value: "",
            name: "",
            clicked: true,
            validation: {
              required: {
                value: true,
                errMsg: "This field is required",
              },
            },
            invalid: false,
            touched: false,
            helperText: "Upload Limit:1 mb Supported Formats:JPG,PNG,JPEG Only",
          },
          moduleDescription: {
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
          chapter: [
            {
              firstName: {
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
              lastName: {
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
              content: [{ ...thirdPageInIt }],
            },
          ],
        },
      ]);
    };

    const handleModalClose = () => {
      setModalShow(false);
    };

    const handleContentAddFile = (e, index, cIndex) => {
      setLoader(true);
      // console.log("handle content", index, cIndex);
      setConetentModuleIndex(index);
      setContentChapterIndex(cIndex);
      setModalShow(true);
      setLoader(false);
    };

    function getId(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return match && match[2].length === 11
        ? "https://www.youtube.com/embed/" + match[2]
        : null;
    }

    function parseUrl(val) {
      console.log("coming value", val);
      if (val) {
        return (
          "https://player.vimeo.com/video/" +
          val.replace("https://vimeo.com/", "").split("/")[0]
        );
      }
    }

    const inputChangedLastPageHandler = (
      e,
      fieldName,
      contentModuleIndex,
      contentChapterIndex,
      index
    ) => {
      const updatedForm = [...moduleList];
      const updatedFormElement = {
        ...moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
          index
        ][fieldName],
      };
      updatedFormElement.value = e.target.value;
      updatedFormElement.invalid = false;
      updatedFormElement.helperText = "";
      updatedFormElement.touched = true;

      moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
        index
      ][fieldName] = updatedFormElement;
      setModuleList(updatedForm);
      // setModuleList(temp.slice(0, -1));
    };

    const inputBlurLastPageHandler = (
      event,
      fieldName,
      contentModuleIndex,
      contentChapterIndex,
      index
    ) => {
      const updatedForm = [...moduleList];
      const updatedFormElement = {
        ...moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
          index
        ][fieldName],
      };
      let validationResult = true;
      let helperText = "";
      updatedFormElement.value = event.target.value;
      for (const key in updatedFormElement.validation) {
        validationResult = validate(
          key,
          updatedFormElement.validation[key].value,
          event.target.value
        );

        if (!validationResult) {
          helperText = updatedFormElement.validation[key].errMsg;
          break;
        }
      }
      updatedFormElement.invalid = !validationResult;
      updatedFormElement.helperText = helperText;
      moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
        index
      ][fieldName] = updatedFormElement;
      setModuleList(updatedForm);
    };

    const IsLastFormValid = () => {
      let tempFormIsValid = true;
      moduleList.map((module, mi) => {
        module.chapter.map((chap, ci) => {
          for (const key in chap.content) {
            // console.log("for", mi, ci);
            for (const last in chap.content[key]) {
              tempFormIsValid =
                !chap.content[key][last].invalid &&
                chap.content[key][last].touched &&
                tempFormIsValid;
            }
          }
        });
      });
      // console.log("data", tempFormIsValid);
      return tempFormIsValid;
    };

    const handleCreateCourse = (event) => {
      // event.preventDefault();

      const formData = {};
      for (const key in firstPageData) {
        formData[key] = firstPageData[key].value;
      }
      let moduleFormList = [];
      moduleList.map((module) => {
        const moduleFormData = {};
        moduleFormData["name"] = module.moduleName.value;
        moduleFormData["description"] = module.moduleDescription.value;
        moduleFormData["modulesImageUrl"] = module.moduleImage.value;
        let tempChapter = [];
        module.chapter.map((chap) => {
          const chapterFormData = {};
          chapterFormData["name"] = chap.firstName.value;
          chapterFormData["description"] = chap.lastName.value;
          let tempContent = [];
          chap.content.map((cont) => {
            const contentFormData = {};
            contentFormData["typeOfContent"] = cont.contentType.value;
            contentFormData["title"] = cont.title.value;
            contentFormData["description"] = cont.details.value;
            if (cont.contentType.value === "Video") {
              // if (cont.link.value.includes("youtube.com")) {
              //   contentFormData["value"] = getId(cont.link.value);
              // } else {
              //   contentFormData["value"] = parseUrl(cont.link.value);
              // }
              if (contentFormData["clicked"]) {
                contentFormData["value"] = parseUrl(cont.link.url);
              } else {
                contentFormData["value"] = cont.link.url;
              }
            } else if (cont.contentType.value === "Document") {
              contentFormData["value"] = cont.documentLink.url;
            }

            tempContent.push(contentFormData);
          });
          chapterFormData["content"] = tempContent;
          tempChapter.push(chapterFormData);
        });
        moduleFormData["chapters"] = tempChapter;
        moduleFormList.push(moduleFormData);
      });
      formData["modules"] = moduleFormList;

      // console.log("finalData", formData);

      setLoader(true);
      axios
        .put(`${appConfig.host}${urls.teacherCreateCourse}`, formData)
        .then((success) => {
          setLoader(false);
          props.history.push("/teacher/courses");
          // console.log("success", success);
          toast.success("Course Updated");
        })
        .catch((error) => {
          // console.log(error);
          setLoader(false);
        });
      // return tempFormIsValid;
    };

    const handleAddContent = (contentModuleIndex, contentChapterIndex) => {
      let temp = [
        ...moduleList,
        // ...moduleList[contentModuleIndex].chapter,
        moduleList[contentModuleIndex].chapter[
          contentChapterIndex
        ].content.push({ ...thirdPageInIt }),
      ];
      // console.log("clicked", temp);
      setModuleList(temp.slice(0, -1));
    };

    const inputChangedLastPageFileHandler = (
      event,
      fieldName,
      contentModuleIndex,
      contentChapterIndex,
      index
    ) => {
      const updatedForm = [...moduleList];
      const updatedFormElement = {
        ...moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
          index
        ][fieldName],
      };
      if (event.target.files.length) {
        let uploadFileExtensions = event.target.files[0].name.split(".")[1];
        if (event.target.files[0].size > 5000000) {
          updatedFormElement.invalid = true;
          updatedFormElement.helperText = "Size Should be less than 5 MB";
          updatedFormElement.touched = true;
        } else {
          if (["pdf"].includes(uploadFileExtensions)) {
            updatedFormElement.value = event.target.files[0];
            // updatedFormElement.file = event.target.files[0];
            updatedFormElement.invalid = false;
            updatedFormElement.helperText = "";
            updatedFormElement.touched = true;
          } else {
            updatedFormElement.invalid = true;
            updatedFormElement.helperText = "Invalid file format";
            updatedFormElement.touched = true;
          }
        }
      }
      moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
        index
      ][fieldName] = updatedFormElement;
      setModuleList(updatedForm);
    };

    const uploadHandle = (
      event,
      fieldName,
      contentModuleIndex,
      contentChapterIndex,
      index
    ) => {
      const updatedForm = [...moduleList];
      const updatedFormElement = {
        ...moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
          index
        ][fieldName],
      };

      let formData = new FormData();
      if (event.target.files.length) {
        let uploadFileExtensions = event.target.files[0].name.split(".")[1];
        if (
          event.target.files[0].size > 5000000 ||
          !["pdf"].includes(uploadFileExtensions)
        ) {
          updatedFormElement.invalid = true;
          updatedFormElement.helperText = "Invalid file Type";
          updatedFormElement.touched = true;
          moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
            index
          ][fieldName] = { ...updatedFormElement };
          setModuleList([...updatedForm]);
        } else {
          updatedFormElement.value = event.target.files[0].name;
          formData.append("document", event.target.files[0]);
          moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
            index
          ][fieldName] = { ...updatedFormElement };
          console.log("first", updatedFormElement);
          setModuleList([...updatedForm]);
          axios({
            method: "post",
            url: `${appConfig.host}${urls.fileUpload}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((success) => {
              updatedFormElement.url = success.data.url;

              toast.success("File Upload success");
              moduleList[contentModuleIndex].chapter[
                contentChapterIndex
              ].content[index][fieldName] = { ...updatedFormElement };
              console.log({ updatedFormElement });
              setModuleList([...updatedForm]);
            })
            .catch((error) => {
              toast.error("File Upload Fail");
            });
        }
      }
    };

    const headerPost = {
      Accept: "application/vnd.vimeo.*+json;version=3.4",
      Authorization: `bearer ${appConfig.accessToken}`,
      "Content-Type": "application/json",
    };

    const handleVimeoChange = async (
      event,
      fieldName,
      contentModuleIndex,
      contentChapterIndex,
      index
    ) => {
      const updatedForm = [...moduleList];
      const updatedFormElement = {
        ...moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
          index
        ][fieldName],
      };
      console.log("inside vimeo");
      if (event.target.files.length) {
        let uploadFileExtensions = event.target.files[0].name.split(".")[1];
        if (["mp4", "mkv"].includes(uploadFileExtensions)) {
          console.log("if");
          const file = event.target.files[0];
          const fileName = file.name;
          const fileSize = file.size.toString();
          console.log(file, fileName, fileSize);
          let response;
          try {
            response = await axios({
              method: "post",
              url: `/me/videos`,
              headers: headerPost,
              data: {
                upload: {
                  approach: "tus",
                  size: fileSize,
                },
              },
            });
            console.log("response", response.data.link);
            updatedFormElement.url = response.data.link;
            updatedFormElement.clicked = true;
            updatedFormElement.value = fileName;
            moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
              index
            ][fieldName] = { ...updatedFormElement };
            setModuleList([...updatedForm]);
          } catch (err) {
            alert(err);
          }

          // Create a new tus upload
          const upload = new tus.Upload(file, {
            endPoint: "/me/videos",
            uploadUrl: response?.data.upload.upload_link,
            retryDelays: [0, 3000, 5000, 10000, 20000],
            metadata: {
              filename: file.name,
              filetype: file.type,
            },
            headers: {},
            onError: function (error) {
              console.log("Failed because: " + error);
            },
            onProgress: function (bytesUploaded, bytesTotal) {
              let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
              console.log(bytesUploaded, bytesTotal, percentage + "%");
            },
          });
          // Start the upload
          upload.start();
        }
      }
    };

    const inputChangedLastPageVideoFileHandler = (
      event,
      fieldName,
      contentModuleIndex,
      contentChapterIndex,
      index
    ) => {
      const updatedForm = [...moduleList];
      const updatedFormElement = {
        ...moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
          index
        ][fieldName],
      };
      if (event.target.files.length) {
        let uploadFileExtensions = event.target.files[0].name.split(".")[1];
        if (["mp4", "mkv"].includes(uploadFileExtensions)) {
          updatedFormElement.value = event.target.files[0];
          updatedFormElement.invalid = false;
          updatedFormElement.helperText = "";
          updatedFormElement.touched = true;
        } else {
          updatedFormElement.invalid = true;
          updatedFormElement.helperText = "Invalid file format";
          updatedFormElement.touched = true;
        }
      }
      moduleList[contentModuleIndex].chapter[contentChapterIndex].content[
        index
      ][fieldName] = updatedFormElement;
      setModuleList(updatedForm);
    };

    const handleContentRemoveClick = (
      contentModuleIndex,
      contentChapterIndex,
      index
    ) => {
      moduleList[contentModuleIndex].chapter[
        contentChapterIndex
      ].content.splice(index, 1);
      setModuleList([...moduleList]);
    };

    return (
      <UpdateCourse
        {...props}
        {...{
          swapFormActive,
          formActivePanel1,
          formActivePanel1Changed,
          handleRemoveClick,
          handleAddClick,
          moduleList,
          handleModuleRemoveClick,
          handleModuleAddClick,
          modalShow,
          handleModalClose,
          handleInput,
          handleChapterInput,
          inputBlurHandlerForModule,
          inputBlurHandlerForChapter,
          inputFirstPageChangedHandler,
          inputFirstPageBlurHandler,
          firstPageData,
          lastPage,
          handleContentAddFile,
          contentModuleIndex,
          contentChapterIndex,
          inputChangedLastPageHandler,
          inputBlurLastPageHandler,
          loader,
          handleCreateCourse,
          swapFormActiveBack,
          handleAddContent,
          inputChangedLastPageFileHandler,
          uploadHandle,
          handleVimeoChange,
          inputChangedLastPageVideoFileHandler,
          inputFirstPageImageUpload,
          inputModulePageFileUpload,
          teacherCurrentCourse,
          handleContentRemoveClick,
          progress,
        }}
      />
    );
  }
);

export default enhancer;
