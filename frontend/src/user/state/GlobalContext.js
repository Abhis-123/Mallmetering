import React from 'react'

const GlobalContext = React.createContext({})
export const GlobalContextProvider=GlobalContext.Provider
export const  GlobalContextCosumer= GlobalContext.Consumer
export default GlobalContext;