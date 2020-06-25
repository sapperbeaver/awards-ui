import React from 'react';
import styled from 'styled-components'
import { TextField, MenuItem } from '@material-ui/core';
import Axios from 'axios';
import {config} from '../config'

const Label = styled.div`

`;


const Wrapper = styled.div`

`;
const ContentContainer = styled.div`

`;
const ButtonComplit = styled.div`

`;

const type_awards = ['test1','test2','test3','test4']
const view_awards = ['test1','test2','test3','test4']
export default class AddAwards extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sort: '',
            type: '',
            year: null
        }
    }
    handleChangeSort = (event) =>{
        const sort = event.target.value;
        this.setState({sort});
    }
    handleChangeType = (event) =>{
        const type = event.target.value;
        this.setState({type});
    }
    handleChangeYear = (event) =>{
        const year = event.target.value;
        this.setState({year})
    }
    
    handleChangeComplit = () =>{
        const id = window.location.pathname.slice(12);
        console.log(this.state)
        Axios.post(`${config.host}/person-info/${id}/rewards/`, JSON.stringify(this.state))

    }

    render(){
        return(
            <Wrapper>
                <ContentContainer>
                    <Label>

                    </Label>
                    <TextField
                            id="standard-select-currency"
                            select
                            label="Select"
                            value={this.state.sort}
                            onChange={this.handleChangeSort}
                            helperText="Пожалуйста выберите вид награды"
                            >
                            {view_awards.map((option) => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                    </TextField>
                    <TextField
                            id="standard-select-currency"
                            select
                            label="Select"
                            value={this.state.type}
                            onChange={this.handleChangeType}
                            helperText="Пожалуйста выберите тип награды"
                            >
                            {type_awards.map((option) => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                    </TextField>
                    <Label>Год получения награды :</Label>
                    <TextField
                            id="standard-password-input"
                            type="number"
                            value={this.state.year}
                            onChange={this.handleChangeYear}
                            />
                            <ButtonComplit onClick = {this.handleChangeComplit}>Сохранить</ButtonComplit>
                </ContentContainer>
                
            </Wrapper>
        )
    }
}