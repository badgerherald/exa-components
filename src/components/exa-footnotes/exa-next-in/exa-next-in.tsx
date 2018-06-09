import { Component, Prop, State } from '@stencil/core';

declare var WPAPI:any; // Magic
declare var exa:any; // Magic

@Component({
  tag: 'exa-next-in',
  styleUrl: 'exa-next-in.scss',
  shadow: true,
})
export class ExaCommentsFootnotes {

  @Prop() postid: string;
  @Prop() title: string;
  @Prop() tag_id: string;
  @Prop() url: string;

  @State() posts: Array<any>;

  @State() imgLoaded: boolean = false;

  componentDidLoad() {
    if(this.posts != null) {
      return;
    }    
    var wp = new WPAPI({endpoint: exa.api_url})
    wp.posts().param('per_page','4').categories(this.tag_id).then(this.loadDidFinish.bind(this)).catch(this.loadDidFail.bind(this));
  }

  loadDidFinish( data ) {
    this.posts = data;
    this.loadFeaturedMedia(this.posts[0]);
  }

  loadDidFail( err ) {
    console.log(err);
  }

  loadFeaturedMedia( post ) {
    if(!post.featured_media) {
      return;
    }
    var wp = new WPAPI({endpoint: exa.api_url ,})
    wp.media().id(post.featured_media).then(this.mediaLoadDidFinish.bind(this)).catch(this.mediaLoadDidFail.bind(this));    
  }

  mediaLoadDidFinish( data ) {
    this.posts[0].imgsrc = data.media_details.sizes["post-thumbnail"].source_url;
    this.imgLoaded = true;
  }

  mediaLoadDidFail( err ) {
    console.log(err);
  }

  render() {
    if(this.posts == null) {
      return;
    }
    return (
      <div>
        <h1>Next in <a href={this.url}>{this.title}</a></h1>
        <ul>
          {this.posts.map((post) => 
            <li><exa-teaser imgsrc={post.imgsrc} url={post.link} title={post.title.rendered} subhead={post.subhead ? post.subhead : post.excerpt.rendered}></exa-teaser></li>
          )}
        </ul>
      </div>
    );   
  } 


}