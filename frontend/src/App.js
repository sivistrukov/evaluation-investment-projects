import './styles/App.css';
import NewInvestmentProject from "./pages/NewInvestmentProject";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import InvestmentProjectsList from "./pages/InvestmentProjectsList";
import InvestmentProjectDetail from "./pages/InvestmentProjectDetail";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";

function App() {
    return (
        <div className={"App"}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<InvestmentProjectsList/>}/>
                    <Route path={'/:projectName'} element={<InvestmentProjectDetail/>}/>
                    <Route path={'/stats'} element={<Statistics/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/new-investment-project/'} element={<NewInvestmentProject/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
