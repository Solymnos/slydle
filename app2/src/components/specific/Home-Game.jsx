import React , { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import data from '../../data/data_slydle_update.json';
import Game_ArrayHeader from './Game-ArrayHeader';
import Game_ArrayContent from './Game-ArrayContent';
import { setDaily } from '../../context/UserSlice';
import Game_Result from './Game-Result';
import { getScore } from '../../utils/GameLogic';

const GameContainer = styled.div`
    display: flex;
    height: max-content;
    width: 100%;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 10rem;
    padding-right: 10rem;
    padding-top: 2rem;
    gap: 2rem;
`;

const SearchBarContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`

const StyledSelect = styled(Select)`
    flex: 1;
`;

const CompareName = (a, b) =>
{
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '2px solid ' + (state.isSelected ? '#ffdd33' : '#ccc'),
    borderRadius: '8px',
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
    borderRadius:'6px',
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

const GameArray = styled.div`

`;



function Home_Game() 
{
  const [ selectedOption, setSelectedOption ] = useState(null);
  const [ gameItems, setGamesItems ] = useState([]);
  const [ animationTrigger, setAnimationTrigger ] = useState(false);
  const [ selectText , setSelectText ] = useState('Sélectionnez votre guess');
  const [ score , setScore ] = useState(0);
  
  const user = useSelector(state => state.user);
  
  const dispatch = useDispatch();
  
  //TODO:DELETE ANSWER AND GET IT FROM SERVER
  
  const [ answer ] = useState(data[12]);
  
  const options = data
  .filter(item => !gameItems.some(object2 => object2.ID === item.ID))
  .map(item => ({
    value: item.ID,
    label: item.Name
  }));
  options.sort(CompareName);
  
  const handleChange = (selectedOption) =>
  {
      setSelectedOption(selectedOption);
      let choice = data.find(x => x.ID === selectedOption.value);
      setGamesItems([choice, ...gameItems]);
      setAnimationTrigger(!animationTrigger);
      //setAnimationTrigger(!animationTrigger);
      if (choice.ID === answer.ID)
      {
        let date = new Date();
        dispatch(setDaily({didItToday : true, date : date}));
        setSelectText('Revenez demain pour guess à nouveau !');
        if (user.isAuthenticated)
        {
          setScore(getScore({tries : gameItems.length, streak : user.user.streak}));
        } else {
          setScore(getScore({tries : gameItems.length, streak : 2}));
        }
        
      }
      clearOption();
  }
  
  const clearOption = () =>
  {
      setSelectedOption(null);
  }

  return (
    <GameContainer>
      <Game_Result result={answer} isVisible={user.didItToday} tries={gameItems.length} score={score}/>
      <SearchBarContainer>
       <StyledSelect value={selectedOption} isDisabled={user.didItToday} onChange={handleChange} isClearable={true} isSearchable={true} options={options} styles={customStyles} placeholder={selectText}/>
      </SearchBarContainer>
      <GameArray>
       <Game_ArrayHeader />
       <Game_ArrayContent items={gameItems} animationTrigger={animationTrigger} answer={answer}/>
      </GameArray>
    </GameContainer>
  );
}

export default Home_Game