import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "remote-redux-devtools";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import Reducers, { RootState } from "./src/store/store";

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};

// if (__DEV__) {
//   console.log("I am in debug");
// }

// const composeEnhancers = composeWithDevTools({
//   realtime: true,
//   port: 8000,
//   //hostname: "172.30.31.97",
//   hostname: "192.168.0.10", //add your computer's IP
// });

const persistedReducer = persistReducer<any, any>(persistConfig, Reducers);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
  //composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export default { store, persistor };
