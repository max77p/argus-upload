const colID = {
  ACCOUNT: 20,
  DESCRIPTION: 21,
  AMOUNT: 22,
  CODE: 23,
  YEAR: 24,
  MONTH: 25,
  ID: 26
};

const headID = {
  // "Partner Code": 16
  // "Year": 20,
  // "Month": 22,
  // "Transaction Date":24
};
let storeData = function(el) {
  var finalForJDE = [];
  var headerCheck=[];
  var originalData;

  originalData = el;

  var grid = [];
  var row = function(val) {
    this.gridColumnEvents = val;
  };

  var i = 0;
  /*
   -------------------- CHECK HEADER BEFORE CONTINUING -------------------
    */
  headerCheck = Object.entries(originalData[0]).map(([key, value]) => {
    // console.log(key);
    if (key.toUpperCase() in colID) {
        // console.log("exists");
      return true;
    } else {
        // console.log("error");
      return false;
    }
  });
  if (headerCheck.includes(false)) {
    // callback("Please follow header guidelines");
    return false;
  } else {
    while (i < originalData.length) {
      //organize the json data into gridcolumn objects
      var result = Object.entries(originalData[i]).map(([key, value]) => ({
        value,
        command: "SetGridCellValue",
        columnID: colID[key.toUpperCase().trim()]
      }));
      grid.push(result);
      i++;
    }

    for (var k = 0; k < grid.length; ) {
      var x = new row(grid[k]);
      finalForJDE.push(x);
      k++;
    }
    return { finalForJDE, originalData };
  }
};
module.exports = {storeData} ;
