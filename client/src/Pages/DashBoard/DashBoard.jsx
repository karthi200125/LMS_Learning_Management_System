import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import Button from '../../MainPageComponents/Button/Button';
import { login } from '../../Redux/AuthSlice';
import useCustomFetch from '../../Utils/CustomFetch';
import useHandleCrud from '../../Utils/HandleCrud';
import { ImageUplaod } from '../../Utils/UploadImage';
import noprofile from '../../assets/noprofile.png';
import './DashBoard.scss';

const DashBoard = () => {
    const { user } = useSelector((state) => state.auth);
    const [border, setBorder] = useState(false);
    const [name, setName] = useState(user?.username || '');
    const [profileImg, setProfileImg] = useState(user?.profileImg || '');
    const [image, setImage] = useState('');

    // update profile data pass
    const { isLoading, fetchData } = useHandleCrud(
        "/user/update",
        "PUT",
        { userId: user?._id, username: name, profileImg: profileImg },
        "User Profile Updated successfully",
        login
    );

    // update profile 
    const handleUpdate = async (e) => {
        e.preventDefault();
        fetchData()
    };

    // image submit
    const imagesubmit = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
        const url = await ImageUplaod(file);
        setProfileImg(url);
    };

    // get all courses
    const { result } = useCustomFetch({
        url: '/course/getallcourses',
    });

    const filteredEnrolledCourses = result.filter((course) => user?.coursesEnrolled.includes(course._id));

    return (
        <div className="dash">
            <form className="top">
                <div className="side">
                    <img src={profileImg ? profileImg : noprofile} alt={name} loading='lazy' />
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
            <div className="enrooledcourses">
                <h1>Your Enrolled Courses</h1>
                <div className="courses">
                    {filteredEnrolledCourses?.length === 0 ?
                        "No courses enrolled"
                        :
                        filteredEnrolledCourses?.map((course) => (
                            <div className="enrollcourse" key={course._id}>
                                <h2>{course.title}</h2>
                                <p> ₹ {course.price} RS</p>
                                <div className="courseprogress">
                                    Progress
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
