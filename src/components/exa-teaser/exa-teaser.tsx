import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'exa-teaser',
  styleUrl: 'exa-teaser.scss',
})
export class ExaTeaser {

  @Prop() postid: number;

  @Prop() title: string;
  @Prop() subhead: string;
  @Prop() url: string;

  @Prop() imgsrc: string;

  render() {
    const img = this.imgsrc ? <img src={this.imgsrc}></img> : null
    return (
      <a href={this.url}>
        { img }
        <h3 class="title" innerHTML={this.title}></h3>
        <p class="subhead" innerHTML={this.subhead}></p>
      </a>
    );
  }

}
