import React,{ useState, useEffect} from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
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

    console.log("123456")
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
                
                <View style={style.fdCol}>
                  
                    <View style={{width:130}}>                        
                        <View style={{...style.fdCol, justifyContent:"space-around", fontSize:14, alignItems:"flex-start", margin:2, padding:3, borderWidth:3, borderColor:"#6a9315"}}> 
                            <View style={{display:"flex", justifyContent:"center"}}>
                                <View style={{width:"100%", height:1, backgroundColor:"#6a9315", marginTop:3, marginBottom:6}}></View>
                                <Text style={{color:"#6a9315"}}>簽名</Text>
                                <Image style={{width:100}} src={myData.sign_1?myData.sign_1:"./assets/test/sign-1.png"}/>
                            </View>
                        </View>  
                           
                    </View>
                </View>
                
                <View style={{textAlign:"center"}}>
                    <Text >中華民國{myData.nowDate.year}年{myData.nowDate.month}月{myData.nowDate.date}日</Text>
                </View>                    
            </Page>

        </Document>
    )
}

