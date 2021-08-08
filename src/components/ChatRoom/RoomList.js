import React from 'react';
import {Button, Collapse, Typography} from 'antd'
import styled from "styled-components";
import {PlusSquareOutlined} from '@ant-design/icons'
import useFirestore from "../../hooks/useFirestore";
import {AuContext} from "../../Context/AuthProvider";
import AppProvider, {AppContext} from "../../Context/AppProvider";

const {Panel} = Collapse
const PanelStyle = styled(Panel)`
  &&& {
    .ant-collapse-header, p {
      color: azure;
    }

    .ant-collapse-content-box {
      padding: 0px 40px;
    }

    .add-room {
      color: azure;
      padding: 0px;
    }
  }
`;

const LinkStyle = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: azure;
`;

export default function RoomList() {
    // const {user: {uid}} = React.useContext(AuContext);
    /**
     * {
     *     name: 'room name'
     *     des : 'mo ta'
     *     member: [uID1, uID2,...]
     * }
     *
     *
     */

        // const roomsCondition = React.useMemo(() => {
        //     return {
        //         fieldName: 'members',
        //         operator: 'array-contains',
        //         compareValue: uid
        //     }
        // }, [uid])
        //
        // const rooms = useFirestore('rooms', roomsCondition);
        // console.log({rooms});


    const {rooms, setIsAddRoomVisible, setSelectedRoomId} = React.useContext(AppContext)
    console.log({rooms})
    const handleAddRooms = () => {
        setIsAddRoomVisible(true)
    }
    return (
        <div>
            <Collapse ghost defaultActivekey={['1']}>
                <PanelStyle header={"Danh sách các phòng"} key={'1'}>
                    {
                        rooms.map(room => <LinkStyle key={room.id}
                                                     onClick={() => setSelectedRoomId(room.id)}
                        >{room.name}</LinkStyle>)
                    }
                    <Button type={"text"} icon={<PlusSquareOutlined></PlusSquareOutlined>} className={"add-room"}
                            onClick={handleAddRooms}
                    >Thêm
                        phòng</Button>
                </PanelStyle>
            </Collapse>
        </div>
    );

}

