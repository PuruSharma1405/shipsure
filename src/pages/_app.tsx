import type { AppProps } from "next/app";
import { wrapper } from "@/redux/store";
import '../app/globals.css'
import Sidebar from "../components/common/Sidebar"
function MyApp({ Component, pageProps}: AppProps) {
    return (
            <Sidebar> <Component {...pageProps} /></Sidebar>
    )
}

export default wrapper.withRedux(MyApp); 