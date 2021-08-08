import './App.css';
import Login from "./components/Login";
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomsModals from "./components/Modals/AddRoomsModals";
import InviteMemberModal from "./components/Modals/inviteMemberModal";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppProvider>
                    <Switch>
                        <Route component={Login} path={"/login"}/>
                        <Route component={ChatRoom} path={"/"}/>
                    </Switch>
                    <AddRoomsModals/>
                    <InviteMemberModal/>
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>

    );
}

export default App;
