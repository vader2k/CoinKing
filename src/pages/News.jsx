import moment from "moment";
import { useState } from "react";
import { useGetNewsQuery } from '../services/CryptoNews'
import Loader from "../components/Loader";

const News = ({displayCount}) => {
  const [ source, setSource ] = useState('coindesk')
  const {data, error, isFetching } = useGetNewsQuery(source)
  console.log(data)
  const displayedNews = data?.data.slice(0, displayCount)
  if (isFetching) return <Loader />
  if (error) return <p>Error :(</p>;
  if (!data) return

  const providers = [ 'coindesk', 'cointelegraph', 'bitcoinist', 'decrypt', 'bsc', 'theguardian' ]

  return (
    <section className="w-full max-w-[1600px] mx-auto px-10 my-5">
      <div className="w-full flex items-end justify-between">
        <h1 className="text-2xl font-semibold font-General text-gray-600">News</h1>

        <select
          defaultValue={source}
          aria-placeholder="Select source"
          onChange={(e) => setSource(e.target.value)}
          className="border px-3 py-1 border-yellow-500 font-medium capitalize"
        >
          {
            providers.map((data, i) => (
              <option 
                key={i} 
                value={data}
              > 
                {data}
            </option>
            ))
          }
        </select>
      </div>

      <p className="my-5 text-[0.9rem] capitalize">
        we empower you to cut through the noise and get the news that matters to you, instantly. Our innovative platform allows you to curate your own news feed, aggregating real-time updates from any source you choose. Whether it{"'"}s global headlines, niche industry updates, or your favorite local blogs, we deliver the latest news directly to you, the moment it breaks.
      </p>

      <div className="w-full flex items-start justify-between">
          {displayedNews?.map((news, i) => (
            <div key={i} className="flex flex-col gap-3">
              hi
            </div>
          ))}
      </div>
    </section>
  )
}

export default News