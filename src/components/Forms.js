import React from 'react';
import PropTypes from 'prop-types';
import {
  FormHelperText, FormControl, InputLabel, Select, TextField, MenuItem,
} from '@material-ui/core';
import InputMask from 'react-input-mask';
import StateJSON from '../../content/states';


const formHeaderStyle = {
  marginTop: '20px',
  color: '#555',
  fontSize: '18px',
}

const selectWidthStyle = {
  minWidth: '200px',
}

const fieldStyle = {
  marginRight: '5px',
  marginTop: '5px',
}

const errorHintStyle = {
  color: 'red',
}

const MAX_LONG_FIELD_SIZE = 1024;
const MAX_SHORT_FIELD_SIZE = 128;

const Forms = (props) => {
    const {
      formData, handleChange, handleBlur, getDefaultValue, errors,
    } = props;
    const keys = Object.keys(formData);
    return (
      <form>
        {
          keys.map(key => (
                <div key={key}>
                  <h4 style={formHeaderStyle}>{ key }</h4>
                    {
                      formData[key].map((formObj) => {
                        const err = errors[formObj.id];
                        if (formObj.select && Array.isArray(formObj.select)) {
                          const defaultVal = getDefaultValue(formObj.id);
                          const { select } = formObj;
                          return (<FormControl key={formObj.id}
                                                      error={ err ? err.value : false }
                                                      style={selectWidthStyle}
                                                      fullWidth={formObj.fullWidth}>
                            <InputLabel id={formObj.id}>{formObj.label}</InputLabel>
                            <Select
                              variant="filled"
                              id={formObj.id}
                              name={formObj.id}
                              required={formObj.required}
                              onBlur={handleBlur}
                              onChange={ handleChange }
                              style={fieldStyle}
                              defaultValue={defaultVal}>
                              {
                                select.map(item => (
                                  <MenuItem key={item}
                                            name={formObj.id}
                                            value={item}>
                                    {item}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            <FormHelperText style={errorHintStyle}>{ err ? err.text : ""}</FormHelperText>
                          </FormControl>);
                        }
                        if (formObj.id === 'phoneNumber') {
                          const defaultVal = getDefaultValue(formObj.id);
                          return (<InputMask mask="999 999 9999"
                                             maskChar=""
                                             key={formObj.id}
                                             error={ err ? err.value : false }
                                             onBlur={handleBlur}
                                             defaultValue={defaultVal}
                                             >
                                  { inputProps =>
                                    <FormControl>
                                      <TextField
                                          {...inputProps}
                                          key={formObj.id}
                                          variant="filled"
                                          id={formObj.id}
                                          label={formObj.label}
                                          required={formObj.required}
                                          // fullWidth={formObj.fullWidth}
                                          rows={formObj.rows ? formObj.rows : 1}
                                          multiline={Boolean(formObj.rows) || false}
                                          style={fieldStyle}
                                           />
                                      <FormHelperText style={errorHintStyle}>{ err ? err.text : "" }</FormHelperText>
                                    </FormControl>
                                  }
                                  </InputMask>
                          );
                        }
                        if (formObj.id === 'addressZip') {
                          const defaultVal = getDefaultValue(formObj.id);
                          // const err = handleError(formObj.id);
                          return (<InputMask mask="99999"
                                             maskChar=""
                                             error={ err ? err.value : false}
                                             key={formObj.id}
                                             onBlur={handleBlur}
                                             defaultValue={defaultVal}>
                                  { inputProps =>
                                    <FormControl>
                                     <TextField
                                       {...inputProps}
                                       key={formObj.id}
                                       variant="filled"
                                       id={formObj.id}
                                       label={formObj.label}
                                       required={formObj.required}
                                       fullWidth={formObj.fullWidth}
                                       rows={formObj.rows ? formObj.rows : 1}
                                       multiline={Boolean(formObj.rows) || false}
                                       style={fieldStyle}
                                        />
                                     <FormHelperText style={errorHintStyle}>{ err ? err.text : "" }</FormHelperText>
                                    </FormControl>
                                  }
                                  </InputMask>
                          );
                        }
                        if (formObj.id === 'middleInitial') {
                          const defaultVal = getDefaultValue(formObj.id);
                          // const err = handleError(formObj.id);
                          return (<InputMask mask="a"
                                             maskChar=""
                                             error={ err ? err.value : false }
                                             key={formObj.id}
                                             onBlur={handleBlur}
                                             defaultValue={defaultVal}>
                              { inputProps =>
                                <FormControl>
                                  <TextField
                                    {...inputProps}
                                    key={formObj.id}
                                    variant="filled"
                                    id={formObj.id}
                                    label={formObj.label}
                                    required={formObj.required}
                                    fullWidth={formObj.fullWidth}
                                    rows={formObj.rows ? formObj.rows : 1}
                                    multiline={Boolean(formObj.rows) || false}
                                    style={fieldStyle}
                                  />
                                  <FormHelperText style={errorHintStyle}>{ err ? err.text : "" }</FormHelperText>
                                </FormControl>
                              }
                            </InputMask>
                          );
                        }
                        if (formObj.id === 'addressState') {
                          const blank = [{name: ''}];
                          const states = [...blank, ...StateJSON.content];
                          const defaultVal = getDefaultValue(formObj.id);
                          // const err = handleError(formObj.id);
                          return (<FormControl key={formObj.id}
                                               error={ err ? err.value : false }
                                               style={selectWidthStyle}>
                                    <InputLabel id={formObj.id}>{formObj.label}</InputLabel>
                                    <Select
                                      variant="filled"
                                      id={formObj.id}
                                      name={formObj.id}
                                      required={formObj.required}
                                      onBlur={handleBlur}
                                      onChange={ handleChange }
                                      style={fieldStyle}
                                      defaultValue={defaultVal}>
                                      {
                                        states.map(state => (
                                          <MenuItem key={state.name || 'statekey'}
                                                    name={formObj.id}
                                                    value={state.name}>
                                            {state.name}
                                          </MenuItem>
                                        ))
                                      }
                                    </Select>
                                    <FormHelperText style={errorHintStyle}>{ err ? err.text : ""}</FormHelperText>
                                  </FormControl>);
                        }
                        const defaultVal = getDefaultValue(formObj.id);
                        // const err = handleError(formObj.id);
                        return (<FormControl key={formObj.id}
                                             fullWidth={formObj.fullWidth} >
                                  <TextField
                                      key={formObj.id}
                                      variant="filled"
                                      id={formObj.id}
                                      label={formObj.label}
                                      required={formObj.required}
                                      rows={formObj.rows ? formObj.rows : 1}
                                      multiline={Boolean(formObj.rows) || false}
                                      onBlur={handleBlur}
                                      style={fieldStyle}
                                      defaultValue={defaultVal}
                                      error={ err ? err.value : false}
                                      onInput = {(e) => {
                                        e.target.value = e.target.value.slice(0,
                                          (formObj.rows && formObj.rows > 1 ? MAX_LONG_FIELD_SIZE : MAX_SHORT_FIELD_SIZE))
                                      }}
                                  />
                                  <FormHelperText style={errorHintStyle}>{ err ? err.text : ""}</FormHelperText>
                                </FormControl>);
                      })}
                </div>
          ))}
      </form>
    );
}

Forms.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  getDefaultValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

export default Forms;
