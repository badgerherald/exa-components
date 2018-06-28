

//Todo: protect this better
//export class WPAPI extends exa.WPAPI { }
//export class WPPI implements WPAPIInterface {

//}


export interface WPAPI {
    
    
    new(options : any);

    registerRoute( namespace: string, restBase: string)
    registerRoute( namespace: string, restBase: string, options: any)

    menus()
    posts()
} 

export namespace exa {

    class WPAPI_Options {
        public endpoint : string;
    }

    class WPRequest {

    }

}