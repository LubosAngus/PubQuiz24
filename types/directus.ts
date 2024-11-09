/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * To export types, go to CMS admin `/admin/generate-types/ts`,
 * download types declarations and put it in the repository.
 */

export type CurrentGameEntity = {
  date_updated: string | null
  id: number
  question: string | QuestionsEntity | null
  quiz: string | QuizesEntity | null
  round_index: number | null
  state: 'logo' | 'intro' | 'gameplay' | 'countdown' | 'break' | 'leaderboard'
  topic: string | TopicsEntity | null
}

export type QuestionsEntity = {
  answer: string | null
  answer_audio: string | DirectusFilesEntity | null
  answer_image: string | DirectusFilesEntity | null
  answer_video: string | DirectusFilesEntity | null
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
  question_audio: string | DirectusFilesEntity | null
  question_image: string | DirectusFilesEntity | null
  question_video: string | DirectusFilesEntity | null
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
  topics: any[] | QuizesTopicsEntity[]
  user_created: string | DirectusUsersEntity | null
  user_updated: string | DirectusUsersEntity | null
}

export type QuizesTopicsEntity = {
  id: number
  quizes_id: string | QuizesEntity | null
  sort: number | null
  topics_id: string | TopicsEntity | null
}

export type TopicsEntity = {
  background_image: string | DirectusFilesEntity | null
  date_created: string | null
  date_updated: string | null
  id: string
  name: string | null
  questions: any[] | QuestionsEntity[]
  user_created: string | DirectusUsersEntity | null
  user_updated: string | DirectusUsersEntity | null
}

/**
 * Directus system types.
 */

export type DirectusAccessEntity = {
  id: string | null
  policy: string | DirectusPoliciesEntity
  role: string | DirectusRolesEntity | null
  sort: number | null
  user: string | DirectusUsersEntity | null
}

export type DirectusActivityEntity = {
  action: string
  collection: string
  comment: string | null
  id: number
  ip: string | null
  item: string
  origin: string | null
  revisions: any[] | DirectusRevisionsEntity[]
  timestamp: string
  user: string | DirectusUsersEntity | null
  user_agent: string | null
}

export type DirectusCollectionsEntity = {
  accountability: string | null
  archive_app_filter: boolean
  archive_field: string | null
  archive_value: string | null
  collapse: string
  collection: string
  color: string | null
  display_template: string | null
  group: string | DirectusCollectionsEntity | null
  hidden: boolean
  icon: string | null
  item_duplication_fields: unknown | null
  note: string | null
  preview_url: string | null
  singleton: boolean
  sort: number | null
  sort_field: string | null
  translations: unknown | null
  unarchive_value: string | null
  versioning: boolean
}

export type DirectusCommentsEntity = {
  collection: string | DirectusCollectionsEntity
  comment: string
  date_created: string | null
  date_updated: string | null
  id: string
  item: string
  user_created: string | DirectusUsersEntity | null
  user_updated: string | DirectusUsersEntity | null
}

export type DirectusDashboardsEntity = {
  color: string | null
  date_created: string | null
  icon: string
  id: string
  name: string
  note: string | null
  panels: any[] | DirectusPanelsEntity[]
  user_created: string | DirectusUsersEntity | null
}

export type DirectusExtensionsEntity = {
  bundle: string | null
  enabled: boolean
  folder: string
  id: string
  source: string
}

export type DirectusFieldsEntity = {
  collection: string | DirectusCollectionsEntity
  conditions: unknown | null
  display: string | null
  display_options: unknown | null
  field: string
  group: string | DirectusFieldsEntity | null
  hidden: boolean
  id: number
  interface: string | null
  note: string | null
  options: unknown | null
  readonly: boolean
  required: boolean | null
  sort: number | null
  special: unknown | null
  translations: unknown | null
  validation: unknown | null
  validation_message: string | null
  width: string | null
}

export type DirectusFilesEntity = {
  charset: string | null
  created_on: string
  description: string | null
  duration: number | null
  embed: string | null
  filename_disk: string | null
  filename_download: string
  filesize: number | null
  focal_point_x: number | null
  focal_point_y: number | null
  folder: string | DirectusFoldersEntity | null
  height: number | null
  id: string
  location: string | null
  metadata: unknown | null
  modified_by: string | DirectusUsersEntity | null
  modified_on: string
  storage: string
  tags: unknown | null
  title: string | null
  tus_data: unknown | null
  tus_id: string | null
  type: string | null
  uploaded_by: string | DirectusUsersEntity | null
  uploaded_on: string | null
  width: number | null
}

