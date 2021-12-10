import memoizeOne from 'memoize-one'

import getPossiblePairings from 'engine/predicates/uefa/getPossiblePairings'
import getPredicate from 'engine/predicates/uefa/ko'
import Team from 'model/team/KnockoutTeam'
import type { KoWorkerData } from 'model/WorkerData'

type GetPredicateParams = Parameters<typeof getPredicate>

const serializeArgs = ([year]: GetPredicateParams) =>
  JSON.stringify({
    year,
  })

const eqFunc = (newArgs: GetPredicateParams, oldArgs: GetPredicateParams) =>
  serializeArgs(newArgs) === serializeArgs(oldArgs)

const getPredicateMemoized = memoizeOne(getPredicate, eqFunc)

// eslint-disable-next-line no-restricted-globals
addEventListener('message', (e: MessageEvent<KoWorkerData<Team>>) => {
  const {
    messageId,
    data: {
      season,
      pots,
      matchups,
    },
  } = e.data

  const predicate = getPredicateMemoized(season)
  const possiblePairings = getPossiblePairings(pots, matchups, predicate)

  postMessage({
    messageId,
    data: {
      possiblePairings,
    },
  })
})
