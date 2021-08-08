import React from 'react';
import {Row, Col, Button, Typography} from 'antd'
import firebase, {auth, db} from "../../firebase/config";
import {useHistory} from 'react-router-dom'
import {addDocument} from "../../firebase/services";
import {generateKeywords} from "../../firebase/services";

const {Title} = Typography;


var ggProvider = new firebase.auth.GoogleAuthProvider();
export default function Login() {


    const handleFblogin = async () => {
        const {additionalUserInfo, user} = await auth.signInWithPopup(ggProvider);
        if (additionalUserInfo?.isNewUser) {
            // await db.collection("users").add({
            //     displayName: user.displayName,
            //     email: user.email,
            //     photoUrl: user.photoURL,
            //     uid: user.displayName,
            //     providerId: additionalUserInfo.providerId
            // })

            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }

    return (
        <div>
            <Row justify={"center"} style={{height: 800}}>
                <Col span={8}>
                    <Title style={{textAlign: 'center'}} level={3}>Fun chat</Title>
                    <Button style={{width: '100%', marginBottom: 5}} onClick={handleFblogin}>
                        Đăng nhập với Google
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

