import { Component, Prop, State } from '@stencil/core';
import { ExaPost } from '../../global/ExaMedia'

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

  @State() posts: ExaPost[];

  @State() imgLoaded: boolean = false;

  componentDidLoad() {
    if(this.posts != null) {
      return;
    }    
    var wp = new WPAPI({endpoint: exa.api_url})
    wp.posts().param('per_page','4').categories(this.tag_id).then(this.loadDidFinish.bind(this)).catch(this.loadDidFail.bind(this));
  }

  loadDidFinish(data: WPPost[]) {
    this.posts = ExaPost.fromList(data)
  }

  loadDidFail(err) {
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
            <li><exa-teaser post={post}></exa-teaser></li>
          )}
        </ul>
      </div>
    );   
  } 
}
