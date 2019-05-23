import { Component, Prop, State } from '@stencil/core';
import { ExaHeraldBreakpoint } from '../..';
import { BreakpointTunnel } from '../../data/breakpoint'

@Component({
  tag: 'exa-root',
  styleUrl: 'exa-root.scss',
})
export class ExaRoot {

  @Prop() pageWidth : number

  @State() breakpointTunnelState = {
    breakpoint: ExaHeraldBreakpoint.mobile,
    columns: 3,
  }

  changeBreakpoint(event: CustomEvent<ExaHeraldBreakpoint>) {
    this.breakpointTunnelState = {
      breakpoint: event.detail,
      columns: 3
    }
  }

  render() {
    return [
      <exa-breakpoint-listener onBreakpointChanged={ev =>this.changeBreakpoint(ev)}/>,
      <BreakpointTunnel.Provider state={this.breakpointTunnelState}>
        <exa-nameplate id="nameplate" primary-menu="418" secondary-menu="1845" social-menu="8418" is-mobile="true"></exa-nameplate>
        <exa-home-above-fold></exa-home-above-fold>
      </BreakpointTunnel.Provider>
    ]
  }
}
