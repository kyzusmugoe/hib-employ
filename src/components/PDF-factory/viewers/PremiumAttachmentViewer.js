import React, {useState} from 'react';
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
        fontSize:15,
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
    }
});




const High = styled('span')({
    fontWeight:"bolder",
    margin:"5px 10px"
})
const  list =[
    {id:"PR_1",  value:"PR_1",  checked:false, name:"6項所得或收入皆免扣取", type:"6項所得或收入皆免扣取", fileType:"無投保資格者:主動告知後,由扣費義務人向健保局確認。"},
    {id:"PR_2",  value:"PR_2",  checked:false, name:"第5類被保險人(低收入戶)", type:"6項所得或收入皆免扣取", fileType:"鄉(鎮、市、區)公所核發的有效低收入戶證明。"},
    {id:"PR_3",  value:"PR_3",  checked:false, name:"第2類被保險人", type:"薪資所得", fileType:"職業工會出具的在保證明或繳費證明。"},
    {id:"PR_4",  value:"PR_4",  checked:false, name:"專門職業及技術人員自行執業者(以執行業務所得為投保金額)", type:"執行業務收入", fileType:"投保單位出具的在保證明。"},
    {id:"PR_5",  value:"PR_5",  checked:false, name:"自營作業而參加職業工會者(以執行業務所得為投保金額)", type:"執行業務收入", fileType:"職業工會出具的在保證明或繳費證明。"},
    {id:"PR_6",  value:"PR_6",  checked:false, name:"兒童及少年", type:"未達基本工資之兼職薪資所得", fileType:"身分證明文件。"},
    {id:"PR_7",  value:"PR_7",  checked:false, name:"中低收入戶", type:"未達基本工資之兼職薪資所得", fileType:"鄉(鎮、市、區)公所核發的有效中低收入戶證明。"},
    {id:"PR_8",  value:"PR_8",  checked:false, name:"中低收入老人", type:"未達基本工資之兼職薪資所得", fileType:"社政機關核定之證明文件。"},
    {id:"PR_9",  value:"PR_9",  checked:false, name:"領取身心障礙者生活補助費", type:"未達基本工資之兼職薪資所得", fileType:"社政機關核定之證明文件。"},
    {id:"PR_10", value:"PR_10", checked:false, name:"勞工保險投保薪資未達基本工資之身心障礙者", type:"未達基本工資之兼職薪資所得", fileType:"社政機關核發有效期限內之身心障礙手冊或證明及勞工保險證明文件。"},
    {id:"PR_11", value:"PR_11", checked:false, name:"國內就學之大專生且無專職工作者", type:"未達基本工資之兼職薪資所得", fileType:"學校之註冊單或蓋有註冊章之學生證及無專職工作聲明書。"},
    {id:"PR_12", value:"PR_12", checked:false, name:"符合健保法第100條所定之經濟困難者", type:"未達基本工資之兼職薪資所得", fileType:"經濟困難之證明(依全民健康保險經濟困難認定標準認定)。"}
]

const myPer = (value)=>{
    for(const obj of list){
        if(obj.value == value){
            return obj
        }
    }
}

// Create Document Component
export default () => {
    const data = useSelector(state => state)
    const classes = useStyles();

    //const loginInfo = data.loginInfo
    const basicInfo = data.basicInfo
    
    const [prType] = useState(myPer(data.premium.prType))
    
    return(
        <Card className={classes.card}>
            
            <div style={{display:"flex", justifyContent:"space-between" , alignItems:"center"}}>
                <img src="./assets/logo.svg"  height={60}/>
                <h2 style={{marginRight:50}}>免扣取補充保費聲明書證明附件</h2>
            </div>

            <CardContent>
                <div style={{textAlign:"center"}}>
                    <img style={{width:"100%" ,maxHeight:800}} src={data.premium.premiumAttachment}/>
                </div>
            </CardContent>
        </Card>
    )
}

