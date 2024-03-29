import millify from 'millify'
import coin from '../assets/coin.gif'
import { useGetStatsQuery } from '../services/CryptoApi'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import Cryptos from '../pages/Cryptos'

const Statistics = () => {

  const { data, error, isFetching } = useGetStatsQuery()

  // handles statistics api
  if (error) return <p>Error :(</p>
  if (isFetching) return <Loader />
  const stats = data?.data
  // handles cryptos api

  
  return (
    <section className='flex flex-col gap-8'>
        <div className="md:text-[2.5rem] text-[1.5rem] font-semibold capitalize w-full text-gray-600 flex items-center gap-1">
            <h1>Coin Ranking Global Statistics</h1>
            <img src={coin} alt="coin" width={40}/>
        </div>
        <p className='font-medium'> Gain insight into the Intricacies of Cryptocurrency Trends, Market Dynamics, and Asset Performance.<br/>
            These global statistics tell about the data available on coin ranking
        </p>
        {/* global*/}
        <div className='flex flex-col gap-3'>
          <h1 className='md:text-[2rem] text-[1.5rem] font-semibold capitalize'>Global Crypto stats</h1>
          <div className='w-full flex justify-between flex-wrap gap-4'>
            <div>
              <h3 className='text-gray-600 text-[0.9rem] font-medium capitalize'>Total cryptocurrencies</h3>
              <h1 className='text-[2rem]'>{millify(stats?.totalCoins)}</h1>
            </div>
            <div>
              <h3 className='text-gray-600 text-[0.9rem] font-medium capitalize'>Total exchanges</h3>
              <h1 className='text-[2rem]'>{stats?.totalExchanges}</h1>
            </div>
            <div>
              <h3 className='text-gray-600 text-[0.9rem] font-medium capitalize'>total 24h vol</h3>
              <h1 className='text-[2rem]'>{millify(stats?.total24hVolume)}</h1>
            </div>
            <div>
              <h3 className='text-gray-600 text-[0.9rem] font-medium capitalize'>total market cap</h3>
              <h1 className='text-[2rem]'>{millify(stats?.totalMarketCap)}</h1>
            </div>
            <div>
              <h3 className='text-gray-600 text-[0.9rem] font-medium capitalize'>total market</h3>
              <h1 className='text-[2rem]'>{millify(stats?.totalMarkets)}</h1>
            </div>
          </div>
        </div>

        {/* best coin and newest coin */}
        <div className='flex w-full flex-wrap gap-6 max-w-[1200px] mx-auto'>
          <div className='w-full flex flex-col gap-6'>
            <h1 className='md:text-[2rem] text-[1.5rem] font-semibold capitalize'>
              Best coins to look out for
            </h1>
            <div className='w-full flex gap-5 flex-wrap'>
              {data?.data?.bestCoins.map((coin, i ) => (
                <Link 
                  key={i} 
                  to={coin.coinrankingUrl}
                  target='_blank'
                >
                  <div className='flex flex-col items-center gap-6 border w-[150px] min-h-[100px] p-5 cursor-pointer rounded-xl hover:shadow-md transition-all'>
                    <img className='w-[30px] h-[30px]' src={coin.iconUrl} alt="icons" />
                    <div className='flex flex-col items-center gap-3'>
                      <h1 className='text-2xl'>{coin.name}</h1>
                      <div>
                        <p className='text-[0.75rem]'>SYMBOL</p>
                        <h1 className='text-[0.9rem] font-bold text-gray-600'>{coin.symbol}</h1>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className='w-full flex flex-col gap-6'>
            <h1 className='md:text-[2rem] text-[1.5rem] font-semibold capitalize'>
              Newest coins in the market
            </h1>
            <div className='w-full flex gap-5 flex-wrap '>
              {data?.data?.newestCoins.map((coin, i ) => (
                <Link 
                  key={i} 
                  to={coin.coinrankingUrl}
                  target='_blank'
                >
                  <div className='flex flex-col items-center gap-6 border w-[150px] min-h-[100px] p-5 cursor-pointer rounded-xl hover:shadow-md transition-all'>
                    <img className='w-[30px] h-[30px]' src={coin.iconUrl} alt="icons" />
                    <div className='flex flex-col items-center gap-3'>
                      <h1 className='text-2xl'>{coin.name}</h1>
                      <div>
                        <p className='text-[0.75rem]'>SYMBOL</p>
                        <h1 className='text-[0.9rem] font-bold text-gray-600'>{coin.symbol}</h1>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </div>
        </div>
        
        {/* top 10 cryptos */}
        <div className='w-full flex flex-col gap-6'>
          <div className='w-full flex items-end justify-between'>
            <h1>Top 10 Crypto currencies in the world</h1>
            <Link to='/cryptos'>
                <p className='text-gray-600 font-medium cursor-pointer hover:text-yellow-400'>see more!</p>
            </Link>
          </div>

          <Cryptos simplified/>
        </div>
    </section>
  )
}

export default Statistics