import type { BookType, JSON2SheetOpts, WritingOptions } from 'xlsx'

export interface ExcelData<T = any> {
    header: string[]
    results: T[]
    meta: { sheetName: string }
}

// export interface ImportProps {
//   beforeUpload: (file: File) => boolean;
// }

export interface JsonToSheet<T = any> {
    data: T[]
    header?: T
    filename?: string
    json2sheetOpts?: JSON2SheetOpts
    write2excelOpts?: WritingOptions
}

export interface AoAToSheet<T = any> {
    data: T[][]
    header?: T[]
    filename?: string
    write2excelOpts?: WritingOptions
}

export interface ExportModalResult {
    filename: string
    bookType: BookType
}
