//import * as d3 from 'd3';
import drawer from 'chart'
export default main;

function main(mstrApi, d3) {
    const vis = mstrApi;
    mstrApi.addUseAsFilterMenuItem();
    const graphicModels = mstrApi.getGraphicModels().children;




    if (graphicModels.length === 0) {
        return;
    }
    let selectionArray = [];

    let selArr = {
        push: (d) => {
            selectionArray.push(d);
        },
        clear: (d) => {
            if (!d) {
                selectionArray = []
            } else {
                selectionArray = [d]
            }
        },
        get: () => selectionArray
    }

    let data = graphicModels;
    let zones = mstrApi.zonesModel.getDropZones().zones;
    let preparedData = prepareDatasets(data, zones);
    /* let el1 = preparedData;
    let d = document.createElement('p');
    d.innerText = JSON.stringify(el1, null, 2);
    mstrApi.domNode.append(d);
    mstrApi.domNode.style.overflow = 'scroll';
    mstrApi.domNode.style.userSelect = 'text';
    return; */
    let maxCols = Math.ceil(mstrApi.width / 200);
    let cols = 1;
    let rows = 1;
    while (cols * rows < preparedData.length) {
        if (rows < cols) {
            rows++;
        } else {
            if(cols < maxCols){
                cols++
            } else {
                rows++
            }
        }
    }

    let newSvgParams = {
        width: (mstrApi.width - 12) / cols,
        height: (mstrApi.height - 20) / rows,
    }



    let xStep = function (len) { return (newSvgParams.width - 30) / len }
    let tmpArr = [];
    if (!window.prevData) {
        preparedData.forEach((arr, index) => {
            let dx = xStep(arr.values.length)
            tmpArr.push(arr.values.map( (el, index) => { return { oldY: newSvgParams.height, oldX: index * dx} }));
        })
    } else {
        for (let i = 0; i < preparedData.length; i++) {
            if (i < window.prevData.length) {
                tmpArr[i] = orderPrevData(window.prevData[i], preparedData[i])
            } else {
                let dx = xStep(preparedData[i].values.length)
                tmpArr.push(preparedData[i].values.map((el, index) => { return { oldY: newSvgParams.height, oldX: index * dx } }));
            }
        }
        function orderPrevData(prevData, currData) {
            currData = currData.values;
            if (prevData.length <= currData.length) {
                
                for (let i = prevData.length; i < currData.length; i++) {
                    prevData.push({ oldX: (currData.length + i) * xStep(currData.length), oldY: newSvgParams.height / 2 })
                }
            } else if (prevData.length > currData.length) {
                for (let i = 1; i < (prevData.length) && (prevData.length !== currData.length); i++) {
                    if ((prevData[i] > prevData[i - 1] && prevData[i] < prevData[i + 1]) ||
                        (prevData[i] < prevData[i - 1] && prevData[i] > prevData[i + 1])) {
                        prevData.splice(i, 1);
                    }
                }
                while (prevData.length !== currData.length) {
                    let random = getRandomInt(1, prevData.length - 1);
                    prevData.splice(random, 1);
                }
            }
            return prevData;
        }
    }
    window.prevData = [];
    preparedData.forEach((arr, index) => {
        window.prevData.push([]);
        let max = d3.max(arr.values, d => d.val);
        let min = d3.min(arr.values, d => d.val);

        let myScale = d3.scaleLinear()
            .domain([min / 2, max])
            .range([0, newSvgParams.height * 0.6]);
        arr.values.forEach((el, i, array) => {
            window.prevData[index].push({ oldX: i * xStep(array.length), oldY: newSvgParams.height - myScale(el.val) - 10 })
        })
    })
    for (let i = 0; i < preparedData.length; i++) {

        d3.select(mstrApi.domNode)
            .append("svg")
            .attr('id', `customSVG${i}`)
            .attr("width", newSvgParams.width)
            .attr("height", newSvgParams.height);
        drawer({
            mstrApi: mstrApi,
            d3: d3,
            data: preparedData[i],
            svg: `customSVG${i}`,
            selArr: selArr,
            width: newSvgParams.width,
            height: newSvgParams.height,
            prevData: tmpArr[i]
        })
    }

    setTimeout(() => {
        mstrApi.updateHighlight();
    }, 3000);
}
const ZONES = {
    ATTR: {
        str: 'Attribute',
        index: 0
    },
    METRIC: {
        str: 'Metric',
        index: 1
    },
    BREAK_BY: {
        str: 'BreakBy',
        index: 2
    },
}

function prepareDatasets(data, zones) {
    let breakBy = zones[ZONES.BREAK_BY.index].items.length == 1 ? { id: zones[ZONES.BREAK_BY.index].items[0].id, name: zones[ZONES.BREAK_BY.index].items[0].n } : false;
    let trend = zones[ZONES.ATTR.index].items.length == 1 ? { id: zones[ZONES.ATTR.index].items[0].id, name: zones[ZONES.ATTR.index].items[0].n } : false;

    let result = [];
    let possibleValues = {};
    if (breakBy) {
        for (let i = 0; i < data[0].headers.length; i++) {
            if (data[0].headers[i].headerObj.t.id == breakBy.id) {
                possibleValues = data[0].headers[i].headerObj.t.es;
                break;
            }
        }
        possibleValues.forEach(value => {
            result[value.n] = { values: [], breakName: value.n, trendName: trend ? trend.name : '' };
        })
        for (let i = 0; i < data.length; i++) {
            data[i].val = data[i].value;
            if (trend) {
                data[i].attr = data[i].idValueMapping[trend.id];
            }
            result[data[i].idValueMapping[breakBy.id]].values.push(data[i]);
        }
    } else {
        result.default = { values: [], breakName: 'default', trendName: trend.name };
        for (let i = 0; i < data.length; i++) {
            data[i].val = data[i].value;
            data[i].attr = data[i].idValueMapping[trend.id];
            result.default.values.push(data[i]);
        }
    }
    return Object.keys(result).map(key => result[key]);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}