import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
} from "@material-ui/core";
import styled from "styled-components";

const IconContainer = styled.div`
    margin-top: 55px;
`;

const IconDelete = styled.i`
  color: red;
  font-size: 25px;
`;

const Wrapper = styled.div`
`;
const MyGridContainer = styled(Grid)`
.MuiGrid-container{
  margin-bottom: 20px;
}
`;
const MyGrid = styled(Grid)`
.MuiGrid-grid-xs-true{
  width: 330px;
  display: flex;
}
`;

const MyTextField = styled(TextField)`
  .MuiSelect-iconOutlined{
    color: white;
    font-size: 25px;
  }
  .MuiFormLabel-root {
    color: white;
    font-size: 25px;
    margin-left: 16px;
    margin-top: 3px;
  }

  .MuiInputBase-root {
    color: white;
    height: 79px;
    font-size: 25px;
  }
  .MuiInputLabel-outlined.MuiInputLabel-shrink{
    margin-left: 0;
    margin-top: 0;
  }
  label.Mui-focused {
    color: white;
    font-size: 25px;
    margin-left: 0 !important;
    margin-top: 0 !important;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: white;
      font-size: 25px;
    }
    &:hover fieldset {
      border-color: white;
      font-size: 25px;
    }
    &.Mui-focused fieldset {
      border-color: white;
      font-size: 25px;
    }
  }
`;

const MyFormControl = styled(FormControl)`
  display: flex;
  flex: 1 1;
`;
const type_awards = ["test1", "test2", "test3", "test4", "test5", "test6", "test7"];
const view_awards = ["test1", "test2", "test3"];

export class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleChangeName = (event) =>{
    const { onChange, index } = this.props
    onChange(index, event.target.value, 'name')
  }
  handleChangeTA = (event) => {
    const { onChange, index} = this.props
    onChange(index, event.target.value, 'type_awards')
  };
  handleChangeVA = (event) => {
    const { onChange, index} = this.props
    onChange(index, event.target.value, 'view_awards')
  };
  handleChangeMunicipalDistrict = (event) =>{
    const { onChange, index } = this.props
    onChange(index, event.target.value, 'municipal_district')
  }
  handleChangeYear = (event) =>{
    const { onChange, index } = this.props
    onChange(index, event.target.value, 'year')
  }
  handleDeleteClick = () => {
    const { onDelete, index } = this.props;
    onDelete(index);
  };
  render() {
    const { count,filter } = this.props
    const typeAwardsParams = {
      multiple: true,
      value: filter.type_awards,
      onChange: this.handleChangeTA,
      renderValue: (selected) => selected.join(", ")
    }
    const viewAwardsParams = {
      multiple: true,
      value: filter.view_awards,
      onChange: this.handleChangeVA,
      renderValue: (selected) => selected.join(", ")
    }
    return (
      <Wrapper>
        <MyGridContainer container spacing={0} justify="center" >
          <MyGrid item xs="false">
            <Grid container justify="center" spacing={8}>
              <Grid item xs>
                <MyFormControl>
                  <MyTextField
                    id="outlined-basic"
                    label="ФИО"
                    value={filter.name}
                    variant="outlined"
                    className="MuiFormLabel-root"
                    color="white"
                    onChange={this.handleChangeName}
                  />
                </MyFormControl>
              </Grid>

              <Grid item xs>
                <MyFormControl>
                  <MyTextField
                    value={filter.municipal_district}
                    id="outlined-basic"
                    label="Район"
                    variant="outlined"
                    onChange={this.handleChangeMunicipalDistrict}
                  />
                </MyFormControl>
              </Grid>
              <MyGrid item xs>
                <MyFormControl variant="outlined">
                  <MyTextField
                    id="outlined-basic"
                    label="Тип наград"
                    variant="outlined"
                    value={filter.type_awardstype_award}
                    select="true"
                    SelectProps = {typeAwardsParams}
                    onChange={this.handleChangeTA}
                  >
                  {type_awards.map((award) => (
                      <MenuItem key={award} value={award}>
                        <Checkbox
                          checked={filter.type_awards.indexOf(award) > -1}
                        />
                        <ListItemText primary={award} />
                      </MenuItem>
                    ))}
                    </MyTextField>
                </MyFormControl>
              </MyGrid>
              <MyGrid item xs>
              <MyFormControl variant="outlined">
                  <MyTextField
                    id="outlined-basic"
                    label="Вид наград"
                    variant="outlined"
                    value={filter.view_awards}
                    select="true"
                    SelectProps = {viewAwardsParams}
                    onChange={this.handleChangeVA}
                  >
                    {view_awards.map((award) => (
                      <MenuItem key={award} value={award}>
                        <Checkbox
                          checked={filter.view_awards.indexOf(award) > -1}
                        />
                        <ListItemText primary={award} />
                      </MenuItem>
                    ))}
                  </MyTextField>
                </MyFormControl>
              </MyGrid>
              <Grid item xs>
                <MyFormControl>
                  <MyTextField
                    id="outlined-basic"
                    label="Год"
                    variant="outlined"
                    value={filter.year}
                    onChange={this.handleChangeYear}
                  />
                </MyFormControl>
              </Grid>
              
                <IconContainer>
                  { count > 1 && (
                    <IconDelete
                      className="icon-delete"
                      onClick={this.handleDeleteClick}
                    />
                  )}
                </IconContainer>
              
            </Grid>
          </MyGrid>
        </MyGridContainer>
      </Wrapper>
    );
  }
}
