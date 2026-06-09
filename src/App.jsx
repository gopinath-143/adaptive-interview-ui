import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import InterviewPage from "./pages/InterviewPage";
import CompletionPage from "./pages/CompletionPage";
import ManagerDashboard from "./pages/ManagerDashboard";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<LoginPage />}
            />

            <Route
                path="/upload"
                element={<ResumeUploadPage />}
            />

            <Route
                path="/interview"
                element={<InterviewPage />}
            />

            <Route
                path="/completed"
                element={<CompletionPage />}
            />

            

            <Route
                path="/manager-dashboard"
                element={<ManagerDashboard />}
            />

        </Routes>

    );
}

export default App;