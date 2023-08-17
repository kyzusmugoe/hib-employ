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
            <MyTable>
                <tbody>
                    <tr>
                        <td rowSpan="2"></td>
                        <td colSpan="5">認定標準</td>
                    </tr>
                    <tr>
                        <td colSpan="2">三個月內本人+直屬一代人員</td>
                        <td colSpan="2">三個月內本人+直屬無限代人員</td>
                        <td>同業佐證資料</td>
                    </tr>
                    <tr>
                        <td>經理</td>
                        <td>15萬</td>
                        <td rowSpan="3" width="150">左列業績本人壽險自招件至少須達三萬元</td>
                        <td>9萬</td>
                        <td rowSpan="3" width="150">左列業績本人壽險自招件至少須達三萬元</td>
                        <td>4.5萬</td>
                    </tr>
                    <tr>
                        <td>襄理</td>
                        <td>15萬</td>
                        <td>18萬</td>
                        <td>45萬</td>
                    </tr>
                    <tr>
                        <td>主任</td>
                        <td>4.5萬</td>
                        <td>9萬</td>
                        <td>15萬</td>
                    </tr>
                   
                </tbody>
            </MyTable>
            <p>三個月同業認定未通過者至下個月起核發新職級之佣金</p>
        </div>
    )
}

