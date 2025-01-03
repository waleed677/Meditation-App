import Router from "./Router";
import { useFonts } from "expo-font";
export default function App() {
  const [fontsLoaded] = useFonts({
    "Sansita-BoldItalic": require("../assets/fonts/Sansita-BoldItalic.ttf"),
    "Sansita-Bold": require("../assets/fonts/Sansita-Bold.ttf"),
  });
  return <Router />;
}
