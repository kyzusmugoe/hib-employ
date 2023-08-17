import React,{useState, useEffect, useContext, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SysDialog from './components/SysDialog'
import CheckUser from './components/HIB-forms/CheckUser'
import PersonalForm from './components/HIB-forms/PersonalTestForm'
import BasicInfoForm from './components/HIB-forms/BasicInfoTestForm'
import AttachmentForm from './components/HIB-forms/AttachmentForm'
import Pay60Form from './components/HIB-forms/Pay60Form'
import ContractForm from './components/HIB-forms/ContractForm'
import SpecificationForm from './components/HIB-forms/SpecificationForm'
import ExpForm from './components/HIB-forms/ExpForm'
import PremiumForm from './components/HIB-forms/PremiumForm'
import SameIndustryForm from './components/HIB-forms/SameIndustryForm'
import SignPad from './components/Signature'
import WebServiceContext from './webservice/WebServiceContext'
import { pdf, PDFViewer, PDFDownloadLink, BlobProvider  } from '@react-pdf/renderer';

import PDFpage from './components/PDF-factory/PDFpageTest'

import { makeStyles } from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, StepContent, Button, Fade, Modal, Backdrop , styled, Collapse} from '@material-ui/core/';
import { set } from 'date-fns';
import CountriresCode from './components/HIB-forms/FormsUIcomponents/CountriresCode'
import { Document, Page,  pdfjs } from 'react-pdf';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import JSZip from 'jszip'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        paddingBottom:50
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const countriresCode = CountriresCode

