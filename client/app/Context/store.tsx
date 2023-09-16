"use client"

import { createContext, useContext, useReducer, useState } from 'react'

type BookingTime = {
    time: {
        hr: number | null;
        min: number | null;
    };
    range: number;
};

type UpdatedData = {
    navData: {
        personalise: {
            ethnicity: string[];
            experience: string[];
            barberLocation: string[];
        };
        booking: {
            bookingLocation: string;
            bookingDate: string[];
            bookingTime: BookingTime;
        };
    },
    googleLoaded: boolean
};

interface NavDataAction {
    type:'navData';
    payload: UpdatedData['navData'];
}

interface GoogleAction {
    type:'google';
    payload: boolean;
}

const initialState: UpdatedData = {
    navData: {
        personalise: {
            ethnicity: [],
            experience: [],
            barberLocation: []
        },
        booking: {
            bookingLocation: '',
            bookingDate: [],
            bookingTime: {
                time: {
                    hr: null,
                    min: null
                },
                range: 0.5
            }
        }
    },
    googleLoaded: false
};

const AppContext = createContext<{state:UpdatedData; dispatch: React.Dispatch<NavDataAction | GoogleAction>}>( 
{
    state: initialState,
    dispatch: ()=>{},
}
);

export const AppContextProvider = ({ children } : {children: React.ReactNode}) => {
    function reducer(state : UpdatedData, action: NavDataAction | GoogleAction  ):UpdatedData{
        switch (action.type) {
            case 'navData':
                return {
                    ...state, navData: action.payload
                }
            case 'google':
                console.log('google')
                return {
                    ...state, googleLoaded: action.payload
                }
                
            default:
            return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)


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