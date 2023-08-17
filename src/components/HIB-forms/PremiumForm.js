import React, {useEffect} from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {  HibSelecter} from './FormsUIcomponents/InsItem'
import {TextField, Checkbox,  Collapse, styled, Grid} from '@material-ui/core';
import UploadImage from './FormsUIcomponents/UploadImage'
import AttachmentTable_1 from './Tables/AttachmentTable_1'

const MyUpload = styled("div")({
    minWidth:200,
    margin:"10px",
    padding:"50px",
    border:"1px solid #ccc",
    borderRadius:10,
    textAlign:"center",
    position:"relative",
    color:"#666",
    '& img':{
        maxWidth:200,
        maxHeight:200 
    },
    '& input':{
        position:"absolute",
        top:0,
        left:0,
        opacity:0,
        width:"100%",
        height:"100%"
    },
});

//元件

/*const MyCheckBoxCollection=({defalutValue="", title="", label="", sendData})=>{    
    const [agree, setAgree] = useState(false)
    
    return(
        <div style={{display:"flex", alignItems:"center", marginBottom:10}}>
            <div style={{width:160}}>
                <Checkbox                    
                    checked={agree}
                    onChange={()=>{
                        setAgree(!agree)
                    }}                    
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />{title}
            </div>
        
            <Collapse in={agree}>
                <TextField variant="outlined" label={label}/>
            </Collapse>
        </div>   
    ) 
}*/

