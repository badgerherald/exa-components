import { Component, Prop, State,Listen } from '@stencil/core';
import { ExaMenuFontSize, ExaMenuLinkColor, ExaMenuDirection, ExaMenuDropdownStyle } from './exa-menu/exa-menu-style'

declare var exa:any; // Magic

@Component({
  tag: 'exa-nameplate',
  styleUrl: 'exa-nameplate.scss',
  shadow: true,
})
export class ExaNameplate {  

  @Prop() primaryMenu: number;
  @Prop() secondaryMenu: number;
  @Prop() socialMenu: number;

  @State() isMobile: boolean;

  @Prop() searchQuery: string;

  @State() menuOpen: boolean = false;

  @Listen('window:resize')
  handleScroll() {
    const screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if(screenWidth < 760) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  componentDidLoad() {
    this.handleScroll()
  }

  renderPrimaryMenu() {
    if(this.isMobile) {
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
    if(this.isMobile) {
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
    if(this.isMobile) {
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
    if(this.isMobile) {
      return(<exa-menu-button active={this.menuOpen} onClick={() => this.toggleMenu()}></exa-menu-button>)
    }
  }

  render() {
    return(
      <div class={this.isMobile ? "nameplate" : "nameplate desktop"}>
        <a class="logo" href="https://badgerherald.com/">
          <img src={exa.themedir + "/js/components/svg/vertical-herald-logo.png" } />
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

