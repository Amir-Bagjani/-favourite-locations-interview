import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const ERROR_MSG = `لطفا جیسون سرور را به صورت گلوبال بر سیستم نصب کنید سپس در ترمینال دایرکتوری پروژه دستور زیر ر ا وارد کنید
json-server --watch data/db.json --port 3030`;

export type LocationData = {
  id: number | string;
  title: string;
  type: string;
  description: string;
  latitude: number;
  longitude: number;
};
type LocationContextProviderProps = {
  children: React.ReactNode;
};
type InitialStateType = {
  locations: LocationData[];
  isPending: boolean;
  error: null | string;
};
type ActionType =
  | { type: "FIRST_TIME"; payload: LocationData[] }
  | { type: "ADD_LOCATION"; payload: LocationData }
  | { type: "DELETE_LOCATION"; payload: number | string }
  | { type: "EDIT_LOCATION"; payload: LocationData }
  | { type: "IS_PENDING" }
  | { type: "ERROR"; payload: string };

type LocationContextType = {
  state: InitialStateType;
  dispatch: React.Dispatch<ActionType>;
};
const initialState: InitialStateType = {
  locations: [],
  isPending: false,
  error: null,
};

export const LocationContext = createContext({} as LocationContextType);

export const locationReducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case "FIRST_TIME":
      return { error: null, isPending: false, locations: [...action.payload] };

    case "ADD_LOCATION":
      return { ...state, locations: [...state.locations, action.payload] };

    case "DELETE_LOCATION":
      return { ...state, locations: [...state.locations.filter((i) => i.id != action.payload)]};

    case "EDIT_LOCATION":
      return { ...state, locations: [...state.locations.map((i) => i.id === action.payload.id ? { ...action.payload } : i)]};

    case "IS_PENDING":
      return { ...state, isPending: true };

    case "ERROR":
      return { ...state, error: action.payload, isPending: false };

    default:
      return state;
  }
};

export const LocationContextProvider: React.FC<LocationContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  useEffect(() => {

    dispatch({ type: "IS_PENDING" });
    const fetchData = async () => {
      try {
          const res = await axios.get(`http://localhost:3030/locations`, {cancelToken: axios.CancelToken.source().token});
          dispatch({ type: "FIRST_TIME", payload: [...res.data] });
      } catch (err) {
        if (axios.isCancel(err)) {
            console.log(`fetch aborted`);
        } else {
            dispatch({ type: "ERROR", payload: ERROR_MSG });
            alert(ERROR_MSG);
          }
      }
    };

    fetchData();

    return () => axios.CancelToken.source().cancel();
  }, []);

  return (
    <>
      <LocationContext.Provider value={{ state, dispatch }}>
        {children}
      </LocationContext.Provider>
    </>
  );
};
