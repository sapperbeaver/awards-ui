import React from 'react'
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
import {withRouter} from 'react-router';

const Loader = styled.div`
width: 100%;
height: 400px;
background: blue;
`;
const ButtonContainer = styled.div`

`;
const ButtonBack = styled.div`

`;
const ButtonAddAward = styled.div`

`;

const ButtonReport = styled.div`

`;
const ButtonDelete = styled.div`

`;
const IconDelete = styled.i`
color: red;
font-size: 15px;
`;

const IconReport = styled.i`

`;

const IconAward = styled.i`

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

class Awards extends React.Component {
    constructor(props){
        super(props)
        console.log(props);
        this.state = {
            data: null,
            loading: true
        }
        
    }
    
    async getAwards(id) {
      const response = await Axios.get(`${config.host}/person-info/${id}/`);
      const { data } = response;
      return data;
    }
    async componentDidMount() {
        const personId = this.props.match.params.id
        const data = await this.getAwards(personId);
        this.setState({ data: this.dataAwards(data), loading: false });
      }
    dataAwards(data) {
      return data.rewards.map(rew => ({...data, ...rew}));
    }
    handleClickAddAwards = () => {
      window.location.assign(`/awards/add/${this.props.match.params.id}`)    }
    handleClickDeleteAward = (id) => {
      console.log(this.state.data)
      Axios.delete(`${config.host}/person-info/${this.props.match.params.id}/rewards/${id}`)
    }
    render(){
        if (this.state.loading) return <Loader />;
        return(
            <Wrapper>
            <ButtonContainer>
                <ButtonBack onClick = {this.handleClickBack}><IconContainer><i className="icon-arrow"/></IconContainer>Вернуться к фильтрам</ButtonBack>
                <ButtonReport><IconContainer><IconReport className="icon-report"/></IconContainer>Отчёт</ButtonReport>
                <ButtonAddAward onClick = {this.handleClickAddAwards}><IconContainer><IconAward className="icon-addreward"/></IconContainer>Добавить награду</ButtonAddAward>
            </ButtonContainer>
            <GlobalStyle />
            <TableContainer component={Paper} className="table">
              <Table aria-label="simple table">
                <TableHead className="head">
                  <TableRow>
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
                    <TableRow key={row.id} className="row">
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
                      <TableCell>
                        <ButtonDelete onClick = {()=>this.handleClickDeleteAward(row.id)}><IconDelete className="icon-delete"/>
                        </ButtonDelete></TableCell>
                      </TableRow>
                    
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Wrapper>
        )
    }
}
export default withRouter(Awards);