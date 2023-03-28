import { createContext } from 'react';

export const MenuTpContext = createContext("home");
export const YearContext = createContext((new Date()).getFullYear());
export const MonthContext = createContext(0);