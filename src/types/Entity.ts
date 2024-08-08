import { v7 as uuidv7 } from "uuid"

export enum EntityType {
  Entity = "Entity",
  User = "User",
  Post = "Post",
  PrayerRequest = "Prayer Request",
  Media = "Media",
  Note = "Note",
  Scripture = "Scripture",
  Answer = "Answer",
  PrayerList = "Prayer List",
  PrayerGroup = "Prayer Group"
}

export class Entity {
  id: string
  type: EntityType
  created: Date
  updated: Date

  constructor() {
    this.id = uuidv7()
    this.type = EntityType.Entity
    this.created = new Date()
    this.updated = new Date()
  }
}

export class User extends Entity {
  fullName: string
  nickName: string

  constructor() {
    super()
    this.type = EntityType.User

    this.fullName = ""
    this.nickName = ""
  }
}

export class Media extends Entity {
  url: string

  constructor() {
    super()
    this.type = EntityType.Media

    this.url = ""
  }
}

export class Scripture extends Entity {
  ref: string

  constructor() {
    super()
    this.type = EntityType.Scripture

    this.ref = ""
  }
}

export class Post extends Entity {
  content: string
  thread: Entity[]

  constructor() {
    super()
    this.type = EntityType.Post

    this.content = ""
    this.thread = []
  }

  get media(): Media[] {
    return <Media[]>this.thread.filter((entity) => entity.type === EntityType.Media)
  }

  get scripture(): Scripture[] {
    return <Scripture[]>this.thread.filter((entity) => entity.type === EntityType.Scripture)
  }

  get replies(): Post[] {
    return <Post[]>this.thread.filter((entity) => entity.type === EntityType.Post)
  }
 }

export class Answer extends Post {
  constructor() {
    super()
    this.type = EntityType.Answer
  }
}

export class Note extends Post {
  constructor() {
    super()
    this.type = EntityType.Note
  }
}

export class PrayerRequest extends Post {
  constructor() {
    super()
    this.type = EntityType.PrayerRequest
  }

  get answers(): Answer[] {
    return <Answer[]>this.thread.filter((entity) => entity.type === EntityType.Answer)
  }

  get notes(): Note[] {
    return <Note[]>this.thread.filter((entity) => entity.type === EntityType.Note)
  }
}