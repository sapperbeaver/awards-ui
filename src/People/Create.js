import React from "react";
import styled from "styled-components";
import Axios from "axios";
import { config } from "../config";
import ItemAdd from "./ItemAdd";
import {createGlobalStyle} from "styled-components";

const ButtonContainer = styled.div`
display: flex;
position: absolute;
top: -41px;
left: 0;
color: white;
font-weight: 800;
`;
const IconContainer = styled.div`
margin-left: -5px;
margin-right: 5px;
`;
const ButtonBack = styled.div`
display: flex;
background: #3f51b5;
border-top-right-radius: 5px;
border-top-left-radius: 5px;
padding: 8px 25px 5px 15px;
font-size: 19px;
`;
const ButtonComplit = styled.div`
display: flex;
background: #5fc77a;
margin-left: 20px;
border-top-right-radius: 5px;
border-top-left-radius: 5px;
padding: 8px 25px 0 15px;
font-size: 19px;
`;
const FullContentConteiner = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`;
const TitleConteiner = styled.div`
  font-size: 23px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
.name {
    border: 0;
    border-bottom: 1px solid;
    }
`;
const ContentConteir = styled.div`
display: flex;
`;
const Wrapper = styled.div`
  background: white;
  margin-left: 90px;
  margin-top: 156px;
  position: relative;
  padding: 20px;
  padding-top: 10px;
  padding-left: 67px;
  width: 67%;
  display: flex;
`;
const Error = styled.div`
  color: red;
  font-weight: 650;
`;
const InputErrorConteiner = styled.div``;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0.0;
`;
const TextContainer = styled.div`
    margin-left: 150px;
    display: flex;
    flex-direction: column;
    flex-basis: 1px;
    flex-grow: 0.85; 
    margin-top: -11px;
    font-weight: 600px;
    font-size: 22px;
`;
const InputTitle = styled.input`
  width: 800px;
  height: 30px;
  font-size: 35px;
  font-weight: 700;
  padding-bottom: 10px;
  color: #676a6c;
  :focus{
    outline: none;
  }
`;
const Input = styled.input`
width: 450px;
  border: none;
  border-bottom: 1px solid purple;
  height: 22px;
  margin-top: 4px;
  :focus{
    outline: none;
  }

`

