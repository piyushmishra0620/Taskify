import {createContext,useContext,useReducer,useEffect} from "react";
import {signup,login,getUser,logout} from "@/utils/authFunctions";

interface User{
    name:string,
    email:string
}

interface AuthContext{
    User : User | null,
    loading:boolean,
    isAuthenticated:boolean
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = (props:{children:React.ReactNode})=>{
    const [state,dispatch]=useReducer({User:null,loading:true,isAuthenticated:false});
    useEffect(()=>{
        const session = async ()=>{

        }
        session();
    },[]);
    const register = async (body:{username:string,email:string,password:string})=>{
        try{
            const response = await signup(body);
            if(response.data){

            }else if(response.error){

            }
        }catch(err:any){

        }
    }

    const signin = async(body:{email:string,password:string})=>{
        try{
            const response = await login(body);
            if(response.data){

            }else if(response.error){

            }
        }catch(err:any){

        }
    }

    const signOut = async()=>{
        try{
            const response = await logout();
        }catch(err:any){

        }
    }

    return (
        <AuthContext.Provider value={state,register,signin,signOut}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);
