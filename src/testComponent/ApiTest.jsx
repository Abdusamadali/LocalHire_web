import { useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

function ApiTest() {

    useEffect(() => {
        axiosInstance.get("/jobs")
            .then(response => {
                console.log("Backend connected:", response.data);
            })
            .catch(error => {
                console.error("API error:", error);
            });
    }, []);

    return <h2>Testing backend connection</h2>;
}

export default ApiTest;