import type { QuestionsEntity, TopicsEntity } from '~~/types/directus'

function isNullOrUndefined(value: unknown) {
  return value === null || value === undefined
}

export const useGameDataStore = defineStore('gameData', () => {
  const { $directus, $readItems } = useNuxtApp()
  const currentGameStore = useCurrentGameStore()

  const { data: rawData, status } = useAsyncData(
    'game_data',
    () => {
      return $directus.request(
        $readItems('quizes', {
          fields: [
            'name',
            {
              topics: [
                {
                  topics_id: [
                    'id',
                    'name',
                    'background_image',
                    {
                      questions: [
                        'id',
                        'sort',
                        'question',
                        'answer',
                        'question_image',
                        'question_video',
                        'question_audio',
                        'answer_image',
                        'question_video_link',
                        'answer_audio',
                        'answer_video',
                        'answer_video_link',
                        'notes',
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          filter: {
            id: {
              _eq: currentGameStore.data?.quiz,
            },
          },
        }),
      )
    },
    {
      immediate: !!currentGameStore.data,
      watch: [() => currentGameStore.data?.quiz],
    },
  )

  const data = computed(() => {
    if (!rawData.value) {
      return
    }

    return rawData.value?.[0]
  })

  const topics = computed(() => {
    if (!data.value) {
      return
    }

    return data.value.topics?.map((topic) => {
      return topic.topics_id
    })
  }) as ComputedRef<TopicsEntity[] | undefined>

  const rounds = computed(() => {
    if (!topics.value?.length) return

    const ROUND_GROUP_SIZE = 2
    const rounds = []

    for (let index = 0; index < topics.value.length; index++) {
      const roundIndex = (index - (index % ROUND_GROUP_SIZE)) / ROUND_GROUP_SIZE

      if (!rounds[roundIndex]) {
        rounds[roundIndex] = {
          index: roundIndex,
          topics: [],
        }
      }

      rounds[roundIndex].topics.push(topics.value[index])
    }

    return rounds
  }) as ComputedRef<
    {
      index: number
      topics: TopicsEntity[]
    }[]
  >

  const selectedQuizName = computed(() => {
    return data.value?.name
  })

  const selectedTopicId = computed(() => {
    return currentGameStore.data?.topic
  })

  const selectedTopic = computed(() => {
    if (isNullOrUndefined(selectedTopicId.value)) {
      return
    }

    return topics.value?.find((topic) => {
      return topic.id === selectedTopicId.value
    })
  }) as ComputedRef<TopicsEntity | undefined>

  const selectedQuestionId = computed(() => {
    return currentGameStore.data?.question
  })

  const selectedQuestion = computed(() => {
    if (isNullOrUndefined(selectedQuestionId.value)) {
      return
    }

    return selectedTopic.value?.questions.find((question) => {
      return question.id === selectedQuestionId.value
    })
  }) as ComputedRef<QuestionsEntity | undefined>

  const selectedRoundIndex = computed(() => {
    return currentGameStore.data?.round_index
  })

  const selectedRound = computed(() => {
    if (isNullOrUndefined(selectedRoundIndex.value)) {
      return
    }

    return rounds.value?.find((round) => {
      return round.index === selectedRoundIndex.value
    })
  })

  return {
    data,
    status,
    topics,
    rounds,
    selectedTopicId,
    selectedTopic,
    selectedQuestionId,
    selectedQuestion,
    selectedRoundIndex,
    selectedRound,
    selectedQuizName,
  }
})
