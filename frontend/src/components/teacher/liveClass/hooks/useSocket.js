import React, { useState, useEffect } from 'react';
import { appConfig } from "../../../../constants";
import io from "socket.io-client";
import _ from "lodash";


let socket;
const ENDPOINT = `${appConfig.host}`;
socket = io(ENDPOINT);


const useSocket = (props) => {

    //Variables
    const sendPermission = {
        type: "HAND_RAISE",
        data: {
            senderName: props.name,
            permission: true,
            recieverId: "",
            senderId: props.auth._id,
        }
    }

    //Sockets
    const [username, setUserame] = useState(props.name);
    const [room, setRoom] = useState(props.scheduleId + "LIVECLASS");
    const [socketMessages, setSocketMessages] = useState([]);
    const [messageCounter, setMessageCounter] = useState(0);

    const [newMessageSchema, setNewMessageSchema] = useState({
        message: sendPermission,
        senderId: props.auth._id,
        name: props.name,
    });
    const [requestModal, setRequestModal] = useState(false);
    const [requesterName, setRequesterName] = useState("");
    const [requesterId, setRequesterId] = useState("");


    //Sockets start
    useEffect(() => {

        let roomId = room;
        let data = { username: username, room: roomId };
        console.log("Eumetry Live Class Socket data", data);
        socket.emit('adduser', data);

        return () => {
            socket.emit('disconnect');
            socket.off();
            console.log("Eumetry Live Class Disconnected from socket room at", roomId);
        }
    }, [ENDPOINT, username, room]);

    useEffect(() => {
        socket.on('updatelivechat', (message) => {
            console.log("Message from Socket of Teacher Side Eumetry Live Class", message);
            const tempMessages = _.cloneDeep(socketMessages);
            tempMessages.push(message.text);
            setSocketMessages(tempMessages);
            let lastMessage = message.text;
            if (lastMessage["type"] == "HAND_RAISE") {
                console.log("I am here 2 HAND-RAISE");
                setRequesterName(lastMessage["data"]["name"]);
                setRequesterId(lastMessage["data"]["senderId"]);
                if (lastMessage["data"]["requestingToShare"]) {
                    setRequestModal(true);
                }
            }
            setMessageCounter(messageCounter => messageCounter + 1);
        });
    }, [socketMessages])

    // function for sending message
    const sendAgreedPermission = () => {
        let actualMessage = _.cloneDeep(newMessageSchema);
        actualMessage.message.data.recieverId = requesterId;
        actualMessage.message.data.recieverName = requesterName;
        socket.emit('livechat', actualMessage);
        setRequestModal(false);
    }
    // Sockets End

    return {
        socketMessages,
        messageCounter,
        setRequesterName,
        setRequestModal,
        requestModal,
        requesterName,
        sendAgreedPermission

    };
}

export default useSocket;