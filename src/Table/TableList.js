import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../config";
import { createGlobalStyle } from "styled-components";
import qs from "qs";
import { withRouter } from "react-router";


const ButtonContainer = styled.div`
display: flex;
position: absolute;
top: -65px;
left: 95px;
color: white;
font-weight: 800;
`;
const ButtonBack = styled.div`
cursor: pointer;
display: flex;
background: #3f51b5;
border-radius: 5px;
padding: 4px 25px 5px 15px;
font-size: 19px;
`;

const ButtonReport = styled.div`
display: flex;
background: #3f51b5;
border-radius: 5px;
padding: 5px 25px 5px 15px;
font-size: 19px;
margin-left: 25px;
`;

const IconReport = styled.i`

`;

const IconContainer = styled.div`
margin-left: -5px;
margin-right: 5px;
`;

const Wrapper = styled.div`
  position: relative;
  .table {
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
    .headRow {
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
const CustomLink = (props) => {
  const { children, icon, ...rest } = props;
  return (
    <Link
      component={(props) => {
        // console.log(props);
        return (
          <ButtonBack onClick={() => props.navigate(props.href)}>
            {props.children}
          </ButtonBack>
        );
      }}
      {...rest}
    >
      {children}
    </Link>
  );
};

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async getUsers(postData) {
    const response = await Axios.post(`${config.host}/get/`, postData);
    const { data } = response;
    console.log("qwe", data);
    return data;
  }
  dataAwards(list) {
    const res = [];
    console.log(list);
    list.forEach((el) => {
      res.push(
        ...el.rewards.map((rew) => ({
          ...rew,
          ...el,
          unique_key: Math.random(),
        }))
      );
      if (el.rewards.length === 0) {
        res.push({ ...el, unique_key: Math.random() });
      }
    });
    return res;
  }

  async componentDidMount() {
    const hrefData = window.location.href.split("?");
    const postData = qs.parse(hrefData[1]);
    this.setState({ data: this.dataAwards(await this.getUsers(postData)) });
  }
  handleClickBack = () => {
    window.location.assign("/filter");
  };

  render() {
    console.log(this.state.data);
    return (
      <Wrapper>
        <ButtonContainer>
          <CustomLink to="/filter">
            <IconContainer><i className="icon-arrow"/></IconContainer>Вернуться к фильтрам
          </CustomLink>
          <ButtonReport>
            <IconContainer>
              <IconReport className="icon-report" />
            </IconContainer>
            Отчёт
          </ButtonReport>
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
export default withRouter(TableList);
