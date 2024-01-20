import { memo, useState } from 'react';
import { IoBookOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Card.scss';
import ProgressBar from '../ProgressBar/ProgressBar';

const Card = ({ card, color, bs, border }) => {
    const [boxShadow, setBoxShadow] = useState(null);
    const { user } = useSelector(state => state.auth)
    const enroll = user?.coursesEnrolled.includes(card?._id)    
    const completeChapters = card?.chapters?.filter((chapter) => user?.ChapterCompleted.includes(chapter));

    return (
        <Link
            className='card'
            to={`/course/${card._id}`}
            state={card}
            style={{ color: color, boxShadow, border: border }}
            onMouseEnter={() => setBoxShadow(bs)}
            onMouseLeave={() => setBoxShadow(null)}
        >
            <img src={card.imageUrl} alt="" loading='lazy' />
            <div className='content'>
                <h1>{card.title}</h1>
                <p className='carddesc'>{card.description}</p>
                <div className='chapter'>
                    <IoBookOutline size={20} className="book" />
                    <span>{card?.chapters?.length} Chapters</span>
                </div>
                {enroll ?
                    <div className="progress">
                        <ProgressBar totalChapters={card?.chapters?.length || 0} completedChapters={completeChapters?.length || 0} />
                    </div>
                    :
                    <h2> ₹ {card?.price} RS</h2>
                }
            </div>
        </Link>
    );
}

export default memo(Card);
