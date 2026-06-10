import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getResults }
from "../services/InterviewService";

function ManagerDashboard() {

    const navigate =
        useNavigate();

    const [results,
        setResults] =
        useState([]);

    const [searchTerm,
        setSearchTerm] =
        useState("");

    useEffect(() => {

        const token =
            localStorage.getItem(
                "token"
            );

        if (!token) {

            alert(
                "Please Login First"
            );

            navigate("/");

            return;
        }

        loadResults();

    }, []);

    const loadResults =
        async () => {

            try {

                const response =
                    await getResults();

                setResults(
                    response.data
                );

            } catch (error) {

                console.error(
                    error
                );

                alert(
                    "Unable to load interview results"
                );
            }
        };

    const logout = () => {

        localStorage.clear();

        alert(
            "Logged Out Successfully"
        );

        navigate("/");
    };

    // Remove duplicate candidate names

    const uniqueResults =
        Array.from(

            new Map(

                results.map(
                    result => [

                        result.candidateName
                            ?.trim()
                            .toLowerCase(),

                        result
                    ]
                )

            ).values()

        );

    // Search candidate

    const filteredResults =

        searchTerm.trim() === ""

            ? uniqueResults

            : uniqueResults.filter(
                (result) =>

                    result.candidateName
                        ?.trim()
                        .toLowerCase()
                        .includes(
                            searchTerm
                                .trim()
                                .toLowerCase()
                        )
            );

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    Manager Dashboard
                </h2>

                <button
                    className="btn btn-danger"
                    onClick={logout}>

                    Logout

                </button>

            </div>

            <div className="card p-4">

                <h4 className="mb-3">
                    Interview Results
                </h4>

                <div className="row mb-3">

                    <div className="col-md-8">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Candidate Name..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="col-md-4 text-end">

                        <h6 className="mt-2">

                            Showing :

                            {" "}

                            {
                                filteredResults.length
                            }

                            {" "}

                            Candidate(s)

                        </h6>

                    </div>

                </div>

                <table className="table table-bordered table-striped">

                    <thead className="table-dark">

                        <tr>

                            <th>
                                Session ID
                            </th>

                            <th>
                                Candidate Name
                            </th>

                            <th>
                                Skill
                            </th>

                            <th>
                                Final Score
                            </th>

                            <th>
                                Summary
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredResults.length > 0

                                ?

                                filteredResults.map(
                                    (result) => (

                                        <tr
                                            key={
                                                result.sessionId
                                            }>

                                            <td>
                                                {
                                                    result.sessionId
                                                }
                                            </td>

                                            <td>
                                                {
                                                    result.candidateName
                                                }
                                            </td>

                                            <td>
                                                {
                                                    result.skill
                                                }
                                            </td>

                                            <td>
                                                {
                                                    result.finalScore
                                                }
                                            </td>

                                            <td>
                                                {
                                                    result.summary
                                                }
                                            </td>

                                        </tr>
                                    )
                                )

                                :

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center text-danger">

                                        No Candidate Found

                                    </td>

                                </tr>
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ManagerDashboard;