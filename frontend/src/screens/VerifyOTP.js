// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory

// export default function VerifyOTP() {
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const navigate = useNavigate();  // Initialize useNavigate hook

//     const handleOTPSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch("http://localhost:5000/api/verifyotp", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, otp })
//         });

//         const json = await response.json();

//         if (json.success) {
//             alert("Email verified successfully! You can now proceed.");
//             navigate('/login');  // Use navigate instead of history.push
//         } else {
//             alert(json.message || "Error verifying OTP");
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Email OTP Verification</h2>
//             <form onSubmit={handleOTPSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email Address</label>
//                     <input 
//                         type="email" 
//                         className="form-control" 
//                         name="email" 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)} 
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="otp" className="form-label">Enter OTP</label>
//                     <input 
//                         type="text" 
//                         className="form-control" 
//                         name="otp" 
//                         value={otp} 
//                         onChange={(e) => setOtp(e.target.value)} 
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Verify OTP</button>
//             </form>
//         </div>
//     );
// }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory

export default function VerifyOTP() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate hook

    const handleOTPSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/verifyotp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, otp })
        });

        const json = await response.json();

        if (json.success) {
            alert("Email verified successfully! You can now proceed.");
            navigate('/login');  // Use navigate instead of history.push
        } else {
            alert(json.message || "Error verifying OTP");
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="row w-100">
                <div className="col-md-6 col-lg-4 mx-auto">
                    <div className="card shadow-lg p-4 rounded">
                        <h2 className="text-center mb-4">Email OTP Verification</h2>
                        <form onSubmit={handleOTPSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="otp" className="form-label">Enter OTP</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="otp" 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