const IconSave = styled.i`
font-size: 24px;
`;
const InputConteiner = styled.div`
  margin-top: 15px;
  margin-bottom: 5px;
  display: block;
  color: #676a6c;
`;
const Label = styled.div`
`;
const GlobalStyle = createGlobalStyle`
    body{
         background: #eeeeee; 
    }
    color: #676a6c;
`;
// const awards= ['диплом','кожанный мяч']
export class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: { text: "Фамилия Имя Отчество", error: false },
      job: { text: "", error: false },
      municipal_district: { text: "", error: false },
      position: { text: "", error: false },
      union_instructions: { text: "", error: false },
      date_birthday: { text: "", error: false },
      date_APK: { text: "", error: false },
      date_union: { text: "", error: false },
      telephone: { text: "", error: false },
      email: { text: "", error: false },
      image: undefined,
    };
  }

  handleChangeDA = (event) => {
    const date_APK = {
      text: event.target.value,
      error: false,
    };
    this.setState({ date_APK });
  };
  handleChangeDB = (event) => {
    const date_birthday = {
      text: event.target.value,
      error: false,
    };
    this.setState({ date_birthday });
  };
  handleChangeDU = (event) => {
    const date_union = {
      text: event.target.value,
      error: false,
    };
    this.setState({ date_union });
  };
  handleChangeEmail = (event) => {
    const email = {
      text: event.target.value,
      error: false,
    };
    this.setState({ email });
  };
  handleChangeTelephone = (event) => {
    const telephone = {
      text: event.target.value,
      error: false,
    };
    this.setState({ telephone });
  };
  handleChangeName = (event) => {
    const name = {
      text: event.target.value,
      error: false,
    };
    this.setState({ name });
  };

  handleChangeMD = (event) => {
    const municipal_district = {
      text: event.target.value,
      error: false,
    };
    this.setState({ municipal_district });
  };

  handleChangeJob = (event) => {
    const job = {
      text: event.target.value,
      error: false,
    };
    this.setState({ job });
  };

  handleChangePosition = (event) => {
    const position = {
      text: event.target.value,
      error: false,
    };
    this.setState({ position });
  };

  handleChangeUI = (event) => {
    const union_instructions = {
      text: event.target.value,
      error: false,
    };
    this.setState({ union_instructions });
  };
  validation = () => {
    const {
      name,
      job,
      municipal_district,
      position,
      union_instructions,
      date_birthday,
      date_APK,
      date_union,
      telephone,
      email,
    } = this.state;
    return (
      !name.error &&
      !job.error &&
      !municipal_district.error &&
      !position.error &&
      !union_instructions.error &&
      !date_birthday.error &&
      !date_union.error &&
      !date_APK.error &&
      !telephone.error &&
      !email.error
    );
  };
  validationError = () => {
    if (!this.state.name.text) {
      const { name } = this.state;
      name.error = true;
      this.setState({ name });
    }
    // if(!this.state.job.text){
    //   this.state.job.error = true;
    // }
    // if(!this.state.municipal_district.text){
    //   this.state.municipal_district.error = true;
    // }
    // if(!this.state.position.text){
    //   this.state.position.error = true;
    // }
    // if(!this.state.union_instructions.text){
    //   this.state.union_instructions.error = true;
    // }
  };
  get params() {
    const {
      name,
      job,
      municipal_district,
      position,
      union_instructions,
      date_birthday,
      date_APK,
      date_union,
      telephone,
      email,
    } = this.state;
    return {
      name: name.text,
      job: job.text,
      municipal_district: municipal_district.text,
      position: position.text,
      union_instructions: union_instructions.text,
      date_birthday: date_birthday.text,
      date_APK: date_APK.text,
      date_union: date_union.text,
      telephone: telephone.text,
      email: email.text,
    };
  }

  setImage = (image) => {
    this.setState({ image });
  };
  handleClickBack = () => {
    window.location.assign('/filter');
  }
  handleClick = () => {
    this.validationError();
    console.log(this.validation())
    if (this.validation()) {
      let data = new FormData();
      data.append("name", this.params.name);
      data.append("job", this.params.job);
      data.append("municipal_district", this.params.municipal_district);
      data.append("position", this.params.position);
      data.append("union_instructions", this.params.union_instructions);
      data.append("date_birthday", this.params.date_birthday);
      data.append("date_APK", this.params.date_APK);
      data.append("date_union", this.params.date_union);
      data.append("telephone", this.params.telephone);
      data.append("email", this.params.email);
      data.append("image", this.state.image);
      console.log(this.params);
      console.log(data);
      Axios.post(`${config.host}/person-info/create/`, data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        window.location.assign('/filter')
    }
  };
  FocusClear = () => {
    const {name} = this.state;
    name.text = '';
    this.setState({name});
  }
  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <ButtonContainer>
          <ButtonBack onClick={this.handleClickBack}><IconContainer><i className="icon-arrow"/></IconContainer>Вернуться к списку</ButtonBack>
          <ButtonComplit onClick={this.handleClick}><IconContainer><IconSave className="icon-save"/></IconContainer>Сохранить</ButtonComplit>
    </ButtonContainer>
        <FullContentConteiner>
        <TitleConteiner>
          <InputConteiner>
            <InputErrorConteiner>
              <InputTitle 
                type="text"
                className="name"
                value={this.state.name.text}
                onFocus={this.FocusClear}
                onChange={this.handleChangeName}
              />
              {this.state.name.error && (
                <Error>Поле не может быть пустым</Error>
              )}</InputErrorConteiner>
              </InputConteiner>
              </TitleConteiner>
        <ContentConteir>
        <ImageContainer>
          <ItemAdd setImage={this.setImage} />
        </ImageContainer>
        <TextContainer>
          <InputConteiner>
            <Label>Дата рождения:</Label>
            <Input
              value={this.state.date_birthday.text}
              onChange={this.handleChangeDB}
            />
          </InputConteiner>
          <InputConteiner>
            <Label>Муниципальный район:</Label>
            <Input
              value={this.state.municipal_district.text}
              onChange={this.handleChangeMD}
            />
          </InputConteiner>
          <InputConteiner>
            <Label>Место работы:</Label>
            <Input
              value={this.state.job.text}
              onChange={this.handleChangeJob}
            />
          </InputConteiner>
          <InputConteiner>
            <Label>Должность основная:</Label> 
            <Input
              value={this.state.position.text}
              onChange={this.handleChangePosition}
            />
          </InputConteiner>
          <InputConteiner>
            <Label>Дата начала работы в отрасли APK:</Label>
            <Input
              value={this.state.date_APK.text}
              onChange={this.handleChangeDA}
            />
          </InputConteiner>
          <InputConteiner>
            <Label>Дата вступления в профсоюз:</Label>
            <Input
              value={this.state.date_union.text}
              onChange={this.handleChangeDU}
            />
          </InputConteiner>
          <InputConteiner>
            <Label>Номер телефона:</Label>
            <Input
              value={this.state.telephone.text}
              onChange={this.handleChangeTelephone}
            />
          </InputConteiner>
          <InputConteiner>
            <Label>Профсоюзное поручение:</Label>
            <Input
              value={this.state.union_instructions.text}
              onChange={this.handleChangeUI}
            />
          </InputConteiner>
          <InputConteiner>
            <Label>Email:</Label>
            <Input
              value={this.state.email.text}
              onChange={this.handleChangeEmail}
            />
          </InputConteiner>
          </TextContainer>
        </ContentConteir>
        </FullContentConteiner>
      </Wrapper>
    );
  }
}
