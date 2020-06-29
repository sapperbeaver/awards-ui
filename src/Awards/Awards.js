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
import {withRouter, Redirect} from 'react-router';

const Loader = styled.div`
width: 100%;
height: 400px;
background: blue;
`;
const ButtonContainer = styled.div`
display: flex;
position: absolute;
top: 60px;
left: 95px;
color: white;
font-weight: 700;
`;
const ButtonBack = styled.div`
cursor: pointer;
display: flex;
background: #3f51b5;
border-radius: 5px;
padding: 6px 30px 1px 15px;
font-size: 19px;
`;
const ButtonAddAward = styled.div`
cursor: pointer;
display: flex;
background: #3f51b5;
border-radius: 5px;
padding: 6px 30px 5px 15px;
font-size: 19px;
margin-left: 25px;
`;

const ButtonReport = styled.div`
cursor: pointer;
display: flex;
background: #3f51b5;
border-radius: 5px;
padding: 6px 30px 5px 15px;
font-size: 19px;
margin-left: 25px;
`;
const ButtonDelete = styled.div`
margin-bottom: 30px;
cursor: pointer;
`;
const IconDelete = styled.i`
color: #b53f3f;
font-size: 18px;
`;

const IconReport = styled.i`

`;

const IconAward = styled.i`

`;

const IconContainer = styled.div`
    margin-right: 8px;
    margin-left: -5px;
`;
const DeleteConteiner = styled.div`
position: absolute;
    right: 55px;
    top: 235px;
`;
const MyTableRow = styled(TableRow)`
cursor: pointer;
  :hover{
    background: #a7b1ec !important;
    color: white !important;
  }
`;
const Wrapper = styled.div`
width: 100%;
position: relative;
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
    #root{
      width: 100%;
    }
`;

class Awards extends React.Component {
    constructor(props){
        super(props)
        console.log(props);
        this.state = {
            data: null,
            loading: true,
            redirect: null
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
      console.log('ssdsd', data)
      return data.rewards.map(rew => ({...data, ...rew}));
    }
    handleClickBack = () => {
      this.setState({redirect: `/people/info/${this.props.match.params.id}`})
    }
    handleClickAddAwards = () => {
      this.setState({redirect: `/awards/add/${this.props.match.params.id}`})
    }
    handleClickDeleteAward(id){
      Axios.delete(`${config.host}/person-info/${this.props.match.params.id}/rewards/${id}/`)
      .then(async () =>{
        const personId = this.props.match.params.id
      const data = await this.getAwards(personId)
      this.setState({ data: this.dataAwards(data), loading: false });
      })
      
    }
    handeClickReport = () =>{
      console.log(this.props.match.params.id)
      Axios.get(`${config.host}/person-info/${this.props.match.params.id}/rewards/report/`)
        .then((response) => {
          console.log(response)
          window.open(`${config.file}${response.data.nameFile}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    handleClickDownload(id){
      Axios.get(`${config.host}/person-info/${this.props.match.params.id}/rewards/${id}/`)
      .then((response) =>{
        if(response.data.nameFile === 'no photo')
        {
          alert('У данной награды отсутствует вложенный документ!')
        }
        else{
          window.open(`${config.fileReward}${response.data.nameFile}`)
        }
        
      })
      .catch(() =>{
        alert('У данной награды отсутствует вложенный документ!')
      })
    }


    render(){
        if (this.state.loading) return <Loader />;
        return(
            <Wrapper>
              {this.state.redirect && <Redirect to={this.state.redirect}/>}
            <ButtonContainer>
                <ButtonBack onClick = {this.handleClickBack}><IconContainer><i className="icon-arrow"/></IconContainer>Вернуться к карточке</ButtonBack>
                <ButtonReport onClick = {this.handeClickReport}><IconContainer><IconReport className="icon-report"/></IconContainer>Отчёт</ButtonReport>
                { localStorage.getItem('permission') === 'true' && <ButtonAddAward onClick = {this.handleClickAddAwards}><IconContainer><IconAward className="icon-addreward"/></IconContainer>Добавить награду</ButtonAddAward> }

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
                    <MyTableRow onClick = {() => this.handleClickDownload(row.id)} key={row.id} className="row">
                      <TableCell className="cell" align="left">
                        {row.name}
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
                        
                      </MyTableRow>
                    
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {localStorage.getItem('permission') === 'true' && <DeleteConteiner>
          {this.state.data.map((row) => (
            <ButtonDelete onClick = {()=>this.handleClickDeleteAward(row.id)}><IconDelete className="icon-delete"/>
                        </ButtonDelete>
          ))}</DeleteConteiner>}
          </Wrapper>
        )
    }
}
export default withRouter(Awards);