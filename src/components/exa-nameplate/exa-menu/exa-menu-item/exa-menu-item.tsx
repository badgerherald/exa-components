import { Component, Prop, State } from '@stencil/core';
import { ExaMenuDropdownStyle } from '../exa-menu-style'

declare var WPAPI:any; // Magic
declare var exa:any; // Magic

@Component({
  tag: 'exa-menu-item',
  styleUrl: 'exa-menu-item.scss',
})
export class ExaMenuItem {

  @Prop() childmenuitems: Array<any>
  @Prop() url: string
  @Prop() title: string
  @Prop() category: number
  @Prop() debug: boolean

  @Prop() iconClass: string

  @Prop() dropdownStyle: ExaMenuDropdownStyle

  @State() posts: Array<any>

  loadTeasers() {
    if(this.posts) {
      return;
    }
    if(!this.category) {
      return
    }
    if(this.dropdownStyle != ExaMenuDropdownStyle.Teasers) {
      return;
    }
    var wp = new WPAPI({endpoint: exa.api_url})
    wp.posts().param('per_page','3').categories(this.category).then( this.teaserLoadDidFinish.bind(this) ).catch( this.teaserLoadDidFail.bind(this) );
  }

  teaserLoadDidFinish( data ) {
    this.posts = data 
  }

  teaserLoadDidFail( err ) {
    console.log(err);
  }

  hasDropdown() {
    return this.childmenuitems && this.dropdownStyle != ExaMenuDropdownStyle.None;
  }

  renderDropdown() {
    if(!this.hasDropdown()) {
      return;
    }
    this.loadTeasers();
    return (
      <exa-menu-dropdown posts={this.posts} menuItems={this.childmenuitems} title={this.title}></exa-menu-dropdown>
    )
  }

  render() {
    const classes : string = ( this.hasDropdown() ? "dropdown" : "" ) + ( this.debug ? " debug" : "" ) + (this.iconClass ? " " + this.iconClass : "")
    return (
      <li class={ classes }>
        <a href={this.url}>
          {this.title}
        </a>
        {this.renderDropdown()}
      </li>
    );
  }

}
