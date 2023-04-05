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
import { ColumnDirective, ColumnsDirective, RangeDirective, RangesDirective, SheetDirective, SheetsDirective, SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet'
import { registerLicense } from '@syncfusion/ej2-base'
import { useEffect } from 'react'

registerLicense('Mgo+DSMBaFt+QHFqVk5rWU5AaV1CX2BZeFl1Q2lcfE4QCV5EYF5SRHJfRlxrTX5SfkJhXnc=;Mgo+DSMBPh8sVXJ1S0d+X1lPc0BGQmFJfFBmQ2laeVR1d0UmHVdTRHRcQlljTX9bckViUXhacXw=;ORg4AjUWIQA/Gnt2VFhhQlJMfVpdWXxLflF1VWVTfFh6cVZWACFaRnZdQV1nSXpSfkFjWHdZdX1d;MTYyMDU1M0AzMjMxMmUzMTJlMzMzOFdlR2dKNkc3VzRvSUI5d0Q2WHBzUHV4a2NZcUhTOWhtek5vK2FUa2xsZUk9;MTYyMDU1NEAzMjMxMmUzMTJlMzMzOG9xSTJSa25idnhsQlZieGJ3bjZzalZMaE96aWZEZkU0Q3orRm5uUVUvZlU9;NRAiBiAaIQQuGjN/V0d+XU9HflRHQmdWfFN0RnNfdV12flBFcDwsT3RfQF5jTX5Xd01nWX5WeHdSTg==;MTYyMDU1NkAzMjMxMmUzMTJlMzMzOERncHNGUHRXbFRMUDROSjBFS1ZVQnhnSERHVmhlczhEaFU1V0NsejZSaHM9;MTYyMDU1N0AzMjMxMmUzMTJlMzMzOFAyNU40YW8rZnRYWHdNeVZic2Y2VEp3YWxlZUNnTTRaRjUwdkNVNTRDSU09;Mgo+DSMBMAY9C3t2VFhhQlJMfVpdWXxLflF1VWVTfFh6cVZWACFaRnZdQV1nSXpSfkFjWHdXcHRd;MTYyMDU1OUAzMjMxMmUzMTJlMzMzOEhYeDRQLzdaWGQ1UzBSNnF6eis3SVUvdlM1ODlFZUpNbjZJVkxJWS9heU09;MTYyMDU2MEAzMjMxMmUzMTJlMzMzOFBHWWNDV1NVNS9LYlB4dkRzZFdmY2E1RFB0NkpRTVNqeHV4aDVxRW9zak09;MTYyMDU2MUAzMjMxMmUzMTJlMzMzOERncHNGUHRXbFRMUDROSjBFS1ZVQnhnSERHVmhlczhEaFU1V0NsejZSaHM9')

const CashflowSpreadsheet = (props) => {

    const {data} = props
    console.log('data from spreadsheet', data)

    useEffect(() => {
        console.log(data)
      }, [data])

    return (
        <Fragment>
                {data.length ? 
             <SpreadsheetComponent showFormulaBar={false} showRibbon={false}>
            <SheetsDirective>
            {data.map(category => (
                <SheetDirective key={category.name} name={category.name}>
                    <RangesDirective>
                        <RangeDirective dataSource={category.transactions}></RangeDirective>
                    </RangesDirective>
                    {/* <ColumnsDirective>
                        <ColumnDirective width={100}></ColumnDirective>
                        <ColumnDirective width={110}></ColumnDirective>
                        <ColumnDirective width={100}></ColumnDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                    </ColumnsDirective> */}
                </SheetDirective>
         
         ))}
            </SheetsDirective>
        </SpreadsheetComponent>
        : 'No data'}
        </Fragment>
    )
}

export default CashflowSpreadsheet