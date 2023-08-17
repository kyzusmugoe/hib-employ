import React, {useEffect} from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, Grow , Card,  CardHeader, CardContent,  Grid, makeStyles, Paper, Button, styled, Dialog,  Slide ,DialogTitle, DialogContent, DialogContentText, DialogActions, Collapse, Snackbar, SnackbarContent  } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CloseIcon from '@material-ui/icons/Close';
import ImageIcon from '@material-ui/icons/Image';

import PublishIcon from '@material-ui/icons/Publish';

import { DatePicker, HibRaidos } from './FormsUIcomponents/InsItem'


import UploadImage from './FormsUIcomponents/UploadImage'


export default ({sn, rowData, sendData})=>{
    //#region core
    //const dispatch = useDispatch()
    //const exp = useSelector(state => state.exp)

    //#endregion
    //const [rowData, setRowData] = useState(defaultData?defaultData:[  {compName:"", job:"", sy:0, sm:0, sd:0, ey:0, em:0, ed:0}])//資料輸入，沒有資料時預設空值
    //const [rowData, setRowData] = useState(exp)//資料輸入，沒有資料時預設空值
    const [deleteIndex, setDeleteIndex] = useState(0)//資料輸入，沒有資料時預設空值
    const [data, setData] = useState(rowData)//資料輸入，沒有資料時預設空值
    
    const [jobNature, setJobNature] = useState({list:[
        {id:"def1", name:"行政", value:"administrative", checked:true},
        {id:"def2", name:"行銷/業務", value:"sales", checked:false},
        {id:"def3", name:"研發", value:"rd", checked:false},
        {id:"def4", name:"其他", value:"other", checked:false}, 
    ]})
    

    //編輯公司名稱
    /*const editCompany=(value ,sn)=>{
       // if((/^[0-9a-zA-z\u4e00-\u9fcc]+$/).test(value)){
            let ary = [...rowData]
            ary[Snackbar].compName = value
            setRowData(ary)
        //}
    }
    
    //編輯職稱
    const editJob=(value ,sn)=>{
       // if((/^[0-9a-zA-z\u4e00-\u9fcc]+$/).test(value)){
            let ary = [...rowData]
            ary[sn].job = value
            setRowData(ary)
       // }
    }

    //編輯工作性質
    const editJobNature=(value ,sn)=>{
        let ary = [...rowData]
        ary[SnackbarContent].job = value
        setRowData(ary)
    }
     
    
    //選擇日期後寫入起始日資料
    const editStartDate=(value, sn)=>{
        let ary = [...rowData]
        ary[sn].sy = value[0]
        ary[sn].sm = value[1]
        ary[SnackbarContent].sd = value[2]
        setRowData(ary)
    }

    //選擇日期後寫入結束日資料
    const editEndDate=(value, sn)=>{
        let ary = [...rowData]
        ary[sn].ey = value[0]
        ary[sn].em = value[1]
        ary[sn].ed = value[2]
        setRowData(ary)
    }*/



    //開啟上傳佐證資料視窗

    const Transition = React.forwardRef(function Transition(props, ref) {
        console.log(props)
        return <Slide direction="up" ref={ref} {...props} />;
    });
    

    const uploadEvidence = event =>{
        //setOpen(true)
        console.log(event.currentTarget.dataset.sn)
    }
    
    const closeEvidence = event =>{
       // setOpen(false)
    }
    
    useEffect(()=>{
        console.log(rowData)
       // dispatch({type:"SET_EXP", exp:rowData})
    }, [rowData])

    //表單檢查區    
   /* useEffect(()=>{     
        checkForm(false)
        return;
    },[])
*/
    const MyTextFeild = styled(TextField)({
        backgroundColor:"#FFF",
        margin:5
    })


    useEffect(()=>{
        sendData(data)
        
    }, [data])

    

    return (
            <Card style={{
                margin:8,
                height:540,
                border:"1px solid #333",
                borderColor:data.rowType == "Sam"?"#090":"#009" 
            }} >    
        
        <CardContent>   
            <div style={{color:"#aaa", display:"flex", justifyContent:"space-between", marginBottom:20}}>
                <span style={{fontSize:24, fontWeight:"bolder", color:data.rowType == "Sam"?"#090":"#009"}}>
                {
                    data.rowType == "Sam" &&
                    "同業佐證"
                }
                {    
                    data.rowType == "Def" &&
                    "異業佐證"
                }
                </span>
                <span>序號:{sn+1}</span>                                
                <CloseIcon style={{color:"#f30", fontSize:24}} onClick={()=>{
                 //   setOpen(true)
                    setDeleteIndex(sn)
                }}/>
            </div>
            <div style={{display:"flex", justifyContent:"space-around", alignItems:"center" }}>
                <MyTextFeild                               
                    variant="outlined" 
                    label="公司名稱"
                    defaultValue={data.compName}
                    size="small"
                    onChange={(event)=>{
                        setData({
                            ...data,
                            compName:event.target.value    
                        })
                        //setCompName(event.target.value)
                        //editCompany(event.target.value, sn)
                    }}
                />
            {
                data.rowType == "Sam" &&
                <MyTextFeild                                
                    variant="outlined" 
                    label="職稱"
                    value={data.job}
                    size="small"
                    onChange={(event)=>{
                       // editJob(event.target.value, sn)
                    }}
                />
            }
            {
                data.rowType == "Def" &&
                <MyTextFeild                                
                    variant="outlined" 
                    label="產業類別"
                    size="small"
                    value={data.job}
                    onChange={(event)=>{
                    }}
                />
            }                                                                    
            </div>
           
            <div style={{display:"flex", justifyContent:"center", alignItems:"center" }}>
                <DatePicker 
                    label="任職起始日期"  
                    defaultValue={[data.sy, data.sm, data.sd]}
                    closePicker={(value)=>{
                       // editStartDate(value, sn)
                    }} 
                />
                ~
                <DatePicker 
                    label="任職結束日期"   
                    defaultValue={[data.ey, data.em, data.ed]}
                    closePicker={(value)=>{
                      //  editEndDate(value, sn)
                    }} 
                />
            </div>

            {
                data.rowType == "Def" &&
                <div style={{border:"1px solid #ccc",margin:5, borderRadius:4 ,position:"relative" }}>
                    <span style={{fontSize:13, color:"999", position:"absolute",top:-10,left:8, backgroundColor:"#fff"}}>工作性質</span>
                    <div style={{textAlign:"center"}}>
                        <HibRaidos 
                            id="jobClass" 
                            //defaultValue={basicInfo.jobClass}
                            setData={[
                                {id:"def1", name:"行政", value:"administrative", checked:true},
                                {id:"def2", name:"行銷/業務", value:"sales", checked:false},
                                {id:"def3", name:"研發", value:"rd", checked:false},
                            ]}
                            sendData={(value)=>{}}
                        />     
                        <MyTextFeild
                            label="其他"
                            variant="outlined"
                            size="small"
                            onChange={event=>{

                            }}
                        />                                  
                    </div>
                </div>
            } 

            <UploadImage
                label={"同業佐證資料照片"}
                helperText=""
                defaultValue={data.evidence}
                canvasWitdh={600}
                canvasWitdh={800}
                sendData={(img)=>{
                  //  let _d=[...rowData]
                    //_d[sn].evidence=img
                    //setRowData(_d)
                }}
            />
            </CardContent>
        </Card>
    
    );

}

