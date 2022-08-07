import React from 'react';

import Select, { StylesConfig } from 'react-select';
// import { daoCategoryItems } from '../constants/daoCategoryItems';

export default function MultiSelect (props:{handleChange:any, listItems:any, name:string}) {
    const {handleChange, listItems, name} = props;
    
    return (
        <Select
            defaultValue={[listItems[0]]}
            // isMulti
            name={name}
            options={listItems}
            styles={customStyles}
            className="my-1"
            classNamePrefix="select"
            placeholder={''}
            onChange={handleChange}
        />
    );
};

export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
  
  const customStyles: StylesConfig = {
    option: (provided:Record<string, unknown>, state:any) => ({
        ...provided,
        backgroundColor: state.isFocused ?'#ff9292':"",
        color: "black",
        fontSize: "0.875rem",
        lineHeight: "1",
        "&:active": {
            backgroundColor: "#F87171",
          }
      }),
    control: (provided: Record<string, unknown>, state: any) => ({
        ...provided,
        borderRadius: "0.125rem",
        border: state.isFocused ? "2px solid #F87171" : "2px solid #999999",
        boxShadow: "none",
        lineHeight: "1.25",
        fontSize: "0.875rem",
        "&:hover": {
            border: "",
        }
      }),
  };