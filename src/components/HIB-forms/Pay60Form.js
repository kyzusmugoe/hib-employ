import React, {useEffect} from 'react';
import { useState } from 'react';

import {Typography, Container, Checkbox, Card,  Box,  Grid, makeStyles, Collapse, Button, styled  } from '@material-ui/core';

export default ({checkForm})=>{
    
    
    //const [myText, setMyText] = useState("")
   // const [myError, setMyError] = useState(false)     
    const [agree, setAgree] = useState(false)
    const [IDcardFront, setIDcardFront] = useState("")
    const [IDcardBack, setIDcardBack] = useState("")
    const [bankFront, setBankFront] = useState("")
    
    //表單檢查區    
    useEffect(()=>{
        if(/*檢查項*/
            agree == true
        ){
            checkForm(true)
        }else{
            checkForm(false)
        }
        //console.log(formAccess)
    },[
        /*需檢查的值*/
        agree
    ])
    

    return (
        <div className="App">
            <Typography variant="h6">本公司辦理員工誠實險部分，保額1000萬元，每月<span style={{color:"#f30"}}>60元</span>，將以年繳的方式收取，於每2月底從薪資中扣除。</Typography>
            <Checkbox
                checked={agree}
                onChange={()=>{
                    setAgree(!agree)
                }}                    
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />我同意上述內容
        </div>
    );
}

