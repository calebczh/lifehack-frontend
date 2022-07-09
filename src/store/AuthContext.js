import React, { useState } from "react";

const AuthContext = React.createContext({
  username: "",
  points: "",
});

export const AuthContextProvider = (props) => {
  const initialAccountDetails = localStorage.getItem("accountDetails");
  console.log(initialAccountDetails);
  const accountJson = initialAccountDetails
    ? JSON.parse(initialAccountDetails)
    : {
        name: null,
        points: null,
      };
  // const [username, setUserNameToken] = useState(accountDetails);
  const [accountDetails, setAccountDetails] = useState(accountJson);

  //   const [authIsLoading, setAuthIsLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  // const fetchData = (username) => {
  //   console.log(username);
  //   console.log(setUserNameToken);
  //   console.log(setAccountDetails);
  // };

  const fetchData = (username) => {
    if (!username) {
      return;
    }
    const base = {
      name: username,
    };
    const url = "https://lit-beyond-29823.herokuapp.com/user/";
    setDataFetched(true);
    // setAuthIsLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(base),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage; // = 'Authentication failed!';
            console.log(JSON.stringify(data));
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            console.log(errorMessage);

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // setDataFetched(true);
        // let account = data.data.account;

        // setUserNameToken(null);
        const json = {
          name: data.name,
          points: data.points,
        };
        setAccountDetails(json);
        localStorage.setItem("accountDetails", JSON.stringify(json));
        // setAuthIsLoading(false);

        console.log("Successfully refreshed!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const createAccount = (username) => {
    if (!username) {
      return;
    }
    const base = {
      name: username,
    };
    const url = "https://lit-beyond-29823.herokuapp.com/new/";
    setDataFetched(true);
    // setAuthIsLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(base),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage; // = 'Authentication failed!';
            console.log(JSON.stringify(data));
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            console.log(errorMessage);

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // setDataFetched(true);
        // let account = data.data.account;

        // setUserNameToken(null);
        const json = {
          name: data.name,
          points: data.points,
        };
        setAccountDetails(json);
        localStorage.setItem("accountDetails", JSON.stringify(json));
        // setAuthIsLoading(false);

        console.log("Successfully refreshed!");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // const initialId = localStorage.getItem("id");
  const userIsLoggedIn = !!accountDetails.name;
  // const userIsLoggedIn = true;

  // if (!dataFetched && accountDetails != null) {
  //   fetchData(accountDetails);
  // }

  // const loginHandler = (username) => {
  //   setUserNameToken(username);
  //   localStorage.setItem("username", username);
  //   fetchData(username);
  // };

  const logoutHandler = () => {
    localStorage.removeItem("accountDetails");
    setAccountDetails({
      name: null,
      points: null,
    });
    setDataFetched(false);
    console.log("Successfully logged out!");
    // localStorage.removeItem("id");
  };

  const contextValue = {
    accountDetails: accountDetails,
    isLoggedIn: userIsLoggedIn,
    // authIsLoading: authIsLoading,
    // isDataFetched: dataFetched,
    // login: loginHandler,
    // // datalog: loginData,
    // logout: logoutHandler,
    fetchData: fetchData,
    logoutHandler: logoutHandler,
    createAccount: createAccount,
    // optionState: optionState,
    // setOptionState: setOptionState,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
