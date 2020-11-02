import { compose } from "redux";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import ChatInit from "./chatDemo";
import ChatBox from ".";
import { urls } from "../../../url";
import { appConfig } from "../../../constants";
import axios from "axios";


export let enhancer = compose(
    connect(({ auth }) => ({ auth })),
    withRouter,
    (StudentChatBox) => ({ auth, ...props }) => {
        const [chat, setChat] = useState([]);
        const [activeUser, setActiveUser] = useState({
            dp: "",
            name: "No Active chats",
            id: "",
            instituteId: "",
            batchId: "",
        });
        const [newMessage, setNewMessage] = useState("");
        const [startChat, setStartChat] = useState(true);
        const [loader, setLoader] = useState(true);

        //My Logic
        const [recieverId, setRecieverId] = useState("");
        const [batchWiseData, setBatchWiseData] = useState([]);
        const [teacherList, setTeacherList] = useState([]);

        useEffect(() => {
            getTeachers();
        }, []);

        const getTeachers = () => {
            setLoader(true);
            axios.get(`${appConfig.host}${urls.getStudentBatchWiseTeachers}`)
                .then((success) => {
                    console.log("Success Getting Teacher List", success.data.data);
                    setBatchWiseData(batchWiseData => _.cloneDeep(success.data.data));
                    let tempTeacherList = [];
                    try {
                        let tempTeacherList = [];
                        success.data.data.forEach((eachBatch, index) => {
                            eachBatch.teachers.forEach((eachTeacher, index) => {
                                tempTeacherList.push({
                                    dp: eachTeacher.teacherId.imageUrl,
                                    name: eachTeacher.teacherId.name,
                                    id: eachTeacher.teacherId.userId,
                                    instituteId: eachTeacher.teacherId.instituteId,
                                    batchId: eachBatch.batchId,
                                });
                            });
                        });
                        if (tempTeacherList.length > 0) {
                            setTeacherList(teacherList => _.cloneDeep(tempTeacherList));
                            setActiveUser(activeUser => _.cloneDeep(tempTeacherList[0]));
                        }
                        setLoader(false);
                    }
                    catch (error) {
                        console.log("Failed at creating list", error);
                        setLoader(false);
                    }
                }).catch(error => {
                    console.log("Error fetching Teacher List", error);
                    setLoader(false);
                })
        }

        console.log("Teacher List", teacherList);
        useEffect(() => {
            getChatBox();
        }, [activeUser.id]);

        const getChatBox = () => {
            //Parameters
            let params = {
                senderId: auth._id,
                receiverId: activeUser.id,
            };
            console.log("get chat params", params);
            if (activeUser.id) {
                // setLoader(true);
                //Fetch Data
                axios
                    .get(`${appConfig.host}${urls.chatBox}?senderId=${auth._id}&receiverId=${activeUser.id}`)
                    .then((success) => {
                        console.log("Success chat data ", success.data.data);
                        if (success.data.data.length > 0) {
                            setStartChat(false);
                            let arrayTemp = [...success.data.data[success.data.data.length - 1].messages];
                            console.log("ArrayTemp", arrayTemp);
                            setChat(arrayTemp);
                        } else {
                            setStartChat(true);
                        }
                        // setLoader(false);
                    })
                    .catch((error) => {
                        // setLoader(false);
                        console.log(error);
                    });
            }
        };
        // console.log("chat : ", chat);

        const selectUserChat = (user) => {
            setActiveUser(user);
            getChatBox();
        };
        const handleMessageSendText = (value) => {
            setNewMessage(value);
        };

        const sendMessage = (event) => {
            event.preventDefault();
            let params = {
                receiverId: activeUser.id,
                senderId: auth._id,
                message: newMessage,
            };
            setNewMessage("");
            console.log("Sending chat message ", params);
            if (startChat) {
                axios
                    .post(`${appConfig.host}${urls.chatBox}`, params)
                    .then((success) => {
                        console.log("Post Message Sent");
                        afterSend(params.message);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                axios
                    .put(`${appConfig.host}${urls.chatBox}`, params)
                    .then((success) => {
                        console.log("Put Message Sent");
                        afterSend(params.message);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

        };

        const afterSend = (newMessage) => {
            let array = [...chat];
            let currentMessage = {
                date: new Date(),
                isMessageFromTutor: false,
                message: newMessage,
                name: "Sent",
                type: "PERSONAL",
                _id: "",
            };
            array.push(currentMessage);
            setChat(array);
            setStartChat(false);
            setTimeout(() => getChatBox(), 1000);
        }
        return (
            <StudentChatBox
                {...props}
                {...{
                    auth,
                    selectUserChat,
                    chat,
                    activeUser,
                    handleMessageSendText,
                    sendMessage,
                    loader,
                    newMessage,
                    teacherList
                }}
            />
        );
    }
);

export default enhancer;
