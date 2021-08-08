import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {auth} from "../firebase/config";
import {Spin} from 'antd'

export const AuContext = React.createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    React.useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                const {displayName, email, uid, photoURL} = user;
                setUser({
                    displayName, email, uid, photoURL
                });
                setIsLoading(false);
                history.push('/');
                return;
            } else {
                setIsLoading(false);
                history.push("/login")
            }
        });
        return () => {
            unsub();
        }
    }, [history]);


    return (
        <AuContext.Provider value={{user}}>
            {isLoading ? <Spin/> : children}
        </AuContext.Provider>
    );

}

