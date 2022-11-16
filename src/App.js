import "./App.css";
import SportsPanel from "./components/SportsPanel";
import TwitterPanel from "./components/TwitterPanel";

function App() {
  return (
    <main className="container">
      <TwitterPanel />
      <SportsPanel />
    </main>
  );
}

export default App;
