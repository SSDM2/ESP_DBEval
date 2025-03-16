import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="227019902757-cucdb2o7vbc7mlbo2iredsamdhm7jjql.apps.googleusercontent.com
">

  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
 </GoogleOAuthProvider> 
);
