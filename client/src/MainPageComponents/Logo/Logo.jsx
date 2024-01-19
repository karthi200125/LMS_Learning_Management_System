import { useNavigate } from 'react-router-dom'
import './Logo.scss'
import { memo } from 'react'
import logoimg from '../../assets/cap.png'

const Logo = () => {

    const navigate = useNavigate()

    return (
        <div className="logo" onClick={() => navigate('/')}>
            <img src={logoimg} alt="logo" />
            <span>รｋⓘⓁ𝐋Ş𝕡卄єяє</span>
        </div>
    )
}

export default memo(Logo)