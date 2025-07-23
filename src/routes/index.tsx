import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

const isLoading = false

const session = {
    user: {
        role: '',
    },
}

export function Routes(){
    const context = useAuth()
    function Route(){
        switch(session.user.role){
            case 'employee':
                return <EmployeeRoutes/>

            case 'manager':
                return <ManagerRoutes/>
            
            default:
                return <AuthRoutes/>
        }
    }

    if(isLoading){
        return <Loading />
    }
    return(
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    )
}