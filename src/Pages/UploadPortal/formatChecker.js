
/*
--------------------------------For Testing only variables
*/
// let f1 = "RAP_2019_03.json";
// let f2 = "RA_19_03.json";
// let f3 = "123_2019_3.json";
// let f4 = "R23P_2019_03.json";
// let f5 = "Trial_Balance_rap53511_Accrual.json"
// let f6="RAP>2019>03.json"

/*
--------------------------------For Testing only variables
*/


let checkFile = function (file) {
    const fileFormat = file.split(".")[0];
    // console.log(fileFormat.length);
    const checkFormat = fileFormat.split("_");
    var d = new Date();
    var currentYear = d.getFullYear();
    var currentMonth = d.getMonth()+1;
    let convertedMonth;
    if (currentMonth.toString().length < 2) {
        convertedMonth = `0${(currentMonth + 1).toString()}`;
        console.log("----")
        console.log(convertedMonth);
    }
    else {
        convertedMonth = currentMonth.toString();
        console.log("****");
        console.log(convertedMonth);
    }

    let error = [];
    let success = [];

    if (checkFormat.length === 3 && fileFormat.length === 11) {
        // console.log("length is 3 and file is in correct format");
        if (typeof checkFormat[0] === 'string') {
            // console.log("yes its a string");
            success.push(true);
        }
        else {
            // console.log("not a string");
            success.push(false);
            error.push("not a string");
        }

        if (parseInt(checkFormat[1]) === currentYear && checkFormat[2] ===convertedMonth) {
            // console.log("yes it matches current year and month");
            success.push(true);
        }
        else {
            // console.log(`year does not match ${checkFormat[1]} & ${currentYear}`)
            error.push("Can upload only for current YYYY/MM. Contact RioCan Business to upload other periods")
            success.push(false);
        }
    }
    else {
        success.push(false, false);
        error.push("File name should be 'PartnerID_YYYY_MM'")
    }


    if (success.includes(false)) {
        // console.log("-------error messages--------");
        for (var i = 0; i < error.length; i++) {
            // console.log(error[i]);
        }
        return error;
    }
    else {
        // console.log("all good");
        return true
    }
}

// checkFile(f1);


export default checkFile;