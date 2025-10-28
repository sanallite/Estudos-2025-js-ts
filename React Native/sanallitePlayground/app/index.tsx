import { View } from "react-native";

import PropsStyleImagem from "./components/PropsStyle";
import FlatListColumns from "./components/FlatListColumns";
import MapTextInputs from "./components/MapTextInputs";
import UIDatePicker from "./components/UIDatePicker";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UIDatePicker />
    </View>
  );
}
