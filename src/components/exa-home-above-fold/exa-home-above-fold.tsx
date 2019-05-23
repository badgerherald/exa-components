import { Component, State, Prop, Element} from '@stencil/core';
import { ExaHeraldBreakpoint } from '../../index'
import { ExaPost, ExaMedia } from "../../global/ExaMedia"

declare var exa:any; // Magic

@Component({
  tag: 'exa-home-above-fold',
  styleUrl: 'exa-home-above-fold.scss',
})
export class ExaHomeAboveFold  {

  @Prop() breakpoint: ExaHeraldBreakpoint
  @Element() el : Element

  @State() posts : ExaPost[]
  @State() postMedia = new Map<ExaPost,ExaMedia>()

  @State() serverCalls : number = 0

  componentWillLoad() {
    var wp = new WPAPI({endpoint: exa.api_url})
    wp.posts().categories(exa.dominantCategory).perPage(4).then(this.loadDidFinish.bind(this))
  }

  loadDidFinish(data) {
    console.log(data)
    this.posts = ExaPost.fromList(data);
  }

  render() {
    console.log(this.postMedia)
    if(!this.posts || this.serverCalls != 0) {
      return (
        <div>Loading...</div>
      );
    } else {
      return this.posts.map(post => 
        <exa-teaser post={post} media={this.postMedia.get(post)} />
      )
    }

  }
}
