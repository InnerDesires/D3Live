mstrmojo.requiresCls('mstrmojo.vi.models.editors.CustomVisEditorModel');

const { WIDGET_TYPE: $WT } = mstrmojo.vi.models.editors.CustomVisEditorModel;

mstrmojo.plugins.D3Live.D3LiveEditorModel = mstrmojo.declare(
  mstrmojo.vi.models.editors.CustomVisEditorModel,
  null,
  {
    scriptClass: 'mstrmojo.plugins.D3Live.D3LiveEditorModel',
    cssClass: 'd3live-editor-model',
    getCustomProperty() {
      return [
        {
          name: 'Demo Custom Vis',
          value: [
            {
              style: $WT.EDITORGROUP,
              items: [
                { style: $WT.LABEL, labelText: 'Text' },
                {
                  style: $WT.CHARACTERGROUP,
                  propertyName: 'textFont',
                  showFontStyle: false,
                  showFontSizeAndColor: false,
                  isFontSizeStepper: false,
                },
                {
                  style: $WT.TWOCOLUMN,
                  items: [
                    { style: $WT.LABEL, width: '67%', labelText: 'Minimum Font Size:' },
                    { style: $WT.STEPPER, width: '33%', propertyName: 'minFont', min: 5, max: 50 },
                  ],
                },
                {
                  style: $WT.TWOCOLUMN,
                  items: [
                    { style: $WT.LABEL, width: '67%', labelText: 'Maximum Font Size:' },
                    { style: $WT.STEPPER, width: '33%', propertyName: 'maxFont', min: 50, max: 200 },
                  ],
                },
                {
                  style: $WT.TWOCOLUMN,
                  items: [
                    { style: $WT.LABEL, width: '67%', labelText: 'Number of Words:' },
                    { style: $WT.STEPPER, width: '33%', propertyName: 'numOfWords', min: 1, max: 250 },
                  ],
                },
                {
                  style: $WT.TWOCOLUMN,
                  items: [
                    { style: $WT.LABEL, width: '40%', labelText: 'Spiral:' },
                    {
                      style: $WT.CHECKLIST,
                      width: '60%',
                      propertyName: 'spiral',
                      orientation: 'v',
                      multiSelect: false,
                      items: [
                        { labelText: 'Ellipse', propertyName: 'ellipse' },
                        { labelText: 'Rectangular', propertyName: 'rectangular' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
    },
  },
);
