import coin from '../assets/coin.gif'
import { useGetStatsQuery } from '../services/CryptoApi'
import Loader from './Loader'

const Statistics = () => {

  const { data, error, isFetching } = useGetStatsQuery()
  if (error) return <p>Error :(</p>
  if (isFetching) return <Loader />
  const stats = data?.data
  console.log(data)
  
  return (
    <section>
        <div className="md:text-[2.5rem] text-[1.5rem] font-semibold capitalize w-full text-gray-600 flex items-center gap-1">
            <h1>Coin Ranking Global Statistics</h1>
            <img src={coin} alt="coin" width={40}/>
        </div>
        <p className='font-medium'> Gain insight into the Intricacies of Cryptocurrency Trends, Market Dynamics, and Asset Performance.<br/>
            These global statistics tell about the data available on coin ranking
        </p>
        <div>

        </div>
    </section>
  )
}

export default Statistics