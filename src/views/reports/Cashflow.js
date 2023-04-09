// ** spreadsheet styles
import '../../../node_modules/@syncfusion/ej2-base/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-lists/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-grids/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-react-spreadsheet/styles/material.css'
import { Fragment } from 'react'
import {
  CellDirective,
  CellsDirective,
  ColumnDirective,
  ColumnsDirective,
  RangeDirective,
  RangesDirective,
  RowDirective,
  RowsDirective,
  SheetDirective,
  SheetsDirective,
  SpreadsheetComponent,
  CellRenderEventArgs
} from '@syncfusion/ej2-react-spreadsheet'
import { registerLicense } from '@syncfusion/ej2-base'
import { useEffect } from 'react'
import { style } from '@mui/system'

registerLicense(
  'Mgo+DSMBaFt+QHFqVk5rWU5AaV1CX2BZeFl1Q2lcfE4QCV5EYF5SRHJfRlxrTX5SfkJhXnc=;Mgo+DSMBPh8sVXJ1S0d+X1lPc0BGQmFJfFBmQ2laeVR1d0UmHVdTRHRcQlljTX9bckViUXhacXw=;ORg4AjUWIQA/Gnt2VFhhQlJMfVpdWXxLflF1VWVTfFh6cVZWACFaRnZdQV1nSXpSfkFjWHdZdX1d;MTYyMDU1M0AzMjMxMmUzMTJlMzMzOFdlR2dKNkc3VzRvSUI5d0Q2WHBzUHV4a2NZcUhTOWhtek5vK2FUa2xsZUk9;MTYyMDU1NEAzMjMxMmUzMTJlMzMzOG9xSTJSa25idnhsQlZieGJ3bjZzalZMaE96aWZEZkU0Q3orRm5uUVUvZlU9;NRAiBiAaIQQuGjN/V0d+XU9HflRHQmdWfFN0RnNfdV12flBFcDwsT3RfQF5jTX5Xd01nWX5WeHdSTg==;MTYyMDU1NkAzMjMxMmUzMTJlMzMzOERncHNGUHRXbFRMUDROSjBFS1ZVQnhnSERHVmhlczhEaFU1V0NsejZSaHM9;MTYyMDU1N0AzMjMxMmUzMTJlMzMzOFAyNU40YW8rZnRYWHdNeVZic2Y2VEp3YWxlZUNnTTRaRjUwdkNVNTRDSU09;Mgo+DSMBMAY9C3t2VFhhQlJMfVpdWXxLflF1VWVTfFh6cVZWACFaRnZdQV1nSXpSfkFjWHdXcHRd;MTYyMDU1OUAzMjMxMmUzMTJlMzMzOEhYeDRQLzdaWGQ1UzBSNnF6eis3SVUvdlM1ODlFZUpNbjZJVkxJWS9heU09;MTYyMDU2MEAzMjMxMmUzMTJlMzMzOFBHWWNDV1NVNS9LYlB4dkRzZFdmY2E1RFB0NkpRTVNqeHV4aDVxRW9zak09;MTYyMDU2MUAzMjMxMmUzMTJlMzMzOERncHNGUHRXbFRMUDROSjBFS1ZVQnhnSERHVmhlczhEaFU1V0NsejZSaHM9'
)

const heading = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '12pt',
  verticalAlign: 'middle'
}

const subHeading = {...heading, fontSize: '10pt', backgroundColor: '#f2f2f2'}

const boldCenterCategory = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '10pt',
  verticalAlign: 'middle'
}
let spreadsheet

