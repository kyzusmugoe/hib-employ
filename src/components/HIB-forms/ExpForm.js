import React, {useEffect} from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Grow , Card,  Popover , CardContent,  Grid, Button,  Dialog, DialogContent, DialogContentText, DialogActions  } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker } from './FormsUIcomponents/InsItem'
import UploadImage from './FormsUIcomponents/UploadImage'

//import ExpFormCard from './ExpFormCard'
import ExpPopover from './FormsUIcomponents/ExpPopover'

export default ({checkForm, defaultData, sendData})=>{
    //#region core
    const dispatch = useDispatch()
    const exp = useSelector(state => state.exp)

    //#endregion
    //const [rowData, setRowData] = useState(defaultData?defaultData:[  {compName:"", job:"", sy:0, sm:0, sd:0, ey:0, em:0, ed:0}])//資料輸入，沒有資料時預設空值
    const [rowData, setRowData] = useState(exp)//資料輸入，沒有資料時預設空值
    const [deleteIndex, setDeleteIndex] = useState(0)//資料輸入，沒有資料時預設空值
    
    //新增一列資料
    const addRow = event =>{
        setRowData([
            {
                rowType:event.currentTarget.getAttribute('id'),
                eid:"new",compName:"", job:"", industry:"", jobNature:"", sy:109, sm:1, sd:1, ey:109, em:12, ed:31, performance:"", evidence:"", evidenceIsChange:1, state:"NEW"
            },
            ...rowData
        ])                                
    }
    
    //移除一列資料
    const removeRow = (index)=>{
        //執行刪除動畫    
        let _a= [...rowData]
        _a[index].close = 1
        setRowData(rowData)        

        //500毫秒後操作刪除掉的資料        
        setTimeout(()=>{
            _a.splice(index, 1)
           setRowData(_a)
        }, 500)
    }

    //編輯公司名稱
    const editCompany=(value ,index)=>{
        let ary = [...rowData]
        ary[index].compName = value
        setRowData(ary) 
    }
    
    //編輯職稱
    const editJob=(value ,index)=>{
       let ary = [...rowData]
       ary[index].job = value
       setRowData(ary)
    }

    //編輯產業類別
    const editIndustry=(value ,index)=>{
        let ary = [...rowData]
        ary[index].industry = value
        setRowData(ary)
    }

    //編輯工作性質
    const editJobNature=(value ,index)=>{
        let ary = [...rowData]
        ary[index].jobNature = value
        setRowData(ary)
    }
     
    //選擇日期後寫入起始日資料
    const editStartDate=(value, index)=>{
        let ary = [...rowData]
        ary[index].sy = value[0]
        ary[index].sm = value[1]
        ary[index].sd = value[2]
        setRowData(ary)
    }

    //選擇日期後寫入結束日資料
    const editEndDate=(value, index)=>{
        let ary = [...rowData]
        ary[index].ey = value[0]
        ary[index].em = value[1]
        ary[index].ed = value[2]
        setRowData(ary)
    }

    //開啟上傳佐證資料視窗
    /*
    const Transition = React.forwardRef(function Transition(props, ref) {
        console.log(props)
        return <Slide direction="up" ref={ref} {...props} />;
    });
    */

    const [open, setOpen] = useState(false)

    useEffect(()=>{        
        console.log(rowData);
        dispatch({type:"SET_EXP", exp:rowData})
    }, [rowData])

    //表單檢查區    
    useEffect(()=>{     
        checkForm(false)
        return;
    },[])
  
    return (
        <div className="App">
            <Button id="Sam" variant="contained" color="primary" style={{margin:10, backgroundColor:"#090"}} onClick={addRow} >新增同業佐證</Button>
            <Button id="Def" variant="contained" color="primary" style={{margin:10, backgroundColor:"#009"}} onClick={addRow} >新增異業佐證</Button>
            
            <Grid container >
                {
                    rowData.map( (item, index)=>
                    <Grid key={"row_"+index} item sm={12} md={6} lg={4} xl={3} >
                       
                            
                         <Grow in={item.close?false:true} >
                            
                            <Card style={{
                                margin:8,
                                height:440,
                                border:"1px solid #333",
                                borderColor:item.rowType == "Sam"?"#090":"#009" 
                            }} >    
                            
                            <CardContent>   
                                <div style={{color:"#aaa", display:"flex",alignItems:"center", justifyContent:"space-between", marginBottom:20}}>
                                    <div>                          
                                        <span style={{fontSize:24, fontWeight:"bolder", color:item.rowType == "Sam"?"#090":"#009"}}>
                                            {
                                                item.rowType == "Sam" &&
                                                "同業佐證"
                                            }
                                            {    
                                                item.rowType == "Def" &&
                                                "異業佐證"
                                            }
                                        </span>
                                        <span style={{marginLeft:10}}>序號:{index+1}</span>     
                                    </div>
                                    <CloseIcon 
                                        style={{color:"#f30", fontSize:24}} 
                                        onClick={()=>{
                                            setOpen(true)
                                            setDeleteIndex(index)
                                        }}
                                    />
                                </div>
                                <div style={{display:"flex", justifyContent:"space-around", alignItems:"center" }}>
                                    <TextField                             
                                        variant="outlined" 
                                        label="公司名稱"
                                        value={item.compName}
                                        size="small"
                                        onChange={(event)=>{
                                            editCompany(event.target.value, index)
                                        }}
                                    />
                                    {
                                        item.rowType == "Sam" &&
                                        <TextField                                
                                            variant="outlined" 
                                            label="職稱"
                                            value={item.job}
                                            size="small"
                                            onChange={(event)=>{
                                                editJob(event.target.value, index)
                                            }}
                                        />
                                    }                                                 
                                </div>                               
                                {
                                    item.rowType == "Def" &&
                                    <div style={{display:"flex", justifyContent:"space-around", alignItems:"center", marginTop:10}}>
                                    
                                        <TextField                                
                                            variant="outlined" 
                                            label="產業類別"
                                            size="small"
                                            value={item.industry}
                                            onChange={(event)=>{
                                                editIndustry(event.target.value, index)
                                            }}
                                        />
                                        <ExpPopover
                                            setData={item.jobNature}
                                            sendData={value=>{
                                                editJobNature(value, index)
                                            }}
                                        />
                                    </div>
                                }     
                                <div style={{display:"flex", justifyContent:"center", alignItems:"center" }}>
                                    <DatePicker 
                                        label="任職起始日期"  
                                        defaultValue={[item.sy, item.sm, item.sd]}
                                        closePicker={(value)=>{
                                            editStartDate(value, index)
                                        }} 
                                    />
                                    ~
                                    <DatePicker 
                                        label="任職結束日期"   
                                        defaultValue={[item.ey, item.em, item.ed]}
                                        closePicker={(value)=>{
                                            editEndDate(value, index)
                                        }} 
                                    />
                                </div>

                                <UploadImage
                                    label={"佐證資料照片"}
                                    helperText=""
                                    defaultValue={item.evidence}
                                    //canvasWitdh={480}
                                    canvasWitdh={600}
                                    sendData={(img)=>{
                                        let _d=[...rowData]
                                        
                                        if(_d[index].evidence != img){
                                            _d[index].evidenceIsChange = 1
                                        }

                                        _d[index].evidence=img
                                        
                                        if(_d){
                                            setRowData(_d)
                                        }

                                    }}

                                    onclick={()=>{
                                        let _d=[...rowData]                                        
                                        if(_d[index].state != "NEW"){
                                            _d[index].state ="UPDATE"   
                                        }
                                        if(_d){
                                            setRowData(_d)
                                        }
                                    }}
                                />
                                </CardContent>
                            </Card>
                        </Grow>
                    </Grid>
                    )
                }
            </Grid>

            <Dialog open={open}>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            確定要刪除資料?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button variant="contained" color="primary" onClick={()=>{
                            setOpen(false)
                        }} >取消刪除</Button>
                        
                        <Button variant="contained" color="secondary" onClick={()=>{
                            setOpen(false)
                            removeRow(deleteIndex)  
                        }}>確定刪除</Button>
                </DialogActions>            
            </Dialog>
        </div>
    );

}
/*
<ExpFormCard
    sn={index}
    rowData={item}
    sendData={data=>{
        console.log(data)
    }}    
/>*/
