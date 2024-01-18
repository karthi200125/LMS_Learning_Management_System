import './Skeleton.scss'

export default function Skeleton({ type, count }) {

    let COUNTER = count || 1
    const FeedSkeleton = () => (
        <div className='cardsk'>
            <div className="imagesk"></div>
            <div className='contentsk'>
                <div className="h1sk"></div>
                <div className="carddescsk"></div>
                <div className='chaptersk'>
                    <div className="booksiconsk"></div>
                    <div className="chpaterslengthsk"></div>
                </div>
                <div className="progresssk"></div>
            </div>
        </div>
    )    

    if (type === 'card') return Array(COUNTER).fill(<FeedSkeleton />)    
}
