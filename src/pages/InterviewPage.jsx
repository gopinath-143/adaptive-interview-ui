import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitAnswer } from "../services/InterviewService";

function InterviewPage() {

    const navigate = useNavigate();

    const [answer, setAnswer] = useState("");

    const [question, setQuestion] = useState(
        localStorage.getItem("currentQuestion") || ""
    );

    const handleSubmit = async () => {

        try {

            const sessionId =
                localStorage.getItem("sessionId");

            const response =
                await submitAnswer({
                    sessionId,
                    answer
                });

            if (response.data.completed) {

                navigate("/completed");

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

            alert("Failed to submit answer");
        }
    };

    return (
        <div className="container mt-5">

            <div className="card p-4">

                <h4>{question}</h4>

                <textarea
                    className="form-control mt-3"
                    rows="5"
                    value={answer}
                    onChange={(e) =>
                        setAnswer(e.target.value)
                    }
                />

                <button
                    className="btn btn-success mt-3"
                    onClick={handleSubmit}
                >
                    Submit Answer
                </button>

            </div>

        </div>
    );
}

export default InterviewPage;