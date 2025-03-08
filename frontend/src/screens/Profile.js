import React, { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {

            const response = await fetch("http://localhost:5000/api/MyProfile", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),  
                }),
            });
            const data = await response.json();
            setUser(data.mydata);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    if (!user) {
        return <div className="text-center mt-5">Loading...</div>;
    }
    console.log(user    )
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-dark text-white shadow-lg p-4 rounded">
                        <div className="card-body text-center">
                            <h2 className="card-title mb-3">User Profile</h2>
                            <hr className="bg-light" />
                            <p className="fs-5"><strong>Name:</strong> {user.name}</p>
                            <p className="fs-5"><strong>Email:</strong> {user.email}</p>
                            <p className="fs-5"><strong>Location:</strong> {user.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
