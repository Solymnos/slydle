//eslint-disable

import React, { useState , useEffect } from 'react';
import styled from 'styled-components';
import ArrayContent_PseudoItem from './ArrayContent-PseudoItem';
import ArrayContent_AgeItem from './ArrayContent-AgeItem';
import ArrayContent_RoleItem from './ArrayContent-RoleItem';
import ArrayContent_JeuItem from './ArrayContent-JeuItem';
import ArrayContent_NationItem from './ArrayContent-NationItem';
import ArrayContent_LastTeamItem from './ArrayContent-LastTeamItem';
import ArrayContent_ActualTeamItem from './ArrayContent-ActualTeamItem';
import ArrayContent_StartYearItem from './ArrayContent-StartYearItem';
import ArrayContent_EndYearItem from './ArrayContent-EndYearItem';

const Line = styled.div `
    display: flex;
    gap: 1.5rem;
    flex-direction: row;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
`

function Game_ArrayContent({items, animationTrigger, answer})
{
    const [key , setKey] = useState(0);
    
    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [animationTrigger]);
    
    return (
    <div key={key}>
    {
        items.length > 0 && items[0] &&(
            <Line>
                <ArrayContent_PseudoItem currentChoice={items[0]} animate={true} />
                <ArrayContent_AgeItem currentChoice={items[0]} answer={answer} animate={true}/>
                <ArrayContent_RoleItem currentChoice={items[0]} answer={answer} animate={true}/>
                <ArrayContent_JeuItem currentChoice={items[0]} answer={answer} animate={true}/>
                <ArrayContent_NationItem currentChoice={items[0]} answer={answer} animate={true}/>
                <ArrayContent_LastTeamItem currentChoice={items[0]} answer={answer} animate={true}/>
                <ArrayContent_ActualTeamItem currentChoice={items[0]} answer={answer} animate={true}/>
                <ArrayContent_StartYearItem currentChoice={items[0]} answer={answer} animate={true}/>
                <ArrayContent_EndYearItem currentChoice={items[0]} answer={answer} animate={true}/>
            </Line>
        )
    }
    {items.slice(1).map((item, index) => 
    {
    return (
            <Line key={index}>
                <ArrayContent_PseudoItem currentChoice={item} animate={false} />
                <ArrayContent_AgeItem currentChoice={item} answer={answer} animate={false} />
                <ArrayContent_RoleItem currentChoice={item} answer={answer} animate={false} />
                <ArrayContent_JeuItem currentChoice={item} answer={answer} animate={false} />
                <ArrayContent_NationItem currentChoice={item} answer={answer} animate={false} />
                <ArrayContent_LastTeamItem currentChoice={item} answer={answer} animate={false} />
                <ArrayContent_ActualTeamItem currentChoice={item} answer={answer} animate={false} />
                <ArrayContent_StartYearItem currentChoice={item} answer={answer} animate={false} />
                <ArrayContent_EndYearItem currentChoice={item} answer={answer} animate={false} />
            </Line>
        )})}        
    </div>
    )
}

export default Game_ArrayContent;