import React,{useState} from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, styled } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { useSelector } from 'react-redux';


import { Page, Text, View, Image, Document, StyleSheet, Font } from '@react-pdf/renderer';



Font.register({
    family:"kaiu",
    src: `${process.env.PUBLIC_URL}/assets/kaiu.ttf`
})



const style={
    table:{marginRight:3}, 
    fdRow:{display:"flex", flexDirection:"row"},
    fdCol:{display:"flex", flexDirection:"column"}
}



// Create Document Component
export default ({data}) => {
   
    /*const renderCheckBox=(items)=>{
        let group=""
        items.list.map((item, index)=>{
            const icon = item.checked === true? "■":"□"            
            group +=(icon+item.name)
        })
        return group
    }*/

    const [basic] = useState(data.basicInfo)

    const TitleBlock=({title, size})=>{
        return(
            <View style={{display:"flex", padding:10}}>
                <View style={{...style.fdRow, alignItems:"baseline"}}>
                    <Image src="./assets/logo.png" style={{width:100 ,flexGrow:1}}/>            
                    <Text style={{fontSize:size?size:48, width:40,flexGrow:1, fontWeight:"bolder", textAlign:"center", color:"#6a9315"}}>{title}</Text>
                </View>
            </View>
            )
    }
    
    const Card=({title, content})=>{
        return(
            <View>
                {
                    title &&
                    <Text style={{ fontSize:14, fontWeight:"bolder", color:"#6a9315", textAlign:"center"}}>{title}</Text>
                }
                {
                    content &&    
                    <View style={{borderWidth:1, borderStyle:"solid", borderColor:"#6a9315", margin:2, padding:2}}>
                        {content}
                    </View>
                }
            </View>
        )
    }

    const RowData = ({title, value})=>{
        return(
            <View style={{flexDirection:"row", marginBottom:3, marginRight:3}}>
                <Text style={{color:"#6a9315"}}>{title}：</Text>
                <Text style={{textDecoration:"underline"}}>{value}</Text>
            </View>
        )
    }
    
    return(
        
        <Document>
            <Page size="A4" style={{ fontFamily:'kaiu', fontSize:14}}>
                <TitleBlock title="簽約冊"/>
                <Text style={{ fontSize:14, fontWeight:"bolder", color:"#6a9315", textAlign:"center"}}>基本資料</Text>
                <View style={{borderWidth:1, borderStyle:"solid", borderColor:"#6a9315", margin:2, padding:2}}>
                    <View style={{...style.fdRow, padding:1}}>
                        <View style={{ borderWidth:1, borderStyle:"solid", borderColor:"#333", margin:2, display:"flex", alignItems:"center"}}>
                            <Image src={basic.employeePhoto} style={{width:100 ,height:120, padding:2}}/>  
                        </View>
                        <View style={{...style.fdCol, padding:1}}>
                            <View style={{display:"flex", flexDirection:"row"}}>
                                <View style={style.table}>                    
                                    <RowData title="通 訊 處" value="桃園通訊處"/>
                                    <RowData title="姓    名" value={basic.employeeName}/>                  
                                    <RowData title="最高學歷" value={basic.highestEducation}/>
                                </View>
                                <View style={style.table}>
                                    <RowData title="區    組" value="阿達區"/>        
                                    <RowData title="身分證號" value={basic.employeeID}/>
                                    <RowData title="連絡電話" value={basic.employeeHomePhone}/>
                                </View>
                                <View style={style.table}>   
                                    <RowData title="職    級" value={basic.jobClass}/>                 
                                    <RowData title="出生日期" value={basic.employeeBirthYear+"年"+basic.employeeBirthMonth+"月"+basic.employeeBirthDate+"日"}/>                   
                                    <RowData title="手機電話" value={basic.employeeMobile}/>
                                </View>
                            </View>                
                            <View >
                                <RowData title="緊急連絡人電話" value="0921064600"/>
                                <RowData title="戶籍地址" value={basic.domicilePostcodeName+basic.domicileAddress}/>
                                <RowData title="通訊地址" value={basic.mailingPostcodeName+basic.mailingAddress}/>
                                <RowData title="電子郵件" value={basic.employeeEmail}/>
                            </View>
                        </View>
                    </View>
                    <View style={{...style.fdRow}}>
                        {
                            basic.hasFamilyName?
                            <Text>■是:□否</Text>:
                            <Text>□是:■否</Text>                              
                        }
                        <RowData title="已有家屬於本公司報聘" value={basic.hasFamilyName}/>                
                        <RowData title="匯款銀行" value={basic.remittanceBank}/>
                        <RowData title="匯款帳號" value={basic.remittanceAccount}/>
                    </View>
                </View>

                <Card content={
                    <View style={style.fdRow}>
                        <Text>已同意履行個人資料保護法蒐集、處理及利用個人資料告知書之內容：</Text>
                        <Image src={data.sign_1}/>
                    </View>
                }/>
            </Page>

            <Page>
                <TitleBlock title="附件資料"/>
                <Card
                    title="123"
                />
            </Page>
        {/*
        <Card className={classes.card}>
            <CardContent>             
                  
                    <div className={classes.basicInfo}>
                        
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
                    <table className={classes.table} style={{width:600}}>
                        <tbody>
                            <tr>
                                <th>公司名稱</th>
                                <th>職稱</th>
                                <th>任職期間</th>
                            </tr>
                            {basic.exp.map((item)=>{
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
        </Card
         */}
        
        </Document>
    )
}

