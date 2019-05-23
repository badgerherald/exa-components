import { Component, Prop, State } from '@stencil/core';
import { ExaPost } from '../../global/ExaMedia'

declare var exa:any; // Magic

@Component({
  tag: 'exa-menu-dropdown',
  styleUrl: 'exa-menu-dropdown.scss',
})
export class ExaMenuDropdown {

  @Prop() title: string;
  @Prop() menuItems: Array<any>;
  @Prop() posts: Array<ExaPost> = new Array();
  @Prop() subhead: string;
  @Prop() url: string;

  @State() imgsrc: string;

  imgLoaded: boolean = false;

  loadFeaturedMedia() {
    if(this.imgLoaded) {
      return;
    }
    if(!this.posts) {
      return;
    }
    this.posts.map((post) => {
      this.loadFeaturedMediaForPost(post);
    });
  }

  loadFeaturedMediaForPost(post) {
    if(!post.featured_media || post.imgsrc) {
      return;
    }
    this.imgLoaded = true;
    var wp = new WPAPI({endpoint: exa.api_url ,})
    wp.media().id(post.featured_media).then((data) => this.mediaLoadDidFinish(data,post)).catch(this.mediaLoadDidFail.bind(this));  
  }

  mediaLoadDidFinish( data, post ) {
    post.imgsrc = data.media_details.sizes["post-thumbnail"] ? data.media_details.sizes["post-thumbnail"].source_url : "";
    this.imgsrc = post.imgsrc;
  }

  mediaLoadDidFail( err ) {
    console.log(err);
  }

  render() {
    if(!this.imgLoaded) {
      this.loadFeaturedMedia()
    }
    return (
      <div>
      <h4>{this.title}</h4>
        <div class="menu">
          
          <ul>
            {this.menuItems.map((menuItem) => 
                <li><a href={menuItem.url}>{menuItem.title}</a></li>
            )}
          </ul>
        </div>
        <ul class="teasers">
          {this.posts.map((post) => 
            <li><exa-teaser post={post}></exa-teaser></li>
          )}
        </ul>
        <div class="clearfix"></div>
      </div>
    );
  }

}
