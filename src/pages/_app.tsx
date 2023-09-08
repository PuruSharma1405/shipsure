import type { AppProps } from "next/app";
import { store, persistor } from "@/redux/store";
import '../app/globals.css'
import Sidebar from "../components/common/Sidebar"
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/app/theme';
import AlertProvider from '@/components/common/AlertService';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps}: AppProps) {
    return (
        <Provider store={store}> 
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={lightTheme}> 
                    <AlertProvider />
                        <Sidebar>
                            <Component {...pageProps} />
                        </Sidebar>
                <ToastContainer />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    )
}

export default MyApp;
