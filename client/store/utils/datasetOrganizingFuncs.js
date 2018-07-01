

export function datasetColumnFormatter(dataset, columnObj) {
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

    let newDataset = [...dataset];
    if(newDataset.length > 30) {
        newDataset.splice(30, newDataset.length-30)
    }

    //add the columnObj onto the dataset
    return {dataset: filteringSizeDataset(dataset), columnObj}
}

//change uploaded data from array of arrays into an array of objects
export function uploadedDataFormatter(dataset) {
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
    return datasetColumnFormatter(newDataset, columnObj);
}

export function filteringSizeDataset(dataset) {
    //setting maximun num of rows to 30
    let maxRows = 30;
    let newDataset = [...dataset];
    if(newDataset.length > maxRows) {
        newDataset.splice(maxRows, newDataset.length-maxRows)
    }
    return newDataset;
}
