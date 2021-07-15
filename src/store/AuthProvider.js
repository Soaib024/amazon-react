import { useReducer } from "react";
import AuthContext from "./AuthContext";



const defaultUser = {
  token: "",
  user: {},
  isSignedIn: false,
  signIn: (userInfo) => {},
  signOut: () => {},
  
};

if(typeof window !== undefined){
  const localUser = JSON.parse(localStorage.getItem("jwt"))
  if(localUser){
    defaultUser.token = localUser.token;
    defaultUser.isSignedIn = true;
    defaultUser.user = localUser.user;
  }
}

const userReducer = (state, action) => {
  if (action.type === "SIGNIN") {
    return {
      token: action.token,
      user: action.user,
      isSignedIn: true,
    };
  }

  if (action.type === "SIGNOUT") {
    return {
      token: "",
      user: {},
      isSignedIn: false,
    };
  }

  return defaultUser;
};

export const AuthProvider = ({ children }) => {
  const [userState, dispatchUserAction] = useReducer(userReducer, defaultUser);

  const signInHandler = (userInfo) => {
    if (userInfo === undefined) {
      dispatchUserAction(defaultUser);
    } else {
      dispatchUserAction({
        type: "SIGNIN",
        token: userInfo.token,
        user: userInfo.user,
      });
    }
  };

  const signOutHandler = () => {
    dispatchUserAction({
      type: "SIGNOUT",
    });
  };

  const userContext = {
    token: userState.token,
    user: userState.user,
    isSignedIn: userState.isSignedIn,
    signIn: signInHandler,
    signOut: signOutHandler,
  };

  return (
    <AuthContext.Provider value={userContext}>{children}</AuthContext.Provider>
  );
};
