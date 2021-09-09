import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    Primary: "#845EC2",
    Secondary: "#FF6F91",
    Highlight: "#00C9A7",
    Warning: "#FFC75F",
    Danger: "#C34A36",
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});