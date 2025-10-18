import { View } from "react-native";

import PropsStyleImagem from "./components/propsStyle";
import FlatListColumns from "./components/FlatListColumns";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatListColumns />
    </View>
  );
}
