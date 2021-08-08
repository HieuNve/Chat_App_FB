import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {auth} from "../firebase/config";
import {Spin} from 'antd'
import useFirestore from "../hooks/useFirestore";
import {AuContext} from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({children}) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')


    const {user: {uid}} = React.useContext(AuContext);
    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid])

    const rooms = useFirestore('rooms', roomsCondition);
    console.log({rooms});
    const selectedRoom = React.useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [selectedRoomId]
    )
    const usersCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);
    const members = useFirestore('users', usersCondition)
    console.log({members})


    return (
        <AppContext.Provider value={
            {
                rooms, isAddRoomVisible, setIsAddRoomVisible,
                selectedRoomId, setSelectedRoomId, selectedRoom, members,
                isInviteMemberVisible, setIsInviteMemberVisible
            }}>
            {children}
        </AppContext.Provider>
    );

}

