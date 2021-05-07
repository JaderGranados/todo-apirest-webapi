import {createContext} from 'react'
import AuthContext from './interfaces/auth-context.interface';

const authContext = createContext<AuthContext>({loggedIn: false, setLoggedIn: () => {}});

export default authContext;