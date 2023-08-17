import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import {styled} from '@material-ui/core';

import UploadImage from './FormsUIcomponents/UploadImage'

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

export default ({checkForm})=>{
    
    const dispatch = useDispatch()    
    const state = useSelector(state => state)

    const [IDcardFront, setIDcardFront] = useState(state.IDcardFront)//附件資料，身分證正面
    const [IDcardBack, setIDcardBack] = useState(state.IDcardBack)//附件資料，身分證背面
    const [bankFront, setBankFront] = useState(state.bankFront)//附件資料，存摺影本

    //表單檢查區    
    useEffect(()=>{
        if(/*檢查項*/
            IDcardFront && IDcardBack && bankFront
        ){
            checkForm(true)
        }else{
            checkForm(false)
        }
    },[
        /*需檢查的值*/
        IDcardFront, IDcardBack ,bankFront
    ])

  /*  useEffect(()=>{       
        console.log(IDcardFront)
        console.log("!")
    },[])
*/
    return (
        <div className="App" style={{maxWidth:725}}>
            <p>請拍攝或上傳橫式照片，帳號部分務必清楚可辨。點擊縮圖可放大預覽</p>
            <div style={{display:"flex", flexWrap:"wrap"}}>
                <UploadImage
                    label="身分證正面"
                    defaultValue={IDcardFront}
                    canvasWitdh={400}
                    canvasHeight={300}
                    sendData={(img)=>{
                        setIDcardFront(img)
                        dispatch({ type:"ATTACHMENTS_ID_F", IDcardFront:img})
                    }}                                        
                    onclick={()=>{                        
                        dispatch({ type:"ATTACHMENTS_ID_F_IS_CHANGE", IDcardFrontIsChange:1 })
                    }}
                />
                <UploadImage
                    label="身分證背面"
                    defaultValue={IDcardBack}
                    canvasWitdh={400}
                    canvasHeight={300}
                    sendData={(img)=>{
                        setIDcardBack(img)
                        dispatch({ type:"ATTACHMENTS_ID_B", IDcardBack:img })
                    }}                    
                    onclick={()=>{                        
                        dispatch({ type:"ATTACHMENTS_ID_B_IS_CHANGE", IDcardBackIsChange:1 })
                    }}
                />
                <UploadImage
                    label="存摺正面"
                    defaultValue={bankFront}
                    canvasWitdh={600}
                    canvasHeight={480}
                    sendData={(img)=>{                        
                        setBankFront(img)
                        dispatch({ type:"ATTACHMENTS_BANK", bankFront:img})
                    }}                    
                    onclick={()=>{                        
                        dispatch({ type:"ATTACHMENTS_BANK_IS_CHANGE", bankFrontIsChange:1 })
                    }}
                />
            </div>
        </div>
    );
}


