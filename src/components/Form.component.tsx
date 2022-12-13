import React, { FunctionComponent, useEffect, useState } from 'react'; 
import { connect } from "react-redux";
import * as Types from "../types";
import { AppState } from '../redux/store';
import SubAppBar from './appBar/SubAppBar.component';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as Utils from "../utils";
import {createResourceType} from "../redux";


type FormType = {
    formConfig: Types.JsonType,
    formData: Types.JsonType,
	statusData: Types.StatusDataType,
    createResourceType: typeof createResourceType
};

const Form: FunctionComponent<FormType> = ({formConfig, formData, statusData, createResourceType}) => {
    
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = React.useState(Utils.cloneJson( formData ));
    

	useEffect(() => {

	}, [formData]);

    const setInputValue = (name: string) =>
        (event: React.ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value as string;

        data[name] = value;
        setData(data);
    };

    const generateJson = () => {

        let jsonData: Types.JsonType = {
            resourceType: "QuestionnaireResponse",
            "questionnaire": Utils.getResourceTypeDetails("Questionnaire", formConfig.id),
            "status": "in-progress",
            "source": "Patient",
        };
        
        for( let i=0; i< formConfig.item.length; i++ )
        {
            let itemData = Utils.cloneJson( formConfig.item[i] );
            
            if( itemData.type === "group" )
            {

                for( let j=0; j< itemData.item.length; j++ )
                {
                    const subItemData = itemData.item[j];
                    // itemData
                }
            }
            else
            {
                itemData.answer = [];
                // setJsonValue( itemData, )
            }

        }

        // "authored": "2008-01-17",
        // {
          
        //     "item": [
        //       {
        //         "linkId": "0",
        //         "item": [
        //           {
        //             "linkId": "0.1",
        //             "text": "Date Done",
        //             "answer": [
        //               {
        //                 "valueDate": "2008-01-17"
        //               }
        //             ]
        //           }
        //         ]
        //       },
        // }

    }

    const setJsonValue = ( itemData: Types.JsonType, value: string ) => {

        if( itemData.type === "boolean" )
        {
            return ( {valueBoolean: value} );
        }
        else if( itemData.type === "decimal" )
        {
            return ( {valueDecimal: value} );
        }
        else if( itemData.type === "integer" )
        {
            return ( {valueInteger: value} );
        }
        else if( itemData.type === "date" )
        {
            return ( {valueDate: value} );
        }
        else if( itemData.type === "dateTime" )
        {
            return ( {valueDateTime: value} );
        }

        return ({valueString: value} );
    }

    const saveData = (data: Types.JsonType) => {
        createResourceType( data );
    }

    const setSelectValue = (name: string) =>
        (event: SelectChangeEvent ) => {
        const value = event.target.value as string;

        data[name] = value;
        setData(data);
    };

    const renderForm = () => {
        let form: any = [];
        for( let i=0; i< formConfig.item.length; i++ )
        {
            const itemData =  formConfig.item[i];
            
            if( itemData.type === "group" )
            {
                form.push( renderGroupItem(itemData) );

                for( let j=0; j< itemData.item.length; j++ )
                {
                    const subItemData = itemData.item[j];
                    if( editMode )
                    {
                        form.push( renderInputField( subItemData ) );
                    }
                    else
                    {
                        form.push( renderDataText( subItemData ) );
                    }
                }
            }
            else
            {
                if( editMode )
                {
                    form.push( renderInputField( itemData ) );
                }
                else
                {
                    form.push( renderDataText( itemData ) );
                }
            }

        }

        return form;
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

    const renderDataText =  (itemData: Types.FormField ) => {
        // // group | display | boolean | decimal | integer | date | dateTime
        // if( itemData.type === "boolean" )
        // {
            return( 
                <Typography component="div" variant="body1" >
                    {itemData.text}
                    <Typography component="div" variant="subtitle2" >
                        {formData[itemData.id]}
                    </Typography>
                </Typography>
            )

        // }
        // else if( itemData.type === "decimal" )
        // {
            
        // }
        // else if( itemData.type === "integer" )
        // {
           
        // }
        // else if( itemData.type === "date" )
        // {
            
        // }
        // else if( itemData.type === "dateTime" )
        // {
           
        // }

        // return (

        // )
           
    }


    const renderInputField = (itemData: Types.FormField ) => {
        // group | display | boolean | decimal | integer | date | dateTime
        const id = itemData.id;
        const lableId = itemData.id + "_label";

        if( itemData.type === "boolean" )
        {
            return( 
                <FormControl fullWidth>
                    <InputLabel id={lableId} shrink={true}>{itemData.text}</InputLabel>
                    <Select 
                        labelId={lableId} 
                        id={id} 
                        name={id} 
                        value={formData[itemData.id]} 
                        label={itemData.text}
                        onChange={setSelectValue(itemData.id)}
                    > 
                        <MenuItem value="">[Please select]</MenuItem>
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </Select>
                </FormControl> )

        }
        else if( itemData.type === "decimal" )
        {
            return( <TextField
                        type="number"
                        id={id} 
                        name={id} 
                        value={formData[id]}
                        variant="outlined"
                        inputProps={{step: "0.5" }}
                        InputLabelProps={{ shrink: true }}
                        onChange={setInputValue(id)}
                    /> )
        }
        else if( itemData.type === "integer" )
        {
            return( <TextField
                        type="number"
                        value={formData[id]}
                        variant="outlined"
                        onChange={setInputValue(itemData.id)}
                        InputProps={{ inputProps: { min: 1 } }}
                        InputLabelProps={{ shrink: true }}
                    /> )
        }
        else if( itemData.type === "date" )
        {
            return( <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            label={itemData.text}
                            inputFormat="MMM DD, YYYY"
                            value={formData[id]}
                            onChange={(newValue: Dayjs | null) => console.log(newValue)} 
                            renderInput={(params: any) => <TextField {...params} />}
                        /> 
                    </LocalizationProvider> )
        }
        else if( itemData.type === "dateTime" )
        {
            return( <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label={itemData.text}
                            value={formData[id]}
                            onChange={(newValue: Dayjs | null) => console.log(newValue) }
                            renderInput={(params: any) => <TextField {...params} />}
                        />
                    </LocalizationProvider> )
        }
        return (
            <TextField
                required={itemData.required}
                label={itemData.text}
                value={formData[id]}
                onChange={setInputValue(id)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                defaultValue={formData[itemData.id]}
            />
        )
    }

    const renderButtons = () => {
        
		let buttonList = [];
        if( !editMode )
        {
            buttonList.push( <Button variant="contained" color="success" onClick={() => setEditMode(true)}>Edit</Button>);
        }
        else
        {
            if( formData !== undefined ) // Update data
            {
                buttonList.push(<Button variant="contained" color="success">Update</Button>);
                buttonList.push(<Button variant="contained" color="error">Delete</Button>);
            }
            else
            {
                buttonList.push(<Button variant="contained" color="success">Create</Button>);
            }
           
            buttonList.push(<Button variant="contained" color="error" onClick={() => setEditMode(false)}>Cancel</Button>);
        }

        return buttonList;
    }

    return (
        <>
            <SubAppBar />

            <Box sx={{ paddingLeft: "10px", margin: "10px" }}>
            <Stack spacing={2}>
                {renderForm()}
            </Stack>

            {renderButtons()}
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

const mapDispatchToProps = (dispatch: any) => {
	return {
		createResourceType: (data: Types.JsonType) => dispatch(createResourceType(data))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
