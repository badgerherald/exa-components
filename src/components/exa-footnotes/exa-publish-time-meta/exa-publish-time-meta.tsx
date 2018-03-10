import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'exa-publish-time-meta',
  styleUrl: 'exa-publish-time-meta.scss',
})
export class ExaPublishTimeMeta {

  @Prop() modified: string;
  @Prop() published: string;

  render() {
    const modified: ExaDateFormat = new ExaDateFormat(this.modified);
    const published: ExaDateFormat = new ExaDateFormat(this.published);
    const modifiedHTML = <span> &middot; Last modified {modified.format()}</span>
    return (
      <div>
        <span>Published {published.format()}</span> 
        {this.modified ? modifiedHTML : ""}
      </div>
    );   
  } 
}


declare var moment:any; // Magic

moment.fn.exaDateFormat = function() {
  console.log(Math.abs(moment().diff(this)));
  if (Math.abs(moment().diff(this)) < (60 * 60 * 24 * 1000)) {
    return this.fromNow();
  } else if (Math.abs(moment().diff(this)) < (60 * 60 * 24 * 7 * 1000)) {
    return this.calendar(null,{
      sameDay: '[today]',
      nextDay: '[tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[yesterday]',
      lastWeek: '[last] dddd',
      sameElse: 'DD/MM/YYYY'
    });
  } else {
    return this.format('MMMM D, YYYY');
  }
}

class ExaDateFormat {
  
  private date: string;

  constructor(date: string) {
    this.date = date;
  }

  public format() {
    return moment(this.date).exaDateFormat();
  }

}
