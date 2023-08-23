import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export function useLocation() {
    return useContext(LocationContext);
}

export function LocationProvider({ children }) {
    const [ latitude, setLatitude ] = useState(0);
    const [ longitude, setLongitude ] = useState(0);

    const updateLocation = (newLatitude, newLongitude) => {
        setLatitude(newLatitude);
        setLongitude(newLongitude);
    }

    const value = {
        latitude,
        longitude,
        updateLocation,
    }

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    )
}