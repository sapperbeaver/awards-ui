import React from "react";
import { Filter } from "./Filter";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Button, Grid } from '@material-ui/core'
import qs from 'qs'
import assert from 'assert'

const newInputs = {
    name: '',
    municipal_district: '',
    type_awards: [],
    view_awards: [],
    year: []
};
const Wrapper = styled.div`
height: 100vh;
position: relative;
display: flex;
justify-content: space-between;
flex-direction: column;

`;
const AddButtonContainer = styled.div`
display: flex;
justify-content: center;
margin-top: -10px;
`;
const ButtonsContainer = styled.div`
margin: 0 auto;
`;

const SearchButton =styled.div`
display: flex;
  justify-content: center;
  background: #ffe294;
  font-size: 40px;
  align-items: center;
  color: black;
  border: 1px solid #ffe294;
  border-radius: 10px;
  width: 265px;
  height: 80px;
  margin-bottom: 35px;
`;
const AddPeopleButton = styled.div`
display: flex;
  justify-content: center;
  background: white;
  color: #3451b4;
  align-items: center;
  font-size: 30px;
  border: 1px solid white;
  border-radius: 10px;
  width: 265px;
  height: 80px;
  margin-bottom: 25px;
`;
const AddFilterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background: #516ac2;
  color: white;
  border: 1px solid white;
  border-radius: 3px;
  width: 150px;
  height: 35px;
`;
const FltWrapper = styled.div`
margin-top: 50px;
`;
const IconAddPeople = styled.i`
font-size: 40px;
`;
const GlobalStyle = createGlobalStyle`
    body{
         background: #3f51b5; 
    }
    .MuiMenu-paper {
  top: 150px !important;
}
`;

export class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [{...newInputs}],
    };
  }

  handleClickSearch = () => {
    console.log(this.state.filters)
    const path = qs.stringify(this.state.filters)
    console.log(path)
    window.location.assign('/Table?' + path);
    
  }
  handleAddClick = () => {
    if (this.state.filters.length < 5) {
      this.state.filters.push({...newInputs})
      this.setState({ filters: this.state.filters });
    }
  };
  handleChangeField = (index,text,field) => {
    const { filters } = this.state;
    filters[index][field] = text;
    this.setState({filters});
    console.log(text)
  }
  handleDelete = (index) => {  
      const filters = this.state.filters.filter((element,currentIndex) => currentIndex !== index )
      this.setState({filters})
  };

  handleClickCreate(){
    window.location.assign('/People/Create');
  }

  render() {
    const count = this.state.filters.length
    const flt = this.state.filters.map((filter,index) => <Filter filter={filter} key={index} onDelete={this.handleDelete} index={index} count={count} onChange={this.handleChangeField}/>);
    return (
      <Wrapper>
        <GlobalStyle />
        <FltWrapper>
          {flt}
          <AddButtonContainer>
          {count < 5 &&<AddFilterButton onClick={this.handleAddClick}>
               <i className="icon-addfilter" />
            </AddFilterButton>}
          </AddButtonContainer>
        </FltWrapper>
        <ButtonsContainer>
          <SearchButton onClick={this.handleClickSearch}>Найти</SearchButton>
          <AddPeopleButton onClick={this.handleClickCreate}>
            <IconAddPeople className="icon-addpeople" /> Добавить
          </AddPeopleButton>
        </ButtonsContainer>
      </Wrapper>
    );
  }
}
