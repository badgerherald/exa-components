
export enum ExaThumbnailSize {
    Small = 0,
}

export class ExaPost {

    constructor(private wppost?: WPPost) { }
    
    static fromList(posts : WPPost[]) {
        return posts.map(post => {return new ExaPost(post)})
    }

    get title() {
        return this.wppost.title
    }

    get subhead() {
        return this.wppost.subhead
    }

    get featuredMedia() : number {
        return this.wppost.featured_media
    }
    
}
export class ExaMedia {
    readonly author;
    
    constructor(private wpmedia?: WPMedia) {

    }

    get url() {
        return this.wpmedia.source_url
    }

    size() {

    }
}