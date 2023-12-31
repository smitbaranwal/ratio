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
import BackdropLoader from 'src/@core/layouts/components/shared-components/BackdropLoader'
import { useState } from 'react'
import { Button } from '@mui/material'

registerLicense(
  'Mgo+DSMBaFt+QHFqVk5rWU5AaV1CX2BZeFl1Q2lcfE4QCV5EYF5SRHJfRlxrTX5SfkJhXnc=;Mgo+DSMBPh8sVXJ1S0d+X1lPc0BGQmFJfFBmQ2laeVR1d0UmHVdTRHRcQlljTX9bckViUXhacXw=;ORg4AjUWIQA/Gnt2VFhhQlJMfVpdWXxLflF1VWVTfFh6cVZWACFaRnZdQV1nSXpSfkFjWHdZdX1d;MTYyMDU1M0AzMjMxMmUzMTJlMzMzOFdlR2dKNkc3VzRvSUI5d0Q2WHBzUHV4a2NZcUhTOWhtek5vK2FUa2xsZUk9;MTYyMDU1NEAzMjMxMmUzMTJlMzMzOG9xSTJSa25idnhsQlZieGJ3bjZzalZMaE96aWZEZkU0Q3orRm5uUVUvZlU9;NRAiBiAaIQQuGjN/V0d+XU9HflRHQmdWfFN0RnNfdV12flBFcDwsT3RfQF5jTX5Xd01nWX5WeHdSTg==;MTYyMDU1NkAzMjMxMmUzMTJlMzMzOERncHNGUHRXbFRMUDROSjBFS1ZVQnhnSERHVmhlczhEaFU1V0NsejZSaHM9;MTYyMDU1N0AzMjMxMmUzMTJlMzMzOFAyNU40YW8rZnRYWHdNeVZic2Y2VEp3YWxlZUNnTTRaRjUwdkNVNTRDSU09;Mgo+DSMBMAY9C3t2VFhhQlJMfVpdWXxLflF1VWVTfFh6cVZWACFaRnZdQV1nSXpSfkFjWHdXcHRd;MTYyMDU1OUAzMjMxMmUzMTJlMzMzOEhYeDRQLzdaWGQ1UzBSNnF6eis3SVUvdlM1ODlFZUpNbjZJVkxJWS9heU09;MTYyMDU2MEAzMjMxMmUzMTJlMzMzOFBHWWNDV1NVNS9LYlB4dkRzZFdmY2E1RFB0NkpRTVNqeHV4aDVxRW9zak09;MTYyMDU2MUAzMjMxMmUzMTJlMzMzOERncHNGUHRXbFRMUDROSjBFS1ZVQnhnSERHVmhlczhEaFU1V0NsejZSaHM9'
)

const heading = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '12pt',
  verticalAlign: 'middle'
}

const subHeading = { ...heading, fontSize: '10pt', backgroundColor: '#f2f2f2' }

const boldCenterCategory = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '10pt',
  verticalAlign: 'middle'
}

const downloadButtonStyle = {
  'z-index': '11',
  position: 'fixed',
  right: '3.5rem',
  top: '6.5rem',
  transform: 'none',
  transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
}

let spreadsheet

