import React , { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import data from '../data/data_slydle_update.json';
import ArrayHeader from './ArrayHeader';
import ArrayContent from './ArrayContent';

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



function Game() 
{
  const [ selectedOption, setSelectedOption ] = useState(null);
  const [ gameItems, setGamesItems ] = useState([]);
  const [ animationTrigger, setAnimationTrigger ] = useState(false);
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
      console.log(data);
      console.log(choice);
      
      setGamesItems([choice, ...gameItems]);
      setAnimationTrigger(!animationTrigger);
      setAnimationTrigger(!animationTrigger);
      console.log(gameItems);
      
      clearOption();
  }
  
  const clearOption = () =>
  {
      setSelectedOption(null);
  }

  return (
    <GameContainer>
      <SearchBarContainer>
       <StyledSelect value={selectedOption} onChange={handleChange} isClearable={true} isSearchable={true} options={options} styles={customStyles} placeholder="Sélectionnez votre guess"/>
      </SearchBarContainer>
      <GameArray>
       <ArrayHeader />
       <ArrayContent items={gameItems} animationTrigger={animationTrigger} answer={answer}/>
      </GameArray>
    </GameContainer>
  );
}

export default Game