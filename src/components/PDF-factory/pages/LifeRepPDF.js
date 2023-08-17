
import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Table, TableCell, TableHeader, TableBody, DataTableCell} from "@david.kucsai/react-pdf-table"
import { useSelector } from 'react-redux';

//set Chinese font
Font.register({
    family:"kaiu",
    src: `${process.env.PUBLIC_URL}/assets/kaiu.ttf`
})

// Create styles
const title={
    padding:"10px 0 0 0",
    textAlign:"center",
    fontWeight:"bolder",
}
const styles = StyleSheet.create({
    title:{
        fontSize:13,
        textAlign:"center",
        fontWeight:900,
    },
    page: {
        fontFamily:'kaiu',
        backgroundColor: '#ffffff',
        padding:15,
        lineHeight:1.5
    },
    section: {
        width:"100%",
        height:"auto",
        fontSize:10,
        wordWrap:"break-word",
        whiteSpace:"pre-wrap",
        padding:3
    },
    mainTitle:{
        ...title,
        fontSize:18,
    },
    subTitle:{
        ...title,
        fontSize:13,
    },
    table:{              
        width:"100%",
        backgroundColor:"#000",
        paddingRight:1,
        paddingBottom:1
    },
    tr:{
        backgroundColor:"#000",
        flexDirection:"row",
        //marginTop:-1,
        //borderTopWidth:1,
        //borderBottomWidth:1,
        //borderLeftWidth:1,
    },
    td:{
        //borderRightWidth:1,
        backgroundColor:"#fff",
        flexGrow:1,
        fontSize:10,
        marginTop:1,
        marginLeft:1,
        padding:1
    },
    underLine:{
        textDecoration:"underline"
    }
});

const renderCheckBox=(items, breakPoint=0)=>{
    let group=""
    items.list.map((item, index)=>{
        const icon = item.checked === true? "■":"□"            
        group +=(icon+item.name)
        if(breakPoint>0 && index % breakPoint == breakPoint-1){
            group +="\n"
        }
    })
    return group
}

const renderMoney = (money)=>{
    return new Intl.NumberFormat('zh-TW').format(money)
}

