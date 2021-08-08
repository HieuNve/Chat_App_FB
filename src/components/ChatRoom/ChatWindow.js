import React, {useContext, useState, useRef, useEffect} from 'react';
import styled from "styled-components";
import {Form, Avatar, Button, Input, Tooltip, Alert} from "antd";
import {UserAddOutlined} from '@ant-design/icons'
import Message from "./Message";
import AppProvider, {AppContext} from "../../Context/AppProvider";
import {AuContext} from "../../Context/AuthProvider";
import {addDocument} from "../../firebase/services";
import useFirestore from "../../hooks/useFirestore";
import {formatRelative} from 'date-fns'


const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &_info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &_title {
      margin: 0;
      font-weight: bold;
    }

    &_decr {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyle = styled.div`
  display: flex;
  align-items: center;
`;

const MessListStyle = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const WrapperStyle = styled.div`
  height: 100vh;
`;

const ContentStyle = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`

const FormStyle = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0px;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

export default function ChatWindow() {
    const {selectedRoom, members, setIsInviteMemberVisible} =
        useContext(AppContext);

    const {
        user: {uid, photoURL, displayName},
    } = useContext(AuContext)

    const [inputValue, setInputValue] = useState('');
    const [form] = Form.useForm()
    const inputRef = useRef(null);
    const messageListRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName,
        });
        form.resetFields()
    }

    const condition = React.useMemo(() => ({
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectedRoom.id,
        }),
        [selectedRoom.id]
    );

    const messages = useFirestore('messages', condition)
    console.log({messages})

    // useEffect(() => {
    //     // scroll to bottom after message changed
    //     if (messageListRef?.current) {
    //         messageListRef.current.scrollTop =
    //             messageListRef.current.scrollHeight + 50;
    //     }
    // }, [messages]);

    function formatDate(seconds) {
        let formatDate = '';
        if (seconds) {
            formatDate = formatRelative(new Date(seconds * 1000), new Date())

            formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1)
        }
        return formatDate
    }

    // const selectedRoom = React.useMemo(
    //     () => rooms.find((room) => room.id === selectedRoomId),
    //     [rooms, selectedRoomId]
    // )
// tìm kiếm
    /**
     * db: bảng user
     * {
     * ngườu dùng nhập : "hie"
     * => Kiểm tra cái chuỗi người dùng nhập cps trùng với trong key hay không
     *     name : hieu nguyen => đưa vào 1 array với 2 phần tư [hieu, nguyen]  => hoán vị tất cả các trường hợp
     *     vd: [hieu, nguyen] , [nguyen , hieu] ...
     *     taachs key
     *     key: ["h", "hi", "hie" , "hieu", ...........]
     * }
     *
     */


    return (
        <WrapperStyle>
            {
                selectedRoom.id ? (
                    <>
                        <HeaderStyle>
                            <div className={"header_info"}>
                                <p className={"header_title"}>{selectedRoom.name}</p>
                                <span className={"header_decr"}>{selectedRoom.description}</span>
                            </div>
                            <ButtonGroupStyle>
                                <Button type={"text"} icon={<UserAddOutlined></UserAddOutlined>}
                                        onClick={() => setIsInviteMemberVisible(true)}>Mời</Button>
                                <Avatar.Group size={"small"} maxCount={2}>
                                    {
                                        members.map(member => <Tooltip title={member.displayName} key={member.id}>
                                            <Avatar>{member.displayName?.charAt(0).toUpperCase()}</Avatar>
                                        </Tooltip>)
                                    }
                                </Avatar.Group>
                            </ButtonGroupStyle>
                        </HeaderStyle>
                        <ContentStyle>
                            <MessListStyle>

                                {
                                    messages.map(mes =>
                                        <Message
                                            key={mes.id}
                                            text={mes.text}
                                            photoURL={mes.photoURL}
                                            displayName={mes.displayName}
                                            createAt={formatDate(mes.createAt?.seconds)}/>)
                                }

                            </MessListStyle>
                            <FormStyle form={form}>
                                <Form.Item name={'message'}>
                                    <Input
                                        onChange={handleInputChange}
                                        onPressEnter={handleOnSubmit}
                                        placeholder={"Nhập tin nhắn"} bordered={false} autoComplete={"off"}/>
                                </Form.Item>
                                <Button type={'primary'} onClick={handleOnSubmit}>Gửi</Button>
                            </FormStyle>
                        </ContentStyle>
                    </>
                ) : <Alert message={"Hãy chọn phòng"} type={"info"}
                           showIcon style={{margin: 5}} closable
                />
            }

        </WrapperStyle>
    );

}

