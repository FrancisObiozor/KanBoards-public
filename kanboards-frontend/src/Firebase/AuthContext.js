import { useContext, createContext } from "react";
import { auth } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const changeEmail = (newEmail) => {
    return updateEmail(auth.currentUser, newEmail);
  };

  const changePassword = (newPassword) => {
    return updatePassword(auth.currentUser, newPassword);
  };

  const getCurrentUser = () => {
    return auth.currentUser;
  };

  const verifyExistingPassword = (existingPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      existingPassword
    );
    return reauthenticateWithCredential(user, credential);
  };

  const deleteCurrentUser = () => {
    const user = auth.currentUser;
    return deleteUser(user);
  };

  const value = {
    getCurrentUser,
    signup,
    login,
    logout,
    changeEmail,
    changePassword,
    verifyExistingPassword,
    deleteCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
