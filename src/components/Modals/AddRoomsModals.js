import React, {useState, useContext} from 'react';
import {Form, Input, Modal} from 'antd'
import {AppContext} from "../../Context/AppProvider";
import {addDocument} from "../../firebase/services";
import {AuContext} from "../../Context/AuthProvider";

export default function AddRoomsModals() {
    const {isAddRoomVisible, setIsAddRoomVisible} = useContext(AppContext)
    const {user: {uid}} = useContext(AuContext)
    const [form] = Form.useForm();

    const handleOK = () => {
        // theem vao fire
        console.log({formData: form.getFieldsValue()});
        addDocument('rooms', {
            ...form.getFieldsValue(),
            members: [uid]
        })
        //resset
        form.resetFields()
        setIsAddRoomVisible(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setIsAddRoomVisible(false)
    }

    return (
        <div>
            <Modal
                title={"Tao Phong"}
                visible={isAddRoomVisible}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form form={form} layout={'vertical'}>
                    <Form.Item label={"Ten Phong"} name={'name'}>
                        <Input placeholder={"Nhap ten phong"}/>
                    </Form.Item>
                    <Form.Item label={"Mo ta"} name={'description'}>
                        <Input.TextArea placeholder={"Nhap mota"}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

}

