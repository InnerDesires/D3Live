import * as d3 from 'd3';
import cloud from 'd3-cloud';
import facade from 'facade';
// mojo module
mstrmojo.requiresCls('mstrmojo.CustomVisBase');

const { GraphicModel } = mstrmojo.customviz;
const { ENUM_RAW_DATA_FORMAT } = mstrmojo.models.template.DataInterface;

mstrmojo.plugins.D3Live.D3Live = mstrmojo.declare(
  mstrmojo.CustomVisBase,
  null,
  {
    scriptClass: 'mstrmojo.plugins.D3Live.D3Live',
    cssClass: 'd3live',
    errorMessage: 'Either there is not enough data to display the visualization or the visualization configuration is incomplete.',
    errorDetails: 'This visualization requires one or more attributes and one metric.',
    useRichTooltip: false,
    reuseDOMNode: false,
    draggable: false,
    supportNEE: true,
    init(props) {
      this._super(props);
      this.setDefaultPropertyValues({
        minFont: 10,
        maxFont: 70,
        numOfWords: 200,
        spiral: { ellipse: 'true', rectangular: 'false' },
        textFont: { fontFamily: 'Arial' },
      });
    },
    createGraphicModels() {
      const rawData = this.dataInterface.getRawData(ENUM_RAW_DATA_FORMAT.ROWS_ADV, {
        hasSelection: true,
        hasTitleName: true,
        hasThreshold: true,
        additionalAttrIds: this.additionalAttrIds,
      });
      var graphicModels = { children: [] };
      try {
        mstrmojo.array.forEach(rawData, function (row) {
          var graphicModel = new GraphicModel();

          // Set properties to the graphic model.
          graphicModel.idValueMapping = row.idValueMapping;
          graphicModel.setCustomProperties({
            headers: row.headers,
            values: row.values,

            value: parseFloat(row.values[0].rv),
            formattedValue: row.values[0].v,
            metricSelector: row.metricSelector
          });
          // Set the selector of the graphic
          var isAttributeSelector = true;
          graphicModel.setSelector(row.headers[0].attributeSelector, isAttributeSelector);
          // Add the graphic model to the a custom set which you defined on your own.
          graphicModels.children.push(graphicModel);
        });
      } catch (e) { alert(e) };
      // Return the set of graphic models you defined
      return graphicModels;
    },
    getGraphicModelsBySelector(selector, isAttrSelector) {
      try {

        var viz = this;
        var ret = [];
        //Get the set of graphic models.
        var graphicModels = this.getGraphicModels().children;
        //Define the rules for picking the graphic models.
        var pickOptions = {
          attribute: mstrmojo.customviz.PICKED_TYPE.ATTR,
          metric: mstrmojo.customviz.PICKED_TYPE.METRIC,
          criteria: mstrmojo.customviz.PICKED_CRITERIA.INTERSECTION
        };
        //Iterate through the set.
        mstrmojo.array.forEach(graphicModels, function (graphicModel) {
          //Check if the graphic model should be picked
          let res = viz.canPickGraphicModel(selector, isAttrSelector, graphicModel, null)

          if (res) {
            ret.push(graphicModel);
          }
        });

        // Return all the graphic models picked by the given selector.
        return ret;
      } catch (e) {
        alert(e);
      }
    },
    updateHighlight: function updateHighlight() {
      var viz = this;
      //highlight effect for selection
      d3.select(this.domNode)
        .selectAll(".circle")
        .style("opacity", function (graphicModel) {
          // If the graphic should be highlighted as a style for selection, set the border of the bubble to black and 2 pixels in width
          let res = viz.graphicNeedsHighlight(graphicModel, false) ? 1 : 0;
          return res;
        });
    },
    plot() {
      try {
        /* this.domNode.innerHTML = '';
        let p = document.createElement('p');
        p.innerText = JSON.stringify(this.zonesModel.getDropZones().zones, null, 2);
        this.domNode.append(p);
        let el1 = this.createGraphicModels().children[0];
        let d = document.createElement('p');
        d.innerText = JSON.stringify(el1, null, 2);
        this.domNode.append(d);*/
        this.domNode.style.overflow = 'scroll';
        this.domNode.style.userSelect = 'text'; 
        facade(this, d3);
      } catch (e) {
        let d = document.createElement('p');
        d.innerText = JSON.stringify(e.stack, null, 2);
        this.domNode.append(d);
      }
    },
  },
);