import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


const Chart = ({ coinHistory, time, currentPrice, change, color }) => {

  const data = coinHistory?.data?.history
  const items = data?.map(({price, timestamp}) => ({
    timestamp: new Date(timestamp * 1000).toLocaleDateString(),
    price: parseFloat(price).toFixed(4)
  }))

  const changeValue = parseFloat(change)
  const textStyle = changeValue >=0 ? 'text-green-500' : 'text-red-500'

  return (
    <section className="my-10 w-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h1 className="text-lg font-semibold font-General text-gray-600">Price chart</h1>
          <div className="flex items-center gap-2">
            <p className="text-[0.85rem]">{time}</p>
            <p className={`${textStyle} text-[0.85rem] font-bold`}>{change}%</p>
          </div>
        </div>
        <p className="text-lg font-semibold font-General text-gray-600">${currentPrice}</p>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={items}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="timestamp" />
            <YAxis dataKey="price"/>
            <Tooltip />
            <Line dot={false} type="monotone" dataKey="price" stroke={color} activeDot={{ r: 8 }} />
            <Line type="bumpX" dataKey="timestamp" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default Chart