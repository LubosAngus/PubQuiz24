/**
 * To export types, go to CMS admin `/admin/generate-types/ts`,
 * download types declarations and put it in the repository.
 */

export type Round = {
  index: number
  topics: TopicsEntity[]
}

export type CurrentGameEntity = {
  date_updated: string | null
  id: number
  question: string | null
  quiz: string | null
  round_index: number | null
  state: 'logo' | 'intro' | 'gameplay' | 'countdown' | 'break' | 'leaderboard'
  topic: string | null
}

export type GameActionsEntity = {
  action_pressed:
    | 'play'
    | 'go_backward'
    | 'go_forward'
    | 'fullscreen'
    | 'play_answer'
    | 'show_anser'
    | null
  id: number
  media_volume: number | null
}

export type QuestionsEntity = {
  answer: string | null
  answer_audio: string | null
  answer_image: string | null
  answer_video: string | null
  answer_video_link: string | null
  audio_group: string
  base_group: string
  date_created: string | null
  date_updated: string | null
  id: string
  image_group: string
  notes: string | null
  notes_group: string
  question: string | null
  question_audio: string | null
  question_image: string | null
  question_video: string | null
  question_video_link: string | null
  sort: number | null
  topic_id: string | TopicsEntity | null
  video_group: string
}

export type QuizesEntity = {
  date_created: string | null
  date_updated: string | null
  id: string
  name: string | null
  played_date: string | null
  topics: undefined | QuizesTopicsEntity[]
  user_created: string | null
  user_updated: string | null
}

export type QuizesTopicsEntity = {
  id: number
  quizes_id: string | QuizesEntity | null
  sort: number | null
  topics_id: string | TopicsEntity | null
}

export type TopicsEntity = {
  background_image: string | null
  date_created: string | null
  date_updated: string | null
  id: string
  name: string | null
  questions: undefined | QuestionsEntity[]
  user_created: string | null
  user_updated: string | null
}

export type DirectusTypes = {
  current_game: CurrentGameEntity
  game_actions: GameActionsEntity
  questions: QuestionsEntity[]
  quizes: QuizesEntity[]
  quizes_topics: QuizesTopicsEntity[]
  topics: TopicsEntity[]
}
