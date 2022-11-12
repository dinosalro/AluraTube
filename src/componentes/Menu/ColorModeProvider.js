import React from "react";

export const ColorModeContext = React.createContext({
  mode: "light",
  setMode: () => {
    alert("você precisa me configurar");
  },
});

const ColorModeProvider = (props) => {
  const [mode, setMode] = React.useState(props.initialMode);
  return (
    <ColorModeContext.Provider value={{ mode: mode, setMode: setMode }}>
      {props.children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
