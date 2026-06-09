import { useNavigate }
from "react-router-dom";

function CompletionPage() {

    const navigate =
        useNavigate();

    const openDashboard = () => {

        navigate(
            "/candidate-dashboard"
        );
    };

    return (

        <div className="container mt-5">

            <div className="card p-5 text-center">

                <h2>
                    Interview Completed
                </h2>

                <h4>
                    Thank You
                </h4>

               

            </div>

        </div>
    );
}

export default CompletionPage;