import { useAppContext } from "../context/AppContext";
import Dashboard from "./Dashboard";
import Landing from "./Landing";

export default function Home() {
  const { state } = useAppContext();
  return state.currentUser ? <Dashboard /> : <Landing />;
}
