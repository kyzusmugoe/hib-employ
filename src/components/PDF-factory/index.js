
import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import { Page, Text, View, Image, Document, StyleSheet, Font } from '@react-pdf/renderer';


import BasicInfoPDF from './pages/BasicInfoPDF'
import PersonalViewer from './viewers/PersonalViewer'
import SameIndustryViewer from './viewers/SameIndustryViewer'
import BasicInfoViewer from './viewers/BasicInfoViewer'
import SecondViewer from './viewers/SecondViewer'
import PremiumViewer from './viewers/PremiumViewer'
import PremiumAttachmentViewer from './viewers/PremiumAttachmentViewer'
import EmployeeViewer from './viewers/EmployeeViewer'
import SpecificationViewer from './viewers/SpecificationViewer'

import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
    paper:{
        backgroundColor:"#aaa",
        color:"#f00",
        padding:10
    },
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    
  });



// Create Document Component
const HibPDFViewer = ({data, layout}) => {  
    const [value, setValue] = useState(0)
    const classes = useStyles();
    

    const handleChange =(event, newValue)=>{
        setValue(newValue)
    }

       
    return(
        <div>
            {/**
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange}  > 
                    * 
                        <Tab style={{width:"12%"}} label="基本資料"  />
                        <Tab style={{width:"12%"}} label="身分證/存摺/誠實險代扣授權書"/>
                        <Tab style={{width:"12%"}} label="同業增員" />
                        <Tab style={{width:"12%"}} label="免扣取補充保費說明書" />
                        <Tab style={{width:"12%"}} label="免扣取補充保費說明書證明附件" />
                        <Tab style={{width:"12%"}} label="蒐集，處理及利用個人資料告知暨同意書" />
                        <Tab style={{width:"12%"}} label="年度業務承攬人員合約書" />
                        <Tab style={{width:"12%"}} label="業務人員行政規範" />
                    </Tabs>
                </AppBar>
            */}             
            
            <Paper className={classes.paper}  >
                <BasicInfoViewer/>
            </Paper>
            <Paper className={classes.paper} >
                <SecondViewer/>
            </Paper>
            <Paper className={classes.paper} >
                <SameIndustryViewer/>
            </Paper>
            <Paper className={classes.paper} >
                <PremiumViewer/>
            </Paper>
            <Paper className={classes.paper} >
                <PremiumAttachmentViewer/>
            </Paper>
            <Paper className={classes.paper} >
                <PersonalViewer/>
            </Paper>
            <Paper className={classes.paper} >
                <EmployeeViewer/>
            </Paper>
            <Paper className={classes.paper} >
                <SpecificationViewer/>
            </Paper>
               
        </div>
    )
}

Font.register({
    family:"kaiuPDF",
    source: `${process.env.PUBLIC_URL}/assets/kaiu.ttf`
})

const HibPDFFile = ({data, layout}) => {
    return(
        <BasicInfoPDF data={data}/>            
    )
}

export {HibPDFViewer, HibPDFFile }