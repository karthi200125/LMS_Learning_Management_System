import './ProfileItem.scss'

const ProfileItem = ({ title, onclick }) => {

    console.log(title)
    
    return (
        <div className='profileitem' onClick={onclick}>
            <span>{title}</span>
        </div>
    )
}

export default ProfileItem