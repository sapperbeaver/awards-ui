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
import Axios from "axios";
import AutoCompleteName from "./AutoCompleteName";
import AutoCompleteMunicipal from './AutoCompleteMunicipal'
import { Redirect } from "react-router";
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';

const IconContainer = styled.div`
    margin-top: 55px;
`;

const IconDelete = styled.i`
  color: red;
  font-size: 25px;
  cursor: pointer;
`;

const Wrapper = styled.div`
overflow-x: hidden;
`;
const MyGridContainer = styled(Grid)`
.MuiGrid-container{
  margin-bottom: 20px;
}
`;
const MyGrid = styled(Grid)`
.MuiGrid-grid-xs-true{
  width: 100%;
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
    padding-top: 5px;
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
  width: 100%;
  display: flex;
  flex: 1 1;
`;
const type_awards = [
  "Благодарность МСХ РФ",
  "Почётная грамота МСХ РФ", 
  "Благодарность ФНПР", 
  "Почётная грамота ФНПР", 
  "Почётный диплом ФНПР", 
  "Нагрудный знак ФНПР \"За активную работу в профсоюзах\"",
  "Нагрудный знак ФНПР \"За заслуги перед профдвижением России\"",
  "Нагрудный знак ФНПР \"За содружество\"",
  "Благодарность Президиума Профсоюза",
  "Почётная грамота ЦК Профсоюза",
  "Почётный диплом ЦК Профсоюза",
  "Нагрудный знак Профсоюза\"За активную работу в Профсоюзе\"",
  "Нагрудный знак Профсоюза и Общероссийского агропромышленного объединения работодателей\"За развитие социального партнёрства\"",
  "Нагрудный знак \"За заслуги перед Профсоюзом\"",
  "Благодарность БОООП",
  "Почётная грамота БОООП",
  "Почётный диплом БОООП",
  "Почётный профсоюзный работник БОООП - высшая наград Союза",
  "Диплом",
  "Книга почёта БОООП",
  "Благодарность БОО Профсоюза",
  "Почётная грамтоа БОО Профсоюза",
  "Диплом БОО Профсоюза",
  "Книга почёта БОО Профсоюза",
  "Благодарность МС БОО Профсоюза",
  "Диплом МС БОО Профсоюза",
  "Благодарность ТОП Профсоюза",
  "Почётная грамота ТОП Профсоюза",
  "Благодарность председателя ППО",
  "Почётная грамота председателя ППО"
];
const view_awards = [
  "Министерство сельского хозяйства(МСХ РФ)",
  "Федерация независимых Профсоюзов(ФНПР)",
  "Профсоюз работников АПК РФ(ЦК Профсоюза)",
  "Союза \"Белгородское областное объединение организаций Профсоюзов(БОООП)\"",
  "Белгородская областная организация Профсоюза работников АПК РФ(БОО Профсоюза)",
  "Молодежный совет белгородской областной организации профсоюза работников АПК РФ(МС БОО Профсоюза)",
  "Территориальная организация Профсоюза работников АПК РФ(ТОП Профсоюза)",
  "Первичная Профсоюзая организация(ППО)"
];

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-9]/, /\d/, /\d/,/\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}
TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


export class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  handleChangeName(value) {
    const { onChange, index } = this.props
    onChange(index, value, 'name')
  }
  handleChangeTA = (event) => {
    const { onChange, index} = this.props
    onChange(index, event.target.value, 'type')
  };
  handleChangeVA = (event) => {
    const { onChange, index} = this.props
    onChange(index, event.target.value, 'sort')
  };
  handleChangeMunicipalDistrict(value){
    const { onChange, index } = this.props
    onChange(index, value, 'municipal_district')
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
      value: filter.type,
      onChange: this.handleChangeTA,
      renderValue: (selected) => selected.join(", ")
    }
    const viewAwardsParams = {
      multiple: true,
      value: filter.sort,
      onChange: this.handleChangeVA,
      renderValue: (selected) => selected.join(", ")
    }
    console.log(filter)
    return (
      <Wrapper>
        <MyGridContainer container justify="center" >
          <MyGrid item xs="12">
            <Grid container justify="center" spacing={8}>
              <Grid item xs="2">
                <AutoCompleteName onSelect={(v) => this.handleChangeName(v)}/>
              </Grid>
              <Grid item xs="2">
                <AutoCompleteMunicipal onSelect={(v) => this.handleChangeMunicipalDistrict(v)}/>
              </Grid>
              <MyGrid item xs="2">
              <MyFormControl variant="outlined">
                <MyTextField
                  id="outlined-basic"
                  label="Вид наград"
                  variant="outlined"
                  value={filter.sort}
                  select="true"
                  SelectProps = {viewAwardsParams}
                  onChange={this.handleChangeVA}
                >
                  {view_awards.map((award) => (
                    <MenuItem key={award} value={award}>
                      <Checkbox
                        checked={filter.sort.indexOf(award) > -1}
                      />
                      <ListItemText primary={award} />
                    </MenuItem>
                  ))}
                </MyTextField>
              </MyFormControl>
              </MyGrid>
              <MyGrid item xs="2">
              <MyFormControl variant="outlined">
                  <MyTextField
                    id="outlined-basic"
                    label="Тип наград"
                    variant="outlined"
                    value={filter.type}
                    select="true"
                    SelectProps = {typeAwardsParams}
                    onChange={this.handleChangeTA}
                  >
                  {type_awards.map((award) => (
                      <MenuItem key={award} value={award}>
                        <Checkbox
                          checked={filter.type.indexOf(award) > -1}
                        />
                        <ListItemText primary={award} />
                      </MenuItem>
                    ))}
                    </MyTextField>
                </MyFormControl>
              </MyGrid>
              <Grid item xs="2">
                <MyFormControl>
                  <MyTextField
                    id="outlined-basic"
                    label="Год"
                    variant="outlined"
                    value={filter.year.join('   -   ')}
                    InputProps={{
                      inputComponent: TextMaskCustom
                    }}
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
