import { Provider } from "react-redux";
import Router from "./Router";
import { useFonts } from "expo-font";
import { store } from "./store/store";
export default function App() {
  const [fontsLoaded] = useFonts({
    "Sansita-BoldItalic": require("../assets/fonts/Sansita-BoldItalic.ttf"),
    "Sansita-Bold": require("../assets/fonts/Sansita-Bold.ttf"),
  });
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
