import { Text, View } from "react-native";

import PropsStyleImagem from "./components/propsStyle";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <PropsStyleImagem />
    </View>
  );
}
