import React, { createContext, useContext, useState } from 'react';

const TimezoneContext = createContext();

export const useTimezone = () => useContext(TimezoneContext);

export const TimezoneProvider = ({ children }) => {
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
};
