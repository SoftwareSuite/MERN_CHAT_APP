import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);