const PersonalForm=({checkForm})=>{
    const dispatch = useDispatch()    
    const premium = useSelector(state => state.premium)
    const [prData, setPrData] = useState(premium.prData)
    const [prList, setPrList] =useState({
        list:[
            {id:"PR_1",  value:"PR_1",  checked:false, name:"6項所得或收入皆免扣取", typeSub:"6項所得或收入皆免扣取", fileType:"無投保資格者:主動告知後,由扣費義務人向健保局確認。"},
            {id:"PR_2",  value:"PR_2",  checked:false, name:"第5類被保險人(低收入戶)", typeSub:"6項所得或收入皆免扣取", fileType:"鄉(鎮、市、區)公所核發的有效低收入戶證明。"},
            {id:"PR_3",  value:"PR_3",  checked:false, name:"第2類被保險人", typeSub:"薪資所得", fileType:"職業工會出具的在保證明或繳費證明。"},
            {id:"PR_4",  value:"PR_4",  checked:false, name:"專門職業及技術人員自行執業者(以執行業務所得為投保金額)", typeSub:"執行業務收入", fileType:"投保單位出具的在保證明。"},
            {id:"PR_5",  value:"PR_5",  checked:false, name:"自營作業而參加職業工會者(以執行業務所得為投保金額)", typeSub:"執行業務收入", fileType:"職業工會出具的在保證明或繳費證明。"},
            {id:"PR_6",  value:"PR_6",  checked:false, name:"兒童及少年", typeSub:"未達基本工資之兼職薪資所得", fileType:"身分證明文件。"},
            {id:"PR_7",  value:"PR_7",  checked:false, name:"中低收入戶", typeSub:"未達基本工資之兼職薪資所得", fileType:"鄉(鎮、市、區)公所核發的有效中低收入戶證明。"},
            {id:"PR_8",  value:"PR_8",  checked:false, name:"中低收入老人", typeSub:"未達基本工資之兼職薪資所得", fileType:"社政機關核定之證明文件。"},
            {id:"PR_9",  value:"PR_9",  checked:false, name:"領取身心障礙者生活補助費", typeSub:"未達基本工資之兼職薪資所得", fileType:"社政機關核定之證明文件。"},
            {id:"PR_10", value:"PR_10", checked:false, name:"勞工保險投保薪資未達基本工資之身心障礙者", typeSub:"未達基本工資之兼職薪資所得", fileType:"社政機關核發有效期限內之身心障礙手冊或證明及勞工保險證明文件"},
            {id:"PR_11", value:"PR_11", checked:false, name:"國內就學之大專生且無專職工作者", typeSub:"未達基本工資之兼職薪資所得", fileType:"學校之註冊單或蓋有註冊章之學生證及無專職工作聲明書。"},
            {id:"PR_12", value:"PR_12", checked:false, name:"符合健保法第100條所定之經濟困難者", typeSub:"未達基本工資之兼職薪資所得", fileType:"經濟困難之證明(依全民健康保險經濟困難認定標準認定)。"}
        ]
    })
    const [prFileType, setPrFileType] =useState("")
    const [prType, setPrType] = useState(premium.prType)
    const [premiumRemark, setPremiumRemark] = useState(premium.premiumRemark)
    const [attachment, setAttachment] = useState(premium.premiumAttachment)

    const [isGuild , setIsGuild] = useState(premium.prType=="PR_5"?true:false)

    /*useEffect(()=>{        
    }, [isGuild])
*/
    /*const [myData, setMyData] = useState({
        guildName:"",
        isIdentity:"",
        nonGuild:"",
    })

    useEffect(()=>{
    }, [myData])*/

    useEffect(()=>{        
        if(prType){
            let _list=[]
            for(const item of prList.list){
                if(item.value  == prType){
                    setPrFileType(item.fileType)//附件類型
                    //break;
                    item.checked = true;
                    _list.push(item)
                    dispatch({
                        type:"SET_PREMIUM", 
                        premium:{
                            ...premium,                                     
                            prTypeName:item.name,
                            typeSub:item.typeSub
                        }
                    })
                }else{
                    item.checked = false;
                    _list.push(item)
                }           
                //console.log(item)
            }
            setPrList({
                ...prList,
                list:_list
            })
           // console.log(prType)
        }      

        if(prType!="PR_5"){
            setIsGuild(false)            
        }

    }, [prType]) 
    
    /*useEffect(()=>{
    }, [prType])
    */

    const editPremiumRemark = (event)=>{
        setPremiumRemark(event.target.value)
        dispatch({
            type:"SET_PREMIUM",
            premium:{
                ...premium,
                premiumRemark:event.target.value
            }
        })
    }


    return (
        <div>
            <p>一、法源依據:健保法32:未具投保資格、喪失投保資格或保險對象有免扣取補充保險貨之事 ,應於受領給付前,主動告知扣費義務人,得免扣取補充保</p>
            <p>二、説明:依據健保法32,本人符合下述狀况,不需繳交補充保險費,請貴單位勿扣取補充保險費, 若有任何不實,本人願負相關法律責任。</p>
            <div >
                <div style={{maxWidth:480,margin:" 0 auto", border:"3px solid #c6da9d", padding:10, borderRadius:10, textAlign:"center"}}>
                    <div >
                    
                        <TextField
                            style={{width:200, margin:10}}
                            label="本人目前健保投保單位為"
                            variant="outlined"
                            defaultValue={premiumRemark}
                            onChange={editPremiumRemark}                
                        />
                        <div>                        
                            <span>投保單位是否為工會?</span>            
                            <Checkbox
                                checked={isGuild}
                                onChange={()=>{
                                    setPrType('PR_5')                            
                                    dispatch({
                                        type:"SET_PREMIUM",
                                        premium:{
                                            ...premium, 
                                            prType:"PR_5",
                                            prTypeName:"自營作業而參加職業工會者(以執行業務所得為投保金額)",
                                            typeSub:"執行業務收入"
                                        }
                                    })                         
                                    setIsGuild(true)
                                }}                    
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            是                        
                            <Checkbox
                                checked={!isGuild}
                                onChange={()=>{
                                    console.log(prType)
                                    setIsGuild(false)
                                }}                    
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            否
                            <Collapse in={!isGuild}>
                                <span>免扣取對象：</span>
                                <div>
                                    <HibSelecter
                                        data={prList}
                                        defaultValue={prType}
                                        selectData={(list, detail)=>{
                                            setPrType(detail.value)
                                            dispatch({type:"SET_PREMIUM", 
                                                premium:{
                                                    ...premium,
                                                    prType:detail.value,                                            
                                                    prTypeName:detail.name,
                                                    typeSub:detail.typeSub
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </Collapse>
                        </div>
                    </div>
                
                    <div style={{textAlign:"center"}}>
                        <UploadImage
                            label="投保單位證明"
                            defaultValue={attachment}
                            canvasWitdh={600}
                            canvasWitdh={800}
                            sendData={(img)=>{
                                setAttachment(img)
                                dispatch({ type:"SET_PREMIUM",  premium:{...premium, premiumAttachment:img}})
                            }}
                            onclick={()=>{                        
                                dispatch({ type:"SET_PREMIUM",  premium:{...premium, premiumAttachmentIsChange:1}})
                            }}
                        />
                        <p style={{color:"#0027ff"}}>{prFileType}</p>
                    </div>
                </div>
                
                <p>未黏貼證明時一律依規定扣取補充保險費</p>
                <p>聲明人若有變更身分別時，應於20日前主動提出予公司更正，此表單可至網站下載</p>
                <p>身分別有變更位提出時，怒無法返回已後取之補充保費</p>
                {
                /**
                 * 
                <div style={{paddingLeft:50}}>                    
                    <AttachmentTable_1/>
                </div>
                 */
                 }
            </div>
        </div>
    );
}

export default PersonalForm;