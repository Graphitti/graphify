

export function setSearchStore(dataset, columnObj) {
    console.log("dataset in setSearchStore",dataset);
    //only columns that are numbers
    let columnKeys = Object.keys(columnObj).filter(key => {
        return columnObj[key].toLowerCase() === 'number';
    });
    //mutate those values into numbers
    for (let j = 0; j < dataset.length; j++){
        for (let i = 0; i < columnKeys.length; i++){
            dataset[j][columnKeys[i]] = Number(dataset[j][columnKeys[i]]);
        }
    }
    //add the columnObj onto the dataset
    dataset.columnObj = columnObj;
    return dataset;
}


export function setUploadStore(dataset) {
    let columnNames = dataset[0];
    let columnObj = {};
    dataset[1].forEach((el, i) => {
        if (isNaN(+el)) {
            columnObj[columnNames[i]] = 'text';
        } else {
            columnObj[columnNames[i]] = 'number';
        }
    });
    let newDataset = dataset.slice(1).map(dataArr => {
        let obj = {};
        dataArr.forEach((data, i) => {
            obj[columnNames[i]] = data;
        })
        return obj;
    });
    return setSearchStore(newDataset, columnObj);
}


