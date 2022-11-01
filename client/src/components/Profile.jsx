import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import { TextField, Button } from "@mui/material";
import { getUser, editUser } from "../services/service";

export default function Profile() {

    const [userData, setUserData] = useState([]);

    const [newUser, setNewUser] = useState({
        userName: '',
        email: ''
    });

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name] : e.target.value});
    }

    const user = JSON.parse(localStorage.getItem('userDetails'));

    useEffect(() => {
        getUser(user._id)
            .then((res) => {
                setUserData(res.data);
            })
            .catch(e => console.log(e));
    }, [userData]);

    const editUserDetails = () => {
        editUser(newUser,user._id);
        // window.location.reload();
    };

    return (
        <>
            <div style={{ margin: '50px' }}>
                <div className="w3-content w3-margin-top" style={{ maxWidth: '1400px' }}>
                    <div className="w3-row-padding">
                        <div className="w3-third">
                            <div className="w3-white w3-text-grey w3-card-4">
                                <div className="w3-display-container">
                                    <Avatar sx={{ width: 100, height: 100, marginLeft: '135px' }} alt="Remy Sharp" src="https://www.w3schools.com/w3images/avatar_hat.jpg" />
                                    <div className="w3-container">
                                        <h2>{userData.name}</h2>
                                    </div>
                                </div>
                                <div className="w3-container">
                                    <p>Email : {userData.email}</p>
                                    <p>Total Movies Watched : 10</p>

                                </div>
                            </div><br />
                        </div>
                        <div className="w3-twothird">
                            <div className="w3-container w3-card w3-white w3-margin-bottom">
                                <h2 className="w3-text-grey w3-padding-16">Edit User</h2>
                                <div className="w3-container">
                                    <TextField onChange={e => handleChange(e)} style={{ marginRight: '10px' }} autoComplete="off" name="userName" size='small' id="outlined-basic" label="username" variant="outlined" />
                                    <TextField onChange={e => handleChange(e)} style={{ marginRight: '10px' }} autoComplete="off" name="email" size='small' id="outlined-basic" label="email" variant="outlined" />
                                    {/* <TextField style={{ marginRight: '10px' }} autoComplete="off" name="imageurl" size='small' id="outlined-basic" label="password" variant="outlined" /> */}
                                    <Button style={{ marginRight: '10px' }} variant="contained">Cancel</Button>
                                    <Button onClick={editUserDetails} variant="outlined">Save</Button>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}