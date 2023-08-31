import type { AppProps } from "next/app";
import { wrapper } from "@/redux/store";
import '../app/globals.css'
import Sidebar from "../components/common/Sidebar"
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/app/theme';
import AlertProvider from '@/components/common/AlertService';
function MyApp({ Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={lightTheme}> 
            <AlertProvider />
                <Sidebar>
                    <Component {...pageProps} />
                </Sidebar>
        </ThemeProvider>
    )
}

export default wrapper.withRedux(MyApp); 