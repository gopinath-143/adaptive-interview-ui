import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { startInterview }
from "../services/InterviewService";

function ResumeUploadPage() {


const navigate =
    useNavigate();

const [name, setName] =
    useState("");

const [email, setEmail] =
    useState("");

const [resume, setResume] =
    useState(null);

const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            const formData =
                new FormData();

            formData.append(
                "name",
                name);

            formData.append(
                "email",
                email);

            formData.append(
                "resume",
                resume);

            const response =
                await startInterview(
                    formData);

            localStorage.setItem(
                "sessionId",
                response.data.sessionId
            );

            localStorage.setItem(
                "currentQuestion",
                response.data.question
            );

            navigate("/interview");

        } catch (error) {

            console.error(error);

            alert(
                "Failed to start interview"
            );
        }
    };

return (

    <div className="container mt-5">

        <div className="card p-4">

            <h2>
                AI Interview Platform
            </h2>

            <form
                onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value)}
                />

                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setResume(
                            e.target.files[0])}
                />

                <button
                    className="btn btn-primary">

                    Start Interview

                </button>

            </form>

        </div>

    </div>
);


}

export default ResumeUploadPage;
