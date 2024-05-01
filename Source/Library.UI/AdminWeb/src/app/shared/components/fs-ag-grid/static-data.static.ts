import { SideBarDef } from 'ag-grid-community';

// eslint-disable-next-line no-var
export var sidebarPanel: SideBarDef = {
  position: 'right',
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Grid',
      labelKey: 'Grid Settings',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'Filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    },
  ],
  defaultToolPanel: 'customStats',
};
