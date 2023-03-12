import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";

import Header from "./Components/header/header";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import TabNavigator from "./Components/navigator";

const queryClient = new QueryClient();

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Header />
          <TabNavigator />
        </div>
      </QueryClientProvider>
    </StyledEngineProvider>
  );
}

export default App;
