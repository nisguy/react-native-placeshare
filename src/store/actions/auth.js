import { TRY_AUTH } from "./actionTypes";

export const tryAuth = userData => {
  return dispatch => {
    dispatch(authSignUp(userData));
  };
  //   return {
  //     type: TRY_AUTH,
  //     userData: userData
  //   };
};

const authSignUp = userData => {
  return dispatch => {
    console.log("Signup attempt");
    fetch(
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCKNypbWYqJB7DPsrZ3_3pvmQ5rKrzU12A",
      {
        method: "POST",
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .catch(err => {
        console.log(err);
        alert("Authentication failed. Please try again.");
      })
      .then(res => res.json())
      .then(parsedRes => console.log(parsedRes))
      .catch(err => {
        console.log(err);
        alert("application error! Retry.");
      });
  };
};
