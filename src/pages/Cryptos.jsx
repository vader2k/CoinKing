import { Link } from "react-router-dom"
import { useGetCryptosQuery } from "../services/CryptoApi"
import { useState, useEffect } from "react"

const Cryptos = ({simplified}) => {
  const count = simplified ? 10 : 100
  const {data, error, isFetching } = useGetCryptosQuery(count) 
  const [ cryptos, setCryptos ] = useState([])
  const [ search, setSeach ] = useState("")

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    setCryptos(filteredData)
    console.log(cryptos)
  },[search, data])

  return (
    <section className="my-5 px-10">
      <div>
        {
          !simplified && (
            <div className="max-w-[300px] mx-auto px-5 py-3 text-[0.8rem] outline-none border-yellow-400 border">
              <input
                type="text"
                placeholder="search for a currency"
                onChange={(e) => setSeach(e.target.value)}
              />
            </div>
          )
        }
      </div>

      <div className="my-5 flex flex-wrap justify-evenly gap-6">
        {cryptos.map((data) => (
          <div key={data.rank} className="w-[200px]">
            <Link to={`/cryptos/${data.uuid}`}>
              <div className="border rounded-xl flex flex-col gap-6 hover:shadow-md">
                <div className="flex w-full items-center justify-between p-5 border-b">
                  <div className="flex items-center gap-2">
                    <p>{data.rank}.</p>
                    <p>{data.name}</p>
                  </div>
                  <div>
                    <img className="w-[30px]" src={data.iconUrl} alt="icon" />
                  </div>
                </div>
                <div>

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