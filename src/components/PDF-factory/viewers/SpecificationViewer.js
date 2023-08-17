
import React,{useContext} from 'react';
import WebServiceContext from '../../../webservice/WebServiceContext'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
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
    },

    header:{
        marginBottom:30
    },
    logo:{
        width:400,
    },
    title:{
        fontSize:18,
        fontWeight:"bolder",
    },
  });

// Create Document Component
export default () => {
    const data = useSelector(state => state)
    const classes = useStyles();
    //const webservice = useContext(WebServiceContext)
    return(
        <Card className={classes.card}>
            <CardContent >
                <div style={{display:"flex", justifyContent:"space-between" , alignItems:"center"}}>
                    <img src="./assets/logo.svg"  height={60}/>
                    <h2>大誠業務人員行政規範</h2>
                </div>

                <div>
                  <ol>
                        <li>上課標準:毎年必須完成法規所規定之教育訓練時數始得續約。</li>
                        <li>
                            業績標準：以首年度業績為計算標準
                            <ul>
                                <li>#個人：3萬。個人首年業績需達3萬。</li>
                                <li>#組織：12萬個人首年業績需達3萬,另加直轄業代及直轄當年度新進同仁。</li>
                            </ul>
                        </li>
                        <li>未達3萬業績標準者：於明年度2月份發新時負擔新年度之行處理費6,000元</li>
                        <li>未達組織12萬業績標準者：於明年度2月發薪時無法領取續年度組織津貼,直至達成自行提出時再行發放。</li>
                        <li>未登錄完成之同仁不得享有公司舉辦活動之福利。</li>
                        <li>未完成年度續約者,發佣至當年年底</li>
                        <li>已詳讀過[保險業務員管理規則]及[業務人員管理辦法]並同意確實遵守</li>                      
                    </ol>
                    
                    <div style={{display:"flex", alignItems:"center",  justifyContent:"space-around"}}>
                        <span>
                            桃園通訊處
                        </span>                    

                        <span>簽約者親簽：</span>
                        <div > 
                            {
                                data.sign_1 != "" &&
                                <img style={{width:120}} className={classes.sign1} src={data.sign_1}/>
                            }                         
                        </div>                          
                    </div>                          
                </div>
            </CardContent>
        </Card>
    )
}

