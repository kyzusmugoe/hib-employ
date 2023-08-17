import React,{useState, useEffect, useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {TextField,  Box, makeStyles, Collapse, Button, Checkbox, Grid , styled, Divider, useEventCallback   } from '@material-ui/core';
import {DatePicker, HibSelecter, HibRaidos} from './FormsUIcomponents/InsItem'
import UploadImage from './FormsUIcomponents/UploadImage'
import WebServiceContext from '../../webservice/WebServiceContext'
import { set } from 'date-fns';
import PostCodeSelect from './FormsUIcomponents/PostCodeSelect'
import UnitCodeSelect from './FormsUIcomponents/UnitCodeSelect'
import { CMapCompressionType } from 'pdfjs-dist';

import fullwidth from 'fullwidth';

const useStyles = makeStyles({    
    flex:{
        display:"flex",
        flexWrap:"wrap",
        alignItems:"center",
        padding:10,
        transition:".4s",
        "& TextFeild":{
            margin:10
        }

    },
    outlineBlock:{
        margin:10, 
        border:"1px solid #ccc",
        borderRadius:10,
        padding:10
    }
});


const MyTextField = styled(TextField)({margin:"22px 5px 0 10px"});

//#region 正規表示
const phone_reg =  /^\(?0\d{1,3}\)?\-?\d{7,8}$/
//const phone_reg =  /^\(0\d{1,3}\)\d{7,8}$/
const mobile_reg =  /^09[0-9]{8}$/
const email_reg =  /^[\w.\-\_]+\@[\w+\.]+\w+$/
const standard = /^[\uff21-\uff5a\uff10-\uff19\u4e00-\u9fcc\w.\-]+$/
//#endregion

/*
const highestEducation = {
    list:[
        {id:"graduate", name:"研究所", value:"graduate", checked:true},
        {id:"collage", name:"大學", value:"collage", checked:false},
        {id:"specialist", name:"專科", value:"specialist", checked:false},
        {id:"senior", name:"高中(職)", value:"senior", checked:false},
        {id:"junior", name:"國中", value:"junior", checked:false}
    ]
}*/


const BasicInfoForm = ({checkForm, sendData, checkJobClass})=>{
    //#region core
    const classes = useStyles();
    const dispatch = useDispatch()
    const basicInfo = useSelector(state => state.basicInfo)//reducer資料中心
    const webService = useContext(WebServiceContext)//api中心
    //#endregion

    //#region 資料自動填入區
    //const [unitCode, setUnitCode] = useState(basicInfo.unitCode)
    
    const [unitCodeName, setUnitCodeName] = useState(basicInfo.unitCodeName)
    const [employeeName, setEmployeeName] = useState(basicInfo.employeeName)
    const [employeePhoto, setEmployeePhoto] = useState(basicInfo.employeePhoto)
    const [employeeEmail, setEmployeeEmail] = useState(basicInfo.employeeEmail)

    const [remittanceBankList, setRemittanceBankList] = useState({list:[
        {id:"ctbc", name:"中國信託", value:"中國信託", checked:true},
        {id:"fubon", name:"富邦", value:"富邦", checked:false},
        {id:"post", name:"郵局", value:"郵局", checked:false},
    ]})

    const [remittanceBank, setRemittanceBank] = useState(basicInfo.remittanceBank)
    const [remittanceAccount, setRemittanceAccount] = useState(basicInfo.remittanceAccount)


    const [myHighestEducation] = useState(basicInfo.highestEducation)

    const [domicilePostcode, setDomicilePostcode] = useState(basicInfo.domicilePostcode)
    const [domicileAddress, setDomicileAddress] = useState(basicInfo.domicileAddress)
    const [mailingPostcode, setMailingPostcode] = useState(basicInfo.mailingPostcode)
    const [mailingAddress, setMailingAddress] = useState(basicInfo.mailingAddress)
    const [employeeHomePhone, setEmployeeHomePhone] = useState(basicInfo.employeeHomePhone)
    const [employeeMobile, setEmployeeMobile] = useState(basicInfo.employeeMobile)

    const [emergencyName, setEmergencyName] = useState(basicInfo.emergencyName)
    const [emergencyPhone, setEmergencyPhone] = useState(basicInfo.emergencyPhone)
    const [emergencyRelationship, setEmergencyRelationship] = useState(basicInfo.emergencyRelationship)

    const [heirName, setHeirName] = useState(basicInfo.heirName)
    const [heirPhone, setHeirPhone] = useState(basicInfo.heirPhone)
    const [heirRelationship, setHeirRelationship] = useState(basicInfo.heirRelationship)
    
    const [hasFamilyIn, setHasFamilyIn] = useState(()=>{
        if(basicInfo.hasFamilyName == ""){
            return false
        }else{
            return true
        }
    })

    const [hasFamilyName, setHasFamilyName] = useState(basicInfo.hasFamilyName)
    const [installLineSecretary, setInstallLineSecretary] = useState(false);
    const [mailContract, setMailContract] = useState(basicInfo.mailContract);
    useEffect(()=>{
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{...basicInfo, mailContract:mailContract?1:0}
        })  
    },[mailContract])

    const [unitOpen, setUnitOpen]=useState(false)//所屬單位開關
    
    // const [employeeAge, setEmployeeAge] = useState(basicInfo.employeeAge)
    const [employeeBirth, setEmployeeBirth] = useState([
        basicInfo.employeeBirthYear,
        basicInfo.employeeBirthMonth,
        basicInfo.employeeBirthDate
    ])
    const [checkBirth, setCheckBirth] = useState(false)

    //const [postCodeList, setPostCodeList] = useState([])
    const postCodeList = useSelector(state => state.postCodeList)//reducer資料中心
    const [unitCodeList, setUnitCodeList] = useState([])
    //#endregion

    //#region useEffect事件
    useEffect(() => {        
        employeeBirth[0] != "" && employeeBirth[0] != "" && employeeBirth[0] != ""?
        setCheckBirth(false):
        setCheckBirth(true)        
    }, [employeeBirth])

    
    useEffect(()=>{
        //取得郵遞區號
        /*webService.asyncCitiesNumber().then((res=>{            
            setPostCodeList(res);
        }))*/
        //取得通訊處資訊
        webService.asyncUnitCode().then((res=>{            
            setUnitCodeList(res);
        }))
    },[])
    


    useState(()=>{
        if(hasFamilyName!=""){
            setHasFamilyIn(true)
        }
    },[hasFamilyName, basicInfo.hasFamilyName])
    
    //表單檢查區    
    useEffect(()=>{       
        if( 
            standard.test(employeeName) && 
            employeePhoto !="" &&
            standard.test(unitCodeName) && 
            domicilePostcode !="" &&
            standard.test(domicileAddress) && 
            mailingPostcode !="" &&
            standard.test(mailingAddress) && 
            //phone_reg.test(employeeHomePhone) && /*2020 蕭:需求修改，家裡電話變成非必填欄位 */
            mobile_reg.test(employeeMobile) &&
            email_reg.test(employeeEmail) &&
            standard.test(emergencyName) &&
            mobile_reg.test(emergencyPhone) &&
            standard.test(emergencyRelationship) &&
            installLineSecretary == true && 
            checkBirth != true
        ){
            checkForm(true)
            //checkMessage({})
        }else{
            checkForm(false)
        }
    },[
        employeeName,
        employeePhoto,
        unitCodeName,
        domicilePostcode,
        domicileAddress, 
        mailingPostcode, 
        mailingAddress, 
        //employeeHomePhone,  /*2020 蕭:需求修改，家裡電話變成非必填欄位 */ 
        employeeMobile,
        employeeEmail,
        emergencyName,
        emergencyPhone,
        emergencyRelationship,
        installLineSecretary,
        checkBirth
    ])

    //#endregion

    //#region 表單修改行為
    const domicileToMailingAddr = ()=>{
        setMailingPostcode(domicilePostcode)
        setMailingAddress(domicileAddress)
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{
                ...basicInfo,
                mailingPostcode:domicilePostcode,
                mailingAddress:domicileAddress
            }
        })
    }

    //姓名
    const editName = (event)=>{
        setEmployeeName(event.target.value)
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{...basicInfo, employeeName:event.target.value}
        })
        
    }

    //所屬單位
    const editUnitCode = (event)=>{
        //setUnitCode(event.target.value)
        setUnitCodeName(event.target.value)
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{...basicInfo, unitCodeName:event.target.value}
        })
        
    }
    
    //戶籍地址
    const editDomicileAddress = (event)=>{
        setDomicileAddress(event.target.value)
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{...basicInfo, domicileAddress:event.target.value}
        })
    }

    //通訊地址
    const editMailingAddress = (event)=>{
        setMailingAddress(event.target.value)
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{...basicInfo, mailingAddress:event.target.value}
        })
    }

    //聯絡電話
    const editEmployeeHomePhone = (event)=>{
        const reg = /^[0-9\(\)\-]{0,14}$/;         
        if(event.target.value.length > 0 && reg.test(event.target.value) == false ) return //非數字不寫入                        
        setEmployeeHomePhone(event.target.value)
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{...basicInfo, employeeHomePhone:event.target.value}
        })
    }

    //手機
    const editEmployeeMobile = (event)=>{
        const reg = /^[0-9\(\)]{0,10}$/;    
        if(event.target.value.length > 0 && reg.test(event.target.value) == false ) return //非數字不寫入                         
        setEmployeeMobile(event.target.value)
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{...basicInfo, employeeMobile:event.target.value}
        })
    }

    //電子郵件
    const editEmployeeEmail = (event)=>{
        const reg = /^[\w\@\.\-\_]+$/;
        if(event.target.value.length > 0 && reg.test(event.target.value) == false ) return //非數字不寫入 
        setEmployeeEmail(event.target.value)
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{...basicInfo, employeeEmail:event.target.value}
        })
    }

    //匯款銀行
    const editRemittanceBank = (value, detail)=>{
        setRemittanceBank(value)
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{...basicInfo, remittanceBank:value}
        })         
    }

    //匯款帳戶
    const editRemittanceAccount = (event)=>{
        const reg = /^[0-9\-]+$/;
        if(event.target.value.length > 0 && reg.test(event.target.value) == false ) return //非數字不寫入 
        setRemittanceAccount(event.target.value)
        dispatch({
            type:"SET_BASIC_INFO",
            basicInfo:{...basicInfo, remittanceAccount:event.target.value}
        })
    }


    

    /*
        useEffect(()=>{
            if( emergencyName !="" && emergencyPhone !="" && emergencyRelationship !=""){
                setHeirName(emergencyName)
                setHeirPhone(emergencyPhone)
                setHeirRelationship(emergencyRelationship)
                dispatch({
                    type:"SET_BASIC_INFO",
                    basicInfo:{...basicInfo,
                        heirName:emergencyName,
                        heirPhone:emergencyPhone,
                        heirRelationship:emergencyRelationship
                    }
                })      
            }
        },[emergencyName, emergencyPhone, emergencyRelationship])
    */

    //#endregion

    
    return(
       <Box spacing={3}> 
            <div className={classes.flex}>
                
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <UploadImage
                        label="大頭照"                      
                        defaultValue={employeePhoto}
                        sendData={(img)=>{
                            //console.log(img)
                            setEmployeePhoto(img)
                            dispatch({ 
                                type:"SET_BASIC_INFO",
                                basicInfo:{...basicInfo, employeePhoto:img}
                            })
                        }}
                        onclick={()=>{   
                            dispatch({ 
                                type:"SET_BASIC_INFO",
                                basicInfo:{...basicInfo, employeePhotoIsChange:1}
                            })
                        }}
                    />
                    {
                        employeePhoto == "" &&
                        <p style={{color:"#f30"}}>尚未上傳大頭照</p>
                    }

                </div>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <MyTextField
                        label="姓名"
                        value={basicInfo.employeeName}
                        variant="outlined"
                        helperText={standard.test(employeeName)?" ":"請勿空白以及輸入非法字元"}
                        error={standard.test(employeeName)?false:true}
                        onChange={editName}     
                    />                    
                    <UnitCodeSelect                   
                        id="unitCode"    
                        label="所屬單位"
                        //targetCode={unitCode}
                        targetCodeName={unitCodeName}
                        unitCodeList={unitCodeList}
                        sendData={(value, name)=>{  
                            setUnitCodeName(name)
                            dispatch({
                                type:"SET_BASIC_INFO",
                                basicInfo:{...basicInfo, unitCode:value, unitCodeName:name}
                            })
                        }}
                    />                    
                </div>
            </div>

            <div className={classes.flex}>
                <div className={classes.outlineBlock}>
                    級職：
                    <HibRaidos 
                        id="jobClass" 
                        defaultValue={basicInfo.jobClass}
                        setData={[
                            {id:"coordinator", name:"專員", value:"專員" },
                            {id:"supervisor", name:"主任", value:"主任"},
                            {id:"junior-manager", name:"襄理", value:"襄理"},
                            {id:"manager", name:"經理", value:"經理"},
                            {id:"regional-manager", name:"處經理", value:"處經理"}
                        ]}
                        sendData={(value)=>{  
                            dispatch({
                                type:"SET_BASIC_INFO",
                                basicInfo:{...basicInfo, jobClass:value}
                            })
                        }} 
                    />
                </div>                
                <div className={classes.outlineBlock}>
                    最高學歷：
                    <HibRaidos 
                        id="highestEducation" 
                        defaultValue={basicInfo.highestEducation}
                        setData={[
                            {id:"graduate", name:"研究所", value:"研究所"},
                            {id:"collage", name:"大學", value:"大學"},
                            {id:"specialist", name:"專科", value:"專科"},
                            {id:"senior", name:"高中(職)", value:"高中(職)"},
                            {id:"junior", name:"國中", value:"國中"}
                        ]}
                        sendData={(value)=>{                            
                            dispatch({
                                type:"SET_BASIC_INFO",
                                basicInfo:{...basicInfo, highestEducation:value}
                            })
                        }} 
                    />
                </div>            
            </div>

             {/*出生年月日 連絡電話 手機*/}
            <div className={classes.flex}>
                <DatePicker 
                    label="出生日期"
                    defaultValue={employeeBirth}
                    className ={classes.item}  
                    error={checkBirth}                          
                    closePicker={(value)=>{
                        //年齡換算
                        const birth=(1911+value[0])+"/"+value[1]+"/"+value[2]
                        const year = 1000 * 60 * 60 * 24 * 365;
                        const now = new Date();
                        const birthday = new Date(birth);                   
                        const age = parseInt((now - birthday) / year)
                        console.log((now - birthday) / year)
                        dispatch({
                            type:"SET_BASIC_INFO",
                            basicInfo:{
                                ...basicInfo,
                                employeeAge:age,
                                employeeBirthYear:parseInt(value[0]),                                     
                                employeeBirthMonth:parseInt(value[1]),                                     
                                employeeBirthDate:parseInt(value[2]),                                     
                            }
                        })
                        setEmployeeBirth([value[0], value[1], value[2]])
                        //setEmployeeAge(parseInt((now - birthday) / year))
                    }} 
                /> 

                <MyTextField 
                    label="聯絡電話"
                    value={employeeHomePhone}
                    variant="outlined"
                    helperText="範例：02-82513441"
                    size="small"
                    /*error={phone_reg.test(employeeHomePhone)?false:true}*/
                    onChange={editEmployeeHomePhone}
                />
          
                <MyTextField
                    label="手機"
                    value={employeeMobile}
                    variant="outlined"
                    size="small"
                    //helperText={mobile_reg.test(employeeMobile)?" ":"請輸入正確的行動電話格式 Ex：0987654321"}
                    //error={mobile_reg.test(employeeMobile)?false:true}                    
                    //20201023 新增 緊急連絡人電話不能與報聘者電話相同
                    helperText={
                        !mobile_reg.test(employeeMobile)?"請輸入緊急連絡人電話(手機格式)":
                        emergencyPhone == employeeMobile ? "緊急連絡人電話不能與報聘者電話相同":
                        " "
                    }
                    error={
                        emergencyPhone == employeeMobile ? true:
                        mobile_reg.test(employeeMobile) ? false:
                        true
                    }
                    onChange={editEmployeeMobile}
                />
            </div>
            
            <Divider/>
            {/*戶籍地址*/}
            <Grid container className={classes.flex} style={{maxWidth:1360}}>
                <Grid item md={12} lg={5} xl={5}>  
                    <div style={{display:"flex", flexWrap:"wrap"}}>                                    
                        <PostCodeSelect                   
                            id="domicilePostcode"    
                            label="戶籍郵遞區號"
                            targetCode={domicilePostcode}
                            postCodeList={postCodeList}
                            style={{paddingTop:12}}
                            sendData={(value, name)=>{
                                setDomicilePostcode(value)
                                dispatch({
                                    type:"SET_BASIC_INFO",
                                    basicInfo:{...basicInfo, domicilePostcode:value, domicilePostcodeName:name}
                                })
                            }}
                        />
                        <MyTextField    
                            id="domicileAddress"              
                            label="戶籍地址" 
                            size="small"
                            style={{width:250}}
                            //defaultValue={domicileAddress}
                            value={domicileAddress}
                            variant="outlined"
                            helperText={standard.test(domicileAddress)?" ":"請勿空白以及輸入非法字元"}
                            error={standard.test(domicileAddress)?false:true}
                            onChange={editDomicileAddress}    
                            onBlur={()=>{
                                setDomicileAddress(fullwidth(domicileAddress))
                                dispatch({
                                    type:"SET_BASIC_INFO",
                                    basicInfo:{...basicInfo, domicileAddress:fullwidth(domicileAddress)}
                                })
                            }} 
                                                            
                        />
                    </div>
                </Grid>
                <Grid item md={12} lg={2} xl={2}>
                    <Button variant="contained" color="primary" onClick={domicileToMailingAddr}>
                        通訊地址同戶籍地址
                    </Button>
                </Grid>
                <Grid item md={12} lg={5} xl={5}>                    
                    <div style={{display:"flex", flexWrap:"wrap"}}> 
                        {/*通訊地址*/}
                        <PostCodeSelect                        
                            id="mailingPostcode"
                            label="通訊郵遞區號"
                            size="small"
                            targetCode={mailingPostcode}
                            postCodeList={postCodeList}
                            style={{paddingTop:12}}
                            sendData={(value, name)=>{
                                setMailingPostcode(value)
                                dispatch({
                                    type:"SET_BASIC_INFO",
                                    basicInfo:{...basicInfo, mailingPostcode:value, mailingPostcodeName:name}
                                })
                            }}
                        />

                        <MyTextField                   
                            id="mailingPostcode"
                            label="通訊地址"
                            size="small"
                            style={{width:250}}
                            value={mailingAddress}
                            variant="outlined"
                            helperText={(standard).test(mailingAddress)?" ":"請勿空白以及輸入非法字元"}
                            error={(standard).test(mailingAddress)?false:true}
                            onChange={editMailingAddress}   
                            onBlur={()=>{
                                setMailingAddress(fullwidth(mailingAddress))
                                dispatch({
                                    type:"SET_BASIC_INFO",
                                    basicInfo:{...basicInfo, mailingAddress:fullwidth(mailingAddress)}
                                })
                            }}                                   
                        />
                    </div>      
                </Grid>
            </Grid>
            
            <Divider/>

            {/*email 匯款銀行*/}
            <div className={classes.flex} >
                <MyTextField 
                    label="電子郵件"
                    value={employeeEmail}
                    variant="outlined"
                    size="small"
                    helperText={email_reg.test(employeeEmail)?" ":"請輸入正確的電子郵件格式 Ex：hib@gmail.com"}
                    error={email_reg.test(employeeEmail)?false:true}
                    onChange={editEmployeeEmail}                                                                       
                />  

                <HibSelecter
                    label="匯款銀行"
                    defaultValue={remittanceBank}
                    data={remittanceBankList}
                    selectData={editRemittanceBank}
                />
                
                <MyTextField 
                    label="匯款帳號"
                    value={remittanceAccount}
                    variant="outlined"
                    size="small"
                    helperText={standard.test(remittanceAccount)?" ":"請輸入匯款帳號"}
                    error={standard.test(remittanceAccount)?false:true}
                    onChange={editRemittanceAccount}                                                                       
                />     
            </div>
            <Divider/>
            <div style={{marginBottom:20}}>               
                <Checkbox
                    checked={hasFamilyIn}
                    onChange={()=>{
                        setHasFamilyIn(!hasFamilyIn)
                    }}                    
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />已有家屬於本公司報聘
                <Collapse in={hasFamilyIn}>
                    <MyTextField
                        label="員工姓名"
                        defaultValue={hasFamilyName}
                        variant="outlined"
                        size="small"
                        onChange={(event)=>{
                            dispatch({
                                type:"SET_BASIC_INFO",
                                basicInfo:{...basicInfo, hasFamilyName:event.target.value}
                            })     
                        }}                 
                    />
                </Collapse>
            </div>
            <Divider/>
            
            {/*緊急連絡人*/}
            <div className={classes.flex}> 
                <MyTextField
                    label="緊急連絡人姓名"
                    defaultValue={emergencyName}
                    variant="outlined"
                    size="small"
                    helperText={standard.test(emergencyName)?" ":"請輸入緊急連絡人姓名"}
                    error={standard.test(emergencyName)?false:true}
                    onChange={(event)=>{
                        setEmergencyName(event.target.value)
                        setHeirName(event.target.value)
                        dispatch({
                            type:"SET_BASIC_INFO",
                            basicInfo:{...basicInfo,
                                emergencyName:event.target.value,
                                heirName:event.target.value
                            }
                        })     
                    }}                 
                />

                <MyTextField
                    label="緊急連絡人電話"
                    defaultValue={emergencyPhone}
                    variant="outlined"
                    size="small"
                    //20201023 新增 緊急連絡人電話不能與報聘者電話相同
                    helperText={
                        !mobile_reg.test(emergencyPhone)?"請輸入緊急連絡人電話(手機格式)":
                        emergencyPhone == employeeMobile ? "緊急連絡人電話不能與報聘者電話相同":
                        " "
                    }
                    error={
                        emergencyPhone == employeeMobile ? true:
                        mobile_reg.test(emergencyPhone) ? false:
                        true
                    }
                    onChange={(event)=>{
                        setEmergencyPhone(event.target.value)
                        setHeirPhone(event.target.value)

                        dispatch({
                            type:"SET_BASIC_INFO",
                            basicInfo:{...basicInfo,
                                emergencyPhone:event.target.value,
                                heirPhone:event.target.value
                            }
                        })
                    }}                 
                />
                
                <MyTextField
                    label="與緊急連絡人之關係"
                    defaultValue={emergencyRelationship}
                    variant="outlined"
                    size="small"
                    helperText={standard.test(emergencyRelationship)?" ":"請輸入與緊急連絡人之關係"}
                    error={standard.test(emergencyRelationship)?false:true}
                    onChange={(event)=>{
                        setEmergencyRelationship(event.target.value)
                        setHeirRelationship(event.target.value)
                        dispatch({
                            type:"SET_BASIC_INFO",
                            basicInfo:{...basicInfo,
                                emergencyRelationship:event.target.value,
                                heirRelationship:event.target.value
                            }
                        })
                    }}                 
                />
            </div>

            <div className={classes.flex}>
                <p style={{fontSize:13}}>※系統預設緊急連絡人資料自動帶入至繼承人資料，欲修改者請自行到以下欄位變更。</p>
            </div>
            
            {/*繼承人*/}

            <div className={classes.flex}> 
                <MyTextField
                    label="繼承人姓名"
                    value={heirName}
                    //defaultValue={heirName}
                    helperText=" "
                    variant="outlined"
                    size="small"
                    onChange={(event)=>{
                        setHeirName(event.target.value)
                        dispatch({
                            type:"SET_BASIC_INFO",
                            basicInfo:{...basicInfo, heirName:event.target.value}
                        })     
                    }}                 
                />

                <MyTextField
                    label="繼承人電話"
                    value={heirPhone}
                    //defaultValue={heirPhone}
                    helperText=" "
                    variant="outlined"
                    size="small"
                    onChange={(event)=>{
                        setHeirPhone(event.target.value)
                        dispatch({
                            type:"SET_BASIC_INFO",
                            basicInfo:{...basicInfo, heirPhone:event.target.value}
                        })     
                    }}                 
                />

                <MyTextField
                    label="與繼承人之關係"
                    value={heirRelationship}
                    //defaultValue={heirRelationship}
                    helperText=" "
                    variant="outlined" 
                    size="small"    
                    onChange={(event)=>{
                        setHeirRelationship(event.target.value)
                        dispatch({
                            type:"SET_BASIC_INFO",
                            basicInfo:{...basicInfo, heirRelationship:event.target.value}
                        })                           
                    }}                 
                />
            </div>
            
           
            <Divider/>

            <div className={classes.flex}> 
                <Checkbox
                    checked={installLineSecretary}
                    onChange={()=>{
                        setInstallLineSecretary(!installLineSecretary)
                    }}              
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    style={installLineSecretary?{}:{color:"#f00"}}
                /><span style={installLineSecretary?{}:{color:"#f00"}}>已確定安裝Line超人秘書或Line Notify</span>                        
                <div style={{textAlign:"center", marginLeft:20}}>
                    <h4 >Line超人秘書QR code連結</h4>
                    <img style={{border:"1px solid #999", padding:10}} src="./assets/line.jpg"/>
                </div>
                <div style={{textAlign:"center", marginLeft:20}}>
                    <h4 >Line Notify QR code連結</h4>
                    <img style={{width:180, border:"1px solid #999", padding:10}} src="./assets/line_notify.svg"/>
                </div>
            </div>
            
            <Divider/>

            <div className={classes.flex}> 
                <Checkbox
                    checked={mailContract}
                    onChange={event=>{
                        setMailContract(!mailContract)
                    }}              
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                /><span>是否於簽約完成後收到合約副本</span>                
            </div>


        </Box>
    )
}

export default BasicInfoForm