import { Component, Listen, EventEmitter, Event } from '@stencil/core';
import { ExaHeraldBreakpoint } from '../..';

@Component({
    tag: 'exa-breakpoint-listener',
})
export class ExaBreakpointListener {

    private breakpoint : ExaHeraldBreakpoint

    private breakpointWidths = {
        mobile: 400,
        tablet: 700,
        desktop: 1000,
        xl:1200
    }

    @Event() breakpointChanged: EventEmitter<ExaHeraldBreakpoint>
    
    private _low = 0
    private _high = 320

    @Listen('window:resize') 
    componentWillLoad() {
        this.checkWidth()
    }

    componentDidLoad() {
        console.log("sup")
        document.documentElement.style.setProperty(`--mobile_breakpoint_width`, this.breakpointWidths.mobile + "px");
        document.documentElement.style.setProperty(`--tablet_breakpoint_width`, this.breakpointWidths.tablet + "px");
        document.documentElement.style.setProperty(`--desktop_breakpoint_width`, this.breakpointWidths.desktop + "px");
        document.documentElement.style.setProperty(`--xl_breakpoint_width`, this.breakpointWidths.xl + "px");
    }
    checkWidth() {
        
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if(width < this._low || width > this._high) {
            this.changeBreakpoint(width)
        }
    }

    changeBreakpoint(width:number) {
        console.log("changed breakpoint")
        if (width < this.breakpointWidths.mobile) {
            console.log("!!!")
            this.setBreakpoint(ExaHeraldBreakpoint.mobile,0,this.breakpointWidths.mobile)
        } else if(width < this.breakpointWidths.tablet) {
            this.setBreakpoint(ExaHeraldBreakpoint.tablet,this.breakpointWidths.mobile,this.breakpointWidths.tablet)
        } else if(width < this.breakpointWidths.desktop) {
            this.setBreakpoint(ExaHeraldBreakpoint.desktop,this.breakpointWidths.tablet,this.breakpointWidths.desktop)
        } else {
            this.setBreakpoint(ExaHeraldBreakpoint.xl,this.breakpointWidths.desktop,9999999)
        }
        
    }

    setBreakpoint(breakpoint: ExaHeraldBreakpoint, low: number, high: number) {
        this.breakpoint = breakpoint
        this._low = low
        this._high = high
        this.breakpointChanged.emit(this.breakpoint)
    }

}
