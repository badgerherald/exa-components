import { Component, Prop, State } from '@stencil/core';
import { ExaPost, ExaMedia } from '../../global/ExaMedia'

declare var exa : any

@Component({
  tag: 'exa-teaser',
  styleUrl: 'exa-teaser.scss',
})
export class ExaTeaser {

  @State() imageLoaded: boolean

  @Prop() post: ExaPost
  @Prop({mutable: true}) media: ExaMedia

  componentDidLoad() {
    if(!this.media) {
      this.loadFeaturedMedia()
    }
  }

  loadFeaturedMedia() {
    if(!this.post.featuredMedia) {
      return;
    }
    var wp = new WPAPI({endpoint: exa.api_url ,})
    wp.media().id(this.post.featuredMedia).then(this.mediaLoadDidFinish.bind(this)).catch(this.mediaLoadDidFail.bind(this));    
  }

  mediaLoadDidFinish( data : WPMedia) {
    this.media = new ExaMedia(data)
    this.imageLoaded = true;
  }

  mediaLoadDidFail( err ) {
    console.log(err);
  }

  render() {
    console.log(this.media)
    const img = this.media ? <img src={this.media.url}></img> : null
    if(!this.post) {
      return
    }
    return (
      <a href={this.media.url}>
        { img }
        <h3 class="title" innerHTML={this.post.title.rendered}></h3>
        <p class="subhead" innerHTML={this.post.subhead}></p>
      </a>
    );
  }

}
