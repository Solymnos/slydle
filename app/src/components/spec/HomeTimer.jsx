import React from 'react'
import styled from 'styled-components'
import { useTimer } from 'react-timer-hook'


const TimerContainer = styled.div`
    width: 100%;
    color : white;
    height: auto;
    margin-top: 2rem;
    justify-content: center;
    text-align: center;
    font-size: clamp(15px, 2.5vw, 20px);
    font-weight: bold;
    @media (max-width: 768px) {
        margin-top: 1rem;
    }
    
`

const HomeTimer = () => 
{
    const getTimeLeft = () =>
    {
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        return midnight;   
    }
    
    const { seconds, minutes, hours, restart } = useTimer({
        expiryTimestamp: getTimeLeft(),
        onExpire: () => {
            const newExpiry = getTimeLeft();
            restart(newExpiry);
        }
    });
    
    return (
        <TimerContainer>
           Le nouveau tirage se fera dans : {`${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`}
        </TimerContainer>
    )
}

export default HomeTimer