const CashflowSpreadsheet = props => {
  const { data, categorisedData } = props
  console.log('data from spreadsheet', data)
  console.log('categorized data from cashflowspreadsheet', categorisedData)
  let currentIndex = 3

  function onCreated() {
    spreadsheet.cellFormat({ fontWeight: 'bold' }, 'B1:B9')
    categorisedData.forEach(category => {
      // insert category header name
      rowsModel.push({
        index: currentIndex,
        cells: [ { value: category.name, colSpan: 4, style: boldCenterCategory, height: 35 }]
      })
      currentIndex++

      // insert category components
      category.categories.forEach(cat => {
        rowsModel.push({ index: currentIndex, cells: [{value: '', height: 25}, {value: cat.name, height: 25 },
        {value: cat.totalTokenAmt, height: 25, style: {
          color: cat.totalTokenAmt < -1 ? '#ff0000' : '#000000'
        }}] })
        currentIndex++
      })

      // insert category total
      let total = category.categories.reduce((acc, cat) => acc + cat.totalTokenAmt, 0)
      rowsModel.push({ index: currentIndex, cells: [{value: '', height: 25}, {value: 'Total', height: 25, style:{fontWeight: 'bold'} },
      {value: total, height: 25, style:{fontWeight: 'bold', color: total < -1 ? '#ff0000' : '#000000'}}] })
      currentIndex++

      // insert blank row for category separation
      rowsModel.push({index: currentIndex, cells: [{value: '', colSpan: 4}]})
      currentIndex++
    })

    // insert blank row for netflow separation
    rowsModel.push({index: currentIndex, cells: [{value: '', colSpan: 4}]})
    // insert net cashflow
    let total =  categorisedData.reduce((acc, cat) => acc + cat.trxTypeTotalTokenAmt, 0)
      rowsModel.push({ index: currentIndex, cells: [{value: '', height: 25}, {value: 'Net CashFlow', height: 25, style:{fontWeight: 'bold'} },
      {value: total, height: 25, style:{fontWeight: 'bold', color: total < -1 ? '#ff0000' : '#000000'}}] })
    spreadsheet.insertRow(rowsModel)
    // spreadsheet.numberFormat('_($#,##0.00_);_($* (#,##0.00);_($"-"??_);_(@_)', 'C5:C15')
    spreadsheet.numberFormat('[Red][<0]$#,##0.0000;[Black][>=0]$#,##0.0000', 'C5:C15')
  }

  function beforeCellRender(args) {
    if (spreadsheet.sheets[spreadsheet.activeSheetIndex].name === 'Order Details' && !spreadsheet.isOpen) {
        if (args.cell && args.cell.value) {
            //Applying cell formatting before rendering the particular cell.
            if (+args.cell.value < 0) {
                spreadsheet.cellFormat({ color: '#ff5b5b' }, args.address)
            }
        }
    }
}

  const rowsModel = []

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Fragment>
      {data.length ? (
        <SpreadsheetComponent
          created={onCreated.bind(this)}
          beforeCellRender={beforeCellRender.bind(this)}
          ref={ssObj => {
            spreadsheet = ssObj
          }}
          showFormulaBar={false}
          showRibbon={false}
        >
          <SheetsDirective>
            <SheetDirective
              key={'Cashflow Sheet'}
              name={'Cashflow Sheet'}
              rowCount={40}
              colCount={30}
              showGridLines={false}
            >
              <RowsDirective>
                {/* heading starts */}
                <RowDirective height={55}>
                  <CellsDirective>
                    <CellDirective index={0} value='BANKLESS ANNUAL REPORT-I' colSpan={4} style={heading}></CellDirective>
                  </CellsDirective>
                </RowDirective>
                <RowDirective height={40}>
                  <CellsDirective>
                    <CellDirective index={0} value='CASH FLOW STATEMENT' colSpan={4} style={subHeading}></CellDirective>
                  </CellsDirective>
                </RowDirective>
                {/* heading ends */}
                {/* category starts */}
                
                {/* row space between multiple categories */}
                <RowDirective height={35}>
                  <CellsDirective>
                    <CellDirective colSpan={5}></CellDirective>
                  </CellsDirective>
                </RowDirective>
                {/* category ends */}
              </RowsDirective>
              <ColumnsDirective>
                <ColumnDirective index={1} width={190}></ColumnDirective>
                <ColumnDirective index={2} width={260}></ColumnDirective>
                <ColumnDirective index={3} width={100}></ColumnDirective>
                <ColumnDirective width={350}></ColumnDirective>
              </ColumnsDirective>
              <RangesDirective></RangesDirective>
            </SheetDirective>
            {data.map(category => (
              <SheetDirective key={category.name} name={category.name}>
                <RangesDirective>
                  <RangeDirective dataSource={category.transactions}></RangeDirective>
                </RangesDirective>
              </SheetDirective>
            ))}
          </SheetsDirective>
        </SpreadsheetComponent>
      ) : (
        'No data'
      )}
    </Fragment>
  )
}

export default CashflowSpreadsheet
