import React, { FunctionComponent, useEffect, useState } from 'react'; 
import { connect } from "react-redux";
import * as ReduxVarType from "../types";
import * as Constant from "../constants";
import { AppState } from '../redux/store';
import * as Utils from "../utils";
import * as Types from "../types";
import SubAppBar from './appBar/SubAppBar.component';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


type FormType = {
    formConfig: ReduxVarType.JsonType,
    formData: ReduxVarType.JsonType,
	statusData: ReduxVarType.StatusDataType
};

const Form: FunctionComponent<FormType> = ({formConfig, formData, statusData}) => {
   
	useEffect(() => {

	}, [formData]);

    const renderForm = () => {
        let form: any = [];
        for( let i=0; i< formConfig.item.length; i++ )
        {
            const itemData =  formConfig.item[i];
            
            if( itemData.type == "group" )
            {
                form.push( renderGroupItem(itemData) );

                for( let j=0; j< itemData.item.length; j++ )
                {
                    const subItemData = itemData.item[j];
                    form.push( renderBasedItem( subItemData ) );
                }
            }

        }

        return form;
    }

    const renderBasedItem = (itemData: Types.FormField ) => {
        // group | display | boolean | decimal | integer | date | dateTime
        if( itemData.type == "boolean" )
        {
            const id = itemData.id;
            const lableId = itemData.id + "_label";
            return( 
                <FormControl fullWidth>
                    <InputLabel id={lableId} shrink={true}>{itemData.text}</InputLabel>
                    <Select 
                        labelId={lableId} 
                        id={id} 
                        value={formData[itemData.id]} 
                        label={itemData.text}
                        // onChange={handleChange}
                    > 
                        <MenuItem value="">[Please select]</MenuItem>
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </Select>
                </FormControl> )

        }
        else if( itemData.type == "decimal" )
        {
            <TextField
                type="number"
                id={itemData.id} 
                value={formData[itemData.id]}
                variant="outlined"
                inputProps={{step: "0.5" }}
                InputLabelProps={{ shrink: true }}
            // onChange={(e) => setValue(parseFloat(e.target.value).toFixed(1))}
          />
        }
        else if( itemData.type == "integer" )
        {
            <TextField
                type="number"
                id={itemData.id}
                value={formData[itemData.id]}
                variant="outlined"
                // onChange={e=>setField(parseInt(e.target.value))}
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{ shrink: true }}
            />
        }
        else if( itemData.type == "date" )
        {
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    label={itemData.text}
                    inputFormat="MMM DD, YYYY"
                    value={formData[itemData.id]}
                    onChange={(newValue: Dayjs | null) => console.log(newValue)} 
                    renderInput={(params: any) => <TextField {...params} />}
                /> 
            </LocalizationProvider>
        }
        else if( itemData.type == "dateTime" )
        {
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label={itemData.text}
                    value={formData[itemData.id]}
                    onChange={(newValue: Dayjs | null) => console.log(newValue) }
                    renderInput={(params: any) => <TextField {...params} />}
                />
          </LocalizationProvider>
        }
        return (
            <TextField
                required={itemData.required}
                id={itemData.id}
                label={itemData.text}
                value={formData[itemData.id]}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                defaultValue={formData[itemData.id]}
            />
        )
    }

    const renderGroupItem = ( item: Types.FormField ) => {
        return (
            <>
                <Typography component="div" variant="h6" >
                    {item.text}
                </Typography>
            </>
        )
    } 

    return (
        <>
            <SubAppBar />

            <Box sx={{ paddingLeft: "10px", margin: "10px" }}>
            <Stack spacing={2}>
                {renderForm()}
            </Stack>
        </Box>
        </>
        
	);

}

const mapStateToProps = (state: AppState) => {
    return {
        statusData: state.statusData,
		resourceTypeList: state.resourceTypeList,
		appConfigData: state.appConfigData
    };
};

export default connect(mapStateToProps, null)(Form);
