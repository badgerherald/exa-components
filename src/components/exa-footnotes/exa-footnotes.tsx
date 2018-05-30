import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'exa-footnotes',
  styleUrl: 'exa-footnotes.scss',
  shadow: true,
})
export class ExaFootnotes {

  @Prop() postid: string
  @Prop() shareurl: string
  @Prop() shareheadline: string

  @Prop() published: string
  @Prop() modified: string

  @State() post: any

  render() {
    const services: Array<ExaSocialService> = ExaSocialServiceFactory.socialServices(this.shareurl,this.shareheadline);
    return (
      <div>
        <exa-publish-time-meta published={this.published} modified={this.modified}></exa-publish-time-meta>
        <ul>
          {services.map((service) => 
            <li><exa-social-button shareurl={service.shareurl} title={service.name} classname={service.classname} description=""></exa-social-button></li>
          )}
        </ul>

      </div>
    );   
  } 
}

enum ExaSocialServices {
  Facebook,
  Twitter
}

abstract class ExaSocialService {
  public abstract shareurl: string;
  public abstract name: string;
  public abstract classname: string;

  protected articleUrl: string;
  protected shareheadline: string;
  constructor(articleUrl: string, shareheadline: string) {
    this.articleUrl = articleUrl;
    this.shareheadline = shareheadline;
  }
}

class ExaSocialFacebook extends ExaSocialService {
  public name: string = "Share";
  public classname: string = "facebook";
  public shareurl: string = "http://facebook.com/";

  private fbShareUrl: string = "https://www.facebook.com/sharer/sharer.php"
  constructor(articleUrl: string, shareheadline: string) {
    super(articleUrl,shareheadline)
    this.shareurl = this.fbShareUrl + 
                      "?u=" + 
                      this.articleUrl;

  }
}

class ExaSocialTwitter extends ExaSocialService {
  public name: string = "Tweet";
  public classname: string = "twitter";
  public shareurl: string = "http://twitter.com/";

  private webIntentUrl: string = "https://twitter.com/intent/tweet"
  constructor(articleUrl: string, shareheadline: string) {
    super(articleUrl,shareheadline)
    this.shareurl = this.webIntentUrl + 
                      "?text=" + 
                      this.shareheadline + 
                      "&url=" + 
                      this.articleUrl;

  }
}

class ExaSocialServiceFactory {

  static socialServices(articleUrl: string, shareheadline: string) {
    var twitter = ExaSocialServiceFactory.socialService(ExaSocialServices.Twitter, articleUrl, shareheadline);
    var fb =  ExaSocialServiceFactory.socialService(ExaSocialServices.Facebook, articleUrl, shareheadline);
    return [fb, twitter]
  }

  static socialService(service: ExaSocialServices, articleUrl: string, shareheadline: string) {
    switch (service) {
      case ExaSocialServices.Facebook:
        return new ExaSocialFacebook(articleUrl,shareheadline)
      case ExaSocialServices.Twitter:
        return new ExaSocialTwitter(articleUrl,shareheadline)
    }
  }
}
