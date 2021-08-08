import React, {Component} from 'react';
import {Avatar, Button, Typography} from 'antd'
import styled from "styled-components";
import {auth, db} from "../../firebase/config";
import {AuContext} from "../../Context/AuthProvider";

const WrapperStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: azure;
    margin-left: 5px;
  }
`;

export default function UserInFo() {



    const  {user:{
        displayName,
        photoURL
    }} = React.useContext(AuContext)

    return (
        <WrapperStyle>
            <div>
                {/*// không có ảnh thì hiện kí tự đầu của tên*/}
                <Avatar>{displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className={"username"}>{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}> Đăng Xuất</Button>
        </WrapperStyle>
    );

}

