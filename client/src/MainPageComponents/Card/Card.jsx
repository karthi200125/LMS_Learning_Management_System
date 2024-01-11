import './Card.scss';
import { IoBookOutline } from "react-icons/io5";


const Card = ({ card }) => {
    return (
        <div className='card'>
            <img src="" alt="" />
            <div className='content'>
                <h1>{card.title}</h1>
                <p>{card.cat}</p>
                <div className='chapter'>
                    <IoBookOutline size={20} className="book" />
                    <span>{card.chapters} Chapters</span>
                </div>
                <div className="progress">
                    progress
                </div>
            </div>
        </div>
    )
}

export default Card