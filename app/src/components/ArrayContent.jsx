import React, { useState , useEffect } from 'react';
import styled from 'styled-components';
import PseudoItem from './PseudoItem';
import AgeItem from './AgeItem';
import RoleItem from './RoleItem';
import JeuItem from './JeuItem';
import NationItem from './NationItem';
import LastTeamItem from './LastTeamItem';
import ActualTeamItem from './ActualTeamItem';
import StartYearItem from './StartYearItem';
import EndYearItem from './EndYearItem';

const Line = styled.div `
    display: flex;
    gap: 1.5rem;
    flex-direction: row;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
`

function ArrayContent({items, animationTrigger, answer})
{
    console.log(animationTrigger);
    const [key , setKey] = useState(0);
    
    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [animationTrigger]);
    
    return (
    <div key={key}>
    {
        items.length > 0 && items[0] &&(
            <Line>
                <PseudoItem currentChoice={items[0]} animate={true} />
                <AgeItem currentChoice={items[0]} answer={answer} animate={true}/>
                <RoleItem currentChoice={items[0]} answer={answer} animate={true}/>
                <JeuItem currentChoice={items[0]} answer={answer} animate={true}/>
                <NationItem currentChoice={items[0]} answer={answer} animate={true}/>
                <LastTeamItem currentChoice={items[0]} answer={answer} animate={true}/>
                <ActualTeamItem currentChoice={items[0]} answer={answer} animate={true}/>
                <StartYearItem currentChoice={items[0]} answer={answer} animate={true}/>
                <EndYearItem currentChoice={items[0]} answer={answer} animate={true}/>
            </Line>
        )
    }
    {items.slice(1).map((item, index) => 
    {
    console.log("Item : ", item, " index : " , index);
    return (
            <Line key={index}>
                <PseudoItem currentChoice={item} animate={false} />
                <AgeItem currentChoice={item} answer={answer} animate={false} />
                <RoleItem currentChoice={item} answer={answer} animate={false} />
                <JeuItem currentChoice={item} answer={answer} animate={false} />
                <NationItem currentChoice={item} answer={answer} animate={false} />
                <LastTeamItem currentChoice={item} answer={answer} animate={false} />
                <ActualTeamItem currentChoice={item} answer={answer} animate={false} />
                <StartYearItem currentChoice={item} answer={answer} animate={false} />
                <EndYearItem currentChoice={item} answer={answer} animate={false} />
            </Line>
        )})}        
    </div>
    )
}

export default ArrayContent;