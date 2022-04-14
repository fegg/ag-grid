import { Grid, CreateRangeChartParams, FirstDataRenderedEvent, GridOptions } from '@ag-grid-community/core'

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'total', chartDataType: 'series' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
  ],
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  popupParent: document.body,
  rowData: getData(),
  enableRangeSelection: true,
  enableCharts: true,
  onFirstDataRendered: onFirstDataRendered,
  chartThemeOverrides: {
    scatter: {
      series: {
        fillOpacity: 0.7,
        strokeOpacity: 0.6,
        strokeWidth: 2,
        highlightStyle: {
          item: {
            fill: 'red',
            stroke: 'yellow',
          },
        },
        marker: {
          shape: 'square',
          size: 5,
          maxSize: 12,
          strokeWidth: 4,
        },
        tooltip: {
          renderer: function (params) {
            var label = params.datum[params.labelKey!]
            var size = params.datum[params.sizeKey!]

            return {
              content:
                (label != null
                  ? '<b>' +
                  params.labelName!.toUpperCase() +
                  ':</b> ' +
                  label +
                  '<br/>'
                  : '') +
                '<b>' +
                params.xName!.toUpperCase() +
                ':</b> ' +
                params.xValue +
                '<br/>' +
                '<b>' +
                params.yName!.toUpperCase() +
                ':</b> ' +
                params.yValue +
                (size != null
                  ? '<br/><b>' + params.sizeName!.toUpperCase() + ':</b> ' + size
                  : ''),
            }
          },
        },
      },
    },
  },
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  var cellRange = {
    rowStartIndex: 0,
    rowEndIndex: 4,
    columns: ['country', 'total', 'gold', 'silver', 'bronze'],
  }

  var createRangeChartParams: CreateRangeChartParams = {
    cellRange: cellRange,
    chartType: 'scatter',
  }

  params.api.createRangeChart(createRangeChartParams)
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
})
