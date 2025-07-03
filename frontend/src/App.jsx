import SideBar from "./components/SideBar.jsx";
import LogInPage from "./pages/LogIn.page.jsx";

function App() {
  console.log("App rendered");
  return (
    <>
      <div className="bg-gray-900">
        <SideBar />
        {/* <LogInPage /> */}
      </div>

    </>
  );
}

export default App;
