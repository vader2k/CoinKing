import { Link } from "react-router-dom"
import { useGetCryptosQuery } from "../services/CryptoApi"
import { useState, useEffect } from "react"
import millify from "millify"
import Loader from "../components/Loader"

const Cryptos = ({simplified}) => {
  const count = simplified ? 10 : 100
  const {data, error, isFetching } = useGetCryptosQuery(count) 
  const [ cryptos, setCryptos ] = useState([])
  const [ search, setSeach ] = useState("")

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    setCryptos(filteredData)
  },[search, data])

  if (isFetching) return <Loader />
  if (error) return <p>Error :(</p>;

  return (
    <section className="my-5 px-10">
      <div>
        {
          !simplified && (
            <div className="w-full">
              <input
                type="text"
                placeholder="search for a currency"
                onChange={(e) => setSeach(e.target.value)}
                className="w-full min-w-[300px] border outline-none px-5 py-3 border-yellow-400"
              />
            </div>
          )
        }
      </div>

      <div className="my-10 flex flex-wrap items-start justify-center gap-6 w-full px-5">
        {cryptos?.map((data) => (
          <div key={data.rank} className="w-[250px]">
            <Link to={`/details/${data.uuid}`}>
              <div className="border rounded-xl flex flex-col hover:shadow-md">
                <div className="flex w-full items-center justify-between px-5 py-3 border-b">
                  <div className="flex items-center gap-2">
                    <p>{data.rank}.</p>
                    <p className="max-w-[200px]">{data.name}</p>
                  </div>
                  <div>
                    <img className="w-[30px] h-[30px] object-cover" src={data.iconUrl} alt="icon" />
                  </div>
                </div>
                <div className="p-5">
                  <p>price: {millify(data.price)}</p>
                  <p>Market: {millify(data.marketCap)}</p>
                  <p>Daily Change: {millify(data.change)}%</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Cryptos