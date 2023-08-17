import React, {useEffect} from 'react';
import { useState } from 'react';

import { HibRaidos } from './FormsUIcomponents/InsItem'
import {Typography, Container, Checkbox, Card,  Box,  Grid, makeStyles, Collapse, Button, styled,RadioGroup ,FormControlLabel, Radio} from '@material-ui/core';

export default ({checkForm})=>{    
    const [agree, setAgree] = useState(false)
    
    const [debt, setDebt] = useState(false)
    
    //表單檢查區    
    useEffect(()=>{
        if(/*檢查項*/
            agree == true &&
            debt == true
            //debt == "no"
        ){
            checkForm(true)
        }else{
            checkForm(false)
        }
        //console.log(formAccess)
    },[
        /*需檢查的值*/
        agree, debt
    ])
    
    const getNowDate = ()=>{
        const _d = new Date();
        return {
            year:_d.getFullYear()-1911,
            month:_d.getMonth()+1,
            date:_d.getDate()
        }
    }

    const handleChange = (event) => {
        setDebt(event.target.value);
    };

    let listData=[
        
    ];
    return (
        <div className="App">
            <div>
                <ul>
                    <li>上課標準：每年必須完成法規所規定之教育訓練時數,未完成者依業務員管理規則撤銷登錄,終止合約。</li>
                    <li>業績標準：以首年度業績為計算標準</li>
                        <ul>
                            <li>個人： 3 萬。個人首年業績需達 3 萬。</li>
                            <li>組織：12 萬。個人首年業績需達 3 萬,另加直轄業代及直轄當年度新進同仁。</li>
                            <li>—未達 3 萬業績標準者：於明年度 2 月份發薪時負擔該年度之行政處理費 6,000 元。</li>
                            <li>—未達組織 12 萬業績標準者：於次年度 2 月發薪時無法領取續年度組織津貼,直至達成自行提出申請時恢復發放。</li>
                        </ul>
                    <li>同意並遵守保險從業人員之相關法規包括但不限於「保險業務員管理規則」、「業務人員管理辦法」。</li> 
                </ul> 
                <Checkbox
                checked={agree}
                onChange={()=>{
                    setAgree(!agree)
                }}                    
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />已明白行政規範，並且願意遵守以上規定。 
            </div>
            <hr/>
            <div >
                <p>有重大喪失債信情事尚未了結或了結後尚未逾三年者，應不予登錄；已登錄者，所屬公司應通知各有關公會註銷登錄。</p>
                <p>
                    依據金管會公佈之「保險業務員管理規則」第七條第七項之規定：「有重大喪失債信情事尚未了結或了結後尚未逾三年者」
                    及第七條第十一項之規定：「最近三年有事實證明從事或涉及其他不誠信或不正當之活動，顯示其不適合擔任業務員者」，
                    應不予登錄；已登錄者，所屬公司應通知各有關公會註銷登錄，經法院通知或經公司查證，若公司所屬業務員有相關債信問題，
                    將依上述管理規則辦理，並終止合約。
                </p>
                <Checkbox
                checked={debt}
                onChange={()=>{
                    setDebt(!debt)
                }}                    
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />已明白保險業務員管理規則之規定，並且無未了結之債務。 
                {/**
                 * 
                    <RadioGroup 
                        row={true}
                        onClick={handleChange}
                    >{
                        [
                            {id:"yes", value:'yes', name:"是", },
                            {id:"no", value:'no', name:"否", }
                        ].map(
                            (item, index)=> 
                            <div key={item.id} >
                                <FormControlLabel
                                    value={item.value}
                                    control={<Radio color="primary" />}
                                    label={item.name}
                                    labelPlacement="start"  
                                    checked={item.value == debt ?true:false}  
                                    labelPlacement="end"                                    
                            />
                            </div>
                        )
                    }
                </RadioGroup>

                 */}

            </div>            

           
        </div>
    );
}

