import React from 'react';
import {Row, Col} from 'antd'
import UserInFo from "./UserInFo";
import RoomList from "./RoomList";
import styled from "styled-components";

const SidebarStyled = styled.div`
  background-color: #3f0e40;
  color: azure;
  height: 100vh;
`;

export default function Sidebar() {

    return (
        <SidebarStyled>
            <Row>
                <Col span={24}>
                    <UserInFo/>
                </Col>
                <Col span={24}>
                    <RoomList/>
                </Col>
            </Row>
        </SidebarStyled>
    );

}

