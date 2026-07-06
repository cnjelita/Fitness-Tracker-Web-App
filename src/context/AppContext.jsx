import { createContext, useContext, useReducer } from "react";
import { initialUsers, initialWorkouts } from "../data/initialData";

// ─── State Shape ────────────────────────────────────────────────────────────
const initialState = {
  currentUser: null,
  users: initialUsers,
  workouts: initialWorkouts,
};

// ─── Action Types ────────────────────────────────────────────────────────────
export const ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
  ADD_WORKOUT: "ADD_WORKOUT",
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      const user = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (!user) return state;
      return { ...state, currentUser: user };
    }

    case ACTIONS.LOGOUT:
      return { ...state, currentUser: null };

    case ACTIONS.REGISTER: {
      const newUser = {
        id: state.users.length + 1,
        ...action.payload,
      };
      return {
        ...state,
        users: [...state.users, newUser],
        currentUser: newUser,
      };
    }

    case ACTIONS.ADD_WORKOUT: {
      const newWorkout = {
        id: state.workouts.length + 1,
        userId: state.currentUser.id,
        ...action.payload,
      };
      return {
        ...state,
        workouts: [...state.workouts, newWorkout],
      };
    }

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}
