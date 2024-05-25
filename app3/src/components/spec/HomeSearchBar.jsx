import React , { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { useSelector , useDispatch } from 'react-redux';

import { setDaily, setIsAuthenticated } from '../../context/UserSlice';
import { CompareName , getScore } from '../../utils/GameLogic'
import { updateUserScore } from '../../hooks/Data';

const SearchBarContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    text-align: center;
    margin-top: 2rem;
    padding-left: 10rem;
    padding-right: 10rem;
    @media (max-width: 768px) {
        margin-top: 1rem;
        padding-left: 2rem;
        padding-right: 2rem;
    }
`

const StyledSelect = styled(Select)`
    flex: 1;
    text-align: left;
`;

const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '2px solid ' + (state.isSelected ? '#ffdd33' : '#ccc'),
      boxShadow: 'none',
      backgroundColor: '#282828',
      color : 'white',
      '&:hover': {
        borderColor: '#ffdd33'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: '#282828',
      boxShadow: 'none',
      color: 'white',
      '&:hover': {
        backgroundColor: '#f0f0f0',
        color: '#282828'
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color : 'white',
      boxShadow: 'none',
    }),
    input: (provided) => ({
      ...provided,
      color : 'white',
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#282828',
      "::-webkit-scrollbar": {
          width: "4px",
          height: "0px",
        },
        "::-webkit-scrollbar-track": {
          background: "#282828"
        },
        "::-webkit-scrollbar-thumb": {
          background: "#888"
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#555"
        }
    })
};

const CustomContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    gap: 1rem;
    text-align: center;
    color: white;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: clamp(15px, 2.0vw, 25px);
    
    &:hover {
        color: black;
        background-color: white;
    }
`

const CustomImage = styled.img`
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.25rem;
`

const CustomOption = (props) =>
{
    return (
        <CustomContainer {...props.innerProps}>
            <CustomImage src={props.data.image} alt={props.data.label} />
            {props.data.label}
        </CustomContainer>
    ) 
}

const HomeSearchBar = ({data, gameItems, setGameItems, answer, setScore, setAnimationTrigger, animationTrigger}) => 
{
    const [ selectedOption , setSelectedOption ] = useState('');
    const [ selectText , setSelectText ] = useState('Sélectionnez votre guess');
    const user = useSelector(state => state.user);

    
    const dispatch = useDispatch();
    const options = data
        .filter(item => !gameItems.some(obj => obj.ID === item.ID))
        .map(item => ({
            value: item.ID,
            label: item.Name,
            image : item.PlayerLogo
        }))
        .sort(CompareName);
    
    const handleChange = async (selectedOption) =>
    {
        setSelectedOption(selectedOption);
        
        // OPTION TREATMENT
        let choice = data.find(x => x.ID === selectedOption.value);
        setGameItems([choice, ...gameItems]);
        
        // ANIMATION TRIGGER
        
        setAnimationTrigger(!animationTrigger);
        
        if (choice.ID === answer.ID)
        {
            let score
            
            if (user.isAuthenticated)
            {
                score = getScore({ tries : gameItems.length , streak : user.user.streak });
            } else {
                score = getScore({ tries : gameItems.length, streak : 0 });
            }
            setScore(score);
            // Mettre le score du jour dans le redux ??
            let date = new Date();
            dispatch(setDaily({ didItToday : true, date: date, tries : gameItems.length + 1 }));
            setSelectText('Revenez demain pour guess à nouveau !');
            
            if (user.isAuthenticated)
            {
              let { success, error, response } = await updateUserScore({ score :  score, id : user.user._id.$oid, token : user.token})
              if (success)
              {
                dispatch(setIsAuthenticated({ isAuthenticated  : true, user : response.data.user, token : user.token, rank : response.data.rank }))
              } else {
                console.log(error);
                dispatch(setIsAuthenticated({ isAuthenticated : false, user: null, token : null, rank : null }));
              }
            }
            
        }
        
        setSelectedOption(null);
    }
    
    return (
        <SearchBarContainer>
            <StyledSelect components={{ Option : CustomOption }} onChange={handleChange} value={selectedOption} isDisabled={user.didItToday} isClearable={true} styles={customStyles} options={options} placeholder={selectText}/>
        </SearchBarContainer>
    )
}

export default HomeSearchBar