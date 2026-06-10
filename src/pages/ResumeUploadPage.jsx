import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { startInterview }
from "../services/InterviewService";

import LoadingScreen
from "../components/LoadingScreen";

import AppHeader
from "../components/AppHeader";

function ResumeUploadPage() {

    const navigate =
        useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [resume, setResume] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            setLoading(true);

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

                navigate(
                    "/interview"
                );

            } catch (error) {

                console.error(error);

                alert(
                    "Failed to start interview"
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
                    message="Analyzing Resume and Generating Interview Questions..."
                />
            }

            <AppHeader />

            <div className="card p-4">

                <h4 className="mb-4 text-center">
                    Candidate Registration
                </h4>

                <form
                    onSubmit={handleSubmit}>

                    <input
                        className="form-control mb-3"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value)}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Enter Your Email"
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
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Please Wait..."
                                : "Start Interview"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}

export default ResumeUploadPage;