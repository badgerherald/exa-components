import { Component, Prop, State,Element } from '@stencil/core';
import { ExaMenuFontSize, ExaMenuLinkColor, ExaMenuDirection, ExaMenuDropdownStyle } from './../exa-menu/exa-menu-style'
import { BreakpointTunnel } from './../../data/breakpoint'
import { ExaHeraldBreakpoint, ExaContainer } from '../..';

declare var exa:any; // Magic

@Component({
  tag: 'exa-nameplate',
  styleUrl: 'exa-nameplate.scss',
  shadow: true,
})
export class ExaNameplate implements ExaContainer {  

  @Prop() breakpoint: ExaHeraldBreakpoint
  @Element() el : Element

  @Prop() columns: number;
  @Prop() primaryMenu: number;
  @Prop() secondaryMenu: number;
  @Prop() socialMenu: number;

  @Prop() searchQuery: string;

  @State() menuOpen: boolean = false;

  renderPrimaryMenu() {
    if(this.breakpoint == ExaHeraldBreakpoint.mobile) {
      return(
        <exa-menu class="primary" 
                  menu-id={this.primaryMenu} 
                  menuDropdown={ExaMenuDropdownStyle.None} 
                  menuDirection={ExaMenuDirection.Vertical}
                  menuLinkColor={ExaMenuLinkColor.Blue}
                  menuFontSize={ExaMenuFontSize.Big}></exa-menu>        
      )
    } else {
      return (
        <exa-menu class="primary" 
                  menu-id={this.primaryMenu} 
                  menuDropdown={ExaMenuDropdownStyle.Teasers} 
                  menuDirection={ExaMenuDirection.Horizontal}
                  menuLinkColor={ExaMenuLinkColor.Blue}
                  menuFontSize={ExaMenuFontSize.Big}></exa-menu>  
      )
    }
  }

  renderSecondaryMenu() {
    if(this.breakpoint == ExaHeraldBreakpoint.mobile) {
      return(
        <exa-menu class="secondary" 
                  menu-id={this.secondaryMenu} 
                  menuDropdown={ExaMenuDropdownStyle.None} 
                  menuDirection={ExaMenuDirection.Vertical}
                  menuLinkColor={ExaMenuLinkColor.Black}
                  menuFontSize={ExaMenuFontSize.Normal}></exa-menu>        
      )
    } else {
      return (
        <exa-menu class="secondary" 
                  menu-id={this.secondaryMenu} 
                  menuDropdown={ExaMenuDropdownStyle.Simple} 
                  menuDirection={ExaMenuDirection.Horizontal}
                  menuLinkColor={ExaMenuLinkColor.Black}
                  menuFontSize={ExaMenuFontSize.Normal}></exa-menu>  
      )
    }
  }

  renderSocialMenu() {
    if(this.breakpoint == ExaHeraldBreakpoint.mobile) {
      return(
        <exa-menu class="social" 
                  menu-id={this.socialMenu} 
                  menuDropdown={ExaMenuDropdownStyle.None} 
                  menuDirection={ExaMenuDirection.Horizontal}
                  menuLinkColor={ExaMenuLinkColor.Blue}
                  menuFontSize={ExaMenuFontSize.Normal}></exa-menu>        
      )
    } else {
      return (
        <exa-menu class="social" 
                  menu-id={this.socialMenu}
                  menuDropdown={ExaMenuDropdownStyle.None} 
                  menuDirection={ExaMenuDirection.Horizontal}
                  menuLinkColor={ExaMenuLinkColor.Blue}
                  menuFontSize={ExaMenuFontSize.Normal}></exa-menu>  
      )
    }
  }

  renderSearchForm() {
    return (   
      <exa-search-form></exa-search-form>
    )
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  renderMobileMenuButton() {
    console.log(this.breakpoint)
    if(this.breakpoint == ExaHeraldBreakpoint.mobile) {
      return(<exa-menu-button active={this.menuOpen} onClick={() => this.toggleMenu()}></exa-menu-button>)
    }
  }

  render() {
    console.log(exa);
    return(
      <div class={this.breakpoint == ExaHeraldBreakpoint.mobile? "nameplate" : "nameplate desktop"}>
        <a class="logo" href="https://badgerherald.com/">
          <img src={exa.builddir + "/svg/vertical-herald-logo.png" } />
        </a>
        {this.renderMobileMenuButton()}
        <div class={this.menuOpen ? "menus active" : "menus"}>
          {this.renderPrimaryMenu()}
          {this.renderSearchForm()}
          {this.renderSocialMenu()} 
          {this.renderSecondaryMenu()}
        </div>
        <div class="clearfix"></div>
      </div>
    );
 
  } 
}

BreakpointTunnel.injectProps(ExaNameplate, ['breakpoint']);
