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

  const [closestBins, setClosestBins] = useState([]);

  //   const [authIsLoading, setAuthIsLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  // const fetchData = (username) => {
  //   console.log(username);
  //   console.log(setUserNameToken);
  //   console.log(setAccountDetails);
  // };

  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [createIsLoading, setCreateIsLoading] = useState(false);

  // const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const fetchData = async (username) => {
    if (!username) {
      return;
    }
    setLoginIsLoading(true);
    const base = {
      name: username,
    };
    const url = "http://127.0.0.1:8000/user/";
    setDataFetched(true);
    // setAuthIsLoading(true);
    return fetch(url, {
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
            console.log(data);
            // setLoginErrorMessage("Username does not exist");
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
        setLoginIsLoading(false);

        console.log("Successfully refreshed!");
      })
      .catch((err) => {
        setLoginIsLoading(false);
        throw new Error(err);
      });
  };

  const createAccount = async (username) => {
    if (!username) {
      return;
    }
    setCreateIsLoading(true);
    const base = {
      name: username,
    };
    const url = "http://127.0.0.1:8000/new/";
    setDataFetched(true);
    // setAuthIsLoading(true);
    return fetch(url, {
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
            console.log(data);
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
        setCreateIsLoading(false);
        console.log("Successfully refreshed!");
      })
      .catch((err) => {
        setCreateIsLoading(false);
        throw new Error(err);
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
    loginIsLoading: loginIsLoading,
    createIsLoading: createIsLoading,
    closestBins: closestBins,
    // loginErrorMessage: loginErrorMessage,
    // authIsLoading: authIsLoading,
    // isDataFetched: dataFetched,
    // login: loginHandler,
    // // datalog: loginData,
    // logout: logoutHandler,
    setClosestBins: setClosestBins,
    fetchData: fetchData,
    logoutHandler: logoutHandler,
    createAccount: createAccount,
    setAccountDetails: setAccountDetails,
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
