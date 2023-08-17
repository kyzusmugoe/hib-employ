
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
        fontSize:12,
        lineHeight:1.5,
        "& ul":{ margin:0},
        "& p, h4":{ margin:0}
    },
    
    header:{
        marginBottom:10
    },
    logo:{
        width:200,
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
                        <h2>履行個人資料保護法蒐集、處理及利用個人資料告知書</h2>
                    </div>  
                    <div style={{fontSize:11}}>
                        <ul>
                            <li>
                                <h4>一、告知業務員蒐集、處理及利用個人資料之事項:</h4>
                                <p>大誠保險經紀人股份有限公司以下稱本公司)因辦理台端之業務員相關測驗(包含投資型及外幣測驗)及測驗簡章相關規定,登錄、變更登入、換證、註銷、基本資料變更、登錄證遺失證明、補發登錄證、補發測驗合格證明、各項教育訓練、金融市場與職業道德合格證號查詢,業務員資料統計、分析、管理及業務員管理規則內相關規定與處分⋯等與業務員登錄有關之業務, 及辦理台端人事福利制度·給付薪資、工作管理及向保險公司申請授權而蒐集、處理及利用台端之個人資料時,皆以尊重台端的權益為基礎,並以誠實信用方式及以下原則為之。</p>
                                <p>本公司蒐集台端個人資料目的條為人事管理之目的(以下稱「蒐集目的」)。</p>
                                <p>本公司範集為上逮行為而必要之個人資料(包括但不限於姓名、出生年月日、住址、身份證字號、業務員測驗合格證號、業務員登鉄字號、電話、em、薪資帳户、學歷等),該資料會在前開蒐集目的存績期間及依法令規定要求之期間內被處理或利用;台端的個人資料僅會以電子檔案或紙本形式於我國境內供本公司處理及利用:本公司將把台端個人資料建於本公司電腦系統,以作為管理之依據;本公司辦理台端業務員相關測驗(包含投資型及外幣測驗)及測驗簡章相關規定,登錄、變更登錄、换證、註銷、基本資料變更、登錄證遺失證明、補發登錄證、補發測驗合格證明、各項教育訓練、金融市場輿職業道德合格證號查詢,業務員資料統計、分析、管理及業務員管理規則内相關規定與處分⋯等與業務員登錄有開之業務,會將台端之個人資料提供給中華民國保險經紀人商業同業公會/財團法人保險事業發展中心中華民國産物保險商業同業公會/中華民國人毒保險商業同業公會,由該公會辦理登錄等業務之必要範圍內處理及利用;在有金融消費爭議案件發生時,本公司必要時也會將台端的個人資料提供給財團法人金融消費評議中心或其他受理消費争議機構,由該機構於處理金融消費争議案件之必要範團内處理及利用。在本公司執行業務或接受監理時·本公司必要時也會將台端的個人資料提供給業務委外機構,與本公司合作的保險公司,依法有調查權機關或金融監理機關·</p>
                                <p>本公司保有台端的個人費料時,基於我國個人資料保護法之規定,台端可以透過書面像本公司行使下远權利,除基於符合「個人資料保護法」與其他相關法律規定外,本公司不會拒絕(一)查詢或請求閱覧本人之個人資料、(二)請求製給本人之個人資料複製本、(三)請求補充或更正本人之個人資料·(四)請求停止蒐集、處理或利用本人之個人資料(五)請求刪除本人之個人資料。</p>
                                <p>本公司基於上述原因而需蒐集、處理及利用台端的個人資料,若台端選擇不提供個人責料或是提供不完全時,基於健全業務之執行,本公司將無法提供台端辦理業務員相關業務之協助。</p>
                            </li>
                            <li>
                                <h4>二、個人資料蒐集、處理及利用之同意事項:</h4>
                                <ol>
                                    <li>台端已收到並閱讀瞭解本同意書之內容。</li>
                                    <li>台端同意本公司基於人事管理目的得蒐集、處理及利用個人資料;得利用台端之個人資料作給付佣金報酬、業務報表、向保險公司申請網站使用授權等一切有關於人事管理之使用。</li>
                                    <li>台端同意本公司代為投保相關保險,並將台端之個人資料提供給保險公司利用;同意將台端之手機電話提供給客户主動聯繫;同意將台端之佣金報酬結構提供給所屬主管以為人事管理。</li>
                                    <li>台端同意為辦理業務員相關測驗(包含投資型及外幣測驗)及測驗簡章相關規定,登錄、變更登錄、換設料變更、登錄證遺失證明、補發登錄證、補發測驗合格證明、各項教育訓練、金融市場與職業道德合格證號查詢,業務員資料統計、分析、管理及業務員管理規則內相關規定與處分等與業務員登錄有關之業務等相關事宜,得將台端之相關個人資料轉送中華民國保險經紀人商業同業公會財團法人保險事業發展中心/中華民國產物保險商業同業公會/中華民國人壽保險商業同業公會,由各該公會為辦理業務員相關測驗(包含投資型及外幣測驗)及測驗簡章相關規定,登錄、變更登錄、換證、註銷、基本資料變更、登錄證遺失證明、補發登錄證、補發測驗合格證明、各項教育訓練、金融市場輿職業道徳合格證號查詢,業務員資料統計、分析、管理及業務員管理規則內相關規定與處分⋯等與業務員登錄有關之業務管理之處理及利用。</li>
                                    <li>台端同意於有金融消費爭議案件發生時,得將台端之相關個人資料轉送財團法人金融消費評議中心或其他受理消費爭議機構,由該機構於處理金融消費爭議案件必要範圍內處理及利用。</li>
                                    <li>台端同意本公司執行業務或接受監理時·得將台端之相關個人資料轉送業務委外機構,與本公司合作的保險公司,依法有調查權機關或金融監理機關·</li>
                                </ol>
                                <p>【以下簽名欄,請詳閲後親自簽名】</p>
                            </li>
                        </ul>
                    </div>
                    <div style={{display:"flex", alignItems:"center"}}>
                            <span>同意人：</span>
                            {
                                data.sign_1 != "" &&
                                <img style={{width:120}} className={classes.sign1} src={data.sign_1}/>
                            }                        
                            <span style={{marginLeft:50}}>身分證字號：</span>
                            {data.basicInfo.employeeID}
                            <span style={{marginLeft:50}}>所屬通訊處：</span>
                    </div>                       
                    <p style={{float:"right", fontSize:16, letterSpacing:10}}>中華民國{data.nowDate.year}年{data.nowDate.month}月{data.nowDate.date}日</p>
                </div>
            </CardContent>
        </Card>
    )
}
