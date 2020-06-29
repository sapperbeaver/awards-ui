import React from "react";
import styled from "styled-components";
import { TextField, MenuItem } from "@material-ui/core";
import Axios from "axios";
import { config } from "../config";
import { Redirect } from "react-router";

const Label = styled.div`
  margin-top: 6px;
  margin-right: 5px;
  font-size: 25px;
  font-weight: 700;
`;

const Wrapper = styled.div`
  background: white;
  padding-top: 55px;
  width: 30%;
  height: 300px;
  margin-top: 160px;
  margin-left: 95px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const ContentContainer = styled.div`
    color: #676a6c;
`;
const IconContainer = styled.div`
  margin-right: 8px;
  margin-left: -5px;
  margin-top: -2px;
`;
const IconContainerBack = styled.div`
  margin-right: 8px;
  margin-left: -5px;
`;
const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: -37px;
  left: -1px;
  color: white;
  font-weight: 700;
`;
const ButtonBack = styled.div`
    cursor: pointer;
    display: flex;
    background: #3f51b5;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding: 8px 54px 5px 15px;
    font-size: 19px;
`;
const ButtonComplit = styled.div`
    cursor: pointer;
    display: flex;
    background: #5fc77a;
    margin-left: 20px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding: 8px 54px 1px 15px;
    font-size: 19px;
`;
const SelectConteiner = styled.div`
  display: flex;
  margin-bottom: 40px;
`;
const IconSave = styled.i`
font-size: 25px;
`;
const YearConteiner = styled.div`
margin-left: 120px;
  display: flex;
`;
const MyTextField = styled(TextField)`
  margin-bottom: 5px;
  width: 150px;
`;
const InputFile = styled.input`
margin-top: 40px;
`;

const type_awards = ["test1", "test2", "test3", "test4"];
const view_awards = ["test1", "test2", "test3", "test4"];
export default class AddAwards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        sort: "",
        type: "",
        year: null,
        document: null,
      },
      redirect: null,
    };
  }
  handleChangeSort = (event) => {
    const { data } = this.state;
    data.sort = event.target.value;
    this.setState({ data });
  };
  handleChangeType = (event) => {
    const { data } = this.state;
    data.type = event.target.value;
    this.setState({ data });
  };
  handleChangeYear = (event) => {
    const { data } = this.state;
    data.year = event.target.value;
    this.setState({ data });
  };
  handleClickBack = () => {
    this.setState({ redirect: `/awards/${this.props.match.params.id}` });
  };

  async handleChangeComplit() {
    let data = new FormData();
    data.append("sort", this.state.data.sort);
    data.append("type", this.state.data.type);
    data.append("year", this.state.data.year);
    data.append("image", this.state.data.document);
    await Axios.post(
      `${config.host}/person-info/${this.props.match.params.id}/rewards/`,
      data
    );
    await this.setState({ redirect: `/awards/${this.props.match.params.id}` });
  }
  handleChangeFile(event) {
    const { data } = this.state;

    data.document = event.target.files[0];
    this.setState({ data });
  }

  render() {
    return (
      <Wrapper>
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <ButtonContainer>
          <ButtonBack onClick={this.handleClickBack}>
            <IconContainerBack>
              <i className="icon-arrow" />
            </IconContainerBack>
            Вернуться к фильтрам
          </ButtonBack>
          <ButtonComplit onClick={this.handleChangeComplit.bind(this)}>
          <IconContainer><IconSave className="icon-save"/></IconContainer>
            Сохранить
          </ButtonComplit>
        </ButtonContainer>
        <ContentContainer>
          <SelectConteiner>
            <Label>Тип награды:</Label>
            <MyTextField
              variant="outlined"
              id="standard-select-currency"
              select
              value={this.state.sort}
              onChange={this.handleChangeSort}
              size="small"
            >
              {view_awards.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </MyTextField>
          </SelectConteiner>
          <SelectConteiner>
            <Label>Вид награды:</Label>
            <MyTextField
              variant="outlined"
              id="standard-select-currency"
              select
              value={this.state.type}
              onChange={this.handleChangeType}
              size="small"
            >
              {type_awards.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </MyTextField>
          </SelectConteiner>
          <YearConteiner>
            <Label>Год:</Label>
            <MyTextField
              variant="outlined"
              id="standard-password-input"
              type="number"
              value={this.state.year}
              onChange={this.handleChangeYear}
              size="small"
            />
          </YearConteiner>
          <InputFile type="file" onChange={this.handleChangeFile.bind(this)} />
        </ContentContainer>
      </Wrapper>
    );
  }
}
