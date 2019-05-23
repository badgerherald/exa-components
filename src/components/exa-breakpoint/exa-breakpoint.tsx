import { Component, Prop, Element} from '@stencil/core';
import { ExaHeraldBreakpoint } from '../..';

@Component({
    tag: 'exa-breakpoint',
    styleUrl: 'exa-breakpoint.scss',
})
export class ExaBreakpointWrapper {

    @Element() el: Element

    @Prop() breakpoint: ExaHeraldBreakpoint 

    @Prop() mobile: boolean
    @Prop() tablet: boolean
    @Prop() desktop: boolean
    @Prop() xl: boolean

    @Prop() all: boolean

    protected static breakpoint

    private observer: MutationObserver

    observeSlotMutation(mutationsList: MutationRecord[]) {
      for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
          console.log(mutation,'A child node has been added or removed.');
        }
        else if (mutation.type == 'attributes') {
          console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
      }
    }

    componentWillLoad() {
      var observerConfig = { attributes: true, childList: true, subtree: true };
      this.observer = new MutationObserver((mutationsList, _observer) => this.observeSlotMutation(mutationsList));

      this.observer.observe(this.el, observerConfig);
    }

    componentDidUnload() {
      this.observer.disconnect()
    }

    render() {
      return (<div><slot></slot></div>)
    }
}