export type DirectusFlowsEntity = {
  accountability: string | null
  color: string | null
  date_created: string | null
  description: string | null
  icon: string | null
  id: string
  name: string
  operation: string | DirectusOperationsEntity | null
  operations: any[] | DirectusOperationsEntity[]
  options: unknown | null
  status: string
  trigger: string | null
  user_created: string | DirectusUsersEntity | null
}

export type DirectusFoldersEntity = {
  id: string
  name: string
  parent: string | DirectusFoldersEntity | null
}

export type DirectusMigrationsEntity = {
  name: string
  timestamp: string | null
  version: string
}

export type DirectusNotificationsEntity = {
  collection: string | null
  id: number
  item: string | null
  message: string | null
  recipient: string | DirectusUsersEntity
  sender: string | DirectusUsersEntity | null
  status: string | null
  subject: string
  timestamp: string | null
}

export type DirectusOperationsEntity = {
  date_created: string | null
  flow: string | DirectusFlowsEntity
  id: string
  key: string
  name: string | null
  options: unknown | null
  position_x: number
  position_y: number
  reject: string | DirectusOperationsEntity | null
  resolve: string | DirectusOperationsEntity | null
  type: string
  user_created: string | DirectusUsersEntity | null
}

export type DirectusPanelsEntity = {
  color: string | null
  dashboard: string | DirectusDashboardsEntity
  date_created: string | null
  height: number
  icon: string | null
  id: string
  name: string | null
  note: string | null
  options: unknown | null
  position_x: number
  position_y: number
  show_header: boolean
  type: string
  user_created: string | DirectusUsersEntity | null
  width: number
}

export type DirectusPermissionsEntity = {
  action: string
  collection: string
  fields: unknown | null
  id: number
  permissions: unknown | null
  policy: string | DirectusPoliciesEntity
  presets: unknown | null
  validation: unknown | null
}

export type DirectusPoliciesEntity = {
  admin_access: boolean
  app_access: boolean
  description: string | null
  enforce_tfa: boolean
  icon: string
  id: string | null
  ip_access: unknown | null
  name: string
  permissions: any[] | DirectusPermissionsEntity[]
  roles: any[] | DirectusAccessEntity[]
  users: any[] | DirectusAccessEntity[]
}

export type DirectusPresetsEntity = {
  bookmark: string | null
  collection: string | null
  color: string | null
  filter: unknown | null
  icon: string | null
  id: number
  layout: string | null
  layout_options: unknown | null
  layout_query: unknown | null
  refresh_interval: number | null
  role: string | DirectusRolesEntity | null
  search: string | null
  user: string | DirectusUsersEntity | null
}

export type DirectusRelationsEntity = {
  id: number
  junction_field: string | null
  many_collection: string
  many_field: string
  one_allowed_collections: unknown | null
  one_collection: string | null
  one_collection_field: string | null
  one_deselect_action: string
  one_field: string | null
  sort_field: string | null
}

export type DirectusRevisionsEntity = {
  activity: number | DirectusActivityEntity
  collection: string
  data: unknown | null
  delta: unknown | null
  id: number
  item: string
  parent: number | DirectusRevisionsEntity | null
  version: string | DirectusVersionsEntity | null
}

export type DirectusRolesEntity = {
  children: any[] | DirectusRolesEntity[]
  description: string | null
  icon: string
  id: string
  name: string
  parent: string | DirectusRolesEntity | null
  policies: any[] | DirectusAccessEntity[]
  users: any[] | DirectusUsersEntity[]
  users_group: string
}

export type DirectusSessionsEntity = {
  expires: string
  ip: string | null
  next_token: string | null
  origin: string | null
  share: string | DirectusSharesEntity | null
  token: string
  user: string | DirectusUsersEntity | null
  user_agent: string | null
}

