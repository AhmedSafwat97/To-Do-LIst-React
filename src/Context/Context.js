import { createContext } from "react";
import { useReducer } from "react";

const ThemeContext = createContext();


const initialData = {
    Theme : localStorage.getItem("chTheme") === null ? "Light" : localStorage.getItem("chTheme") === "Light" ? "Light" : "dark"
}

const reducer = (state , action) => {
    switch (action.type) {
        case "CHANGE_THEME": 
        return {...state , Theme : action.newValue }
        default:
            return state;
    }
};

export function ThemeProvider({ children }) {
    const [State, dispatch] = useReducer(reducer, initialData);
    const toggleTheme = (newTheme) => {
        localStorage.setItem("chTheme" , newTheme)
      dispatch({ type: "CHANGE_THEME", newValue: newTheme });
    };
  return (
    <ThemeContext.Provider value={{ ...State, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
  }


  export default ThemeContext;
