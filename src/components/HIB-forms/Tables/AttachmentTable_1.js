import React, {useEffect} from 'react';

import { styled  } from '@material-ui/core';
export default ({checkForm})=>{

    const MyTable = styled("table")({
        width:"100%",
        border:"1px solid #333",
        borderCollapse: "collapse",
        maxWidth:600,
        '& td, th':{
            color:"#333",
            border:"1px solid #333",
            padding:5
        },

    });

    return (
        <div className="App">
            <h2 style={{textAlign:"center"}}>免扣取補充保險費對象、項目及證明文件</h2>
            <MyTable>
                <tbody>
                    <tr>
                        <th>免扣取對象</th>
                        <th>免扣費項目</th>
                        <th>證明文件</th>
                    </tr>
                    <tr>
                        <td>無投保資格者</td>
                        <td rowSpan="2">6項所得或收入皆免扣取</td>
                        <td>無投保資格者:主動告知後,由扣費義務人向健保局確認。</td>
                    </tr>
                    <tr>
                        <td>第5類被保險人<br/>(低收入戶)</td>
                        <td>鄉(鎮、市、區)公所核發的有效低收入戶證明。</td>
                    </tr>
                    <tr>
                        <td>第2類被保險人</td>
                        <td>薪資所得</td>
                        <td>職業工會出具的在保證明或繳費證明。</td>
                    </tr>
                    <tr>
                        <td>專門職業及技術人員自行執業者(以執行業務所得為投保金額)</td>
                        <td rowSpan="2">執行業務收入</td>
                        <td>投保單位出具的在保證明。</td>
                    </tr>
                    <tr>
                        <td>自營作業而參加職業工會者(以執行業務所得為投保金額)</td>
                        <td>職業工會出具的在保證明或繳費證明。</td>
                    </tr>
                    <tr>
                        <td>兒童及少年</td>
                        <td rowSpan="7">未達基本工資之兼職薪資所得</td>
                        <td>身分證明文件。</td>
                    </tr>
                    <tr>
                        <td>中低收入戶</td>
                        <td>鄉(鎮、市、區)公所核發的有效中低收入戶證明。</td>
                    </tr>
                    <tr>
                        <td>中低收入老人</td>
                        <td>社政機關核定之證明文件。</td>
                    </tr>
                    <tr>
                        <td>領取身心障礙者生活補助費</td>
                        <td>社政機關核定之證明文件。</td>
                    </tr>
                    <tr>
                        <td>勞工保險投保薪資未達基本工資之身心障礙者</td>
                        <td>社政機關核發有效期限內之身心障礙手冊或證明及勞工保險證明文件。</td>
                    </tr>
                    <tr>
                        <td>國內就學之大專生且無專職工作者</td>
                        <td>學校之註冊單或蓋有註冊章之學生證及無專職工作聲明書。</td>
                    </tr>
                    <tr>
                        <td>符合健保法第100條所定之經濟困難者</td>
                        <td>經濟困難之證明(依全民健康保險經濟困難認定標準認定)。</td>
                    </tr>
                </tbody>
            </MyTable>
        </div>
    );
}

