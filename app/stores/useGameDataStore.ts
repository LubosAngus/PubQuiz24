import type { QuestionsEntity, TopicsEntity } from '~~/types/directus'

export const useGameDataStore = defineStore('gameData', () => {
  const { $directus, $readItems } = useNuxtApp()
  const currentGameStore = useCurrentGameStore()

  const { data: rawData, status } = useAsyncData(
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
              _eq: currentGameStore.data?.quiz.id,
            },
          },
        }),
      )
    },
    {
      immediate: !!currentGameStore.data,
      watch: [() => currentGameStore.data?.quiz.id],
    },
  )

  const data = computed(() => {
    if (!rawData.value) {
      return
    }

    console.log(rawData.value?.[0])

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
    if (!topics.value) return

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

  const selectedTopic = computed(() => {
    if (!data.value || !currentGameStore.data?.topic?.id) {
      return
    }

    return topics.value?.find((topic) => {
      return topic.id === currentGameStore.data?.topic?.id
    })
  }) as ComputedRef<TopicsEntity | undefined>

  const selectedQuestion = computed(() => {
    if (!selectedTopic.value) {
      return
    }

    return selectedTopic.value.questions.find((question) => {
      return question.id === currentGameStore.data?.question?.id
    })
  }) as ComputedRef<QuestionsEntity | undefined>

  const selectedRound = computed(() => {
    const roundIndex = currentGameStore.data?.round_index

    if (roundIndex === null || roundIndex === undefined) {
      return
    }

    return rounds.value.find((round) => {
      return round.index === roundIndex
    })
  })

  return {
    data,
    status,
    topics,
    rounds,
    selectedTopic,
    selectedQuestion,
    selectedRound,
  }
})
