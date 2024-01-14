import './DashBoard.scss'
import { useSelector } from 'react-redux'
import { CiImageOn, CiEdit } from "react-icons/ci";
import { useState } from 'react';


const DashBoard = () => {

    const { user } = useSelector(state => state.auth)
    const [name, setName] = useState(user?.username)
    const [border, setBorder] = useState(false)
        
    return (
        <div className='dash'>
            <div className="top">
                <div className="side">
                    <img src={user?.profileImg} alt="" />
                    <input type="file" id='img' style={{ display: "none" }} />
                    <label htmlFor="img" className='chnageprofilehtml'>
                        <span>Chnage Profile</span>
                        <CiImageOn size={25} />
                    </label>
                </div>
                <div className="side">
                    <input type="text" style={{ border: border ? "" : "none", }} value={name} onChange={(e) => setName(e.target.value)} className='nameedit' />
                    <CiEdit size={25} onClick={() => setBorder(!border)} />
                </div>
            </div>
        </div>
    )
}

export default DashBoard