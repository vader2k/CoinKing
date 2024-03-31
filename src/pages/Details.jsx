import { useParams } from "react-router-dom"
import { useState } from "react"
import millify from "millify"
import { useGetCoinHistoryQuery, useGetCoinDetailsQuery} from '../services/CryptoApi'
import Loader from '../components/Loader'
import { Link } from "react-router-dom"
import Chart from '../components/Chart'
import { ImCoinDollar } from "react-icons/im";
import { CiBitcoin } from "react-icons/ci";
import { FaRankingStar } from "react-icons/fa6";
import { RiContrastDropLine } from "react-icons/ri";
import { LuWaves } from "react-icons/lu";
import { BsAward } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { IoLink } from "react-icons/io5";
import { CiShoppingTag } from "react-icons/ci";

const Details = () => {
  const { coinId } = useParams()
  const { data, error, isFethcing } = useGetCoinDetailsQuery(coinId)
  const details = data?.data?.coin
  const color = data?.data?.coin?.color

  if (!data) return
  if ( isFethcing) return <Loader />
  if (error) return

  const stats = [
    { title: 'Price to USD', value: `$ ${details?.price && millify(details.price)}`, icon : <ImCoinDollar /> },
    { title: 'Price to BTC', value: `${details?.btcPrice && millify(details.btcPrice) + " " + 'BTC'}`, icon : <CiBitcoin /> },
    { title: 'Coin rank', value: details?.rank, icon: <FaRankingStar /> },
    { title: '24h Volume', value: `$ ${details?.['24hVolume'] && millify(details['24hVolume'])}`, icon: <RiContrastDropLine />},
    { title: 'Market cap', value: `$ ${details?.marketCap && millify(details.marketCap)}`, icon: <LuWaves />},
    { title: 'Fully diluted market cap', value: `$ ${details?.fullyDilutedMarketCap && millify(details.fullyDilutedMarketCap)}`, icon:<LuWaves />  },
    { title: 'All-time-high', value: `$ ${millify(details?.allTimeHigh?.price)}`, icon: <BsAward /> },
  ]
  
  return (
    <section className="w-full flex flex-col gap-5 p-10 max-w-[1600px] mx-auto">
      <div className="w-full flex items-center justify-between">
        <Link to={details?.websiteUrl}>
          <div className="flex items-center gap-3">
            <img 
              src={details?.iconUrl} 
              alt={details.name} 
              className="w-[40px] h-[40px] object-contain"
            />
            <div>
              <h1 className="text-xl font-semibold font-General text-gray-600">{details?.name}</h1>
              <div className="flex items-center gap-2">
                <span className="font-Gambetta">{details?.symbol}</span>
                <div className="border px-2 text-[0.8rem]">
                  #{details?.rank}
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex flex-col">
          <h1 className="text-[1.5rem] font-semibold font-General text-gray-600">${millify(details?.price)}</h1>
          <div className="border text-[0.8rem] w-[40px] text-center">
              Live
          </div>
        </div>
      </div>

      <div className="my-10">
      <h1 className={`text-xl font-General font-semibold `} style={{color: color}}>
          Summary
        </h1>
        <p>
          {details?.description}
        </p>
      </div>

      <Chart />

      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold font-General text-gray-600">Value Statistics</h1>
        <p>
          An overview showing the statistics of {details?.name}, such as the base and quote currency, the rank, and trading volume.
        </p>

        <div className="flex flex-col w-full">
          {
            stats.map((data, i) => (
              <div 
                key={i}
                className={`w-full flex items-center justify-between py-3 border-b`}
              >
                <div className="flex items-center gap-4">
                  <p className="text-[1.5rem]" style={{color}}>{data.icon}</p>
                  <span>{data.title}</span>
                </div>

                <div className="font-semibold font-General">
                  {data.value}
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="flex flex-col gap-4 my-10">
        <h1 className="text-xl font-semibold font-General text-gray-600">Supply information</h1>
        <p>
          View the total and circulating supply of {details?.name}, including details on how the supplies are calculated.
        </p>

        <div className="w-full py-5 px-8 rounded-xl my-5" style={{background: `${color}70`}}>
          
        </div>
      </div>

    </section>
  )
}

export default Details