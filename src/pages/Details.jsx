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
import { FcCancel } from "react-icons/fc";
import { IoLink } from "react-icons/io5";
import { CiShoppingTag } from "react-icons/ci";

const Details = () => {
  const { coinId } = useParams()
  const [ timePeriod, setTimePeriod ] = useState('7d')
  const { data, error, isFetching } = useGetCoinDetailsQuery(coinId)
  const { data: coinHistory } = useGetCoinHistoryQuery({coinId, timePeriod})
  
  if (isFetching) return <Loader />;
  if (error) return <p>Error :(</p>;
  if (!data) return

  const details = data?.data?.coin // se3tting all coin details array to details
  const color = data?.data?.coin?.color // extracted color from api to set as icon color and backgrounds


  const time = [ '3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y' ] //time period to handle chart time change

  const stats = [
    { title: 'Price to USD', value: `$ ${details?.price && millify(details.price)}`, icon : <ImCoinDollar /> },
    { title: 'Price to BTC', value: `${details?.btcPrice && (details.btcPrice.slice(0,10)) + " " + 'BTC'}`, icon : <CiBitcoin /> },
    { title: 'Coin rank', value: details?.rank, icon: <FaRankingStar /> },
    { title: '24h Volume', value: `$ ${details?.['24hVolume'] && millify(details['24hVolume'])}`, icon: <RiContrastDropLine />},
    { title: 'Market cap', value: `$ ${details?.marketCap && millify(details.marketCap)}`, icon: <LuWaves />},
    { title: 'Fully diluted market cap', value: `$ ${details?.fullyDilutedMarketCap && millify(details.fullyDilutedMarketCap)}`, icon:<LuWaves />  },
    { title: 'All-time-high', value: `$ ${millify(details?.allTimeHigh?.price)}`, icon: <BsAward /> },
  ]

  const others = [
    { title: 'Circulating supply', value: `${details?.supply?.circulating && millify(details.supply.circulating) + " " + details?.symbol}`},
    { title: 'Total supply', value: `${details?.supply?.total && millify(details.supply.total) + " " + details?.symbol}`},
    { title: 'Max supply', value: `${details?.supply?.max === null ? 0 : millify(details.supply.max) + " " + details.symbol}` },
    { title: 'Issuance blockchain', value: details?.name}

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

      {/* CHART DATA AND TIME FRAME */}
      <div>
        <select
          defaultValue={timePeriod}
          aria-placeholder="choose a time frame"
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          {time.map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <Chart coinHistory={coinHistory} time={timePeriod} currentPrice={millify(details?.price)}/>
      </div>

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

        <div className="w-full py-5 rounded-xl my-5" style={{background: `${color}70`}}>
          <div className="w-full flex items-center justify-between px-8 my-2">
            <div className="flex flex-col gap-3">
              {details?.supply?.confirmed ? (
                <div className="flex items-center gap-2 text-green-500 font-medium"><CiCircleCheck className="text-[1.5rem]"/> <p>Verified supply</p>
                </div>)
              : (
                <div className="flex items-center gap-2 text-red-500 font-medium"><FcCancel className="text-[1.5rem]"/> <p>unverified supply</p>
                </div>
                )}
              <span className="text-gray-600 text-[0.8rem]">Updated 1 minute ago</span>
            </div>

            <div>
              {details?.supply?.confirmed ? (
                  <div className="h-[100px] w-[100px] flex items-center justify-center border-[5px] rounded-full border-green-500 text-bold">100%
                </div> 
                ) : (
                  <div className="h-[100px] w-[100px] flex items-center justify-center border-[5px] rounded-full border-red-500 text-bold">0%
                  </div>
                )}
            </div>
          </div>
          {
            others.map((data, i) => (
              <div 
                key={i}
                className="w-full flex items-center py-3 justify-between px-8"
              >
                <span className="font-Gambetta font-medium">{data.title}</span>
                <span className="font-semibold font-General">{data.value}</span>
              </div>
            ))
          }
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-xl font-semibold font-General text-gray-600">
          Links
        </h1>

        <div className="w-full flex flex-col gap-4 my-5">
          {details?.links.map((link, i) => (
            <div key={i} className={`w-full flex items-center justify-between pb-2 ${ i != details.links.length - 1 && 'border-b'}`}>
              <div className="flex items-center gap-2">
                <IoLink style={{color}}/>
                <h1 className="font-semibold font-General text-gray-600">{link.type}</h1>
              </div>

              <Link to={link.url}>
                <p className="font-General text-gray-500">{link.name}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-between">
            <h1 className="text-xl font-semibold font-General text-gray-600">Tags</h1>

            <div className="flex gap-2 items-center">
            <CiShoppingTag style={{color}} className="text-[1.4rem]"/>
              {details?.tags.map((tag, i) => (
                <span key={i} className="flex items-center gap-2 ">
                  <p>{tag}</p>
                </span>
              ))}
            </div>
        </div>
      </div>

    </section>
  )
}

export default Details