import { Backdrop, CircularProgress } from '@mui/material';
import React, { createContext,  useContext,  useState } from 'react';

const LoaderContext = createContext({ loading: false });
export const useAppLoaderContext = () => useContext(LoaderContext);

const LoaderBackdrop = {
    color: '#fff',
    zIndex: 1350
}

export const LoaderProvider = ({ children }) => {
    const [loading, startLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ loading, startLoading }} >
            <Backdrop sx={LoaderBackdrop} open={loading}>
                <CircularProgress size={50} color="inherit" />
            </Backdrop>
            {children}
        </LoaderContext.Provider>
    )

}
export default LoaderContext;