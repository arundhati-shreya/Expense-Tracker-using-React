import React, { useEffect, useRef } from "react";

const Profile = () => {
    const fullnameInputRef = useRef();
    const photourlInputRef = useRef();

    useEffect(()=>{
        const fetchUserDetails = async () => {
            const idToken = localStorage.getItem("token");
            try {
              const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAPTNI_cnBDpM3UpcM5Z8KjHllp5W3snT0`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ idToken }),
                }
              );
              const data = await response.json();
              if (data.users && data.users.length > 0) {
                const user = data.users[0];
                fullnameInputRef.current.value = user.displayName || "";
                photourlInputRef.current.value = user.photoUrl || "";
              }
            } catch (err) {
              console.log(err);
            }
            // setLoading(false);
          };
      
          fetchUserDetails();
        }, []);
   

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const enteredFullName = fullnameInputRef.current.value;
            const enteredPhotoURL = photourlInputRef.current.value;
            const idToken = localStorage.getItem("token");
            const obj = {
                idToken: idToken,
                displayName: enteredFullName,
                photoUrl: enteredPhotoURL,
                deleteAttribute: [],
                returnSecureToken: false,
            };

            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAPTNI_cnBDpM3UpcM5Z8KjHllp5W3snT0",
                {
                    body: JSON.stringify(obj),
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            console.log("data", data);
            alert("successfully updated the user details");

            fullnameInputRef.current.value = "";
            photourlInputRef.current.value = "";

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="container-fluid px-0">
                <div className="row m-0">
                    <div className="col-md-8">
                        <p className="m-0" style={{ fontStyle: "italic" }}>Winners never quit, Quitters never win.</p>
                    </div>
                    <div className="col-md-3 text-md-right">
                        <p className=" bg-info rounded" style={{ fontStyle: "italic", backgroundColor: '#778899' }}>
                            Your profile is 64% completed. A complete profile has higher chances of landing a job.
                        </p>
                    </div>
                </div>
                <hr className="m-0" />
            </div>
            <div className="container">
                <h3>Contact Details</h3>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="-col-sm-2 col-form-label">Full Name:</label>
                        <input type="text" className="form-control" id="fullName" ref={fullnameInputRef} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="profilePhotoURL" className="form-label">Profile Photo URL:</label>
                        <input type="text" className="form-control" id="profilePhotoURL" ref={photourlInputRef} />
                    </div>
                    <button type="submit" className="btn btn-primary" >Update</button>
                </form>
                <hr />
            </div>
        </>
    )
}

export default Profile;