import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, styled } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { useSelector } from 'react-redux';



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
       
        "& li":{
            listStyleType:"trad-chinese-informal",
        }
    },
    mainBlock:{
        border:"2px solid #000",
        margin:2,
        padding:2
    },
    mainTable:{
        border:"2px solid #000",
        height:160,
        margin:2,
        "& td":{
            border:"1px solid #000",
        }
    },
    header:{
        marginBottom:30
    },
    logo:{
        width:200,
        float:"left"
    },
    title:{
        fontSize:18,
        fontWeight:"bolder",

    },
    
    signArea:{
        position:"relative",
        display: "flex",
        alignItems:"flex-end",
        height:60
    },
    table:{
        borderCollapse:"collapse",
        "& td":{
            padding:0,
            border:"1px solid #333"
        }
    },
    underLine:{textDecoration:"underline"},
    sign1:{ ...sign, top:4, left:80},
    sign2:{ ...sign, top:-4, left:250},
    sign3:{ ...sign, top:-4, left:200},
    sign4:{ ...sign, top:0, left:200}, 
    "& img":{width:"100%"}
});


const High = styled("span")({
    fontWeight:"bolder",
    textDecoration:"underline",
})

const Block = styled("div")({
    border:"1px solid #aaa",
    width:"100%",
    minWidth:200,
    padding:"5px 15px",
    margin:10
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
                <div style={{display:"flex", justifyContent:"space-between" , alignItems:"center"}}>
                    <img src="./assets/logo.svg"  height={60}/>
                    <h1 style={{marginRight:50}}>同業增員佐證資料</h1>
                </div>
                <div className="pdf" style={{maxWidth:600, textAlign:"center", }}> 
                    <div style={{display:"flex", justifyContent:"space-between"} }>
                        <Block>推薦職級：<High>{data.sameIndustry.myClass}</High></Block>
                        <Block>推薦日期：
                            <High>
                                {data.sameIndustry.year}年
                                {data.sameIndustry.month}月
                                {data.sameIndustry.date}日
                            </High>
                        </Block>
                    </div>                    
                    <div style={{display:"flex", alignItems:"center"} }>
                        <Block>同業服務年資：<High>{data.sameIndustry.seniority}</High></Block>
                        <Block>同業業績：<High>{data.sameIndustry.performance}</High></Block>
                    </div>           
                    <Block>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"} }>
                        
                            <span>簽約者簽名</span>
                            <img style={{width:120, margin:"1%"}} src={data.sign_1}/>
                            {/**
                             * 
                                <span>處經理簽名</span>
                                <img style={{width:120, margin:"1%"}} src={data.sign_2}/>
                             */}
                        </div>
                    </Block>
                    <Block>
                        【同業佐證資料附件】
                        <img style={{width:600, height:"auto" , maxHeight:500}} src={data.sameIndustry.sameIndustryAttachment}/>
                    </Block>
                </div>
               
               
            </CardContent>
        </Card>
    )
}

