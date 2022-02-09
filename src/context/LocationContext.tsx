import { createContext, useEffect, useReducer } from "react";
// import Axios from "axios";

export type Location = {
  id: number | string;
  title: string;
  type: string;
  description: string;
};
type LocationContextProviderProps = {
  children: React.ReactNode;
};
type InitialStateType = {
  links: Location[];
  selectLinkId: number | string ;
  refresh: boolean;
};
type ActionType =
  | { type: "FIRST_TIME"; payload: Location[] }
  | { type: "DELETE_LINK"; payload: number | string  }
  | { type: "ADD_LINK" }
  | { type: "EDIT_LINK"; payload: Location }
  | { type: "SELECT_ID"; payload: number | string  }

type LocationContextType = {
  state: InitialStateType;
  dispatch: React.Dispatch<ActionType>;
};

const initialState: InitialStateType = {
  links: [],
  selectLinkId: 0,
  refresh: false
};

export const LinkContext = createContext({} as LocationContextType);

export const linkReducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case "FIRST_TIME":
      return { ...state, links: [...action.payload] };

    case "DELETE_LINK":
      return {...state, links: [...state.links.filter((i) => i.id != action.payload)]};

    case "ADD_LINK":
        //در ویدئو گفته شد که آیدی ندهیم، ناچارا باید عملیات فچ را دوباره انجام بدهیم تا بتوانیم از سرور آیدی را دریافت کنیم
      return { ...state, refresh: !state.refresh };

    case "EDIT_LINK":
      return {...state, links: [...state.links.map((i) => i.id === action.payload.id ? {...action.payload } : i)]};

    case "SELECT_ID":
      return { ...state, selectLinkId: action.payload };

    default:
      return state;
  }
};

export const LinkContextProvider: React.FC<LocationContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(linkReducer, initialState);



  return (
    <>
      <LinkContext.Provider value={{ state, dispatch }}>
        {children}
      </LinkContext.Provider>
    </>
  );
};