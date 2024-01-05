import { LogLevel } from "@azure/msal-browser";

export const DomainName = 'INFOdationB2C';

export const ClientSPAId = '48fb9d5a-e616-4f77-abc9-50ec4e4eb21f';

export const WepApiId = '9aa736d5-35c8-415d-8c53-78fe0e71ee77';

export const ApiCollections = {
    apiLogin: {
        url: `https://${DomainName}.b2clogin.com/${DomainName}.onmicrosoft.com/B2C_1_ROPC_Thi_Test/oauth2/v2.0/token`,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
        body: {
            'grant_type':'password',
            'scope': `openid ${WepApiId} offline_access`,
            'client_id': WepApiId,
            'reponse_type':'token id_token'
        }
    }
};

export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_hong_signin_signup',
        // forgotPassword: 'B2C_1_reset_v3',
        // editProfile: 'B2C_1_edit_profile_v2',
    },
    authorities: {
        signUpSignIn: {
            authority: `https://${DomainName}.b2clogin.com/${DomainName}.onmicrosoft.com/B2C_1_hong_signin_signup`,
        },
        // forgotPassword: {
        //     authority: `https://${AuthorityDomain}/${AuthorityDomain}/B2C_1_reset_v3`,
        // },
        // editProfile: {
        //     authority: `https://${AuthorityDomain}/${AuthorityDomain}/b2c_1_edit_profile_v2`,
        // },
    },
    
};

export const msalConfig = {
    auth: {
        clientId: ClientSPAId, // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
        knownAuthorities: [`${DomainName}.b2clogin.com`], // Mark your B2C tenant's domain as trusted.
        redirectUri: '/', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: 'localStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

// export const protectedResources = {
//     apiList: {
//         endpoint: 'https://localhost:5001/api/user',
//         scopes: {
//             read: ['https://INFOdationB2C.onmicrosoft.com/api/user.read'],
//             write: ['https://INFOdationB2C.onmicrosoft.com/api/user.read'],
//         },
//     },
// };


export const loginRequest = {
    scopes: [
        // ...protectedResources.apiTodoList.scopes.read, 
        // ...protectedResources.apiTodoList.scopes.write],
    ]
};
