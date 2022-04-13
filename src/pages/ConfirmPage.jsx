import {
    useParams
} from "react-router-dom";
import { useState, useEffect } from "react";

export default function ConfirmPage() {
    const params = useParams();
    const [message, setMessage] = useState("Please Wait");
    const token = params.token;
    useEffect(() => {
        fetch("http://localhost:5000/api/User/confirm/" + token, {method:"POST"})
        .then(result => result.json())
        .then(result => {
            if (result.success) {
                setMessage("Your email is confirmed");
            } else {
                setMessage("Something is wrong");
            }
        })
        .catch(error => {
            setMessage("Another thing is wrong");
        });
    }, [])
    
    return <h2>{message}</h2>;
}