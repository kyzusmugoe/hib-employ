class WebService{
    constructor(insurer){
        this.mobileToken=""//行動投保的token
        this.cusInsurerID=""//要保人身分證號
        this.cusHolderID=""//被保人身分證號
        this.basicInfo=""//基本表單資料
        this.userData=""//使用者資料
        this.userUnit=""//單位名稱
        this.lifeLicenseID=""//產險登錄證號
        this.propLicenseID=""//壽險登錄證號
        console.log("Construct WebService")
        
       /* const _url = new URL(document.location.href)
        if(_url.searchParams.get('insurer')){
            this.insurer = _url.searchParams.get('insurer')
        }else{
            alert("Webservice insurer 尚未設定")
        }*/
        
       // this.login();
    }
    
    asyncLogin = async ()=>{
        return await this.login2() 
    }

    asyncCheckNewSeller = async(ID)=>{
        return await this.checkNewSeller(ID)
    }

    asyncSaveTempFile = async(data)=>{
        
        await this.saveTempFile(data)
        data.exp.map(()=>{
             
        })

        return {}
    }

     //*取得暫存資料*//
     asyncTempFileUid = async (tempID)=>{
        let resultData = await this.getTempFile(tempID)
        resultData[1] = await this.getTempImg(tempID)
        return resultData
    }

    asyncCitiesNumber = async()=>{
        let cities = await this.getCitiesNumber();
        return cities
    }

    //取得通訊處資訊
    asyncUnitCode = async()=>{
        let unitCode = await this.getUnitCode();
        return unitCode
    }

    asyncUploadPDF = async(PDF, basicInfo, data) =>{
        const pdfRes = await this.uploadPDFdata(PDF);
        console.log(pdfRes)
        return pdfRes
    }

    getCitiesNumber = ()=>{       
        return new Promise((resolve, reject) => { 
            resolve([
                {
                    city: "臺北市",
                    regions:[
                        {region: "大同區", postcode: "103"},
                        {region: "中山區", postcode: "104"},
                        {region: "文山區", postcode: "116"}
                    ]
                },{
                    city: "新北市",
                    regions:[
                        {region: "板橋區", postcode: "220"},
                        {region: "樹林區", postcode: "238"},
                        {region: "鶯歌區", postcode: "239"}
                    ]
                },{
                    city: "桃園市",
                    regions:[
                        {region: "中壢區", postcode: "320"},
                        {region: "桃園區", postcode: "330"},
                        {region: "八德區", postcode: "334"}
                    ]
                },
            ])
            /*resolve([
                {postcode: "116", 縣市別: "臺北市", regions: "文山區"},
                {postcode: "220", 縣市別: "新北市", regions: "板橋區"},
                {postcode: "330", 縣市別: "桃園市", regions: "桃園區"},
            ])*/
        })
   
    }


    

    getUnitCode = ()=>{
        return new Promise((resolve, reject) => { 
            resolve([
                {dept_no: "00", name_s:"總部"},
                {dept_no: "11", name_s:"板橋"},
                {dept_no: "00", name_s:"總部"},
                {dept_no: "11", name_s:"板橋"},
                {dept_no: "12", name_s:"Y.P.A"},
                {dept_no: "13", name_s:"北區"},
                {dept_no: "14", name_s:"偉均"},
                {dept_no: "15", name_s:"誠豐"},
                {dept_no: "16", name_s:"成功"},
                {dept_no: "17", name_s:"和平"},
                {dept_no: "18", name_s:"群英"},
                {dept_no: "19", name_s:"柯子"},
                {dept_no: "1A", name_s:"展翊"},
                {dept_no: "1B", name_s:"誠翔"},
                {dept_no: "1C", name_s:"曜誠"},
                {dept_no: "1D", name_s:"北岳"},
                {dept_no: "1E", name_s:"景強"},
                {dept_no: "1F", name_s:"紹麒"},
                {dept_no: "21", name_s:"妙吉"},
                {dept_no: "22", name_s:"明昊"},
                {dept_no: "23", name_s:"智富"},
                {dept_no: "24", name_s:"台北"},
                {dept_no: "25", name_s:"贏家"},
                {dept_no: "26", name_s:"舊禾群"},
                {dept_no: "27", name_s:"安盛"},
                {dept_no: "28", name_s:"上展"},
                {dept_no: "29", name_s:"T.E.E"},
                {dept_no: "2A", name_s:"宇耀"},
                {dept_no: "2B", name_s:"旭昊"},
                {dept_no: "2C", name_s:"東台北"},
                {dept_no: "2D", name_s:"大福"},
                {dept_no: "2E", name_s:"豪門永富"},
                {dept_no: "2F", name_s:"富宣"},
                {dept_no: "2G", name_s:"寯曜"},
                {dept_no: "31", name_s:"桃園"},
                {dept_no: "34", name_s:"全民"},
                {dept_no: "35", name_s:"中壢"},
                {dept_no: "36", name_s:"壢翔"},
                {dept_no: "3A", name_s:"復興"},
                {dept_no: "3B", name_s:"創普"},
                {dept_no: "3C", name_s:"竣彥"},
                {dept_no: "41", name_s:"台中"},
                {dept_no: "42", name_s:"百翎"},
                {dept_no: "43", name_s:"昱群"},
                {dept_no: "44", name_s:"T.G.P"},
                {dept_no: "45", name_s:"豐原"},
                {dept_no: "46", name_s:"帝一"},
                {dept_no: "47", name_s:"竹山"},
                {dept_no: "48", name_s:"奕峰"},
                {dept_no: "49", name_s:"合邑"},
                {dept_no: "4A", name_s:"豐奕"},
                {dept_no: "4B", name_s:"品旺"},
                {dept_no: "4C", name_s:"冠鑫"},
                {dept_no: "4D", name_s:"聚將"},
                {dept_no: "4Z", name_s:"可橙"},
                {dept_no: "51", name_s:"台南"},
                {dept_no: "61", name_s:"高雄"},
                {dept_no: "62", name_s:"大千"},
                {dept_no: "63", name_s:"宏庄"},
                {dept_no: "65", name_s:"九天"},
                {dept_no: "66", name_s:"家和"},
                {dept_no: "A1", name_s:"桃竹"},
                {dept_no: "B1", name_s:"新竹君鼎"},
                {dept_no: "C1", name_s:"上瑩"},
                {dept_no: "C2", name_s:"長誠"},
                {dept_no: "C3", name_s:"宜蘭尚敬"},
                {dept_no: "C4", name_s:"敬鴻"},
                {dept_no: "E1", name_s:"嘉義"},
                {dept_no: "E2", name_s:"瀚將"},
                {dept_no: "F1", name_s:"屏東"},
                {dept_no: "F2", name_s:"萬丹"},
                {dept_no: "G1", name_s:"花蓮"},
                {dept_no: "G2", name_s:"凱旋"},
                {dept_no: "H1", name_s:"苗栗英才"},
                {dept_no: "H2", name_s:"苗譽"},
                {dept_no: "I1", name_s:"台東"},
            ])
        })
    }

    saveTempFile = (data)=>{ 
        /*const _pBirth = this.birthFilter(
            data.policyholderBirthYear,
            data.policyholderBirthMonth,
            data.policyholderBirthDate
        )
        
        const _iBirth = this.birthFilter(
            data.insBirthYear,
            data.insBirthMonth,
            data.insBirthDate
        ) */      
      
        let formData = new FormData();  
        formData.append("RequestType", "WriteTempfile");
        formData.append("insurer", this.insurer);
        return new Promise((resolve, reject) => {    
            setTimeout(function () {
                // 3 秒時間後，透過 resolve 來表示完成
                console.log("模擬saveTempFile")
                resolve("已暫存")
            }, 1200);
        })
    }

    saveImg = imgByte=> {
        let formData = new FormData();  
        formData.append("RequestType", "WriteTempfile");
        formData.append("insurer", this.insurer);
        return new Promise((resolve, reject) => {    
            setTimeout(function () {
                // 3 秒時間後，透過 resolve 來表示完成
                console.log("模擬saveTempFile")
                resolve("已暫存")
            }, 1200);
        })
    }

    birthFilter(year, month, date){
        const _y = year.toString().length == 2?"0"+year.toString():year.toString()
        const _m = month.toString().length == 1?"0"+month.toString():month.toString()
        const _d = date.toString().length == 1?"0"+date.toString():date.toString()
        return _y+_m+_d
    }
    
    /*
        asyncCusList = async (insurer) => {
            let tokenData = await this.getMobileToken(insurer);
            let cusList = await this.getCustomerList(insurer, tokenData.MobToken);
            return cusList
        }
    */
    
    goToMobAppWithoutData = ()=>{
        console.log("goto:"+this.insurer)
    }
    
   
    checkNewSeller = (ID)=>{
        return new Promise((resolve, reject)=>{
          

            setTimeout(function () {
                let state = {}
                if(ID == "F125960334"){
                    state = {state:false}
                }else{
                    state = {state:true}
                }
                resolve(state)
            }, 2000);
        }) 
    }

    login2 = ()=>{     
        return new Promise((resolve, reject) => {    
            setTimeout(function () {
                // 3 秒時間後，透過 resolve 來表示完成
                console.log("模擬login2")
               // this.userUnit="00"
                this.UserUnit= "總部"
                this.userArea="韋達區"
                //this.lifeLicenseID="123456789"
                //this.propLicenseID="987654321"
                resolve({
                    //"unitCode":this.userUnit,
                    "unitCode":this.UserUnit,
                    "userArea":this.userArea,
                    //"lifeLicenseID":this.lifeLicenseID,
                    //"propLicenseID":this.propLicenseID,
                })
            }, 200);
        })
    }

    login = ()=>{     
        setTimeout(function () {
            // 3 秒時間後，透過 resolve 來表示完成
            console.log("模擬login")
            //resolve(true)
        }, 200);
    }
    
    getTempFile = tempID =>{
       return new Promise((resolve, reject) => {    
            setTimeout(function () {
                console.log("模擬 getTempFile")
                this.UserUnit= "總部"
                this.userArea="韋達區"
                resolve([
                    {
                        NSID:tempID,
                        DomicilePostcode:"330",
                        DomicileAddress:"大有路",
                        EmergencyName:"陳阿達",
                        EmergencyPhone:"0978018962" ,
                        EmergencyPhoto:"./assets/test/head.jpg",
                        EmergencyRelationship:"夫",
                        EmployeeBirth:"0740129",//要保人出生年月日
                        EmployeeBirthYear:"074",//要保人出生年月日
                        EmployeeBirthMonth:"01",//要保人出生年月日
                        EmployeeBirthDate:"29",//要保人出生年月日
                        EmployeeEmail:"kyzusmugoe@gmail.com",
                        EmployeeHomePhone:"02-26780319",
                        EmployeeID:"F125960334",
                        EmployeeMobile:"0978018962",
                        EmployeeName:"葉美女",
                        HasFamilyName:"陳小妹",                        
                        HeirName:"陳小妹",
                        HeirPhone:"0921064600",
                        HeirRelationship:"女",
                        HighestEducation:"大學",
                        JobClass:"處經理",
                        MailingPostcode:"239",
                        MailingAddress:"中山路",
                        RemittanceAccount:"12356789",
                        RemittanceBank:"987654321",
                        Name_S:"總部",
                                               
                    }
                ])
            }, 200);
        })
    }

    //取得同業經歷資料以及其他圖片資料
    getTempImg = tempID =>{
        return new Promise((resolve, reject) => {    
            setTimeout(function () {
                console.log("模擬 getTempFile")
                this.UserUnit= "總部"
                this.userArea="韋達區"
                resolve([
                    {}
                ])
            }, 200);
        })
    }

    getMobileToken =(insurer) =>{              
        return new Promise((resolve, reject) => {            
            setTimeout(function () {
                // 3 秒時間後，透過 resolve 來表示完成
                console.log("模擬get token")
                resolve(true)
            }, 200);
        })
    }

    /*
    getCustomerList =(insurer, mobileToken)=>{        
        return new Promise((resolve, reject) => {
            
            setTimeout(function () {
                // 3 秒時間後，透過 resolve 來表示完成
                console.log("模擬get list")
                resolve([
                    {"CustomerName":"陳先生", "CustomerID": "F123456789", "Phone":"0987654321"},
                    {"CustomerName":"葉太太", "CustomerID": "C222111000", "Phone":"0912345678"},
                    {"CustomerName":"王小妹", "CustomerID": "E234567890", "Phone":"0911222333"},
                    {"CustomerName":"林大哥", "CustomerID": "H147258369", "Phone":"0922444999"},
                    {"CustomerName":"黃叔叔", "CustomerID": "F111222333", "Phone":"0930333666"},
                    {"CustomerName":"劉姑姑", "CustomerID": "A258147369", "Phone":"0974185296"}
                ])
            }, 200);            
        })   
    }*/
    
    getCustomerBasic = (type, customerID)=>{
        return new Promise((resolve, reject)=>{
            setTimeout(function () {
                // 3 秒時間後，透過 resolve 來表示完成
                console.log("模擬get list")

                const list=[
                    {
                        "CustomerID": "F123456789",
                        "CustomerName": "陳先生",
                        "Birth": "0740129",
                        "Sex": "男",
                        "Country": "台灣",
                        "Phone": "0987654321",
                        "AreaCode": "220", 
                        "Address": "中山路1號" 
                    },{
                        "CustomerID": "C222111000",
                        "CustomerName": "葉太太",
                        "Birth": "0840313",
                        "Sex": "女",
                        "Country": "日本",
                        "Phone": "0912345678",
                        "AreaCode": "330", 
                        "Address": "國慶街15號2樓"                    
                    },{
                        "CustomerID": "E234567890",
                        "CustomerName": "王小妹",
                        "Birth": "1030710",
                        "Sex": "女",
                        "Country": "日本",
                        "Phone": "0911222333",
                        "AreaCode": "330", 
                        "Address": "莊敬路130號" 
                    },{
                        "CustomerID": "H147258369",
                        "CustomerName": "林大哥",
                        "Birth": "0600701",
                        "Sex": "男",
                        "Country": "台灣",
                        "Phone": "0922444999",
                        "AreaCode": "116", 
                        "Address": "中北路71號" 
                    },{
                        "CustomerID": "F111222333",
                        "CustomerName": "黃叔叔",
                        "Birth": "0491205",
                        "Sex": "男",
                        "Country": "",
                        "Phone": "0930333666",
                        "AreaCode": "220", 
                        "Address": "中正一路150號21樓"                    
                    },{
                        "CustomerID": "A258147369",
                        "CustomerName": "劉姑姑",
                        "Birth": "0660606",
                        "Sex": "女",
                        "Country": "",
                        "Phone": "0974185296",
                        "AreaCode": "116", 
                        "Address": "中山北路261號" 
                    }
                ]
                
                let user=[]
                list.map((item)=>{
                    if(item.CustomerID == customerID){
                        user =  item
                    }
                })

                console.log(user.Birth)
                resolve(user)
            }, 200);                          
        })
    }

    uploadPDFdata=(data)=>{

        return new Promise((resolve, reject) => {
            
            setTimeout(function () {
                // 3 秒時間後，透過 resolve 來表示完成
                console.log("模擬送出PDF")
                resolve([{a:1}])
            }, 200);            
        })           
    }
}

export default WebService

