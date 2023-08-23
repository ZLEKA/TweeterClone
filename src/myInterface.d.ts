export interface Tweet {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  username: string;
  id: number;
}
export interface UserLike{
  id: number,
  user_id: number,
  tweet_id: number,
  timestamp: string
}
export interface TweetWithUser {
  tweet: Tweet
  user: User
  edit: boolean
  likes: number
  user_like: Array<UserLike>
  showComments: boolean|false
  writeComment: boolean|false
}

export interface IComment {
  id:number
  tweet_id:number
  content:string
  user_id:number
}

export interface CommentWithUser {
  comment: IComment
  user: User
  edit: boolean
}
