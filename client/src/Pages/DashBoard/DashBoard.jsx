import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiImageOn, CiEdit } from 'react-icons/ci';
import noprofile from '../../assets/noProfile.png';
import handleRequest from '../../Utils/Handlerequest';
import Button from '../../MainPageComponents/Button/Button';
import './DashBoard.scss'
import { login } from '../../Redux/AuthSlice'

const DashBoard = () => {
    const { user } = useSelector((state) => state.auth);
    const [name, setName] = useState(user?.username || '');
    const [isLoading, setisLoading] = useState(false);
    const [border, setBorder] = useState(false);
    const [file, setFile] = useState('');
    const [profileImg, setProfileImg] = useState(user?.profileImg || '');
    const dispatch = useDispatch()

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        try {
            setisLoading(true)
            const res = await handleRequest({
                url: "/user/update",
                token,
                data: { userId: user?._id, username: name, profileImg },
                method: "PUT",
                successmsg: "User Profile Updated successfully"
            });
            dispatch(login(res.data))
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setisLoading(false)
        }
    };

    const handleFileChange = (e) => {

    };

    return (
        <div className="dash">
            <form className="top" >
                <div className="side">
                    <img src={profileImg || noprofile} alt="Profile" />
                    <input type="file" id="img" style={{ display: 'none' }} onChange={handleFileChange} />
                    <label htmlFor="img" className="change-profile-html">
                        <span>Change Profile</span>
                        <CiImageOn size={25} />
                    </label>
                </div>
                <div className="side">
                    <input
                        type="text"
                        style={{ border: border ? '' : 'none' }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="name-edit"
                    />
                    <CiEdit size={25} onClick={() => setBorder(!border)} />
                </div>
                <Button title="Update" glow={false} onClick={handleUpdate} isLoading={isLoading} />
            </form>
        </div>
    );
};

export default DashBoard;