// Create Document Component
const PropRepPDFView = ({data}) => {
    const loginInfo = data.loginInfo
    const basicInfo = data.basicInfo
    const lifeRep = data.lifeRep
    const sign1 = data.sign_1
    const sign4 = data.sign_4
    return(
    <Page size="A4" style={styles.page}>
        <Text style={styles.mainTitle}>
            大誠保險經紀人股份有限公司
        </Text>
        <Text style={styles.subTitle}>
            【人身保險商品】書面分析報告
        </Text>
        
        <View style={styles.table} >

            <View style={styles.tr} >
                <View style={styles.td} >
                    <Text style={styles.title}>
                        基本資料
                    </Text>
                </View>
            </View>

            <View style={styles.tr} >
                <View style={{...styles.td, width:"49%"}} >
                    <Text >要保人</Text>
                    <View style={styles.tr} >
                        <View style={{...styles.td, width:"50%"}} >
                            <Text >姓名/法人名稱</Text>
                        </View>
                        <View style={{...styles.td, width:"50%"}} >
                             <Text >{basicInfo.policyholderName}</Text>
                        </View>
                    </View>
                    <View style={styles.tr} >
                        <View style={{...styles.td, width:"50%"}} >
                            <Text >年齡/法人免填</Text>
                        </View>
                        <View style={{...styles.td, width:"50%"}} >
                             <Text >{basicInfo.policyholderAge}</Text>
                        </View>
                    </View>
                    <View style={styles.tr} >
                        <View style={{...styles.td, width:"50%"}} >
                            <Text>國籍</Text>
                        </View>
                        <View style={{...styles.td, width:"50%"}} >                            
                            <Text >
                                {renderCheckBox(basicInfo.citizenship)}&emsp;
                                <Text style={styles.underLine}>{basicInfo.citizenshipOther}</Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{...styles.td, width:"49%"} }>
                    <Text >被保險人(若為團體險,請附投保名冊)</Text>
                    <View style={styles.tr} >
                        <View style={{...styles.td, width:"50%"}} >
                            <Text >姓名</Text>
                        </View>
                        <View style={{...styles.td, width:"48%"}} >
                             <Text >{basicInfo.insuredName}</Text>
                        </View>
                    </View>
                    <View style={styles.tr} >
                        <View style={{...styles.td, width:"20%"}} >
                            <Text >性別</Text>
                        </View>
                        <View style={{...styles.td, width:"30%"}} >
                             <Text >{renderCheckBox(basicInfo.insuredSex)}</Text>
                        </View>
                        <View style={{...styles.td, width:"20%"}} >
                            <Text >年齡</Text>
                        </View>
                        <View style={{...styles.td, width:"28%"}} >
                             <Text >{basicInfo.insAge}</Text>
                        </View>
                    </View>
                    <View style={styles.tr} >
                        <View style={{...styles.td, width:"50%"}} >
                            <Text>職業</Text>
                        </View>
                        <View style={{...styles.td, width:"48%"}} >                            
                            <Text >{basicInfo.insuredJob}</Text>
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={styles.tr} >
                <View style={{...styles.td, width:"75%"}} >
                    <Text >
                        要保人:職業代碼(0一般,1軍火商,2珠寶商,3銀樓業者,4執業律師,5執業會計,6典當業,7博弈業)
                    </Text>
                </View>
                <View style={{...styles.td, width:"23%"}} >
                    <Text>
                        {basicInfo.policyholderJobCode.list.map((item, index)=>{
                            if(item.checked) return item.value                                    
                        })}
                    </Text>
                </View>                
            </View>

            <View style={styles.tr} >
                <View style={{...styles.td, width:"75%"}} >
                    <Text >
                        要保人:職位名稱代碼(0一般,1董事長,2總經理,3副總經理)
                    </Text>
                </View>
                <View style={{...styles.td, width:"23%"}} >
                    <Text>
                        {basicInfo.policyholderTitleCode.list.map((item, index)=>{
                            if(item.checked) return item.value                                    
                        })}</Text>
                    </View>                
            </View>

            <View style={styles.tr} >
                <View style={{...styles.td, width:"49%"} }>
                    <Text >風險屬性{"\n"}(投保投資型或外幣商品時填寫)</Text>
                </View>
                <View style={{...styles.td, width:"49%"} }>
                    <Text>
                        投資型商品:{renderCheckBox(basicInfo.riskTypeA)}
                    </Text>
                    <Text>
                        外幣型商品:{renderCheckBox(basicInfo.riskTypeB)}
                    </Text>
                </View>                
            </View>

            <View style={styles.tr} >
                <View style={styles.td} >
                    <Text style={styles.title} >保險需求</Text>
                </View>
            </View>
            
            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} } >
                    <Text >本次投保之目的及需求(可複選)</Text>
                </View>
                <View style={{...styles.td, width:"68%"} } >
                    <Text style={{textAlign:"left"}}>{renderCheckBox(lifeRep.demand)}：<Text style={styles.underLine}>{lifeRep.demand.other}</Text></Text>
                </View>
            </View>
            
            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} }  >
                    <Text >欲投保之保險種類</Text>
                </View>
                <View style={{...styles.td, width:"68%"} }  >
                    <Text >{renderCheckBox(lifeRep.insuredType)}<Text style={styles.underLine}>{lifeRep.insuredType.other}</Text></Text>
                </View>
            </View>

            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} }  >
                    <Text >是否有指定之保險公司</Text>
                </View>
                <View style={{...styles.td, width:"68%"} }  >
                    <Text >{renderCheckBox(lifeRep.specifyComp)}</Text>
                    <Text >{renderCheckBox(lifeRep.insComps, 5)}：<Text style={styles.underLine}>{lifeRep.insComps.other}</Text></Text>
                </View>
            </View>

            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} }  >
                    <Text >欲投保之保險金額	</Text>
                </View>
                <View style={{...styles.td, width:"68%"} }  >
                    <Text style={styles.underLine}>{lifeRep.wantMoney}萬</Text>
                </View>
            </View>

            <View style={styles.tr} >
                <View style={{...styles.td, width:"35%", marginRight:-1} } >
                    <Text >是否已有投保其他商業保險之有效保險契約</Text>
                </View>
                <View style={{...styles.td, width:"63%" , marginLeft:-1} }  >
                    <Text >{renderCheckBox(lifeRep.haveOther)}</Text>
                    <Text style={styles.underLine}>{lifeRep.haveOther.other}</Text>
                </View>
            </View>

            <View style={styles.tr} >
                <View style={styles.td} >
                    <Text style={styles.title} >保險費支出</Text>
                </View>
            </View>

            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} }  >
                    <Text >預估繳交之保險費金額</Text>
                </View>
                <View style={{...styles.td, width:"68%"} }  >
                    <Text >{renderCheckBox(lifeRep.payment)}
                        ：<Text style={styles.underLine}>{lifeRep.payment.other}</Text>
                    </Text>
                    <Text>
                        幣別：<Text style={styles.underLine}>{
                            lifeRep.paymentCurrency.list.map((item)=>{
                                if(item.checked == true) return item.name
                            })
                        }。</Text>
                        保費：<Text style={styles.underLine}>{renderMoney(lifeRep.paymentPremium)}</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} }  >
                    <Text >僅長年期保險填寫：</Text>
                    <Text >1.繳交保險費之人預估退休剩餘年期</Text>
                </View>
                <View style={{...styles.td, width:"68%"} }  >
                    <Text >{renderCheckBox(lifeRep.payYears)}</Text>
                </View>
            </View>

            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} }  >
                    <Text >2.繳交保險費之來源</Text>
                </View>
                <View style={{...styles.td, width:"68%"} }  >
                    <Text >{renderCheckBox(lifeRep.paySource)}</Text>
                    <Text style={styles.underLine}>{lifeRep.paySource.other}</Text>
                </View>
            </View>            

            <View style={styles.tr} >
                <View style={styles.td} >
                    <Text style={styles.title}>業務員建議事項</Text>
                </View>
            </View>

            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} }  >
                    <Text >建議投保之保險公司名稱及概況</Text>
                </View>
                <View style={{...styles.td, width:"68%"} }  >
                    <Text style={styles.underLine}>{lifeRep.recommendComp}人壽保險,{renderCheckBox(lifeRep.insState)}</Text>
                </View>
            </View> 
            
            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} }  >
                    <Text >保險商品/險種名稱</Text>
                </View>
                <View style={{...styles.td, width:"38%"} }  >
                    <Text >{lifeRep.insProdoctionName}</Text>
                </View>
                <View style={{...styles.td, width:"10%"} }  >
                    <Text >保險金額</Text>
                </View>
                <View style={{...styles.td, width:"18%"} }  >
                    <Text >{lifeRep.insCost}</Text>
                </View>
            </View> 
            
            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} } >
                    <Text >保險費及繳費年期</Text>
                </View>
                <View style={{...styles.td, width:"68%"} } >
                    <Text >{renderMoney(lifeRep.insTotal)}{renderCheckBox(lifeRep.insTotalYear)}</Text>
                </View>
            </View> 
            
            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"}}  >
                    <Text >保障範圍</Text>
                </View>
                <View style={{...styles.td, width:"68%"}}>
                    <Text>
                        {renderCheckBox(lifeRep.insScope)}：
                        <Text style={styles.underLine}>{lifeRep.insScope.other}</Text>
                    </Text>
                </View>
            </View> 
            
            <View style={styles.tr} >
                <View style={{...styles.td, width:"30%"} } >
                    <Text >建議投保保險公司理由</Text>
                </View>
                <View style={{...styles.td, width:"68%"}} >
                    <Text>
                         {renderCheckBox(lifeRep.recommend)}：
                        <Text style={styles.underLine}>{lifeRep.recommend.other}</Text>    
                    </Text>
                </View>
            </View> 
        </View>

        <View style={{flexDirection:"row", alignItems:"center", height:50}} >
            <View style={{ width:80}}  >
                <Text style={{fontSize:10}}>要保險人簽名：</Text>          
            </View>
            <View style={{ width:64,height:48}} >
                {
                    sign1 != "" &&
                    <Image src={sign1}/>        
                }
            </View>
            <View style={{ width:120}}  >
                <Text style={{fontSize:8}}>本報告由台端確認後,正本隨要保文件交本公司,若台端欲留存影本,可請業務服務人員提供</Text>          
            </View>
        </View>
        <View style={{flexDirection:"row", alignItems:"center", height:50}} >
            <Text style={{fontSize:10}}>單位名稱:{loginInfo.UserUnit}</Text>
            <Text style={{fontSize:10 ,marginLeft:20}}>業務人員簽名: </Text>
            <View style={{ width:64,height:48}} >
                {
                    sign4 != "" &&
                    <Image src={sign4}/>        
                }          
            </View>
            <Text style={{fontSize:10, marginLeft:20}}>登錄字號:{loginInfo.lifeLicenseID}</Text> 
            <Text style={{fontSize:10, marginLeft:20}}>簽署章:</Text>
            
        </View>
        <View>
            <Text style={{fontSize:10}}>大誠保險經紀人股份有限公司</Text>
            <Text style={{fontSize:10}}>總公司地址:新北市板橋區文化路一段266號18樓之1 日期:民國{data.nowDate.year}年{data.nowDate.month}月{data.nowDate.date}日 10807版</Text>
        </View>
    </Page>
  )
}

export default PropRepPDFView