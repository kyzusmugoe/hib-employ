import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, styled } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { useSelector } from 'react-redux';
import { Table } from '@material-ui/core';



const sign={
    position:"absolute",
    width:64,
    height:48
}



const useStyles = makeStyles({
    card:{
        width:700,
        height:990,
        margin:"0 auto",
        padding:10,
        fontSize:18,
        lineHeight:1.5,
    },
});



const Block = styled('div')({
    border:"1px solid #aaa",
    margin:10,
    padding:10
})
// Create Document Component
export default () => {
    const data = useSelector(state => state)
    const classes = useStyles();

    //const loginInfo = data.loginInfo
    const basicInfo = data.basicInfo
    const renderCheckBox=(items)=>{
        let group=""
        items.list.map((item, index)=>{
            const icon = item.checked === true? "■":"□"            
            group +=(icon+item.name)
        })
        return group
    }
    
    return(
        <Card className={classes.card}>
            <CardContent>                
                <div style={{width:660, textAlign:"center", marginBottom:20}}> 
                    <div style={{display:"flex"} }>
                        <Block >
                            【身分證正面】
                            <img style={{width:"100%", maxHeight:160}} src={data.IDcardFront}/>
                        </Block>
                        <Block >
                            【身分證背面】
                            <img style={{width:"100%", maxHeight:160}} src={data.IDcardBack}/>
                        </Block>
                    </div>                    
                    <Block>
                        【帳戶正面】
                        <img  style={{width:"100%", maxHeight:300}} src={data.bankFront}/>
                    </Block>
                </div>
                
                <div style={{display:"flex",border:"2px solid #000", padding:10}}>
                    <div style={{ margin:10, display:"flex", alignItems:"center"}}>                
                        <img style={{width:120,border:"1px solid #aaa", height:"auto"}} src={data.basicInfo.employeePhoto}/>
                    </div>                
                    <div>                
                        <h3 style={{margin:0}}>誠實險代扣授權書</h3>
                        <p>本公司辦理員工誠實險部分，每月60元，將以年繳方式收取，於每年年初扣除</p>
                        <div style={{display:"flex", alignItems:"center"}}>
                            授權人：<img style={{width:120}} src={data.sign_1}/>
                            身分證字號：{data.basicInfo.employeeID}
                        </div>
                    </div>                
                </div>               
            </CardContent>
        </Card>
    )
}

