import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import app from "../../getRealmApp";

// Access the Realm App.


// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);
  const realmRef = useRef(null);
  const [projectData, setProjectData] = useState([]);


  
  useEffect(() => {
    if (!user) {
      return () => {
        // cleanup function
        const userRealm = realmRef.current;
        if (userRealm) {
          userRealm.close();
          realmRef.current = null;
          setProjectData([]); // set project data to an empty array (this prevents the array from staying in state on logout)
        }
      };
    }

    // The current user always has their own project, so we don't need
    // to wait for the user object to load before displaying that project.
    const myProject = { name: "My Project", partition: `project=${user.id}` };
    setProjectData([myProject]);

    const config = {
      sync: {
        user,
        partitionValue: `project=${user.id}`,
      },
    };
    // Open a realm with the logged in user's partition value in order
    // to get the projects that the logged in user is a member of
    Realm.open(config).then((userRealm) => {
      realmRef.current = userRealm;
      const users = userRealm.objects("User");
      users.addListener(() => {
        // The user custom data object may not have been loaded on
        // the server side yet when a user is first registered.
        if (users.length === 0) {
          setProjectData([myProject]);
        } else {
          const { memberOf, name, privilege, privilege_due} = users[0];
          setProjectData([...memberOf, name,  privilege, privilege_due]);
        }
      });
    });
  
  }, [user]);

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.
  const signIn = async (email, password) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    setUser(newUser);
  };

  const forgotPassword = async  (email) => {

    await app.emailPasswordAuth.sendResetPasswordEmail({ email });
  }

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password, name) => {
    await app.emailPasswordAuth.registerUser({ email, password });
  };

  const createUserInfo = ( email, password, name ) => {
    const projectPOS = realmRef.current;
    projectPOS.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectPOS.create(
        "UserInfo",
        new UserInfo({
          id: user.id,
          partition: `project=${user.id}`,
          name: name,
          pin: '1234',
          status: "Active",
          privilege: 'Free',
          privilege_due: `${moment.unix(date).add(30, 'day').startOf('day')/ 1000}`,
          password: password,
          email: email
        })
      );
    });
  };

  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        forgotPassword,
        user,
      // list of projects the user is a memberOf
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };
