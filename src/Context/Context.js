import { createContext } from "react";
import { useReducer } from "react";

const ThemeContext = createContext();


const initialData = {
    Theme : localStorage.getItem("chTheme") === null ? "Light" : "dark"
    ,
    Name : "Ahmed Safwat"  , 
    Age : "28 Years Old"
}

const reducer = (state , action) => {
    switch (action.type) {
        case "CHANGE_THEME": 
        return {...state , Theme : action.newValue }

        case "CHANGE_NAME" : 
        return {...state , Name : action.newValue}

        case "CHANGE_AGE" : 
        return {...state , Age : action.newValue}
    
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

    const changeName = (newName) => {
        localStorage.setItem("chName" , newName)
        dispatch({ type: "CHANGE_NAME", newValue: newName });
      };

    const changeAge = (newAge) => {
        dispatch({ type : "CHANGE_AGE" , newValue : newAge})
    }
    
  return (
    <ThemeContext.Provider value={{ ...State, toggleTheme , changeName , changeAge }}>
      {children}
    </ThemeContext.Provider>
  );
  }


  export default ThemeContext;
