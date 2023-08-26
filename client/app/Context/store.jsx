// "use client"

// import { createContext, useContext, useState } from 'react'

// const AppContext = createContext()

// export const AppContextProvider = ({ children }) => {
//     const [userData, setUserData] = useState('pooop');
//     const [searchData, setSearchData] = useState('');

//     return (
//         <AppContext.Provider value={{ searchData, setSearchData, userData, setUserData }}>
//             {children}
//         </AppContext.Provider>
//     );
// }

// export const useAppContext = () =>  useContext(AppContext);








"use client"

import { createContext, useContext, useReducer, useState } from 'react'

const AppContext = createContext(
{
    state: {navData: {personalise:{ethnicity:[], experience:[], barberLocation:[]}, booking: {bookingLocation:'',bookingDate:[],bookingTime:{time:{hr:null,min:null}, range:0.5}} }},
    dispatch: ()=>{}
}
);

export const AppContextProvider = ({ children }) => {
    

    function reducer(state, action) {
        switch (action.type) {
            case 'navData':
                console.log({navData: action.payload})
                return {
                    navData: action.payload
                  }
   
                default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, {navData: {personalise:{ethnicity:[], experience:[], barberLocation:[]}, booking: {bookingLocation:'',bookingDate:[],bookingTime:{time:{hr:null,min:null}, range:0.5}} }})

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}


export const useAppContext = () =>  useContext(AppContext);







// case 'personaliseEthnicity': {
//     return {
//         ...state,
//         userData: {
//             ...state.userData,
//             ethnicity: [action.payload]
//         }
//     };
// }
// case 'personaliseExperience': {
// return {
//     ...state,
//     userData: {
//         ...state.userData,
//         experience: [action.payload]
//     }
// };
// }
// case 'personaliseBarberLocation': {
// return {
//     ...state,
//     userData: {
//         ...state.userData,
//         experience: [action.payload]
//     }
// };
// }
// case 'bookingLocation': {
// return {
//     ...state,
//     booking: {
//         ...state.userData,
//         bookingLocation: action.payload
//     }
// };
// }
// case 'bookingDate': {
// return {
//     ...state,
//     booking: {
//         ...state.userData,
//         bookingDate: [action.payload]
//     }
// };
// }
// case 'bookingTime': {
// return {
//     ...state,
//     booking: {
//         ...state.userData,
//         bookingTime: {
//             ...state,
            
            
//         }
//     }
// };
// }