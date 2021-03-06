import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
// helpers
import { removeDash } from '../../../helpers/typography'
import { fadeInUpVariant } from '../../../helpers/animations'
// components
import Box from '../../Box'
import Loading from '../../Loading'
import ProgressBar from './ProgressBar'
// styles
import { SectionTitle, Table } from '../../BaseStyles'
import { BarCell } from './StyledBaseStats'

export default function BaseStats({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // data
  const { stats } = pokemonInfo.data

  // total stats
  const totalStats = values =>
    values.map(stat => stat.base_stat).reduce((a, b) => a + b, 0)

  // progress
  const progressCalc = statValue => {
    const percentage = (100 / 180) * statValue
    return percentage > 100 ? 100 : percentage
  }

  // calculate stats
  const statsCalc = (statType, baseStat, statName) => {
    const EV = statType === 'min' ? 0 : 252
    const IV = statType === 'min' ? 0 : 31
    const level = 100
    const nature = statType === 'min' ? 0.9 : 1.1

    // https://bulbapedia.bulbagarden.net/wiki/Statistic
    if (statName === 'hp') {
      return Math.floor(
        ((2 * baseStat + IV + EV / 4) * level) / 100 + level + 10
      )
    } else {
      return Math.floor(
        Math.floor(((2 * baseStat + IV + EV / 4) * level) / 100 + 5) * nature
      )
    }
  }

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Base Stats</SectionTitle>
      <AnimatePresence exitBeforeEnter>
        {pokemonInfo.isLoading && (
          <Loading height="280px" iconWidth="10%" key="pokemon-stats" />
        )}
        {!pokemonInfo.isLoading && (
          <Table
            initial="hidden"
            animate="show"
            variants={fadeInUpVariant}
            key={`pokemon-basestats-table`}
          >
            <tbody>
              {stats.map(({ base_stat, stat }, i) => (
                <tr key={`${stat.name}-${i}`}>
                  <th>{removeDash(stat.name)}</th>
                  <td>{base_stat}</td>
                  <BarCell>
                    <ProgressBar progress={progressCalc(base_stat)} />
                  </BarCell>
                  <td>{statsCalc('min', base_stat, stat.name)}</td>
                  <td>{statsCalc('max', base_stat, stat.name)}</td>
                </tr>
              ))}
              <tr>
                <th>Total</th>
                <td>{totalStats(stats)}</td>
                <td></td>
                <td>Min</td>
                <td>Max</td>
              </tr>
            </tbody>
          </Table>
        )}
      </AnimatePresence>
    </Box>
  )
}
