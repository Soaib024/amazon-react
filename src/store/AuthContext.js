import { createContext } from "react";
const AuthContext = createContext({
    token: "",
    user: {},
    isSignedIn: false,
    signIn: (userInfo) => {},
    signOut: () => {},
});

export default AuthContext
