import { useNavigate } from 'react-router-dom'
import './Logo.scss'
import { memo } from 'react'

const Logo = () => {

    const navigate = useNavigate()

    return (
        <div className="logo" onClick={() => navigate('/')}>
            SkillSphere
        </div>
    )
}

export default memo(Logo)