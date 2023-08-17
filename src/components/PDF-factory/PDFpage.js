import React,{ useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, styled } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { useSelector } from 'react-redux';


import { Page, Text, View, Image, Document, StyleSheet, Font } from '@react-pdf/renderer';

//中文字型
Font.register({
    family:"kaiu",
    src: `${process.env.PUBLIC_URL}/assets/kaiu.ttf`
})

const style={
    page:{fontFamily:'kaiu', fontSize:10, padding:10},
    table:{marginRight:3}, 
    fdCol:{display:"flex", flexDirection:"row"},
    fdRaw:{display:"flex", flexDirection:"column"},
    tCell:{borderWidth:1, borderStyle:"solid", borderColor:"#ccc",padding:3}
}



// Create Document Component
export default ({myData}) => {
    const [basic] = useState(myData.basicInfo)
    const [postCodeList] = useState(myData.postCodeList)
    
    console.log(postCodeList);

    /*同業經歷資料預處理 */
    const EXPdata = ( _data =>{
        let _d=[]
        _data.exp.map(item => {
            if(item.rowType == "Sam")
            {       
                _d.push({
                    "compName":item.compName,
                    "job":item.job,
                    "duration":"民國"+item.sy+"年"+ item.sm+"月" + item.sd + "日至民國"+ item.ey+"年"+item.em+"月"+item.ed+"日",
                })
                
            }
        })
        return _d;
    })(myData)

    /*異業經歷資料預處理 */
    const EXPdataDef = ( _data =>{
        let _d=[]
        _data.exp.map(item => {
            if(item.rowType == "Def")
            { 
                _d.push({
                    "compName":item.compName,
                    "industry":item.industry,
                    "jobNature":item.jobNature,
                    "duration":"民國"+item.sy+"年"+ item.sm+"月" + item.sd + "日至民國"+ item.ey+"年"+item.em+"月"+item.ed+"日",
                })
            }
        })
        return _d;
    })(myData)


    const findPostCodeList = code =>{
        console.log(code)
        for(const areaList of postCodeList){
            for(const item of areaList.regions){
                if(code == item.postcode){
                    const _n = "("+item.postcode+")"+areaList.city+item.region
                    console.log(_n)
                    return _n;
                }
              
            }
        } 
    }


    //#region PDF components
    const TitleBlock=({title, size})=>{
        return(
            <View style={{...style.fdCol, width:560, padding:3, justifyContent:"space-between"}}>
                <View style={{width:200}}>
                    <Image src="./assets/logo.png" style={{width:200, height:"auto"}}/>   
                </View>
                <View style={{width:200}}>
                    <Text style={{fontSize:size?size:28, fontWeight:"bolder", textAlign:"right", marginTop:5, color:"#6a9315"}}>{title}</Text>
                </View>
            </View>
        )
    }
    
    const Card=({title, content})=>{
        return(
            <View style={{borderWidth:1, borderStyle:"solid", borderColor:"#6a9315", margin:2, padding:2}}>
                {
                    title &&
                    <View style={{backgroundColor:"#6a9315", padding:3}}>
                        <Text style={{fontWeight:"bolder", color:"#fff"}}>{title}</Text>
                    </View>
                }      
                {content}    
            </View>
        )
    }

    const SignCard=({title, content, sign})=>{
        return(
            <View style={{...style.fdCol, borderWidth:1, borderStyle:"solid", borderColor:"#6a9315", margin:2, padding:5}}>
                <View style={{...styled.fdRaw, width:500}}>
                    <View style={{backgroundColor:"#6a9315", padding:1}}>
                        <Text style={{ fontWeight:"bolder", color:"#fff"}}>{title}</Text>
                    </View>
                    <View>
                        {content}
                    </View>
                </View>                      
                <View style={{...styled.fdRaw, alignItems:"center", width:60, marginLeft:5}}>
                    <View style={{backgroundColor:"#6a9315", padding:1}}>
                        <Text style={{ fontWeight:"bolder", color:"#fff"}}>授權人簽名</Text>
                    </View>
                    <Image style={{width:60}} src={sign}/>
                </View>                      
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

    const PdfTable = ({title, data})=>{
        //console.log(data)
        return(
            <View style={style.fdRaw}>
                {
                    title &&
                    <Text style={{ fontSize:14, fontWeight:"bolder", color:"#6a9315", textAlign:"center"}}>{title}</Text>
                } 
                 <View style={style.fdCol}>
                    <Text style={{...style.tCell, color:"#6a9315", width:"20%"}}>公司名稱</Text>
                    <Text style={{...style.tCell, color:"#6a9315", width:"20%"}}>職稱</Text>
                    <Text style={{...style.tCell, color:"#6a9315", width:"50%"}}>任職期間</Text>
                    <Text style={{...style.tCell, color:"#6a9315", width:"10%"}}>附件編號</Text>
                </View>
                {
                    data.map((item, index )=>{
                        return(
                            <View key={"t_"+index} style={style.fdCol}>
                                <Text style={{...style.tCell, width:"20%"}}>{item.compName}</Text>
                                <Text style={{...style.tCell, width:"20%"}}>{item.job}</Text>
                                <Text style={{...style.tCell, width:"50%"}}>{item.duration}</Text>
                                <Text style={{...style.tCell, width:"10%"}}>{index+1}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    const PdfTableDef = ({title, data})=>{
        //console.log(data)
        return(
            <View style={style.fdRaw}>
                {
                    title &&
                    <Text style={{ fontSize:14, fontWeight:"bolder", color:"#6a9315", textAlign:"center"}}>{title}</Text>
                } 
                 <View style={style.fdCol}>
                    <Text style={{...style.tCell, color:"#6a9315", width:"14%"}}>公司名稱</Text>
                    <Text style={{...style.tCell, color:"#6a9315", width:"12%"}}>產業類別</Text>
                    <Text style={{...style.tCell, color:"#6a9315", width:"13%"}}>工作性質</Text>                    
                    <Text style={{...style.tCell, color:"#6a9315", width:"50%"}}>任職期間</Text>
                    <Text style={{...style.tCell, color:"#6a9315", width:"10%"}}>附件編號</Text>
                </View>
                {
                    data.map((item, index )=>{
                        return(
                            <View key={"t_"+index} style={style.fdCol}>
                                <Text style={{...style.tCell, width:"14%"}}>{item.compName}</Text>
                                <Text style={{...style.tCell, width:"12%"}}>{item.industry}</Text>
                                <Text style={{...style.tCell, width:"13%"}}>{item.jobNature}</Text>                                
                                <Text style={{...style.tCell, width:"50%"}}>{item.duration}</Text>
                                <Text style={{...style.tCell, width:"10%"}}>{index+1}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
    

    //#endregion

    return(
        <Document>            
            <Page size="A4" style={style.page}>
                <TitleBlock title="簽約冊"/>
                <Card 
                    title="基本資料"
                    content={
                        <View style={{...style.fdCol, padding:1}}>
                            <View style={{ borderWidth:1, borderStyle:"solid", backgroundColor:"#aaa", margin:2, display:"flex", justifyContent:"center",  alignItems:"center"}}>
                                <Image src={basic.employeePhoto} style={{width:120 ,height:150, padding:2}}/>  
                            </View>
                            <View style={{...style.fdRaw, padding:1}}>
                                <View style={{display:"flex", flexDirection:"row"}}>
                                    <View style={style.table}>                    
                                        <RowData title="通 訊 處" value={basic.unitCodeName}/>
                                        <RowData title="姓    名" value={basic.employeeName}/>                  
                                        <RowData title="連絡電話" value={basic.employeeHomePhone}/>
                                    </View>
                                    <View style={style.table}>
                                        {/*
                                         <RowData title="區    組" value={myData.loginInfo.userArea}/>        
                                        */}
                                        <RowData title="身分證號" value={basic.employeeID}/>
                                        <RowData title="出生日期" value={basic.employeeBirthYear+"年"+basic.employeeBirthMonth+"月"+basic.employeeBirthDate+"日"}/>                   
                                        <RowData title="手機電話" value={basic.employeeMobile}/>
                                    </View>
                                    <View style={style.table}>   
                                        <RowData title="職    級" value={basic.jobClass}/>                 
                                        <RowData title="最高學歷" value={basic.highestEducation}/>
                                    </View>
                                </View>                
                                <View >
                                    <RowData title="戶籍地址" value={findPostCodeList(basic.domicilePostcode)+basic.domicileAddress}/>
                                    <RowData title="通訊地址" value={findPostCodeList(basic.mailingPostcode)+basic.mailingAddress}/>
                                    <RowData title="電子郵件" value={basic.employeeEmail}/>                                        
                                </View>                                    

                                <View style={{...style.fdCol}}>
                                    <RowData title="已有家屬於本公司報聘" value={
                                        basic.hasFamilyName?
                                        <Text>■是:□否</Text>:
                                        <Text>□是:■否</Text>                              
                                    }/>
                                    <RowData title="家屬名稱" value={basic.hasFamilyName}/>
                                </View>

                                <View style={{...style.fdCol}}>                                
                                    <RowData title="匯款銀行" value={basic.remittanceBank}/>
                                    <RowData title="匯款帳號" value={basic.remittanceAccount}/>
                                </View>

                                <View style={{...style.fdCol}}>
                                    <RowData title="緊急連絡人姓名" value={basic.emergencyName}/>
                                    <RowData title="緊急連絡人電話" value={basic.emergencyPhone}/>
                                    <RowData title="與緊急連絡人之關係" value={basic.emergencyRelationship}/>
                                </View>
                                
                                <View style={{...style.fdCol}}>
                                    <RowData title="繼承人姓名" value={basic.heirName?basic.heirName:"無"}/>
                                    <RowData title="繼承人電話" value={basic.heirPhone?basic.heirPhone:"無"}/>
                                    <RowData title="與繼承人之關係" value={basic.heirRelationship?basic.heirRelationship:"無"}/>
                                </View>                              
                            </View>
                        </View>
                    }
                />

                <Card 
                    title="免扣取補充保費聲明書：若有變更身分時應於20日前主動提出予公司更正。"
                    content={
                        <View style={style.fdCol}>
                            <RowData title="免扣取對象" value={myData.premium.prTypeName}/> 
                            <RowData title="免扣取項目" value={myData.premium.typeSub}/> 
                            <RowData title="投保單位名稱" value={myData.premium.premiumRemark}/>                             
                                                   
                        </View>
                    }
                    sign={myData.sign_1}
                />

                <Card 
                    title="履行個人資料保護法蒐集、處理及利用個人資料告知"
                    content={<Text>本人已詳閱蒐集、處理及利用個人資料告知暨同意書並同意該同意書之內容</Text>}
                    sign={myData.sign_1}
                />

                <Card 
                    title="誠實險代扣授權：投保誠實險保額1000萬元。"                  
                    content={<Text>本人同意員工誠實險保費，每月60元，將以年繳的方式收取，於每年2月底從薪資中扣除</Text>}
                    sign={myData.sign_1}
                />

                <Card 
                    title="大誠業務人員行政規範"
                    content={<Text>本人詳閱大誠業務人員行政規範並同意遵守規範內容</Text>}
                    sign={myData.sign_1}
                />

                <Card 
                    title="承攬合約"
                    content={<Text>本人已知悉所有承攬合約內容 並遵守合約規定</Text>}
                    sign={myData.sign_1}
                />
                
                <Card 
                    title="有重大喪失債信情事尚未了結或了結後尚未逾三年者，應不予登錄；已登錄者，所屬公司應通知各有關公會註銷登錄"
                    content={
                        <View>
                            <Text>依據金管會公佈之「保險業務員管理規則」第七條第七項之規定：「有重大喪失債信情事尚未了結或了結後尚未逾三年者」</Text>
                            <Text>及第七條第十一項之規定：「最近三年有事實證明從事或涉及其他不誠信或不正當之活動，顯示其不適合擔任業務員者」，</Text>
                            <Text>應不予登錄；已登錄者，所屬公司應通知各有關公會註銷登錄，經法院通知或經公司查證，若公司所屬業務員有相關</Text>
                            <Text>債信問題，將依上述管理規則辦理，並終止合約。</Text>
                        </View>
                    }
                    sign={myData.sign_1}
                />
                

                <View style={style.fdCol}>
                    <View style={{width:445}}>
                        <Card 
                            title="同業經歷"
                            content={
                                <View style={{...style.fdCol, justifyContent:"center",  alignItems:"center"}}>
                                    <PdfTable data={EXPdata}/>
                                </View>
                            }
                        />
                        <Card 
                            title="異業經歷"
                            content={
                                <View style={{...style.fdCol, justifyContent:"center",  alignItems:"center"}}>
                                    <PdfTableDef data={EXPdataDef}/>
                                </View>
                            }
                        />
                    </View>
                    <View style={{width:130}}>                        
                        <View style={{...style.fdCol, justifyContent:"space-around", fontSize:14, alignItems:"flex-start", margin:2, padding:3, borderWidth:3, borderColor:"#6a9315"}}> 
                            <View style={{display:"flex", justifyContent:"center"}}>
                                <RowData title="增員者" value={myData.loginInfo.UserName}/>
                                <View style={{width:"100%", height:1, backgroundColor:"#6a9315", marginTop:3, marginBottom:6}}></View>
                                <Text style={{color:"#6a9315"}}>簽約者簽名</Text>
                                <Image style={{width:100}} src={myData.sign_1?myData.sign_1:"./assets/test/sign-1.png"}/>
                            </View>
                        </View>  
                           
                    </View>
                </View>
                
                <View style={{textAlign:"center"}}>
                    <Text >中華民國{myData.nowDate.year}年{myData.nowDate.month}月{myData.nowDate.date}日</Text>
                </View>                    
            </Page>

            <Page size="A4" style={style.page}>
                <TitleBlock title="身分證以及帳戶"/>
                <Card 
                    title="身分證反面資料"
                    content={
                        <View style={{...style.fdCol, justifyContent:"center",  alignItems:"center"}}>
                            <Image style={{width:"50%"}} src={myData.IDcardFront}/>
                            <Image style={{width:"50%"}} src={myData.IDcardBack}/>
                        </View>
                    }
                />
                <Card 
                    title="帳戶正面"
                    content={
                        <View style={{...style.fdCol, justifyContent:"center",  alignItems:"center", maxHeight:350}}>
                            <Image style={{width:"100%", }} src={myData.bankFront}/>
                        </View>
                    }
                />
            </Page>
            {
                myData.exp.map((item, index)=>{
                    if(item.evidence !=""){   
                        return(
                            <Page key={"evidence_"+index} size="A4" style={style.page}>
                                <TitleBlock title={"附件 "+ (index+1)} />
                                <Card 
                                    title={item.rowType =="Sam"?"同業經歷與佐證資料":"異業經歷與佐證資料"}
                                    content={
                                        <View style={{...style.fdRaw, justifyContent:"center"}}>
                                            <View style={style.fdCol}>
                                                <RowData title="公司名稱" value={item.compName}/>
                                                {
                                                    item.rowType == "Sam" &&
                                                    <View>
                                                        <RowData title="職稱" value={item.job}/>
                                                    </View>
                                                }
                                                 {
                                                    item.rowType == "Def" &&
                                                    <View style={style.fdCol}>
                                                        <RowData title="產業類別" value={item.industry}/>
                                                        <RowData title="工作類型" value={item.jobNature}/>
                                                    </View>
                                                }
                                                <RowData title="任職期間" value={"民國"+item.sy+"年"+item.sm+"月"+item.sd+"日至民國"+item.ey+"年"+item.em+"月"+item.ed+"日"}/>
                                            </View>
                                            <View style={{...style.fdCol, justifyContent:"center", alignItems:"flex-start", height:500}}>
                                                <Image style={{width:"auto", height:"auto"}} src={item.evidence}/>
                                            </View>
                                        </View>
                                    }
                                />
                            </Page>
                        )
                    }
                })
            }
            {
                /*export default {
                    "premiumRemark":"",//投保單位全名
                    "prType":"PR_5",
                    "prTypeName":"自營作業而參加職業工會者(以執行業務所得為投保金額)",
                    "typeSub":"執行業務收入",    
                    "premiumAttachment":""//附件
                }
                */
                myData.premium.premiumAttachment != "" &&
                <Page size="A4" style={style.page}>
                    <TitleBlock title="附件" />
                    <Card 
                        title="免扣取補充保費聲明書"
                        content={
                            <View style={{...style.fdRaw, justifyContent:"center"}}>
                                <View style={style.fdCol}>
                                    <RowData title="目前投保單位" value={myData.premium.premiumRemark}/>
                                    <RowData title="免扣取對象" value={myData.premium.prTypeName}/>
                                    <RowData title="免扣取項目" value={myData.premium.typeSub}/>
                                </View>
                                <View style={{...style.fdCol, justifyContent:"center", alignItems:"flex-start", height:500}}>
                                    <Image style={{width:"auto", height:"auto"}}  src={myData.premium.premiumAttachment}/>
                                </View>
                            </View>
                        }
                    />
                </Page>
                
                
            }
            {/*
            <Page size="A4" style={style.page}>
                <TitleBlock title="附件1" />
                <Card 
                    title="d"
                    content={
                        <View style={{...style.fdRaw, justifyContent:"center"}}>
                            <View style={style.fdCol}>
                                <RowData title="推薦職級" value={myData.sameIndustry.myClass}/>
                                <RowData title="推薦日期" value={"民國"+myData.sameIndustry.year+"年"+myData.sameIndustry.month+"月"+myData.sameIndustry.date+"日"}/>
                            </View>
                            <View style={style.fdCol}>
                                <RowData title="同業服務年資" value={myData.sameIndustry.seniority}/>
                                <RowData title="同業業績" value={myData.sameIndustry.performance}/>
                            </View>
                            <View style={{...style.fdCol, justifyContent:"center", alignItems:"flex-start", height:500}}>
                                <Image style={{width:"auto", height:"auto"}} src="./assets/test/exp.jpg"/>
                            </View>
                        </View>
                    }
                />
            </Page>
            */}
        </Document>
    )
}

