import './ProgressBar.scss'

const ProgressBar = ({ totalChapters, completedChapters }) => {

    const progressPercentage = Math.floor((completedChapters / totalChapters) * 100);

    const color = progressPercentage === 100

    return (
        <>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progressPercentage}%`, background: color ? '#208337' : 'blue' }}>

                </div>
            </div>
            <p style={{ color: color ? '#208337' : 'blue' }}>{`${progressPercentage}% Completed`}</p>
        </>
    )
}

export default ProgressBar