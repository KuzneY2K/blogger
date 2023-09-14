export class Blog {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.imgUrl = data.imgUrl || ("👎🏻")
        this.tags = data.tags
        this.published = data.published
        this.creatorId = data.creatorId
        this.body = data.body
        this.name = data.creator.name
        this.picture = data.creator.picture

    }
}