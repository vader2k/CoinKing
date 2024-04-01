import Hero from '../components/Hero';
import Statistics from '../components/Statistics';
import News from './News';

const Home = () => {


  return (
    <main className="font-Gambetta w-full flex flex-col gap-10">
      <Hero />
      <div className='w-full max-w-[1400px] mx-auto px-10 ny-10'>
        <Statistics />
        <News displayCount={4}/>
      </div>
    </main>
  )
}

export default Home