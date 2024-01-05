import React from "react";
import { useJwt } from "react-jwt";
import { useMsal, useMsalAuthentication} from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';


const  Dashboard = () => {
  
  const { instance } = useMsal();    

  const { result, error: msalError } = useMsalAuthentication(InteractionType.Redirect, {
    account: instance.getActiveAccount(),
    redirectUri: '/dashboard',
});

  

 console.log(result, instance.getActiveAccount().idTokenClaims);
  //const { decodedToken, isExpired } = useJwt(instance.getActiveAccount().idTokenClaims);


  const handleLogoutRedirect = () => {
    instance.logout();
  }
  return (
    <>
      <h1>
        Wellcome 
      </h1>

      <button onClick={handleLogoutRedirect}>
        Log out
      </button>
    </>
  );
}

export default Dashboard;
