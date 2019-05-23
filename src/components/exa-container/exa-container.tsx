import { Component, Prop, Element } from '@stencil/core';
import { ExaHeraldBreakpoint, ExaContainer } from '../..';
import { BreakpointTunnel } from './../../data/breakpoint'

@Component({
  tag: 'exa-container',
  styleUrl: 'exa-container.scss'
})
export class ExaDefaultContainer implements ExaContainer {

  @Element() el : Element
  @Prop() breakpoint : ExaHeraldBreakpoint


  render() {
    return (
      <div class="exa-container">
        <slot></slot>
      </div>
    );
  }
}

BreakpointTunnel.injectProps(ExaDefaultContainer, ['breakpoint']);
