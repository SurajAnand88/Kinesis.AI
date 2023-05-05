import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./components/Home";
import Post from "./components/Post";
import Login from "./components/Login";
import { QueryClientProvider, QueryClient } from "react-query";
import { extendTheme } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";

function App() {
  const theme = extendTheme({
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
  });
  const Private = ({ children }) => {
    const dispatch = useDispatch();

    const token = localStorage.getItem("kinesis_token") || null;
    if (token) {
      return children;
    } else {
      dispatch({ type: "onOpen" });
      return <Navigate to={"/"} />;
    }
  };
  const client = new QueryClient();
  return (
    <>
      {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}
      <QueryClientProvider client={client}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/post"
                element={
                  <Private>
                    <Post />
                  </Private>
                }
              />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}

export default App;