const MyApp = ()=> {
    const classes = useStyles()
    const dispatch = useDispatch()
    const myData = useSelector(state => state)
    //const insStateChecker  = useSelector(state =>state.lifeRep.insuredType.list[2].checked)
    const [activeStep, setActiveStep] = React.useState(0)
    
    const webservice = useContext(WebServiceContext)    
    //let needPDF = true//判斷是否需要傳送PDF
    //let insureType="";
    const _url = new URL(document.location.href)
    const insurer = _url.searchParams.get('insurer')
    const tempFileUid = _url.searchParams.get('TempFileUid')
    const [formPages] =useState([
        {id:"personal", title:"個人資料告知書"},      
        {id:"sign", title:"簽署板"},
        {id:"preview", title:"預覽"},
    ])

    //20201019新增，暫存資料讀取控制器，此變數會控制welcome的模組進行讀取完成後的確認
    const [loadingAccess, setLoadingAccess] = useState(false)
    const [boardType, setBoardType] = useState("welcome")
    const [boardMesg, setBoardMesg] = useState("")
    
    const mobile = useMediaQuery("(max-width:640px)");


    //20201103新增PDF放大縮小的控制
    const [PDFscale, setPDFscale] = useState(1)
    
    const handleNext = event => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    

    //scroll控制
    //const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)     
    //const myRef = useRef(null)
    //const executeScroll = () => scrollToRef(myRef)
    
    //表單通過驗證
    //const [personalAccess, setPersonalAccess] = useState(false)
    const [formAccess, setFormAccess] = useState(false)
    const [tempAccess, setTempAccess] = useState(false)//暫存檔控制，目前在PremiumForm階段才會開啟暫存功能
    const [tempPDF, setTempPDF] = useState("")//PDF資料，完成PDF製作後會先蒐集PDF的base64字串到這裡，在透過按鈕送到server
    
    //改變卷軸scrollTop的位置，目前使用硬算的方式移動到指定的位置
    useEffect(()=>{
       window.scrollTo(0, 24+8+ activeStep*(40+32))
       console.log(activeStep)
       if(activeStep == 2){
           makePDf()
           console.log("makePDf")
       } 
    },[activeStep])
    

    const [open, setOpen]=useState(false)

    //民國生日轉年齡
    const birthToAge = (year, month, data)=>{
        const birth=(1911+year)+"/"+month+"/"+data
        const _year = 1000 * 60 * 60 * 24 * 365;
        const now = new Date();
        const birthday = new Date(birth);
        return parseInt((now - birthday) / _year);
    }

    const basicInfo = useSelector(state => state.basicInfo)
    
    //儲存暫存資料
    const saveTempFile = ()=>{
        setBoardType("send")
        setBoardMesg("資料上傳中，請稍後...")
        setLoadingAccess(false)
        //彈出式視窗的控制----end
        setTimeout(()=>{    
            webservice.asyncSaveTempFile(myData).then((res)=>{
                console.log(res.status)
                if(res.status == "OK" ){
                    setBoardMesg("暫存成功，將導回列表")
                    window.location.href = "../../html/NewSales.html";
                }else{
                    setBoardMesg("暫存失敗，請聯絡資訊部")                                           
                }
            });
        }, 500)
    }

    //儲存PDF資料並且儲存暫存資料
    const saveDataPdfFile = ()=>{        
        //彈出式視窗的控制
        setBoardType("send")
        setBoardMesg("PDF上傳中，請稍後...")
        setLoadingAccess(false)
        //彈出式視窗的控制----end
        setTimeout(()=>{   
             
            pdf(<PDFpage myData={myData}/>).toBlob().then(blob=>{
                var reader = new FileReader();
                reader.readAsDataURL(blob)
                reader.onload = (e)=>{  
                    //console.log(reader.result)
                    setTempPDF(reader.result)                    
                    setBoardMesg("PDF上傳中，請稍後...")
                   
                    webservice.asyncUploadPDF(reader.result, myData).then((res)=>{
                        //console.log(res)
                        setLoadingAccess(true)
                        if(res.data.status == "OK" && res.pdf.status == "OK"){                            
                            if(res.data.lineNotify == "FAIL"){
                                setBoardMesg("資料已上傳成功但Line推播通知失敗，請聯絡總公司人事重新推送審核訊息。")
                            }else{
                                setBoardMesg("資料上傳成功!")                        
                            }
                            //alert("上傳成功，將導回列表")
                        }else{
                            setBoardMesg("上傳失敗，請聯絡資訊部")
                            //alert("上傳失敗，請聯絡資訊部")                                           
                        }
                    })
                }
            })
        
        },500)
    }

    /*
    //20210831 更新流程，
    儲存文字以及圖片資料後上傳到server，再由server進行PDF合成作業
    */

    const saveDataAndMakePDF = ()=>{        
        //彈出式視窗的控制
        setBoardType("send")
        setBoardMesg("PDF上傳中，請稍後...")
        setLoadingAccess(false)
        //彈出式視窗的控制----end
        webservice.asyncSaveDataAndMakePDF(myData).then((res)=>{       
            console.log(res)
            setLoadingAccess(true)
            if(res.data.status == "OK"){                            
                if(res.data.lineNotify == "FAIL"){
                    setBoardMesg("資料已上傳成功但Line推播通知失敗，請聯絡總公司人事重新推送審核訊息。")
                }else{
                    setBoardMesg("資料上傳成功!")                        
                }
                //alert("上傳成功，將導回列表")

                //20210924 送出 完成的後端流程
                webservice.goEndStop(res.data.NSID);
            }else{
                setBoardMesg("上傳失敗，請聯絡資訊部")
                //alert("上傳失敗，請聯絡資訊部")                                           
            }
        })
    }

    const makePDf = ()=>{
        console.log("makePDf")
        pdf(<PDFpage myData={myData}/>).toBlob().then(blob=>{
            var reader = new FileReader();
            reader.readAsDataURL(blob)
            reader.onload = (e)=>{  
                console.log(reader.result)
                setTempPDF(reader.result)                
            }
        })
    }

    useEffect(()=>{
        //取得login資料
         webservice.asyncLogin().then((res)=>{
            dispatch({
                type:"SET_LOGIN_INFO",
                loginInfo:res
            })
        });

        //取得郵遞區號
        webservice.asyncCitiesNumber().then(res=>{   
            dispatch({
                type:"SET_POST_CODE_LIST",
                postCodeList:res
            })
        })

        //抓取暫存資料
        if(tempFileUid && tempFileUid !="NEW"){           
            //有資料的不需驗證簽約者
            setTempAccess(true)
            setOpen(true)
            webservice.asyncTempFileUid(tempFileUid).then((res)=>{
                const _d= res[0];               
                //紀錄NSID
                dispatch({type:"SET_NSID", NSID:_d.NSID})   
                res[1].map(item=>{
                    switch(item.ImgType){
                        case "大頭照":
                            webservice.asyncGetImg(item.FileID).then(resolve=>{
                                if(resolve){
                                    dispatch({type:"GET_BASIC_PHOTO", employeePhoto:resolve, employeePhotoIsChange:0})
                                }else{
                                    console.log("大頭照 取得失敗")
                                }
                            })
                        break;
                        case "身分證正面":
                            webservice.asyncGetImg(item.FileID).then(resolve=>{
                                if(resolve){
                                    dispatch({type:"ATTACHMENTS_ID_F", IDcardFront:resolve, IDcardFrontIsChange:0})
                                }else{
                                    console.log("身分證正面 取得失敗")
                                }
                            })
                        break;
                        case "身分證背面":          
                            webservice.asyncGetImg(item.FileID).then(resolve=>{
                                if(resolve){
                                    dispatch({type:"ATTACHMENTS_ID_B", IDcardBack:resolve, IDcardBackIsChange:0})
                                }else{
                                    console.log("身分證背面 取得失敗")
                                }
                            })
                        break;                        
                        case "存摺封面":
                            webservice.asyncGetImg(item.FileID).then(resolve=>{
                                if(resolve){
                                    dispatch({type:"ATTACHMENTS_BANK", bankFront:resolve, bankFrontIsChange:0})
                                }else{
                                    console.log("存摺封面 取得失敗")
                                }
                            })
                        break;  
                        case "投保單位證明":
                            webservice.asyncGetImg(item.FileID).then(resolve=>{
                                if(resolve){
                                    dispatch({
                                        type:"SET_PREMIUM",
                                        premium:{
                                            premiumRemark:item.PremiumRemark,
                                            prType:item.PrType,
                                            premiumAttachment:resolve,
                                            premiumAttachmentIsChange:0
                                        }
                                    })
                                }else{
                                    console.log("投保單位證明 取得失敗")
                                }
                            })
                        break;
                        case "同業佐證":
                            webservice.asyncGetImg(item.FileID).then( resolve=> {
                                if(resolve){
                                    dispatch({
                                        type:"ADD_EXP",
                                        exp:{
                                            EID:item.ID,
                                            rowType:"Sam",
                                            compName: item.CompName,
                                            job:item.JobClass, 
                                            sy:item.StartDate.substr(0,3), 
                                            sm:item.StartDate.substr(3,2), 
                                            sd:item.StartDate.substr(5,2), 
                                            ey:item.EndDate.substr(0,3), 
                                            em:item.EndDate.substr(3,2), 
                                            ed:item.EndDate.substr(5,2), 
                                            evidence:resolve,
                                            evidenceIsChange:0,
                                            state:"LOAD"
                                        }
                                    })
                                }else{
                                    console.log("同業佐證 取得失敗")
                                }
                            })
                        break;
                        case "異業佐證":
                            webservice.asyncGetImg(item.FileID).then( resolve=> {
                                if(resolve){
                                    dispatch({
                                        type:"ADD_EXP",
                                        exp:{                                            
                                            EID:item.ID,
                                            rowType:"Def",
                                            compName: item.CompName,
                                            jobNature:item.JobNature, 
                                            industry:item.Industry, 
                                            sy:item.StartDate.substr(0,3), 
                                            sm:item.StartDate.substr(3,2), 
                                            sd:item.StartDate.substr(5,2), 
                                            ey:item.EndDate.substr(0,3), 
                                            em:item.EndDate.substr(3,2), 
                                            ed:item.EndDate.substr(5,2), 
                                            evidence:resolve,
                                            evidenceIsChange:0,
                                            state:"LOAD"
                                        }
                                    })
                                }else{
                                    console.log("異業佐證 取得失敗")
                                }
                            })
                        break;
                    }
                })
                //console.log(_d)
                dispatch({
                    type:"SET_TEMP_DATA",
                    basicInfo:{
                        ...basicInfo,
                        domicilePostcode:_d.DomicilePostcode,
                        domicileAddress:_d.DomicileAddress,
                        emergencyName:_d.EmergencyName,
                        emergencyPhone:_d.EmergencyPhone ,
                        emergencyRelationship:_d.EmergencyRelationship,
                        employeeBirthYear:_d.EmployeeBirth.substr(0,3),//要保人出生年月日
                        employeeBirthMonth:_d.EmployeeBirth.substr(3,2),//要保人出生年月日
                        employeeBirthDate:_d.EmployeeBirth.substr(5,2),//要保人出生年月日
                        employeeEmail:_d.EmployeeEmail,
                        employeeHomePhone:_d.EmployeeHomePhone,
                        employeeID:_d.EmployeeID,
                        employeeMobile:_d.EmployeeMobile,
                        employeeName:_d.EmployeeName,
                        hasFamilyName:_d.HasFamilyName,
                        heirName:_d.HeirName,
                        heirPhone:_d.HeirPhone,
                        heirRelationship:_d.HeirRelationship,
                        highestEducation:_d.HighestEducation,
                        jobClass:_d.JobClass,
                        mailingPostcode:_d.MailingPostcode,
                        mailingAddress:_d.MailingAddress,
                        remittanceAccount:_d.RemittanceAccount,
                        remittanceBank:_d.RemittanceBank,
                        unitCode:_d.Name_S,
                        unitCodeName:_d.Name_S,
                        mailContract:_d.MailContract
                    }
                })
                
                setLoadingAccess(true)//讀取完成，在welcome畫面秀出按鈕

            })
        }else{
            setLoadingAccess(true)//新件直接讀取完成
        }
    },[])
    
	const [numPages, setNumPages] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);   
    const [pageButtons, setPageButtons] = useState([])
    
    const onDocumentLoadSuccess = pdf => {
		setNumPages(pdf.numPages);

		let btns=[]
		for(let i=1;i<=pdf.numPages;i++){
			btns.push(i)
		}
		setPageButtons(btns)
		
		pdf.getData().then((res)=>{
			console.log(res)
		})
	}

    const testData = event =>{
        setActiveStep(8)
        dispatch({type:"TEST"})
        setOpen(true)
    }

    const findPostCodeName = code =>{
        console.log(myData.postCodeList, code)
    }

    return (      
    <div className={classes.root}>
        


        <Collapse in={true}>
            <Stepper activeStep={activeStep} orientation="vertical" style={{padding:mobile?10:30, marginBottom:60, borderRadius:10}}>
            {formPages.map((item, index) => (
                <Step key={item.id}>            
                    <StepLabel 
                        style={{cursor:"pointer"}} 
                        onClick={(event)=>{ 
                            activeStep > index && // personalAccess &&
                            setActiveStep(index)
                        }}
                      
                    >
                    <span id={"labelID-"+index} style={{ color:"#729a1f",fontSize:"1.6em", fontWeight:"bolder"}}>{item.title}</span>
                    </StepLabel>
                    <StepContent  >
                    
                <div className={classes.actionsContainer} >                    
                    { 
                        item.id === "personal" &&
                        <PersonalForm 
                            checkForm={(checker)=>{             
                                setFormAccess(checker)
                            }}
                        />                 
                    }
                    {
                        item.id === "basicInfo" && 
                        <BasicInfoForm 
                            checkForm={(checker)=>{
                                setTempAccess(checker)
                                setFormAccess(checker)                            
                            }}
                        />
                    }
                    {
                        item.id === "attachment" && 
                        <AttachmentForm 
                            checkForm={(checker)=>{
                                setFormAccess(checker)
                            }}
                        />
                    }               
                    {
                        item.id === "pay60" && 
                        <Pay60Form 
                            checkForm={(checker)=>{
                                setFormAccess(checker)
                            }}                     
                        />
                    }  
                    {
                        item.id === "contract" && 
                        <ContractForm 
                            checkForm={(checker)=>{
                                setFormAccess(checker)
                            }}                     
                        />
                    }  
                    {
                        item.id === "specification" && 
                        <SpecificationForm 
                            checkForm={(checker)=>{
                                setFormAccess(checker)
                            }}                     
                        />
                    }  
                    {
                        item.id === "exp" && 
                        <ExpForm 
                            checkForm={(checker)=>{
                                setFormAccess(true)
                            }}  
                        />
                    }               
                    {
                        item.id === "sameIndustry" && 
                        <SameIndustryForm                     
                            checkForm={(checker)=>{
                                setFormAccess(checker)
                            }}                      
                        />
                    }
                    {
                        item.id === "premium" && 
                        <PremiumForm                     
                            checkForm={(checker)=>{
                                setFormAccess(checker)
                                setTempAccess(checker)
                            }}                      
                        />
                    }
                    {
                        item.id === "sign" &&
                        <SignPad 
                            checkSign={(checker)=>{
                                setFormAccess(checker)
                            }}
                        />
                    }
                    {
                    item.id === "preview" &&
                        <div>   
                            {
                                pageButtons.map((item, index)=>{
                                    return(
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            key={"page_btn_"+item}
                                            style={{margin:3}}
                                            onClick={()=>{
                                                setPageNumber(item)
                                            }
                                        }>第{item}頁</Button>
                                    )
                                    })

                            }
                            {
                                tempPDF !="" &&
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        key={"page_btn_"+item}
                                        style={{margin:3}}
                                        onClick={()=>{
                                            setPDFscale(PDFscale+.5 >5?5:PDFscale+.5)
                                        }
                                    }>放大</Button>
                                    
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        key={"page_btn_"+item}
                                        style={{margin:3}}
                                        onClick={()=>{
                                            setPDFscale(PDFscale-.5 <1?1:PDFscale-.5)
                                        }
                                    }>縮小</Button>
                                </div>    
                            }
                           
                            {
                                /*
                                    <PDFViewer width={1000} height={1200}>
                                        <PDFpage myData={myData}/>
                                    </PDFViewer>
                                */
                            }
                            {
                                <div style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    backgroundColor:tempPDF?"#aaa":"#fff",
                                    padding:10,
                                    overflow:"scroll"
                                }}>
                                    <Document 
                                        file={tempPDF}
                                        onload={()=>{console.log("isPDF")}} 
                                        onLoadSuccess={onDocumentLoadSuccess}                                    
                                        noData="PDF資料已經準備好，現在進行處理中"
                                    >
                                        <Page pageNumber={pageNumber} scale={PDFscale}/>
                                    </Document>
                                </div>                          
                            }
                            
                        </div>                                     
                    }
                    </div>
                    <div>
                        {
                            activeStep != formPages.length - 1 &&
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                                disabled={!formAccess}
                                //disabled={!personalAccess}
                            >下一步</Button>
                        }
                    </div>
                </StepContent>
                </Step>
                
            ))}
        
            
        </Stepper>
                 
                
        </Collapse>
    </div>
  );
}

export default MyApp