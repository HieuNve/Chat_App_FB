import React, {useState, useContext} from 'react';
import {Form, Input, Modal, Select, Spin, Avatar} from 'antd'
import {AppContext} from "../../Context/AppProvider";
import {addDocument} from "../../firebase/services";
import {AuContext} from "../../Context/AuthProvider";
import {debounce} from 'lodash'
import {db} from "../../firebase/config";

function DebounceSelect({fetchOption, debounTimeuot = 300, ...props}) {

    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([])

    const debounceFetcher = React.useMemo(() => {
        const loadOption = (value) => {
            setOptions([]);
            setFetching(true)

            fetchOption(value, props.curMembers).then((newOptions) => {
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOption, debounTimeuot)
    }, [debounTimeuot, fetchOption])

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size={'small'}></Spin> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size={'small'}>{opt.lable?.charAt(0)?.toUpperCase()}</Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}

async function fetchUserList(search, curMembers) {
    return db
        .collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then((snapshot) => {
            return snapshot.docs
                .map((doc) => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL,
                })).filter((opt) => !curMembers.includes(opt.value));
        });
}

export default function InviteMemberModal() {
    const {
        isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId,
        selectedRoom
    } = useContext(AppContext)
    const {user: {uid}} = useContext(AuContext)
    const [form] = Form.useForm();
    const [value, setValue] = useState()

    const handleOK = () => {
        form.resetFields()
        // update room
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
            members: [...selectedRoom.members, ...value.map((val) => val.value)],
        })
        setIsInviteMemberVisible(false)
    }
    const handleCancel = () => {
        form.resetFields()
        setIsInviteMemberVisible(false)
    }
    console.log({value});
    return (
        <div>
            <Modal
                title={"Moi Thanh Vien"}
                visible={isInviteMemberVisible}
                onOk={handleOK}
                onCancel={handleCancel}
            >
                <Form form={form} layout={'vertical'}>
                    <DebounceSelect
                        mode={'multiple'}
                        lable={'Tên thành viên'}
                        value={value}
                        placeholder={"Nhập tên thành viên"}
                        fetchOption={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{width: '100%'}}
                        curMembers={selectedRoom.members}
                    >
                    </DebounceSelect>
                </Form>
            </Modal>
        </div>
    );

}

