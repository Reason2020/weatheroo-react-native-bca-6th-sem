import React, { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export function useLocation() {
    return useContext(LocationContext);
}

export function LocationProvider({ children }) {
    const [ latitude, setLatitude ] = useState(0);
    const [ longitude, setLongitude ] = useState(0);
    const [ locationTitle, setLocationTitle ] = useState("");

    const updateLocation = (newLatitude, newLongitude, newLocationTitle) => {
        setLatitude(newLatitude);
        setLongitude(newLongitude);
        setLocationTitle(newLocationTitle);
    }

    const value = {
        latitude,
        longitude,
        locationTitle,
        updateLocation,
    }

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    )
}