import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ExtraContext = createContext();

export const ExtraContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [score, setScore]= useState(null)

    return (
        <ExtraContext.Provider value={{
            score, setScore
        }}>
            {children}
        </ExtraContext.Provider>
    )
}