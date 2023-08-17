import React, {useEffect} from 'react';
import { useState } from 'react';

import {Typography, Container, Checkbox, Card,  Box,  Grid, makeStyles, Collapse, Button, styled  } from '@material-ui/core';

export default ({checkForm})=>{
    
      
    const [agree, setAgree] = useState(false)
    
    //表單檢查區    
    useEffect(()=>{
        if(/*檢查項*/
            agree == true
        ){
            checkForm(true)
        }else{
            checkForm(false)
        }
        //console.log(formAccess)
    },[
        /*需檢查的值*/
        agree
    ])
    
    const getNowDate = ()=>{
        const _d = new Date();
        return {
            year:_d.getFullYear()-1911,
            month:_d.getMonth()+1,
            date:_d.getDate()
        }
    }
    return (
        <div className="App">
            <div>
                <p>先生／小姐(以下簡稱「業務承攬人員」)</p>
                公司同意委任 先生／小姐為業務承攬人員，訂立條款如下：
                <ul>
                    <li>第一條：本合約自中華民國{getNowDate().year}年{getNowDate().month}月{getNowDate().date}日起生效，年度內承攬人員應主動親赴公司完成法規之教育訓練，未完成法規之教育訓練者以終止合約處理。</li>
                    <li>第二條：公司授權業務承攬人員之範圍：於公司獲准營業地區範圍內，承攬公司授權之業務，並負責將該業務之文件提交公司，並對原有續次業務實施保全服務。</li>
                    <li>第三條：業務承攬人員應享之報酬，依公司現行發佣制度辦理，統一由本公司電腦程式計算核發，核發時須仍與本公司具有合約關係者始予發放。</li>
                    <li>第四條：業務承攬人員負責公司授權範圍各項業務推展、人事考核、組職發展時，均應受政府機關頒佈相關法規及本公司業務人員管理辦法、各項行政規定及其他相關規範，並依各簽約保險公司之規定辦理。</li>
                    <li>第五條：業務承攬人員因身故而發生繼承事實時，其經手之保單利益及所發展之組織利益，依公司業務制度規定，依其書面所指定繼承者繼承，但該項利益應先扣除業務承攬人對公司所欠之債務。</li>
                    <li>第六條：業務承攬人員若有違反法令、本合約約定事項，或行其他足以使保戶或公司及同仁蒙受損害之情事時，公司得隨時逕行通知終止合約，業務承攬人員並同意放棄先訴抗辯權利。若有致公司蒙受財務等損失時，更應負賠償責任，公司得先以支付業務承攬人員之佣酬抵充。</li>
                    <li>第七條：雙方應恪遵「個人資料保護法」等相關法令之規範處理客戶資料，並同意公司得繼續利用承攬人員之資料，處理與保險業務有關及其他相關事項。</li>
                    <li>第八條：業務承攬人員同意於公司合約期間對其所知悉或持有之公司機密資訊（包含但不限於：機密資訊、客戶資料、公司內部之任何機密文件資料）負保密義務。未經公司同意，不得揭露與任何第三人，或為其本身或他人之利益而使用。如有違反，業務承攬人員願負一切民事、刑事及行政責任，如公司因此受有損害，業務承攬人員願負賠償責任。</li>
                    <li>第九條：本合約終止時，業務承攬人員之一切權利與報酬同時終止。</li>
                </ul> 
            </div>
            <Checkbox
                checked={agree}
                onChange={()=>{
                    setAgree(!agree)
                }}                    
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />我同意上述內容
        </div>
    );
}

