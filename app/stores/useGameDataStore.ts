import type { QuestionsEntity, Round, TopicsEntity } from '~~/types/directus'

function isNullOrUndefined(value: unknown) {
  return value === null || value === undefined
}

export const useGameDataStore = defineStore('gameData', () => {
  const { $directus, $readItems } = useNuxtApp()
  const currentGameStore = useCurrentGameStore()

  const {
    data: rawData,
    status,
    refresh: refreshData,
  } = useAsyncData(
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
          ...(currentGameStore.data?.quiz
            ? { filter: { id: { _eq: currentGameStore.data?.quiz } } }
            : {}),
        }),
      )
    },
    {
      immediate: !!currentGameStore.data,
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
    if (!topics.value) return

    const ROUND_GROUP_SIZE = 2
    const rounds: {
      index: number
      topics: TopicsEntity[]
    }[] = []

    for (let index = 0; index < topics.value.length; index++) {
      const roundIndex = (index - (index % ROUND_GROUP_SIZE)) / ROUND_GROUP_SIZE

      if (!rounds[roundIndex]) {
        rounds[roundIndex] = {
          index: roundIndex,
          topics: [],
        }
      }

      rounds[roundIndex].topics.push(topics.value[index]!)
    }

    return rounds
  }) as ComputedRef<Round[]>

  const questions = computed(() => {
    if (!topics.value?.length) {
      return
    }

    return topics.value.map((topic) => topic.questions).flat()
  }) as ComputedRef<QuestionsEntity[] | undefined>

  const selectedQuizName = computed(() => {
    return data.value?.name
  })

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

  function getTopicById(topicId: string) {
    if (!topics.value) {
      return
    }

    return topics.value.find((topic) => {
      return topic.id === topicId
    })
  }

  const selectedQuestionId = computed(() => {
    return currentGameStore.data?.question
  })

  const selectedQuestion = computed(() => {
    if (
      isNullOrUndefined(selectedQuestionId.value) ||
      !selectedTopic.value?.questions
    ) {
      return
    }

    return selectedTopic.value?.questions.find((question) => {
      return question.id === selectedQuestionId.value
    })
  }) as ComputedRef<QuestionsEntity | undefined>

  function getQuestionById(questionId: string) {
    if (!questions.value) {
      return
    }

    return questions.value.find((question) => {
      return question.id === questionId
    })
  }

  const waitForDataToLoad = () => {
    return new Promise((resolve) => {
      if (data.value) {
        return resolve(true)
      }

      const unwatch = watch(data, async (value) => {
        if (!value) return

        // ? next tick in case not all computed are populated?
        // await nextTick()

        unwatch()
        resolve(true)
      })
    })
  }

  return {
    data,
    refreshData,
    status,
    rounds,
    topics,
    questions,
    selectedQuizName,
    selectedRoundIndex,
    selectedRound,
    selectedTopicId,
    selectedTopic,
    getTopicById,
    selectedQuestionId,
    selectedQuestion,
    getQuestionById,
    waitForDataToLoad,
  }
})
