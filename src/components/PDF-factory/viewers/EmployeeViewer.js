
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
       
        "& li":{
            listStyleType:"trad-chinese-informal",
        }
    },
    header:{
        marginBottom:10
    },
    logo:{
        width:350,
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
    //sign1:{ ...sign, top:-4, left:210},
    //sign2:{ ...sign, top:-4, left:250},
    //sign3:{ ...sign, top:-4, left:200},
    
  });

// Create Document Component
export default () => {
    const data = useSelector(state => state)
    const classes = useStyles();
    const webservice = useContext(WebServiceContext)
    return(
        <Card className={classes.card}>
            <CardContent >                
                <div className="pdf">
                    <div style={{display:"flex", justifyContent:"space-between" , alignItems:"center"}}>
                        <img src="./assets/logo.svg"  height={60}/>
                        <h2>年度【業務承攬人員】合約書</h2>
                    </div>

                    <div style={{textAlign:"center"}}>
                        <p>大誠保險經紀人股份有限公司(以下簡稱「公司」)</p>
                    </div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center", margin:"-20px 0"}}>
                        <span>立合約書人:</span>
                        {
                            data.sign_2 != "" &&
                            <img style={{width:100}}  src={data.sign_2}/>
                        }先生/小姐(以下簡稱「業務承攬人員」)
                    </div>

                    <div style={{display:"flex", alignItems:"center",justifyContent:"center", margin:"-20px 0"}}>                    
                        <span>公司同意委任</span> <img style={{width:100}} src={data.sign_2}/>先生/小姐為業務承攬人員,訂立條款如下:
                    </div>
                    <ol style={{fontSize:11}}>
                        <li>第一條:本合約自中華民國{data.nowDate.year}年{data.nowDate.month}月{data.nowDate.date}日起生效,年度內承攬人員應主動親赴公司完成法規之教育訓練並簽訂次年度合約,未完成法規之教育訓練者以終止合約處理。</li>
                        <li>第二條:公司授権業務承攬人員之範圍:於公司獲准營業地區範圍內,承攬公司授權之業務,並負責將該業務之文件提交公司,並對原有績次業務實施保全服務。</li>
                        <li>第三條:業務承攬人員應享之報酬,依公司現行發佣制度辦理,統一由本公司電腦程式計算核發,核發時須仍與本公司具有合約關條者始予發放。</li>
                        <li>第四條:業務承攬人員負責公司授權範圍各項業務推展、人事考核、組職發展時,均應受政府機關頒怖相關法規及本公司業務人員管理辦法、各項行政規定及其他相關規範,並依各簽約保險公司之規定辦理。</li>
                        <li>第五條:業務承攬人員因身故而發生繼承事實時,其經手之保單利益及所發展之組織利益,依公司業務制度規定,依其書面所指定繼承者繼承,但該項利益應先扣除業務承攬人對公司所欠之債務。</li>
                        <li>第六條:業務承攬人員若有違反法令、本合約約定事項,或行其他足以使保户或公司及同仁蒙受損害之情事時,公司得隨時運行通知終止合約,業務承攬人員並同意放棄先訴抗辩權利。若有致公司蒙受財務等損失時,更應負賠償責任,公司得先以支付業務承攬人員之佣酬抵充。</li>
                        <li>第七條:雙方應恪遵「個人資料保護法」等相關法令之規範處理客户資料,並同意公司得繼續利用承攬人員之資料,處理與保險業務有關及其他相關事項。</li>
                        <li>第八條:業務承攬人員同意於公司合約期間對其所知悉或持有之公司機密資訊(包含但不限於:機密資訊、客戶資料、公司內部之任何機密文件資料)負保密義務。未經公司同意,不得揭露與任何第三人,或為其本身或他人之利益而使用。如有違反,業務承攬人員願負一切民事、刑事及行政責任,如公司因此受有損害,業務承攬人員願負賠償責任。</li>
                        <li>第九條:本合約終止時,業務承攬人員之一切權利與報酬同時終止。</li>
                    </ol>
                    <p style={{fontSize:16}}>立合約人：</p>
                    <div style={{width:430, marginLeft:250, fontSize:16}}>                        
                        <p>「公 司」 大誠保險經紀人股份有限公司</p>
                        <div style={{display:"flex", alignItems:"center", marginLeft:80}}>
                            <span>董事長</span>
                            <span style={{fontSize:36, fontWeight:"bolder"}}>王文全</span>
                        </div>

                        <div style={{display:"flex", alignItems:"center" }}>
                            「業務承攬人員」
                            {
                                data.sign_2 != "" &&
                                <img style={{width:100}}  src={data.sign_2}/>
                            }
                        </div>
                        <div >
                            身份證字號：A123456789
                        </div>
                        <div>
                            單位：通訊處 區
                        </div>
                        <div>
                            繼承人：姓名___ 
                            身份證字號：___
                            關係：___
                        </div>                          
                    </div>
                    <p style={{textAlign:"center",marginTop:10, letterSpacing:16, fontSize:16}}>中華民國 {data.nowDate.year}年{data.nowDate.month}月{data.nowDate.date}日</p>
                    
                </div>
            </CardContent>
        </Card>
    )
}

