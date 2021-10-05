mstrmojo.requiresCls('mstrmojo.vi.models.CustomVisDropZones');

/**
 * @enum {number} ENUM_ALLOW_DROP_TYPE - { ATTRIBUTE, METRIC, ATTRIBUTE_AND_METRIC, ATTRIBUTE_OR_METRIC }
 */
const { ENUM_ALLOW_DROP_TYPE } = mstrmojo.vi.models.CustomVisDropZones;

// dropzone name list
const ATTRIBUTE = 'Attribute';
const METRIC = 'Metric';
const BREAK_BY = 'BreakBy';

mstrmojo.plugins.D3Live.D3LiveDropZones = mstrmojo.declare(
  mstrmojo.vi.models.CustomVisDropZones,
  null,
  {
    scriptClass: 'mstrmojo.plugins.D3Live.D3LiveDropZones',
    cssClass: 'd3live-dropzones',
    getCustomDropZones() {
      return [
        {
          name: ATTRIBUTE,
          title: 'Drag attributes here',
          maxCapacity: 1,
          allowObjectType: ENUM_ALLOW_DROP_TYPE.ATTRIBUTE,
        },
        {
          name: METRIC,
          title: 'Drag metrics here',
          maxCapacity: 1,
          allowObjectType: ENUM_ALLOW_DROP_TYPE.METRIC,
        },
        {
          name: BREAK_BY,
          maxCapacity: 1,
          title: 'Drag objects here',
          allowObjectType: ENUM_ALLOW_DROP_TYPE.ATTRIBUTE,
        },
      ];
    },
    getActionsForObjectsDropped(zone, droppedObjects, idx, replaceObject, extras) {
      const actions = [];
      if (this.getDropZoneName(zone) === METRIC) {
      }
      return actions;
    },
    getActionsForObjectsRemoved(zone, objects) {
      const actions = [];
      if (this.getDropZoneName(zone) === METRIC) {
      }
      return actions;
    },
  },
);
