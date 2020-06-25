import React from 'react'
import { withRouter, Redirect } from 'react-router'
import {FormControl, TextField } from '@material-ui/core'
import Axios from 'axios';
import { config } from '../config';
import styled from 'styled-components'
import {createGlobalStyle} from 'styled-components'

const Wrapper = styled.div`
    background: white;
    width: 30%;
    height: 560px;
    margin-left: 675px;
    margin-top: 220px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const ButtonLogin = styled.div`
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
  
  .MuiFormControl-root{
      margin-bottom: 40px;
  }
`;
const MyTextField = styled(TextField)`
    width: 430px;
    label.Mui-focused {
    
    font-size: 25px;
    margin-left: 0 !important;
    margin-top: 0 !important;
  }
    .MuiInputLabel-outlined.MuiInputLabel-shrink{
    margin-left: 0;
    margin-top: 0;
  }
    .MuiInputBase-root {
    font-size: 25px;
  }
    .MuiOutlinedInput-root{
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
  .MuiSelect-iconOutlined{
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
         background: #3f51b5; 
    }
`;
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            login: '',
            password: ''
        }
    }
    handleChangeLogin = (event) => {
       let {login} = this.state
       login = event.target.value
      this.setState({ login });
    };
    handleChangePassword = (event) => {
        let {password} = this.state
        password = event.target.value
       this.setState({ password });
     };
    handleClick = () => {
        let {token, login, password} = this.state
        const data = {
            username: login,
            password: password
        }
        console.log(data)
        Axios.post(`${config.host}/login/`,JSON.stringify(data))
        .then(function (response) {
            if(response.data.token !== undefined){
            token = response.data.token;
            localStorage.setItem('token', token)
            }
            else{
                console.log(response.data.status)
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    render(){
        // if (localStorage.getItem('token')) return <Redirect to ='/filter'/> 

        return(
            <Wrapper>
                <GlobalStyle/>
                <MyFormControl>
                  <MyTextField
                    id="outlined-basic"
                    label="Логин"
                    value={this.state.login}
                    variant="outlined"
                    className="MuiFormLabel-root"
                    color="white"
                    onChange={this.handleChangeLogin}
                  />
                </MyFormControl>
                <MyFormControl>
                  <MyTextField
                    id="outlined-basic"
                    label="Пароль"
                    value={this.state.password}
                    variant="outlined"
                    className="MuiFormLabel-root"
                    color="white"
                    onChange={this.handleChangePassword}
                  />
                </MyFormControl>
                <ButtonLogin onClick = {this.handleClick}>
                    <ButtonLoginText>Вход</ButtonLoginText>
                </ButtonLogin>
            </Wrapper>
        )
    }
}
export default withRouter(Login);