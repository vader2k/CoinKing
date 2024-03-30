import millify from 'millify'
import coin from '../assets/coin.gif'
import { useGetStatsQuery } from '../services/CryptoApi'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import Cryptos from '../pages/Cryptos'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Statistics = () => {

  const { data, error, isFetching } = useGetStatsQuery()
  const [ coinDetail, setCoinDetail] = useState([])
  // const [ id, setId ] = useState([]) 



    // handles statistics api
    if (error) return <p>Error :(</p>
    if (isFetching) return <Loader />
    const stats = data?.data
    console.log(stats)
    const id = stats?.bestCoins
    const uuids = id.map(item => item.uuid)
    console.log(uuids)
  
    // handles cryptos api

  const fetchData = async () => {
    const res = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${id}`)
  }




  
  return (
    <section className='flex flex-col gap-8'>
        <div className="text-[1.5rem] font-semibold capitalize w-full text-gray-600 flex items-center gap-1 font-General">
            <h1>Coin Ranking Global Statistics</h1>
            <img src={coin} alt="coin" width={40}/>
        </div>
        <p className='font-medium'> Gain insight into the Intricacies of Cryptocurrency Trends, Market Dynamics, and Asset Performance.<br/>
            These global statistics tell about the data available on coin ranking
        </p>
        {/* global*/}
        <div className='flex flex-col gap-3'>
          <h1 className='text-[1.5rem] font-semibold capitalize font-General text-gray-600'>Global Crypto stats</h1>
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
          <div className='w-full flex flex-col gap-6'>
            <h1 className='text-[1.5rem] font-semibold capitalize font-General text-gray-600'>
              Best coins in the market
            </h1>
            <p>
              We conducts comprehensive research to identify the top-performing crypto assets with exceptional value and returns. By analyzing market data and trends, we curate a daily report that highlights the most promising cryptocurrencies, ensuring you{"'"}re always informed about the latest craze in the market. Stay ahead of the curve and make informed investment decisions with our up-to-date insights into the best crypto currencies available.
            </p>
            <div className='w-full flex gap-5 justify-evenly'>
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
                      <div className='flex flex-col items-center'>
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
            <h1 className='text-[1.5rem] font-semibold capitalize font-General text-gray-600'>
              Newest coins in the market
            </h1>
            <p>
              we pride ourselves on delivering top-notch news updates that keep you informed about the ever-changing landscape of cryptocurrencies. With a commitment to excellence, we ensure that our users stay abreast of the latest developments, including the arrival of new coins in the market, ensuring you're always ahead of the curve. 
            </p>
            <div className='w-full flex gap-5 justify-evenly '>
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
                      <div className='flex flex-col items-center'>
                        <p className='text-[0.75rem]'>SYMBOL</p>
                        <h1 className='text-[0.9rem] font-bold text-gray-600'>{coin.symbol}</h1>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </div>
        
        {/* top 10 cryptos */}
        <div className='w-full flex flex-col gap-6'>
          <div className='w-full flex items-end justify-between'>
            <h1 className='text-gray-600'>Top 10 Crypto currencies in the world</h1>
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