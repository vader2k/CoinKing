import moment from "moment";
import { useState } from "react";
import { useGetNewsQuery } from '../services/CryptoNews'
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const News = ({displayCount}) => {
  const [ source, setSource ] = useState('coindesk')
  const {data, error, isFetching } = useGetNewsQuery(source)
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

      <h1 className="text-xl font-medium capitalize">Latest News From {source}</h1>

      <div className="my-5 flex flex-wrap items-start justify-center gap-6 w-full px-5">
          {displayedNews?.map((news, i) => (
            <div key={i}>
              <Link to={news.url} target="_blank" rel="noopener noreferrer">
                <div className="flex flex-col gap-3 w-[250px] my-5 p-2 shadow-md border min-h-[250px]">
                  <div className="w-full flex items-start">
                    <h1 className="font-medium">{news.title}</h1>
                    <img 
                      src={news.thumbnail} 
                      alt="news thumbail" 
                      className="w-[80px] object-cover"
                    />
                  </div>
                  <p className="text-[0.8rem]">
                    {news.description.length > 100 
                      ? `${news?.description.substring(0,100)}...` 
                      : news?.description
                    }
                  </p>
                  <p className="text-[0.7rem] font-bold text-gray-600">{moment(news.createdAt).startOf('ss').fromNow()}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  )
}

export default News