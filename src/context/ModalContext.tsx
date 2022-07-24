import React from 'react';

interface ConnectUpModalContextInterface {
    showConnectUpModal: boolean;
    setShowConnectUpModal: any;
}

export const ConnectUpModalContext = React.createContext<ConnectUpModalContextInterface>(
    {
        showConnectUpModal: false,
        setShowConnectUpModal: () => {},
    }   
);

export const ConnectUpModalContextProvider = ({children}:any) => {
    const [showConnectUpModal, setShowConnectUpModal] = React.useState<boolean>(false);
    return (
        <ConnectUpModalContext.Provider 
            value={{
                showConnectUpModal:showConnectUpModal,
                setShowConnectUpModal:setShowConnectUpModal,
                }}>
            {children}
        </ConnectUpModalContext.Provider>
    );
}