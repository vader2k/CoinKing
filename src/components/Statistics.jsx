import millify from 'millify'
import coin from '../assets/coin.gif'
import { useGetStatsQuery } from '../services/CryptoApi'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import Cryptos from '../pages/Cryptos'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PiFolderOpenDuotone } from "react-icons/pi";

const Statistics = () => {

  const { data, error, isFetching } = useGetStatsQuery()
  const [ coinDetail, setCoinDetail] = useState([])
  const [ uuids, setUuids ] = useState([]) 


  useEffect(() => {
    if (!data) return; // Exit early if data is not available
    const stats = data.data;
    const id = stats?.bestCoins;
    const uuids = id.map(item => item.uuid);
    setUuids(uuids); // Update state with UUIDs

}, [data]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (uuids.length === 0 ) return

      try {
        setCoinDetail([])
        const request = uuids.map(uuid => {
          return axios.get(`https://coinranking1.p.rapidapi.com/coin/${uuid}`, {
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_CRYPTO_API_KEY,
              'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
          })
        })
        // Use Promise.all to make all API calls concurrently
        const response = await Promise.all(request)
        // Process the response data for each API call
        const coinDetails = response.map(res => res.data)
        setCoinDetail(coinDetails)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[ uuids])

  if (error) return <p>Error :(</p>;
  if (isFetching) return <Loader />;


  
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
              <h1 className='text-[2rem]'>{millify(data?.data?.totalCoins)}</h1>
            </div>
            <div>
              <h3 className='text-gray-600 text-[0.9rem] font-medium capitalize'>Total exchanges</h3>
              <h1 className='text-[2rem]'>{data?.data?.totalExchanges}</h1>
            </div>
            <div>
              <h3 className='text-gray-600 text-[0.9rem] font-medium capitalize'>total 24h vol</h3>
              <h1 className='text-[2rem]'>{millify(data?.data?.total24hVolume)}</h1>
            </div>
            <div>
              <h3 className='text-gray-600 text-[0.9rem] font-medium capitalize'>total market cap</h3>
              <h1 className='text-[2rem]'>{millify(data?.data?.totalMarketCap)}</h1>
            </div>
            <div>
              <h3 className='text-gray-600 text-[0.9rem] font-medium capitalize'>total market</h3>
              <h1 className='text-[2rem]'>{millify(data?.data?.totalMarkets)}</h1>
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
            <div className='w-full flex flex-col gap-5'>
              <div className='flex w-full px-5 font-medium justify-between'>
                <span className='min-w-[100px]'>#Coins</span>
                <span className=''> Price</span>
                <span className=''>Change</span>
                <span className=''>High</span>
              </div>
              {coinDetail?.map((coin, i ) => (
                <Link 
                  key={i}
                  to={`${coin?.data?.coin?.websiteUrl}`} 
                >
                  <div className='flex w-full items-center justify-between border-b'>
                    <div className='flex items-center gap-4 max-w-[120px]'>
                      <p>{i + 1}</p>
                      <img 
                        src={coin?.data?.coin?.iconUrl} 
                        alt="icons" 
                        className='w-[20px] h-[20px] object-contain '
                      />
                      <div className='flex flex-col'>
                        <h1 className='text-[0.85rem] font-medium'>
                          {coin?.data?.coin?.name}
                        </h1>
                        <span className='text-[0.7rem]'>
                        {coin?.data?.coin?.symbol}
                        </span>
                      </div>
                    </div>

                    <div className='text-[0.9rem] font-medium'>
                      ${coin?.data?.coin?.price.slice(0,7)}
                    </div>

                    <div className=''>
                    {coin?.data?.coin?.change}%
                    </div>

                    <div className=''>
                      ${coin?.data?.coin?.allTimeHigh.price.slice(0,7)}
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
              we pride ourselves on delivering top-notch news updates that keep you informed about the ever-changing landscape of cryptocurrencies. With a commitment to excellence, we ensure that our users stay abreast of the latest developments, including newest coins that were added to Coinranking. 
            </p>
            <div className='w-full flex gap-5 justify-evenly flex-wrap '>
              {data?.data?.newestCoins.map((coin, i ) => (
                <Link 
                  key={i} 
                  to={coin.coinrankingUrl}
                  target='_blank'
                >
                  <div className='flex flex-col items-center gap-6 border w-[150px] min-h-[100px] p-5 cursor-pointer rounded-md hover:shadow-md transition-all'>
                    <div className='w-[60px] h-[60px] flex items-center justify-center border rounded-full border-yellow-300'>
                      <img className='w-[30px] h-[30px]' src={coin.iconUrl} alt="icons" />
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                      <h1 className='uppercase text-[0.8rem]'>{coin.name}</h1>
                      <div className='flex flex-col items-center'>
                        <p className='text-[0.75rem]'>SYMBOL</p>
                        <h1 className='text-[0.75rem] font-bold text-gray-600'>{coin.symbol}</h1>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </div>
        
        {/* top 10 cryptos */}
        <div className='w-full flex flex-col gap-4'>
          <div className='w-full flex md:flex-row flex-col md:items-end justify-between'>
            <h1 className='text-[1.5rem] font-semibold capitalize font-General text-gray-600 '>Top 10 Crypto currencies</h1>
            <Link to='/cryptos' className='flex items-center gap-1 hover:text-yellow-400'>
                <p className='text-gray-600 font-medium cursor-pointer hover:text-yellow-400'>see more!</p>
                <PiFolderOpenDuotone />
            </Link>
          </div>

          <p>
            We understand the importance of staying up-to-date on the ever-shifting landscape of the cryptocurrency market. That's why we offer real-time updates on the top 10 crypto rankings. Our system continuously monitors market data, instantly reflecting any changes in price, market cap, or overall coin performance. With this dynamic ranking system, you can see the movers and shakers of the crypto world at a glance, allowing you to react to market trends and make informed investment decisions as they unfold.
          </p>

          <Cryptos simplified/>
        </div>
    </section>
  )
}

export default Statistics