const CashflowSpreadsheet = props => {
  const { dataAll, categorisedDataAll } = props
  const categorisedData = JSON.parse(JSON.stringify(categorisedDataAll)) //[...categorisedData]
  const data = JSON.parse(JSON.stringify(dataAll)) //[...dataAll]

  const objectOrder = {
    'Nonce': null,
    'Category': null,
    'Type': null,
    'Executedat': null,
    'FromAddress': null,
    'ToAddress': null,
    'RecipientName': null,
    'USDAmount': null,
    'TokenSymbol': null,
    'TokenAmount': null,
    'Description': null,
    'Tag': null,
    'Executedat': null,
    'Comment': null,
    'Transactionfees': null,
    'TransactionStatus': null,
    'TransactionHash': null
  }

data.forEach(cat => {
  cat.transactions.forEach(trxn => {
    // debugger
    // trxn = Object.assign(objectOrder, trxn)
    // trxn.TokenAmt = trxn.TokenAmount + ' ' + trxn.TokenSymbol
    delete trxn.FiatValue
    delete trxn.FiatPrice
    delete trxn.Token
    // delete trxn.TokenSymbol
    delete trxn.Category
    delete trxn.Category
    delete trxn.Tag
    delete trxn.TransactionHash

  })
})
  let currentIndex = 3

  const [onloaded, setOnloaded] = useState(false)

  function onCreated() {
    // debugger
    console.log('on created spreadsheet', spreadsheet.sheets[spreadsheet.activeSheetIndex])

    spreadsheet.cellFormat({ fontWeight: 'bold' }, 'B1:B9')
    categorisedData.forEach(category => {
      // insert category header name
      rowsModel.push({
        index: currentIndex,
        cells: [{ value: category.name, colSpan: 4, style: boldCenterCategory, height: 105 }]
      })
      currentIndex++
      // insert category components
      category.categories.forEach(cat => {
        rowsModel.push({
          index: currentIndex,
          cells: [
            { value: '', height: 25 },
            { value: cat.name, height: 25 },
            {value: cat.TokenSummary,  style: {
              color: cat.TokenSummary < -1 ? '#ff0000' : '#000000'
            }},
            {
              value: cat.totalUSDAmtPre < 0 ? (
                Math.abs(cat.totalTokenAmt.toFixed(0)) + ' | $' + Math.abs(cat.totalUSDAmtPre.toFixed(2))
              ) : (
                
                  !isNaN(cat.totalUSDAmtPre) ? Math.abs(cat.totalTokenAmt.toFixed(0)) + ' | $' + Math.abs(cat.totalUSDAmtPre).toFixed(3) : Math.abs(cat.totalTokenAmt.toFixed(0)) + ' | $0.00'
                
              ),
              height: 25,
              style: {
                color: cat.totalTokenAmt < -1 ? '#ff0000' : '#000000'
              }
            }
           
          ]
        })
        currentIndex++
      })
      // insert category total
      let total = category.categories.reduce((acc, cat) => acc + cat.totalTokenAmt, 0)
      let totalUsd = category.categories.reduce((acc, cat) => acc + (cat.totalUSDAmtPre != '--' && !isNaN(cat.totalUSDAmtPre) ? cat.totalUSDAmtPre : 0), 0)
      let TotalTokenSummary = category.TotalTokenSummary
      let istotalnegative = total < -1
      rowsModel.push({
        index: currentIndex,
        cells: [
          { value: '', height: 25 },
          { value: 'Total', height: 25, style: { fontWeight: 'bold' } },
          { value: TotalTokenSummary, height: 25, style: { fontWeight: 'bold', color: istotalnegative ? '#ff0000' : '#000000' } },
          { value: Math.abs(total.toFixed(0)) + ' | $' + Math.abs(totalUsd).toFixed(3), height: 25, style: { fontWeight: 'bold', color: istotalnegative ? '#ff0000' : '#000000' } }
        ]
      })
      currentIndex++

      // insert blank row for category separation
      rowsModel.push({ index: currentIndex, cells: [{ value: '', colSpan: 4 }] })
      currentIndex++
    })

    // insert blank row for netflow separation
    rowsModel.push({ index: currentIndex, cells: [{ value: '', colSpan: 4 }] })
    // insert net cashflow
    let total = categorisedData.reduce((acc, cat) => acc + Number(cat.trxTypeTotalTokenAmt), 0)
    let totalUsd = categorisedData.reduce((acc, cat) =>  acc + (cat.trxTypeTotalUSDAmtPre != '--' ? Number(cat.trxTypeTotalUSDAmtPre) : 0), 0)
    // let totalTokenSummary = categorisedData.TotalTokenSummary
    rowsModel.push({
      index: currentIndex,
      cells: [
        { value: '', height: 25 },
        { value: 'Net CashFlow', height: 25, style: { fontWeight: 'bold' } },
        { value: '', height: 25 },
        // { value: totalTokenSummary, height: 25, style: { fontWeight: 'bold', color: totalUsd < -1 ? '#ff0000' : '#000000' } },
        { value: total.toFixed(0) + ' | $' + Math.abs(totalUsd.toFixed(2)), height: 25, style: { fontWeight: 'bold', color: totalUsd < -1 ? '#ff0000' : '#000000' } }
      ]
    })
    spreadsheet.insertRow(rowsModel)
    // spreadsheet.numberFormat('_($#,##0.00_);_($* (#,##0.00);_($"-"??_);_(@_)', 'C5:C15')
    spreadsheet.numberFormat('[Red][<0]$#,##0.0000;[Black][>=0]$#,##0.0000', 'C5:C15')
    const timeouttime = 300
    spreadsheet.sheets.forEach((sheet, index) => {
      // sheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1')
      setTimeout(() => {
        if (index > 0 && index < spreadsheet.sheets.length - 1) {
          spreadsheet.moveSheet(index, [index + 1])
          // sheet.cellFormat({fontWeight: 'bold'}, 'A1:D1')
        }
      }, index * timeouttime)
    })
    setTimeout(() => {
      spreadsheet.moveSheet(1, [spreadsheet.sheets.length - 1])
    }, spreadsheet.sheets.length - 1 * timeouttime)
    setTimeout(() => {
      spreadsheet.moveSheet(0, [0])
      setOnloaded(true)
    }, spreadsheet.sheets.length * timeouttime)
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
    console.log('use effect cashflow', JSON.stringify(data))
  }, [data])

  const saveClicked = () => {
    // spreadsheet.save()
    spreadsheet.save({
      url: 'https://services.syncfusion.com/react/production/api/spreadsheet/save',
      fileName: 'CashflowSpreadsheet',
      saveType: 'Xlsx'
    })
  }





    data.forEach(category => {
      const tokenSummary = {}
      let text = ''
      category.transactions.forEach(trx => {
        if (trx.TokenSymbol) {
          if (tokenSummary[trx.TokenSymbol]) {
            tokenSummary[trx.TokenSymbol] += +(trx.TokenAmount.toFixed(2))
          } else {
            tokenSummary[trx.TokenSymbol] = +(trx.TokenAmount.toFixed(2))
          }
        }
      })
      Object.keys(tokenSummary).forEach(key => {
        text += ' ' + tokenSummary[key] + ' ' + key + ','
      })
      text = text.slice(0, text.length - 1)
      category.TokenSummary = text
    })
  //   Object.keys(totalTokenSummary).forEach(key => {
  //     totalText += ' ' + totalTokenSummary[key] + ' ' + key + ','
  //   })
  //   totalText = totalText.slice(0, totalText.length - 1)
  //   dao.TotalTokenSummary = totalText
  // })














  return (
    <Fragment>
      <BackdropLoader message={'Hold Tight... Arranging Sheets!'} open={!onloaded} />
      <div className='mui-fixed' role='presentation' style={downloadButtonStyle}>
        <Button onClick={saveClicked} variant='contained'>
          Download
        </Button>
        {/* <button className="MuiButtonBase-root MuiFab-root MuiFab-circular MuiFab-sizeSmall MuiFab-primary css-pue6qa" tabIndex="0" type="button" aria-label="scroll back to top">
          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowUpIcon"><
            path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"></path>
          </svg>
          <span className="MuiTouchRipple-root"></span>
        </button> */}
      </div>

      {data.length ? (
        <div>
          <SpreadsheetComponent
            height={'550px'}
            created={onCreated.bind(this)}
            beforeCellRender={beforeCellRender.bind(this)}
            allowSave={true}
            saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save'
            ref={ssObj => {
              console.log('ssObj', ssObj)
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
                    {/* <CellsDirective>
                    <CellDirective index={0} value='BANKLESS ANNUAL REPORT-I' colSpan={4} style={heading}></CellDirective>
                  </CellsDirective> */}
                  </RowDirective>
                  <RowDirective height={40}>
                    <CellsDirective>
                      <CellDirective
                        index={0}
                        value='CASH FLOW STATEMENT'
                        colSpan={4}
                        style={subHeading}
                      ></CellDirective>
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


              {/* {row.totalTokenAmt > 0 ? (
            <span style={{ color: 'green' }}>{row.TokenSummary}</span>
          ) : (
            <span style={{ color: 'red' }}>{row.TokenSummary}</span>
          )}{' '} */}


              {console.log("dataaaaaaaaaaaaa", data)}
              {data.map(category => (
                <SheetDirective key={category.name} name={category.name}>
                  <RangesDirective>
                    <RangeDirective dataSource={category.transactions}></RangeDirective>
                  </RangesDirective>
                  <ColumnsDirective>
                    <ColumnDirective width={60} textAlign="Left"></ColumnDirective>
                    <ColumnDirective width={90}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                    <ColumnDirective width={130}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                    <ColumnDirective width={100}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                    <ColumnDirective width={180}></ColumnDirective>
                    <ColumnDirective width={180}></ColumnDirective>
                    <ColumnDirective width={220}></ColumnDirective>
                    <ColumnDirective width={290}></ColumnDirective>
                    <ColumnDirective width={190}></ColumnDirective>
                    <ColumnDirective width={210} ></ColumnDirective>
                    <ColumnDirective width={210} ></ColumnDirective>
                    <ColumnDirective width={190}></ColumnDirective>
                    <ColumnDirective width={190}></ColumnDirective>
                    <ColumnDirective width={190}></ColumnDirective>
                  </ColumnsDirective>
                </SheetDirective>
              ))}
            </SheetsDirective>
          </SpreadsheetComponent>
        </div>
      ) : (
        'No data'
      )}
    </Fragment>
  )
}

export default CashflowSpreadsheet
