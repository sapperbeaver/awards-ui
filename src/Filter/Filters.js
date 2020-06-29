import React from "react";
import { Filter } from "./Filter";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import qs from 'qs'
import { Redirect } from "react-router";

const newInputs = {
    name: undefined,
    municipal_district: undefined,
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
const ButtonExit = styled.div`
  cursor: pointer;
  display:flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: white;
  width: 100px;
  height: 35px;
  border: 1px solid #b53f3f;
  border-bottom-left-radius: 5px;
  background: #b53f3f;  
  right: 0;
  font-weight: 500;
  font-size: 18px;
`;
const IconExit = styled.i`

`;
const SearchButton = styled.div`
  
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
cursor: pointer;
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
cursor: pointer;
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
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      filters: [{...newInputs}],
      redirect: null,
    };
  }

  handleClickSearch = () => {
    console.log(this.state.filters)
    const path = qs.stringify(this.state.filters)
    this.setState({redirect: '/table?' + path});
  }
  handleAddClick = () => {
    if (this.state.filters.length < 5) {
      this.state.filters.push({...newInputs})
      this.setState({ filters: this.state.filters });
    }
  };
  handleChangeField = (index,text,field) => {
    const { filters } = this.state;
    if(field === 'year'){
      const yearArray = text.split('-')
      filters[index][field] = yearArray
      console.log(`sdsd`,yearArray)
      this.setState({filters});
    } else{
    filters[index][field] = text;
    this.setState({filters});
    console.log(text)
  }
  }
  handleDelete = (index) => {  
      const filters = this.state.filters.filter((element,currentIndex) => currentIndex !== index )
      this.setState({filters})
  };
  handleClickExit = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('permission')
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('permission'))
    this.setState({redirect: '/login'})
  }
  handleClickCreate = () => {
    this.setState({redirect: '/people/create'})
  }

  render() {
    const permission = localStorage.getItem('permission')

    console.log(typeof(permission))
    const count = this.state.filters.length
    const flt = this.state.filters.map((filter,index) => <Filter filter={filter} key={index} onDelete={this.handleDelete} index={index} count={count} onChange={this.handleChangeField}/>);
    return (
      <Wrapper>
        {this.state.redirect && <Redirect to={this.state.redirect}/>}
        <GlobalStyle />
        <FltWrapper>
          {flt}
          <AddButtonContainer>
          {count < 5 && <AddFilterButton onClick={this.handleAddClick}>
               <i className="icon-addfilter" />
            </AddFilterButton>}
          </AddButtonContainer>
        </FltWrapper>
        <ButtonsContainer>
          <SearchButton onClick={this.handleClickSearch}>Найти</SearchButton>
          {permission === 'true' && (<AddPeopleButton onClick={this.handleClickCreate}>
            <IconAddPeople className="icon-addpeople" /> Добавить
          </AddPeopleButton>)}
        </ButtonsContainer>
        <ButtonExit onClick = {this.handleClickExit}>
          Выход
        </ButtonExit>
      </Wrapper>
    );
  }
}
