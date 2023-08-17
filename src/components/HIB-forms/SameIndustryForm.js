import React, {useEffect} from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DatePicker, HibRaidos} from './FormsUIcomponents/InsItem'
import {TextField,  Checkbox,  Collapse,  styled  } from '@material-ui/core';
import UploadImage from './FormsUIcomponents/UploadImage'

import SameIndustryTable from './Tables/SameIndustry'

const MyTextField = styled(TextField)({
    margin:5
});

const PersonalForm=({checkForm})=>{
    const dispatch = useDispatch()    
    const sameIndustry = useSelector(state => state.sameIndustry)

    //#region reducer資料
    //const [myName, setMyName] = useState(sameIndustry.myName)//姓名
    const [myClass, setMyClass] = useState(sameIndustry.myClass)//推薦職級
    const [reDate, setReDate] = useState([
        sameIndustry.year,
        sameIndustry.month,
        sameIndustry.date
    ])//推薦年月日
    //const [myUid, setMyUid] = useState(sameIndustry.uid)//身分證字號
    const [seniority, setSeniority] = useState(sameIndustry.seniority)//同業年資
    const [performance, setPerformance] = useState(sameIndustry.performance)//同業業績
    const [attachment, setAttachment] = useState(sameIndustry.sameIndustryAttachment)//佐證資料
    //#endregion


    //表單檢查區    
    useEffect(()=>{
        checkForm(true)
        return
    },[])
  

    //#region  資料編輯
   /* const editMyName = (event)=>{
        setMyName(event.target.value)
        dispatch({type:"SET_SAMEINDUSTRY", sameIndustry:{ ...sameIndustry,  myName:event.target.value}})
    }*/

    const editMyClass = (event)=>{
        setMyClass(event.target.value)
        dispatch({type:"SET_SAMEINDUSTRY", sameIndustry:{ ...sameIndustry,  myClass:event.target.value}})
    }

    /*const editMyUid = (event)=>{
        setMyUid(event.target.value)
        dispatch({type:"SET_SAMEINDUSTRY", sameIndustry:{ ...sameIndustry,  uid:event.target.value}})
    }*/

    const editSeniority = (event)=>{
        setSeniority(event.target.value)
        dispatch({type:"SET_SAMEINDUSTRY", sameIndustry:{ ...sameIndustry,  seniority:event.target.value}})
    }

    const editPerformance = (event)=>{
        setPerformance(event.target.value)
        dispatch({type:"SET_SAMEINDUSTRY", sameIndustry:{ ...sameIndustry,  performance:event.target.value}})
    }

    //#endregion

    return (
        <div>
           
            <div >
                <div style={{paddingLeft:50}}>           
                    <SameIndustryTable/>
                </div>

                <div style={{border:"3px solid #c6da9d",padding:10, borderRadius:10}}>
                    <div style={{display:"flex", flexWrap:"wrap"}}>
                        {/*
                        
                        <MyTextField
                            label="姓名"
                            variant="outlined"
                            defaultValue={myName}
                            onChange={editMyName}
                        />
                        */}
                        <MyTextField
                            label="推薦職級"
                            variant="outlined"
                            defaultValue={myClass}
                            onChange={editMyClass}
                        />
                          
                        <DatePicker 
                            label="推薦日期"
                            defaultValue={reDate}                     
                            closePicker={(value)=>{                               
                                setReDate([value[0], value[1], value[2]])
                                dispatch({
                                    type:"SET_SAMEINDUSTRY",
                                    sameIndustry:{
                                        ...sameIndustry,
                                        year:parseInt(value[0]),                                     
                                        month:parseInt(value[1]),                                     
                                        date:parseInt(value[2]),                                     
                                    }
                                })
                            }} 
                        /> 
                   
                        {/*
                        <MyTextField 
                            label="身分證字號"
                            variant="outlined"
                            defaultValue={myUid}
                            onChange={editMyUid}
                        />
                        */} 
                        <MyTextField 
                            label="同業服務年資"
                            variant="outlined"
                            defaultValue={seniority}
                            onChange={editSeniority}
                        />
                        <MyTextField 
                            label="同業業績"
                            variant="outlined"
                            defaultValue={performance}
                            onChange={editPerformance}
                        />
                    </div>
                    <p>2000人以上保險公司名片扣繳憑單累計15萬主任, 45萬襄理, 105萬經理同業的業績報表符合本公司制度內的職級。</p>
                    <div style={{textAlign:"center"}}>
                        <UploadImage
                            label="同業佐證資料照片"
                            helperText=""
                            defaultValue={attachment}
                            sendData={(img)=>{
                                setAttachment(img)
                                dispatch({ type:"SET_SAMEINDUSTRY", sameIndustry:{...sameIndustry, sameIndustryAttachment:img } })
                            }}
                        />
                        <p>未黏貼證明時一律依規定扣取補充保險費</p>
                    </div>
                </div>
               
            </div>
        </div>
    );
}

export default PersonalForm;