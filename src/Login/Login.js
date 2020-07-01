import React from "react";
import { withRouter, Redirect } from "react-router";
import { FormControl, TextField } from "@material-ui/core";
import Axios from "axios";
import { config } from "../config";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import {StoreContext} from '../StoreContext';
const Wrapper = styled.div`
  background: white;
  padding: 100px 40px 60px 40px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ButtonLogin = styled.div`
  cursor: pointer;
  width: 281px;
  border: 1px solid #3350b8;
  border-radius: 7px;
  background: #3350b8;
  height: 80px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
const ButtonLoginText = styled.div`
  font-size: 26px;
  font-weight: 700;
`;
const MyFormControl = styled(FormControl)`
  display: flex;

  .MuiFormControl-root {
    margin-bottom: 40px;
  }
`;
const MyTextField = styled(TextField)`
  width: 100%;
  label.Mui-focused {
    font-size: 25px;
    margin-left: 0 !important;
    margin-top: 0 !important;
  }
  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    margin-left: 0;
    margin-top: 0;
  }
  .MuiInputBase-root {
    font-size: 25px;
  }
  .MuiOutlinedInput-root {
    height: 80px;
    fieldset {
      font-size: 25px;
    }
    &:hover fieldset {
      font-size: 25px;
    }
    &.Mui-focused fieldset {
      font-size: 25px;
    }
  }
  .MuiSelect-iconOutlined {
    font-size: 25px;
  }
  .MuiFormLabel-root {
    font-size: 25px;
    margin-left: 16px;
    margin-top: 3px;
  }
`;
const GlobalStyle = createGlobalStyle`
    body{
        justify-content: center;
        display:flex;
         background: #3f51b5; 
    }
`;
class Login extends React.Component {
  static contextType = StoreContext;
  constructor(props, ctx) {
    super(props, ctx);
    console.log(this.context)
    this.state = {
      login: "",
      password: "",
      isRedirect: false,
    };
  }
  handleChangeLogin(event) {
    let { login } = this.state;
    login = event.target.value;
    this.setState({ login });
  }
  handleChangePassword(event) {
    let { password } = this.state;
    password = event.target.value;
    this.setState({ password });
  }
  handleClick() {
    let { login, password } = this.state;
    const data = {
      username: login,
      password: password,
    };
    console.log(data);
    Axios.post(`${config.host}/login/`, JSON.stringify(data))
      .then((response) => {
        if (response.data.token !== undefined) {
          const token = response.data.token;
          const permission = response.data.permission;
          console.log(this.context);
          this.context.token = token;
          this.context.permission = permission;
          console.log(typeof(this.context.permission))
           this.setState({ isRedirect: true });
        } else {
          console.log(response.data.status);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    // if (localStorage.getItem('token')) return <Redirect to ='/filter'/>

    return (
        <>
        {this.state.isRedirect && <Redirect to="/filter" />}
        <Wrapper>
          <GlobalStyle />
          <MyFormControl>
            <MyTextField
              id="outlined-basic"
              label="Логин"
              value={this.state.login}
              variant="outlined"
              className="MuiFormLabel-root"
              color="white"
              onChange={this.handleChangeLogin.bind(this)}
            />
          </MyFormControl>
          <MyFormControl>
            <MyTextField
              id="outlined-basic"
              label="Пароль"
		type="password"
              value={this.state.password}
              variant="outlined"
              className="MuiFormLabel-root"
              color="white"
              onChange={this.handleChangePassword.bind(this)}
            />
          </MyFormControl>
          <ButtonLogin onClick={this.handleClick.bind(this)}>
            <ButtonLoginText>Вход</ButtonLoginText>
          </ButtonLogin>
        </Wrapper>
        </>
    );
  }
}
export default withRouter(Login);