export type DirectusSettingsEntity = {
  auth_login_attempts: number | null
  auth_password_policy: string | null
  basemaps: unknown | null
  custom_aspect_ratios: unknown | null
  custom_css: string | null
  default_appearance: string
  default_language: string
  default_theme_dark: string | null
  default_theme_light: string | null
  id: number
  mapbox_key: string | null
  module_bar: unknown | null
  project_color: string
  project_descriptor: string | null
  project_logo: string | DirectusFilesEntity | null
  project_name: string
  project_url: string | null
  public_background: string | DirectusFilesEntity | null
  public_favicon: string | DirectusFilesEntity | null
  public_foreground: string | DirectusFilesEntity | null
  public_note: string | null
  public_registration: boolean
  public_registration_email_filter: unknown | null
  public_registration_role: string | DirectusRolesEntity | null
  public_registration_verify_email: boolean
  report_bug_url: string | null
  report_error_url: string | null
  report_feature_url: string | null
  storage_asset_presets: unknown | null
  storage_asset_transform: string | null
  storage_default_folder: string | DirectusFoldersEntity | null
  theme_dark_overrides: unknown | null
  theme_light_overrides: unknown | null
  theming_group: string
}

export type DirectusSharesEntity = {
  collection: string | DirectusCollectionsEntity
  date_created: string | null
  date_end: string | null
  date_start: string | null
  id: string
  item: string
  max_uses: number | null
  name: string | null
  password: string | null
  role: string | DirectusRolesEntity | null
  times_used: number | null
  user_created: string | DirectusUsersEntity | null
}

export type DirectusTranslationsEntity = {
  id: string
  key: string
  language: string
  value: string
}

export type DirectusUsersEntity = {
  appearance: string | null
  auth_data: unknown | null
  avatar: string | DirectusFilesEntity | null
  description: string | null
  email: string | null
  email_notifications: boolean | null
  external_identifier: string | null
  first_name: string | null
  id: string
  language: string | null
  last_access: string | null
  last_name: string | null
  last_page: string | null
  location: string | null
  password: string | null
  policies: any[] | DirectusAccessEntity[]
  provider: string
  role: string | DirectusRolesEntity | null
  status: string
  tags: unknown | null
  tfa_secret: string | null
  theme_dark: string | null
  theme_dark_overrides: unknown | null
  theme_light: string | null
  theme_light_overrides: unknown | null
  title: string | null
  token: string | null
}

export type DirectusVersionsEntity = {
  collection: string | DirectusCollectionsEntity
  date_created: string | null
  date_updated: string | null
  delta: unknown | null
  hash: string | null
  id: string
  item: string
  key: string
  name: string | null
  user_created: string | DirectusUsersEntity | null
  user_updated: string | DirectusUsersEntity | null
}

export type DirectusWebhooksEntity = {
  actions: unknown
  collections: unknown
  data: boolean
  headers: unknown | null
  id: number
  method: string
  migrated_flow: string | DirectusFlowsEntity | null
  name: string
  status: string
  url: string
  was_active_before_deprecation: boolean
}

export type DirectusTypes = {
  current_game: CurrentGameEntity
  questions: QuestionsEntity[]
  quizes: QuizesEntity[]
  quizes_topics: QuizesTopicsEntity[]
  topics: TopicsEntity[]
  directus_access: DirectusAccessEntity[]
  directus_activity: DirectusActivityEntity[]
  directus_collections: DirectusCollectionsEntity[]
  directus_comments: DirectusCommentsEntity[]
  directus_dashboards: DirectusDashboardsEntity[]
  directus_extensions: DirectusExtensionsEntity[]
  directus_fields: DirectusFieldsEntity[]
  directus_files: DirectusFilesEntity[]
  directus_flows: DirectusFlowsEntity[]
  directus_folders: DirectusFoldersEntity[]
  directus_migrations: DirectusMigrationsEntity[]
  directus_notifications: DirectusNotificationsEntity[]
  directus_operations: DirectusOperationsEntity[]
  directus_panels: DirectusPanelsEntity[]
  directus_permissions: DirectusPermissionsEntity[]
  directus_policies: DirectusPoliciesEntity[]
  directus_presets: DirectusPresetsEntity[]
  directus_relations: DirectusRelationsEntity[]
  directus_revisions: DirectusRevisionsEntity[]
  directus_roles: DirectusRolesEntity[]
  directus_sessions: DirectusSessionsEntity[]
  directus_settings: DirectusSettingsEntity
  directus_shares: DirectusSharesEntity[]
  directus_translations: DirectusTranslationsEntity[]
  directus_users: DirectusUsersEntity[]
  directus_versions: DirectusVersionsEntity[]
  directus_webhooks: DirectusWebhooksEntity[]
}
