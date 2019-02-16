import { Component, Prop, State } from '@stencil/core';
import { ExaMenuDirection, ExaMenuLinkColor, ExaMenuFontSize, ExaMenuDropdownStyle } from './exa-menu-style'

declare var exa:any; // Magic

@Component({
  tag: 'exa-menu',
  styleUrl: 'exa-menu.scss',
})
export class ExaMenu {  

  @Prop() title: string
  @Prop() tag_id: string
  @Prop() menuId: number
  @Prop() debug: boolean

  @Prop() menuDirection: ExaMenuDirection
  @Prop() menuLinkColor: ExaMenuLinkColor
  @Prop() menuFontSize: ExaMenuFontSize
  @Prop() menuDropdown: ExaMenuDropdownStyle

  @State() imgLoaded: boolean = false
  @State() menu: any

  componentDidLoad() {
    if(this.menu != null) {
      return;
    }    
    var wp = new WPAPI({endpoint: exa.api_url})
    const menuRoute = wp.registerRoute( 'wp-api-menus/v2', '/menus/(?P<id>)' );
    menuRoute.id(this.menuId).then(this.loadDidFinish.bind(this)).catch(this.loadDidFail.bind(this));
  }

  loadDidFinish( data) {
    this.menu = data
  }

  loadDidFail( err ) {
    console.log(err);
  }

  menuStyleClass() {
    switch (this.menuDirection) {
      case ExaMenuDirection.Vertical:
        return "vertical";
      case ExaMenuDirection.Horizontal:
        return "horizontal";
    }
  }

  menuFontClass() {
    switch (this.menuFontSize) {
      case ExaMenuFontSize.Big:
        return "big"
      case ExaMenuFontSize.Normal:
        return "normal"
    }
  }

  menuColorClass() {
    switch (this.menuLinkColor) {
      case ExaMenuLinkColor.Black:
        return "black"
      case ExaMenuLinkColor.White:
        return "white"
      case ExaMenuLinkColor.Blue:
        return "blue"
    }
  }

  menuClasses() {
    return this.menuStyleClass() + " " + this.menuColorClass() + " " + this.menuFontClass()
  }

  render() {
    if(this.menu == null) {
      return;
    }
    return (
      <menu class={this.menuClasses()}>
        {this.menu.items.map((menuItem,i) => 
            <exa-menu-item childmenuitems={menuItem.children} debug={ this.debug && i==0 } url={menuItem.url} title={menuItem.title} dropdownStyle={this.menuDropdown} category={menuItem.object_id} iconClass={menuItem.classes}></exa-menu-item>
        )}
      </menu>
    );  
  } 


}
