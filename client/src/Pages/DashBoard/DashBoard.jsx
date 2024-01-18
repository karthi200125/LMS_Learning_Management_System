import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../MainPageComponents/Button/Button';
import { login } from '../../Redux/AuthSlice';
import handleRequest from '../../Utils/Handlerequest';
import { ImageUplaod } from '../../Utils/UploadImage';
import './DashBoard.scss';
import noprofile from '../../assets/noprofile.png'

const DashBoard = () => {
    const { user } = useSelector((state) => state.auth);
    const [isLoading, setisLoading] = useState(false);
    const [border, setBorder] = useState(false);
    const [name, setName] = useState(user?.username || '');
    const [profileImg, setProfileImg] = useState(user?.profileImg || '');
    const [image, setImage] = useState('');
    const dispatch = useDispatch()

    const token = localStorage.getItem('access_token');

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setisLoading(true)
            const res = await handleRequest({
                url: "/user/update",
                token,
                data: { userId: user?._id, username: name, profileImg: profileImg },
                method: "PUT",
                successmsg: "User Profile Updated successfully"
            });
            dispatch(login(res))
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setisLoading(false)
        }
    };

    const imagesubmit = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
        const url = await ImageUplaod(file)
        setProfileImg(url)
    };


    return (
        <div className="dash">
            <form className="top" >
                <div className="side">
                    <img src={profileImg ? profileImg : noprofile} alt={name} />
                    <input type="file" id="img" style={{ display: 'none' }} onChange={imagesubmit} />
                    <label htmlFor="img" className="change-profile-html">
                        <span>Change Profile</span>
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
