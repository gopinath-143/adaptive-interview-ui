import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitAnswer } from "../services/InterviewService";
import LoadingScreen from "../components/LoadingScreen";

function InterviewPage() {

    const navigate = useNavigate();

    const [answer, setAnswer] = useState("");

    const [question, setQuestion] = useState(
        localStorage.getItem("currentQuestion") || ""
    );

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        if (!answer.trim()) {

            alert(
                "Please enter your answer"
            );

            return;
        }

        setLoading(true);

        try {

            const sessionId =
                localStorage.getItem(
                    "sessionId"
                );

            const response =
                await submitAnswer({
                    sessionId,
                    answer
                });

            if (
                response.data.completed
            ) {

                navigate(
                    "/completed"
                );

            } else {

                setQuestion(
                    response.data.nextQuestion
                );

                localStorage.setItem(
                    "currentQuestion",
                    response.data.nextQuestion
                );

                setAnswer("");
            }

        } catch (error) {

            console.error(error);

            alert(
                "Failed to submit answer"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleSkip = async () => {

        setLoading(true);

        try {

            const sessionId =
                localStorage.getItem(
                    "sessionId"
                );

            const response =
                await submitAnswer({
                    sessionId,
                    answer: ""
                });

            if (
                response.data.completed
            ) {

                navigate(
                    "/completed"
                );

            } else {

                setQuestion(
                    response.data.nextQuestion
                );

                localStorage.setItem(
                    "currentQuestion",
                    response.data.nextQuestion
                );

                setAnswer("");
            }

        } catch (error) {

            console.error(error);

            alert(
                "Failed to skip question"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container mt-5">

            {
                loading &&
                <LoadingScreen
                    message="Evaluating Answer and Generating Next Question..."
                />
            }

            <div className="card p-4">

                <h4 className="mb-4">
                    {question}
                </h4>

                <textarea
                    className="form-control mt-3"
                    rows="5"
                    value={answer}
                    onChange={(e) =>
                        setAnswer(
                            e.target.value
                        )
                    }
                    placeholder="Enter your answer here..."
                />

                <div className="mt-3">

                    <button
                        className="btn btn-success me-2"
                        onClick={handleSubmit}
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Please Wait..."
                                : "Submit Answer"
                        }

                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={handleSkip}
                        disabled={loading}
                    >

                        Skip Question

                    </button>

                </div>

            </div>

        </div>
    );
}

export default InterviewPage;