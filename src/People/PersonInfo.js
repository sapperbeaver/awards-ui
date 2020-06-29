import Axios from "axios";
import React from "react";
import { config } from "../config";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import { withRouter, Redirect } from "react-router";


const IconContainer = styled.div`
margin-left: -5px;
margin-right: 8px;
margin-top: -4px;
`;

const IconContainerBack = styled.div`
margin-left: -5px;
margin-right: 8px;
`;
const ButtonContainer = styled.div`
/* display: flex;     
position: absolute;
top: -32px;
left: 0;
color: white;
font-weight: 600; */
display: flex;
position: absolute;
top: -34px;
left: 0;
color: white;
font-weight: 700;
`;
const ButtonBack = styled.div`
cursor: pointer;
display: flex;
background: #3f51b5;
border-top-right-radius: 5px;
border-top-left-radius: 5px;
padding: 8px 30px 5px 15px;
font-size: 19px;
`;
const ButtonEdit = styled.div`
cursor: pointer;
display: flex;
background: #3f51b5;
margin-left: 20px;
border-top-right-radius: 5px;
border-top-left-radius: 5px;
padding: 8px 30px 0 15px;
font-size: 19px;
`;
const ButtonDelete = styled.div`
cursor: pointer;
display: flex;
background: #b53f3f;
margin-left: 20px;
border-top-right-radius: 5px;
border-top-left-radius: 5px;
padding: 8px 30px 0 15px;
font-size: 19px;
`;
const TitleConteiner = styled.div`
font-size: 23px;
margin-bottom: 15px;
padding-bottom: 10px;
.name {
    display: inline;
    border-bottom: 1px solid;
    }
`;
const ContentConteiner = styled.div`
display: flex;
`;
const TitleTextConteiner = styled.div`
display: flex;
flex-direction: column;
`;
const PhotoConteiner = styled.div`
border: 1px solid white;
border-radius: 3px;
width: 320px;
overflow: hidden;
display: flex;
height: 450px;
`;
const TextConteiner = styled.div`
margin-left: 23px;
`;
const IconAwards = styled.i`
  font-size: 15px;
`;
const IconAwardsContainer = styled.div`
    transform: rotate(180deg);
    position: absolute;
    left: 155px;
    bottom: -9px;
`;
const AwardConteiner = styled.div`
    min-width: 250px;
  cursor: pointer;
    background: #3f51b5;
    width: 15.9%;
    margin: -20px -20px -20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const AwardText = styled.div`

margin-top: 26px;
margin-left: 14px;
color: #fee396;
font-size: 30px;
font-weight: 800;
position: relative;
`;
const TitleTextAwardConteiner = styled.div`
display: flex;
justify-content: space-between;
`;
const Photo = styled.img`
width: 100%;
`;
const EmptyPhoto = styled.div`
width: 100%;
`;
const Wrapper = styled.div`
background: white;
margin-left: 95px; 
padding: 20px;
padding-left: 65px;
width: 77%;
display: flex;
flex-direction: column;
position: relative;
margin-top: 100px;
`;
const Span = styled.span`
color: #676a6c;
font-size: 25px;
font-weight: 800;
`;
const TextSpan = styled.span`
font-size: 20px;
margin-left: 15px;
color: #676a6c;
`;
// const Button = styled.button``;
const Loader = styled.div`
width: 100%;
height: 400px;
background: blue;
`;
const InputConteiner = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 15px;
  font-size: 20px;
`;
const TitleLabel = styled.div`
     padding-bottom: 7px;
     font-size: 30px;
    font-weight: 800;
    color: #676a6c;
`;
const Label = styled.div`

`;
const IconEdit = styled.i`
font-size: 25px;
`;
const IconDelete = styled.i`
font-size: 25px;
`;
const BigAwardIconConteiner = styled.div`
  justify-content: center;
  display: flex;
  margin-bottom: -4px;
`;
const BigAwardIcon = styled.i`
font-size: 185px;
color: #fee396;
`;

const GlobalStyle = createGlobalStyle`
    body{
         background: #eeeeee; 
    }
`;



class PersonInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      redirect: null,
    };
  }
  handleClickDelete = () =>{
    
    const result = window.confirm(`Вы действительно хотите удалить ${this.state.data.name}?`)
    if(result){
      Axios.delete(`${config.host}/person-info/${this.props.match.params.id}/`);
      this.setState({redirect: '/table'});
    }
  }
  handleClickAward = () => {
    const path = window.location.pathname.slice(13)
    console.log(path)
    this.setState({redirect: '/awards/' + path});

  }
  onClick = () => {
    this.setState({redirect: '/table'});
  }
  handleClickEdit = () => {
    this.setState({redirect: `/people/info/edit/${this.props.match.params.id}`});
  }
  async componentDidMount() {
    const response = await Axios.get(
`${config.host}/person-info/${this.props.match.params.id}/`
    );

    this.setState({ data: response.data, loading: false });
  }
  render() {
    console.log(this.state.data)
    if (this.state.loading) return <Loader />;
         const { photo } = this.state.data;
         const image = photo !== 'no photo' ? <Photo src={config.image + photo} /> : <EmptyPhoto/>;
    return (
        
    
    <Wrapper>
      {this.state.redirect && <Redirect to={this.state.redirect}/>}
      <GlobalStyle />
    <ButtonContainer>
    <ButtonBack onClick = {this.onClick}><IconContainerBack><i className="icon-arrow"/></IconContainerBack>Вернуться к списку</ButtonBack>
      {localStorage.getItem('permission') === 'true' && <ButtonEdit onClick = {this.handleClickEdit}><IconContainer><IconEdit className="icon-edit"/></IconContainer>Редактировать</ButtonEdit>}
        {localStorage.getItem('permission') === 'true' && <ButtonDelete onClick = {this.handleClickDelete}><IconContainer><IconDelete className="icon-delete"/></IconContainer>Удалить</ButtonDelete>}
    </ButtonContainer>
    <TitleTextAwardConteiner>
          <TitleTextConteiner>
          <TitleConteiner>
            <TitleLabel className="name">{this.state.data.name}</TitleLabel>
          </TitleConteiner>
        <ContentConteiner>
          <PhotoConteiner>{image}</PhotoConteiner>
          <TextConteiner>
          <InputConteiner>
              <Label>
                <Span>Дата рождения:</Span><TextSpan>{this.state.data.date_birthday}</TextSpan>
              </Label>
            </InputConteiner>
            <InputConteiner>
              <Label>
                <Span>Муниципальный район:</Span><TextSpan>{this.state.data.municipal_district}</TextSpan>
              </Label>
            </InputConteiner>
            <InputConteiner>
              <Label>
                <Span>Место работы:</Span><TextSpan>{this.state.data.job}</TextSpan>
              </Label>
            </InputConteiner>
            <InputConteiner>
              <Label>
                <Span>Должность основная:</Span>
                <TextSpan>{this.state.data.position}</TextSpan>
              </Label>
            </InputConteiner>
            <InputConteiner>
              <Label>
                <Span>Профсоюзное поручение:</Span><TextSpan>{this.state.data.union_instructions}</TextSpan>
              </Label>
            </InputConteiner>
            <InputConteiner>
              <Label>
                <Span>Стаж работы в отрасли АПК:</Span><TextSpan>{this.state.data.date_APK}</TextSpan>
              </Label>
            </InputConteiner>
            <InputConteiner>
              <Label>
                <Span>Профсоюзный стаж:</Span>
                <TextSpan>{this.state.data.date_union}</TextSpan>
              </Label>
            </InputConteiner>
            <InputConteiner>
              <Label>
                <Span>Контактный телефон:</Span><TextSpan>{this.state.data.telephon}</TextSpan>
              </Label>
            </InputConteiner>
            <InputConteiner>
              <Label>
                <Span>Email:</Span><TextSpan>{this.state.data.email}</TextSpan>
              </Label>
            </InputConteiner>
          </TextConteiner>
         </ContentConteiner>
         </TitleTextConteiner>
         <AwardConteiner onClick = {this.handleClickAward}>
           <AwardText>
             Посмотреть Награды <IconAwardsContainer><IconAwards className="icon-arrow" /></IconAwardsContainer>
           </AwardText>
           <BigAwardIconConteiner>
              <BigAwardIcon className="icon-reward"/>
           </BigAwardIconConteiner>
          </AwardConteiner>
      </TitleTextAwardConteiner>
      </Wrapper>
    );
  }
}
export default withRouter(PersonInfo);