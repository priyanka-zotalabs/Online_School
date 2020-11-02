import React, { useState, useEffect } from "react";

import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";

let enhancer = compose(
  connect(
    ({ auth, course }) => ({
      auth,
      course,
    }),
    (dispatch) => ({
      setAuthUser: (user) => dispatch({ type: "SET_AUTH_USER", user }),
      changeRole: (toRole) => dispatch({ type: "CHANGE_ROLE", toRole }),
      clearAuth: () => dispatch({ type: "CLEAR_AUTH" }),
      setCourse: (params) => dispatch({ type: "ADD_COURSE", params }),
    })
  ),
  withRouter,
  (Component) => ({
    auth,
    clearAuth,
    changeRole,
    setCourse,
    setAuthUser,
    ...props
  }) => {
    let [user, setUser] = useState({});
    let [showUserMenu, setShowUserMenu] = useState(false);
    let [navigationRoute, setNavigationRoute] = useState("/student/login");
    let [navigationRouteSignup, setNavigationRouteSignup] = useState(
      "/student/register"
    );
    // let [showMyProfile, setShowMyProfile]=useState('/liveClasses/MyProfile')

    // useEffect(()=> {
    //     if (Object.keys(user).length === 0 && sessionStorage.getItem('user')) {
    //         setUser(JSON.parse(sessionStorage.getItem('user')).user)
    //     }
    // });

    useEffect(() => {
      if (Object.keys(auth).length === 0) {
        axios
          .get(`${appConfig.host}${urls.authenticationUser}`)
          .then((board) => {
            setAuthUser(board.data);
            // props.history.push("/");
          })
          .catch((error) => {});
      }
      if (
        auth &&
        auth.loggedIn &&
        auth.currentRole &&
        auth.currentRole.code === 1
      ) {
        
        getStudentDetails();
      } else if (
        auth &&
        auth.loggedIn &&
        auth.currentRole &&
        auth.currentRole.code === 3
      ) {
       
        getTeacherDetails();
      } else if (
        auth &&
        auth.loggedIn &&
        auth.currentRole &&
        auth.currentRole.code === 2
      ) {
        // window.location.reload();
        getInstituteDetails();
      }
    }, []);

    // useEffect(()=>{
    //   getStudentDetails();
    // },[auth.currentRole.code == 2])

    const [adminProfiles, setAdminProfile] = useState("");
    const [teacherProfileUrl, setTeacherProfileUrl] = useState("");
    const [studentProfileUrl, setStudentProfileUrl] = useState("");

    const getInstituteDetails = () => {
      axios
        .get(`${appConfig.host}${urls.getInstituteProfile}`)
        .then((success) => {
          console.log("admin profile info", success.data);

          setAdminProfile(success.data.data.imageUrl);
      

        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getTeacherDetails = () => {
      axios
        .get(`${appConfig.host}${urls.getTeacherProfile}`)
        .then((success) => {
          // console.log("teacher profile data", success.data);
          setTeacherProfileUrl(success.data.data.userMetaData.imageUrl);


        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getStudentDetails = () => {
      axios
        .get(`${appConfig.host}${urls.getStudentProfile}`)
        .then((success) => {
          setStudentProfileUrl(success.data.data.userMetaData.imageUrl);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const showDropDown = (event, click) => {
      setShowUserMenu(click);
      // console.log(showUserMenu)
    };

    // const logout = () => {
    //   clearAuth();
    //   props.history.push("/");
    //   // if(user && user!=={}){
    //   //     setUser({});
    //   //     sessionStorage.removeItem('user');
    //   //     props.history.push('/');
    //   // }
    // };

    const handleRouteSignIn = (e) => {
      if (props.location.pathname.includes("/teacher")) {
        props.history.push("/teacher/login");
      } else {
        props.history.push("/student/login");
      }
    };

    const handleRouteSignUp = (e) => {
      if (props.location.pathname.includes("/teacher")) {
        props.history.push("/teacher/register");
      } else {
        props.history.push("/student/register");
      }
    };

    const handleTeachersRoute = (e) => {
      // e.preventDefault()
      setNavigationRoute("/teacher/login");
      setNavigationRouteSignup("/teacher/register");
      props.history.push("/teacher/register");
    };

    const logout = (e) => {
      e.preventDefault();
      clearAuth();
      logoutFromServer();
    };

    const logoutFromServer = () => {
      axios
        .get(`${appConfig.host}${urls.logout}`)
        .then((board) => {
          props.history.push("/");
        })
        .catch((error) => {
          props.history.push("/");
        });
    };

    const switchUserRole = (e, toRole) => {
      e.preventDefault();
      console.log("Role ID Switched");
      changeRole(toRole);
    };

    const myProfile = (e) => {
      props.history.push("/student/MyProfile");
    };
    const teacherProfile = (e) => {
      props.history.push("/teacher/profile");
    };
    const adminProfile = (e) => {
      props.history.push("/admin/profile");
    };
    const changePassword = (e) => {
      if (auth && auth.loggedIn && auth.currentRole.code === 1) {
        props.history.push("/student/changePassword");
      } else if (auth && auth.loggedIn && auth.currentRole.code === 3) {
        props.history.push("/teacher/changePassword");
      } else if (auth && auth.loggedIn && auth.currentRole.code === 2) {
        props.history.push("/admin/changePassword");
      }
    };
    const discussionBoard = (e) => {
      props.history.push("/liveClasses/discussionBoard");
    };
    return (
      <Component
        {...props}
        {...{
          auth,
          user,
          logout,
          myProfile,
          teacherProfile,
          changePassword,
          handleTeachersRoute,
          navigationRoute,
          navigationRouteSignup,
          auth,
          logout,
          handleRouteSignIn,
          handleRouteSignUp,

          discussionBoard,
          adminProfile,
          switchUserRole,
          adminProfiles,
          teacherProfileUrl,
          studentProfileUrl,
        }}
      />
    );
  }
);

export default enhancer;


