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
        color:"#666",
        "& li":{
            listStyleType:"trad-chinese-informal",
        }
    },
    mainBlock:{
        border:"2px solid #000",
        margin:2,
        padding:2
    },
    basicInfo:{
        "& div":{
            marginBottom:10
        }
    },
    table:{
        borderCollapse:"collapse",
        "& th, td":{
            border:"1px solid #aaa",
            padding:5,
            textAlign:"center"
        }
    }
});

const High = styled('span')({
    color:"#000",
    fontWeight:"bolder",
    textDecoration:"underline"
    
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
                <div>
                    <div style={{display:"flex", justifyContent:"space-between" , alignItems:"center"}}>
                        <img src="./assets/logo.svg"  height={60}/>
                        <h1 style={{marginRight:50}}>簽約冊</h1>
                    </div>                
                    <div style={{display:"flex"}}>
                        <div className={classes.mainBlock} style={{width:120, height:160}}>
                            <img style={{width:"100%", height:"auto"}} src={basicInfo.employeePhoto}/>
                        </div>

                        <div className={classes.mainBlock} style={{flex:2, padding:10}}>
                            <div>
                                通訊處<br/>區 組
                            </div>
                            <div>
                                姓名：
                                <High>{basicInfo.employeeName}</High>
                            </div>
                            <div>
                                身分證號： <High>{basicInfo.employeeID}</High>
                            </div>
                        </div>
                        <div className={classes.mainBlock} style={{flexGrow:1, fontSize:24, textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center"}}>
                            級職：<High>{basicInfo.jobClass}</High>
                        </div>
                    </div>
                    <div className={classes.basicInfo}>
                        <div>
                            出生：<High style={{marginRight:30}}>{basicInfo.employeeBirthYear}年{basicInfo.employeeBirthMonth}月{basicInfo.employeeBirthDate}日</High>
                            最高學歷：<High>{basicInfo.highestEducation}</High>
                        </div>
                        <div>
                            戶籍地址：<High>{basicInfo.domicilePostcodeName}{basicInfo.domicileAddress}</High>
                        </div>
                        <div>
                            通訊地址：<High>{basicInfo.mailingPostcodeName}{basicInfo.mailingAddress}</High>
                        </div>
                        <div>
                            連絡電話(住宅)：<High style={{marginRight:30}}>{basicInfo.employeeHomePhone}</High>
                    
                            連絡電話(白天)：<High>{basicInfo.employeeDayPhone}</High>
                        </div>
                        <div>
                            手機：<High style={{marginRight:30}}>{basicInfo.employeeMobile}</High>
                    
                        </div>
                        <div>
                            匯款銀行：<High>{basicInfo.remittanceBank}</High> 匯款帳號：<High>{basicInfo.remittanceAccount}</High>
                        </div>
                        <div>
                            電子郵件：<High>{basicInfo.employeeEmail}</High>
                        </div>              
                        <div>
                            
                                {
                                    basicInfo.hasFamilyName?
                                    <span> <High>■是</High>:□否</span>:
                                    <span>□是<High>:■否</High></span>                               
                                }
                                |已有家屬於本公司報聘，員工姓名：<High>{basicInfo.hasFamilyName} </High>
                        </div>              
                    </div>              
                </div>

                <div style={{marginTop:20, border:"3px solid #000", padding:10, }}>
                    同業經歷{/** {compName: "新安東京", job: "經理", sy: 109, sm: 4, sd: 5, ey:109, em:8, ed:10}, */}
                    <table className={classes.table} style={{width:600}}>
                        <tbody>
                            <tr>
                                <th>公司名稱</th>
                                <th>職稱</th>
                                <th>任職期間</th>
                            </tr>
                            {data.exp.map((item)=>{
                                return(
                                    <tr>
                                        <td><High>{item.compName}</High></td>
                                        <td><High>{item.job}</High></td>
                                        <td><High>民國{item.sy}年{item.sm}月{item.sd}日 至 民國{item.ey}年{item.em}月{item.ed}日</High></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}

