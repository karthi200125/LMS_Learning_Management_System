import { useNavigate } from 'react-router-dom'
import './Logo.scss'

const Logo = () => {

    const navigate = useNavigate()

    return (
        <div className="logo" onClick={() => navigate('/')}>
            SkillSphere
        </div>
    )
}

export default Logo