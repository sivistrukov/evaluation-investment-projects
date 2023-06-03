import './styles/App.css';
import NewInvestmentProject from "./pages/NewInvestmentProject";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import InvestmentProjectsList from "./pages/InvestmentProjectsList";
import InvestmentProjectDetail from "./pages/InvestmentProjectDetail";

function App() {
    return (
        <div className={"App"}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<InvestmentProjectsList/>}/>
                    <Route path={'/:projectName'} element={<InvestmentProjectDetail/>}/>
                    <Route path={'/new-investment-project/'} element={<NewInvestmentProject/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
