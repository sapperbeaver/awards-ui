import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Axios from 'axios';
import {Link} from 'react-router-dom'
import { config } from "../config";
import {createGlobalStyle} from 'styled-components'
import qs from 'qs'

const ButtonContainer = styled.div`

`;
const ButtonBack = styled.div`

`;

const ButtonReport = styled.div`

`;

const IconReport = styled.i`

`;

const IconContainer = styled.div`

`;

const Wrapper = styled.div`
  .table{
    width: auto;
    margin-left: 95px;
    margin-right: 81px; 
    margin-top: 160px;
    border-radius: 7px;
  }
  .cell {
    border-right: 1px solid black;
  }
  .body {
    .row {
      &:nth-child(2n) {
        background: #cfd6fe;
      }
    }
  }
  .head {
    border-top: 1px solid black;
    background: #3f51b5;
    border-radius: 12px;
    .headRow{
      height: 80px;
    }
    .cell {
      color: white;
      font-weight: 600;
    }
  }
`;
const GlobalStyle = createGlobalStyle`
    body{
         background: #eeeeee; 
    }
`;
// const MyTableContainer = styled(TableContainer)`
//     .MuiTableContainer-root{
//       width: auto;
//     }
//     margin-left: 95px;
//     margin-right: 81px;   
// `;



export default class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
  async getUsers(postData) {
    const response = await Axios.post(`${config.host}/get/`, postData);
    const { data } = response;
    console.log('qwe', data);
    return data;
  }
  dataAwards(list) {
    const res = []
    console.log(list)
    list.forEach(el => {
      res.push(...el.rewards.map(rew => ({...rew, ...el, unique_key: Math.random()})));
      if(el.rewards.length === 0) {
        res.push({...el, unique_key: Math.random()})
      }
    })
    return res;
  }

  async componentDidMount(){
    const hrefData = window.location.href.split('?')
    const postData = qs.parse(hrefData[1])
    this.setState({data: this.dataAwards(await this.getUsers(postData))});
    
  }
  handleClickBack = () => {
    window.location.assign('/Filter');
  }

  render() {
    console.log(this.state.data)
    return (
        <Wrapper>
          <ButtonContainer>
              <ButtonBack onClick = {this.handleClickBack}><IconContainer><i className="icon-arrow"/></IconContainer>Вернуться к фильтрам</ButtonBack>
              <ButtonReport><IconContainer><IconReport className="icon-report"/></IconContainer>Отчёт</ButtonReport>
          </ButtonContainer>
          <GlobalStyle />
          <TableContainer component={Paper} className="table">
            <Table aria-label="simple table">
              <TableHead className="head">
                <TableRow className="headRow">
                  <TableCell className="cell" align="left">
                    Фио
                  </TableCell>
                  <TableCell className="cell" align="left">
                    Место проживания
                  </TableCell>
                  <TableCell className="cell" align="left">
                    Место работы
                  </TableCell>
                  <TableCell className="cell" align="left">
                    Должность
                  </TableCell>
                  <TableCell className="cell" align="left">
                    Вид награды
                  </TableCell>
                  <TableCell className="cell" align="left">
                    Тип награды
                  </TableCell>
                  <TableCell className="cell" align="left">
                    Год
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="body">
                {this.state.data.map((row) => (
                  <TableRow key={row.unique_key} className="row">
                    <TableCell className="cell" align="left">
                      <Link to={"/people/info/" + row.id}>{row.name}</Link>
                    </TableCell>
                    <TableCell className="cell" align="left">
                      {row.municipal_district}
                    </TableCell>
                    <TableCell className="cell" align="left">
                      {row.job}
                    </TableCell>
                    <TableCell className="cell" align="left">
                      {row.position}
                    </TableCell>
                    <TableCell className="cell" align="left">
                      {row.sort}
                    </TableCell>
                    <TableCell className="cell" align="left">
                      {row.type}
                    </TableCell>
                    <TableCell className="cell" align="left">
                      {row.year}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Wrapper>
    );
  }
}