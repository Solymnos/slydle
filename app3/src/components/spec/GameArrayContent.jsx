import React , { useState , useEffect } from 'react'
import styled from 'styled-components';

import ArrayContentPseudoItem from './ArrayContentPseudoItem';
import ArrayContentAgeItem from './ArrayContentAgeItem';
import ArrayContentRoleItem from './ArrayContentRoleItem';
import ArrayContentActualTeamItem from './ArrayContentActualTeamItem';
import ArrayContentJeuItem from './ArrayContentJeuItem';
import ArrayContentNationItem from './ArrayContentNationItem';
import ArrayContentLastTeamItem from './ArrayContentLastTeamItem';
import ArrayContentStartYearItem from './ArrayContentStartYearItem';
import ArrayContentEndYearItem from './ArrayContentEndYearItem';

const Line = styled.div`
    display : flex;
    gap : 1.5rem;
    flex-direction: row;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    white-space: normal;
    font-size: clamp(12px, 1.0vw, 18px);
`

const GameArrayContent = ({items, animationTrigger, answer}) => {
  
    const [ key , setKey ] = useState(0);
    
    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [animationTrigger]);
    
    return (
        <div key={key}>
        {
            items.length > 0 && items[0] && (
                <Line>
                    <ArrayContentPseudoItem currentChoice={items[0]} animate={true} />
                    <ArrayContentAgeItem currentChoice={items[0]} answer={answer} animate={true}/>
                    <ArrayContentRoleItem currentChoice={items[0]} answer={answer} animate={true}/>
                    <ArrayContentJeuItem currentChoice={items[0]} answer={answer} animate={true}/>
                    <ArrayContentNationItem currentChoice={items[0]} answer={answer} animate={true}/>
                    <ArrayContentLastTeamItem currentChoice={items[0]} answer={answer} animate={true}/>
                    <ArrayContentActualTeamItem currentChoice={items[0]} answer={answer} animate={true}/>
                    <ArrayContentStartYearItem currentChoice={items[0]} answer={answer} animate={true}/>
                    <ArrayContentEndYearItem currentChoice={items[0]} answer={answer} animate={true}/>
                </Line>
            )
        }
        {items.slice(1).map((item, index) => 
        {
        return (
                <Line key={index}>
                    <ArrayContentPseudoItem currentChoice={item} animate={false} />
                    <ArrayContentAgeItem currentChoice={item} answer={answer} animate={false} />
                    <ArrayContentRoleItem currentChoice={item} answer={answer} animate={false} />
                    <ArrayContentJeuItem currentChoice={item} answer={answer} animate={false} />
                    <ArrayContentNationItem currentChoice={item} answer={answer} animate={false} />
                    <ArrayContentLastTeamItem currentChoice={item} answer={answer} animate={false} />
                    <ArrayContentActualTeamItem currentChoice={item} answer={answer} animate={false} />
                    <ArrayContentStartYearItem currentChoice={item} answer={answer} animate={false} />
                    <ArrayContentEndYearItem currentChoice={item} answer={answer} animate={false} />
                </Line>
            )})}
            </div>
        )
}

export default GameArrayContent