import { InterviewArticle } from './interview-article'

export type InterviewArticleWithDynamicFields = InterviewArticle & {
  [key: string]: string
}
