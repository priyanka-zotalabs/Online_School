import React from "react";
import enhancer from "./enhancer";
import "./style.scss";
// import zotalabsLogo from "../../../images/zotalabsLogo.png";
import zotalabsLogo from "../../../images/EumetryLogo1.png";

import { Button } from "react-bootstrap";
import DrawerToggleButton from "../sidedrawer/DrawerToggleButton";
import { NavLink, Link } from "react-router-dom";
import Avatar from "react-avatar";
import { BsPeopleCircle } from "react-icons/bs";

const Header = (props) => {
  let {
    history,
    handleTeachersRoute,
    navigationRoute,
    logout,
    myProfile,
    teacherProfile,
    changePassword,
    navigationRouteSignup,
    handleRouteSignIn,
    handleRouteSignUp,
    getAllCourse,
    adminProfile,
    switchUserRole,
    adminProfiles,
    teacherProfileUrl,
    studentProfileUrl,
  } = props;
  let { auth } = props;

  let signInButton;
  let signInLink;
  // if (!auth.loggedIn) {
  //   if (
  //     props.location.pathname.includes("/") ||
  //     props.location.pathname.includes("/student/login") ||
  //     props.location.pathname.includes("/student/login/otp") ||
  //     props.location.pathname.includes("/teacher/login") ||
  //     props.location.pathname.includes("/teacher/login/otp")
  //   ) {
      // signInButton = (
        // <span id="HeaderHidesign">
        //   <Button
        //     type="button"
        //     className="btn btn-rounded "
        //     id="signIn-btn"
        //     onClick={() => {
        //       history.push(navigationRoute);
        //     }}
        //   >
        //     Sign In
        //   </Button>
        // </span>
      // );
    //   signInLink = (
    //     <div>
    //       <a
    //         className="dropdown-item"
    //         href="javascript:void(0)"
    //         // onClick={(e) => myProfile(e)}
    //         id="signIn-link"
    //         onClick={() => {
    //           history.push(navigationRoute);
    //         }}
    //       >
    //         SignIn
    //       </a>
    //     </div>
    //   );
    // }

    // student signup commented
  //   if (
  //     props.location.pathname.includes("/student/register") ||
  //     props.location.pathname.includes("/student/signup/password") ||
  //     props.location.pathname.includes("/teacher/register") ||
  //     props.location.pathname.includes("/student/signup/password") ||
  //     props.location.pathname.includes("/student/signup/demography") ||
  //     props.location.pathname.includes("/student/signup/otp")
  //   ) {
  //     signInButton = (
  //       <span id="HeaderHidesign">
  //         <Button
  //           type="button"
  //           id="outlined-signIn-btn"
  //           className="btn btn-rounded "
  //           variant="outline-primary"
  //           onClick={() => handleRouteSignIn()}
  //         >
  //           SignIn
  //         </Button>
  //       </span>
  //     );
  //     signInLink = (
  //       <div>
  //         <a
  //           className="dropdown-item"
  //           href="javascript:void(0)"
  //           // onClick={(e) => myProfile(e)}
  //           id="signIn-link"
  //           onClick={() => {
  //             history.push(navigationRoute);
  //           }}
  //         >
  //           SignIn
  //         </a>
  //       </div>
  //     );
  //   }
  // }

  let signUpButton;
  let signUpLink;

  if (props.location.pathname.includes("/guest")) {
    return (
      <div className="navbar">
        <div className="container container-for-header">
          <div className="navbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
          </div>
          <nav className="nav guest-nav-image">
            {/* <a className="navbar-brand" href="/">
              <img
                src={fastlogo4}
                id="fastbridgeLogo"
                // width="200"
                // height="60"
                className="d-inline align-top"
                // id="nav-bar-header-image1"
                alt="fastbridge logo"
              />
            </a> */}
          </nav>
          {/* <nav className="nav guest-nav-image"> */}
          <a className="navbar-brand" href="/">
            <img
              src={zotalabsLogo}
              id="zotalabsLogo"
              // width="120"
              // height="60"
              className="d-inline align-top"
              // id="nav-bar-header-image"
              alt="zotalabs logo"
            />
          </a>
          {/* </nav> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <div className="container container-for-header">
          <div className="navbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
          </div>
          <nav className="nav left">
            {/* <a href="/">
              <img
                src={fastlogo4}
                id="fastbridgeLogo"
                // width="200"
                // height="60"
                className="d-inline align-top"
                // id="nav-bar-header-image1"
                alt="fastbridge logo"
              />
            </a>
            <a href="/">
              <img
                src={zotalabsLogo}
                id="zotalabsLogo"
                // width="120"
                // height="60"
                className="d-inline align-top"
                // id="nav-bar-header-image"
                alt="zotalabs logo"
              />
            </a> */}
            <Link to="/">
              {/* <img
                src={fastlogo4}
                id="fastbridgeLogo"
                // width="200"
                // height="60"
                className="d-inline align-top"
                // id="nav-bar-header-image1"
                alt="fastbridge logo"
              /> */}
            </Link>
            <Link to="/">
              <img
                src={zotalabsLogo}
                id="zotalabsLogo"
                // width="120"
                // height="60"
                className="d-inline align-top"
                // id="nav-bar-header-image"
                alt="zotalabs logo"
              />
            </Link>
          </nav>

          {/* {listSection} */}

          <div className="form-inline my-2 my-lg-0">
            {auth.loggedIn && (
              <div className="btn-group">
                {console.log("auth.currentMetaData", auth.currentMetaData)}

                {/* for student */}

                {auth.currentRole.code == 1 ? (
                  <label
                    className="text-white border-0 pt-3 pl-1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="hi-user-courser"
                  >
                    {
                      // auth.currentMetaData.imageUrl == ""?
                      auth.currentRole.code == 1 && studentProfileUrl !== "" ? (
                        <img
                          // src={
                          //   auth.currentMetaData.imageUrl
                          // }

                          src={studentProfileUrl}
                          height="35px"
                          width="35px"
                          style={{ borderRadius: "50%", marginTop: "-45%" }}
                        ></img>
                      ) : (
                        <Avatar
                          name={
                            auth.currentMetaData && auth.currentMetaData.name
                              ? auth.currentMetaData.name
                              : "User"
                          }
                          size="35"
                          round={true}
                          color="#8499FF"
                          style={{ marginTop: "-45%" }}
                        />
                      )
                    }
                  </label>
                ) : null}
                {/* for teacher */}
                {auth.currentRole.code == 3 ? (
                  <label
                    className="text-white border-0 pt-3 pl-1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="hi-user-courser"
                  >
                    {
                      // auth.currentMetaData.imageUrl == ""?
                      auth.currentRole.code == 3 && teacherProfileUrl !== "" ? (
                        <img
                          // src={
                          //   auth.currentMetaData.imageUrl
                          // }

                          src={teacherProfileUrl}
                          height="35px"
                          width="35px"
                          style={{ borderRadius: "50%", marginTop: "-45%" }}
                        ></img>
                      ) : (
                        <Avatar
                          name={
                            auth.currentMetaData && auth.currentMetaData.name
                              ? auth.currentMetaData.name
                              : "User"
                          }
                          size="35"
                          round={true}
                          color="#8499FF"
                          style={{ marginTop: "-45%" }}
                        />
                      )
                    }
                  </label>
                ) : null}

                {/* Admin Profile */}

                {
                  // auth.currentMetaData.imageUrl == ""?
                  auth.currentRole.code == 2 ? (
                    <label
                      className="text-white border-0 pt-3 pl-1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      id="hi-user-courser"
                    >
                      {
                        // auth.currentMetaData.imageUrl == ""?
                        adminProfiles !== "" ? (
                          <img
                            // src={
                            //   auth.currentMetaData.imageUrl
                            // }

                            src={adminProfiles}
                            height="35px"
                            width="35px"
                            style={{ borderRadius: "50%", marginTop: "-45%" }}
                          ></img>
                        ) : (
                          <Avatar
                            name={
                              auth.currentMetaData && auth.currentMetaData.name
                                ? auth.currentMetaData.name
                                : "User"
                            }
                            size="35"
                            round={true}
                            color="#8499FF"
                            style={{ marginTop: "-45%" }}
                          />
                        )
                      }
                    </label>
                  ) : null
                }

         {/*  commom profile label for user    */}
                {/* <label
                  className="text-white border-0 pt-3 pl-1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  id="hi-user-courser"
                >
                  {auth.currentMetaData &&
                  auth.currentMetaData.imageUrl !== "" ? (
                    <img
                      // src={
                      //   auth.currentMetaData.imageUrl
                      // }

                      src={auth.currentMetaData.imageUrl}
                      height="50px"
                      width="50px"
                      style={{ borderRadius: "50%", marginTop: "-22%" }}
                    ></img>
                  ) : (
                    <Avatar
                      name={
                        auth.currentMetaData && auth.currentMetaData.name
                          ? auth.currentMetaData.name
                          : "User"
                      }
                      size="50"
                      round={true}
                      color="#174b78"
                      style={{ marginTop: "-22%" }}
                    />
                  )}
                </label> */}

                <div className="dropdown-menu">
                  {(props.location.pathname.includes("/student") ||
                    props.location.pathname.includes(
                      "/student/changePassword"
                    )) && (
                    <a
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={(e) => myProfile(e)}
                    >
                      Student Profile
                    </a>
                  )}

                  {props.location.pathname.includes("/teacher") && (
                    <a
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={(e) => teacherProfile(e)}
                    >
                      Teacher Profile
                    </a>
                  )}

                  {console.log(
                    "Admin path is there",
                    props.location.pathname.includes("/teacher")
                  )}
                  {props.location.pathname.includes("/admin") && (
                    <a
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={(e) => adminProfile(e)}
                    >
                      Admin Profile
                    </a>
                  )}
                  {/* currenty admin is not able to update password */}
                  {auth.email && (
                    <a
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={(e) => changePassword(e)}
                    >
                      Change Password
                    </a>
                  )}
                  {auth.roleId &&
                    auth.roleId.map((roleCurr) => {
                      return roleCurr.code != auth.currentRole.code ? (
                        <a
                          className="dropdown-item"
                          href="javascript:void(0)"
                          // name={roleCurr.code}
                          onClick={(e) => switchUserRole(e, roleCurr)}
                        >
                          Switch to {roleCurr.displayName}
                        </a>
                      ) : null;
                    })}
                  <a
                    className="dropdown-item"
                    href="javascript:void(0)"
                    onClick={(e) => logout(e)}
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
            {signInButton}

            {!auth.loggedIn && (
              <li className="dropdown" id="list-profile">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                  <BsPeopleCircle id="profile-logo"></BsPeopleCircle>
                </a>
                <ul className="dropdown-menu dropdown-user">
                  <li>{signInLink}</li>
                </ul>
              </li>
            )}
          </div>
        </div>
      </div>
    );
  }
};
export default enhancer(Header);
