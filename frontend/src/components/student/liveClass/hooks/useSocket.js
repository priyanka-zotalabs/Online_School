import React, { useState, useEffect } from 'react';
import { appConfig } from "../../../../constants";
import io from "socket.io-client";
import _ from "lodash";


let socket;
const ENDPOINT = `${appConfig.host}`;
socket = io(ENDPOINT);


const useSocket = (props) => {

    //Variables
    const handRaiseSchema = {
        type: "HAND_RAISE",
        data: {
            name: props.name,
            requestingToShare: true,
            senderId: props.auth._id,
        }
    }
    //Sockets
    const [username, setUserame] = useState(props.name);
    const [room, setRoom] = useState(props.scheduleId + "LIVECLASS");
    const [socketMessages, setSocketMessages] = useState([]);
    const [messageCounter, setMessageCounter] = useState(0);
    const [permissionToShare, setPermissionToShare] = useState(false);
    const [newMessageSchema, setNewMessageSchema] = useState({
        message: handRaiseSchema,
        senderId: props.auth._id,
        name: props.name,
    });


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
            console.log("Message from Socket of Student Side Eumetry Live Class", message);
            let lastMessage = message.text;
            if (lastMessage.type === "HAND_RAISE" && lastMessage.data.recieverId === props.auth._id) {
                setPermissionToShare(lastMessage.data.permission);
            }
            const tempMessages = _.cloneDeep(socketMessages);
            tempMessages.push(message.text);
            setSocketMessages(tempMessages);
            setMessageCounter(messageCounter => messageCounter + 1);
        });
    }, [socketMessages])

    // function for sending message
    const sendHandRaiseOnSocket = () => {
        socket.emit('livechat', newMessageSchema);
    }
    // Sockets End

    return {
        socketMessages,
        sendHandRaiseOnSocket,
        permissionToShare
    };
}

export default useSocket;