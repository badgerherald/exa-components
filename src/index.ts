export * from './components';

export enum ExaColumnWidth {
    col1 = 1,
    col2 = 2,
    col3 = 3,
    col4 = 4,
    col5 = 5,
    col6 = 6,
    col7 = 7,
    col8 = 8,
    col9 = 9,
    col10 = 10,
    col11 = 11,
    col12 = 12
}

export enum ExaHeraldBreakpoint {
    mobile = 1,
    tablet = 2,
    desktop = 3,
    xl = 4,
}

export interface ExaBlock {
    columns : ExaColumnWidth
}

export interface ExaContainer {
    el : Element
    breakpoint : ExaHeraldBreakpoint   
}

export interface ExaColumnContextual {
    el : Element
    columns : ExaColumnContextual
}

export interface ExaWordpressQueryContextual {
    
}

export interface ExaPageRoot extends ExaContainer {

}

export interface ExaPageBlock extends ExaContainer {

}





export const BreakpointStyle = `

`