import React,{useState} from "react";

const Profile=()=>{
    const [fullName, setFullName] = useState("");
    const [profilePhotoURL, setProfilePhotoURL] = useState("");

    const UpdateHandler=async(e)=>{
        e.preventDefault();
        const requestData = {
            fullName: fullName,
            profilePhotoURL: profilePhotoURL,
            
        };

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAPTNI_cnBDpM3UpcM5Z8KjHllp5W3snT0', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            // Handle the response data as needed
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return(
        <>
        <div className="container-fluid px-0">
            <div className="row m-0">
                <div className="col-md-8">
                    <p className="m-0" style={{ fontStyle: "italic" }}>Winners never quit, Quitters never win.</p>
                </div>
                <div className="col-md-3 text-md-right">
                    <p className=" bg-info rounded"  style={{ fontStyle: "italic",backgroundColor:'#778899' }}>
                        Your profile is 64% completed. A complete profile has higher chances of landing a job.
                    </p>
                </div>
            </div>
            <hr className="m-0" />
        </div>
        <div className="container">
                <h3>Contact Details</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="-col-sm-2 col-form-label">Full Name:</label>
                        <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profilePhotoURL" className="form-label">Profile Photo URL:</label>
                        <input type="text" className="form-control" id="profilePhotoURL" value={profilePhotoURL} onChange={(e) => setProfilePhotoURL(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={UpdateHandler}>Update</button>
                </form>
                <hr />
            </div>
        </>
    )
}

export default Profile;