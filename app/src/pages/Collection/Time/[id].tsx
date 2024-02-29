import React, { useEffect } from 'react'
import { Client, Schedule } from "@upstash/qstash";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/router';

const token: any = process.env.QSTASH_TOKEN || "";

const c = new Client({
  token: "eyJVc2VySUQiOiI3NjQ4MWZhMC1jMGJlLTQ3ZWUtOGYzMC04ZTc5YjMwOTUzODkiLCJQYXNzd29yZCI6ImQ4MTJkN2E4MTJiMTQwZTBhNmYyMTgzZGFkNzYxMDY4In0=",
});

type ScheduleType = {
  User: string,
  Market: string,
  Inteval: number
}

interface CronExpressionPart {
  value: string; // The cron value (e.g., "0", "*", "1-5")
  description: string; // Natural language description
}

type DurationUnit =  'hours' | 'days';

const Time = () => {
  // Define the form validation schema using Yup
  const [oneTimeState, setOneTimeState] = React.useState<boolean>(true)
  const [delay, setDelay] = React.useState<number>(1)
  const [frequency, setFrequecy] = React.useState<number>(1)
  const [duration, setDuration] = React.useState<DurationUnit>('hours')
  const [list, setList] = React.useState<Schedule[]>([])
  const [wallet, setWallet] = React.useState<string>('hours')

  const { user } = useDynamicContext();

  const router = useRouter()
  const { id } = router.query

  const merchantID = user?.verifiedCredentials[0].address

  function convertToCronExpression(value: number, unit: DurationUnit): string {
    let cronExpression = '';

    switch (unit) {
  
        case 'hours':
            if (value < 0 || value > 23) {
                throw new Error('Invalid value for hours. Valid range is 0-23.');
            }
            cronExpression = `0 */${value} * * *`;
            break;
        case 'days':
            if (value < 1 || value > 31) {
                throw new Error('Invalid value for days. Valid range is 1-31.');
            }
            cronExpression = `0 0 */${value} * *`;
            break;
        default:
            throw new Error('Invalid duration unit');
    }

    return cronExpression;
}

function convertCronToNaturalLanguage(cronExpression: string): string {
  const parts = cronExpression.split(" ");

  if (parts.length !== 5) {
    return "Invalid cron expression format";
  }

  const cronParts: CronExpressionPart[] = [
    { value: parts[0], description: "Every minute" }, // Minutes
    { value: parts[1], description: "Every hour" }, // Hours
    { value: parts[2], description: "Every day of the month" }, // Day of month
    { value: parts[3], description: "Every month" }, // Month
    { value: parts[4], description: "Every day of the week" }, // Day of week
  ];

  // Function for basic interpretation of cron part values
  const interpretPart = (part: CronExpressionPart) => {
    if (part.value === "*") {
      return part.description;
    } else if (part.value.includes("-")) {
      const [start, end] = part.value.split("-");
      return `Between ${start} and ${end} ${part.description.slice(6)}`; 
    } else if (part.value.includes(",")) {
      return `On ${part.value.split(",").join(", ")} ${part.description.slice(6)}`;
    } else {
      return `At ${part.value} ${part.description.slice(6)}`;
    }
  };

  // Generate the natural language description
  const descriptionParts = cronParts.map(interpretPart);
  return "This task runs " + descriptionParts.join(", ");
}

 
async function handleSubmit() { // Mark function as async 
  console.log(oneTimeState, delay, frequency, duration, wallet);
  const cron = convertToCronExpression(frequency, duration);

  try { // Add error handling with try...catch
    if(oneTimeState) {
      await c.schedules.create({
        destination: "G5hZAWCLy4Jyz63knYWzdnFqKGff2KPta1NpKP7aEgHr",
        delay: 1,
        cron: cron,
        body: JSON.stringify({ merchantID: merchantID, wallet: wallet, collectionID: id })
      });
    } else {
      await c.schedules.create({
        destination: "m",
        cron: cron,
        body: JSON.stringify({ MerchantID: merchantID, wallet: wallet })
      });
    }
    
  } catch (error) {
    console.error("Error creating schedule:", error); // Handle potential errors
  }
};

  async function deleteSchdule(scheduleId: string) {
    await c.schedules.delete(scheduleId)
  }

 useEffect(() => {
   async function getSchedules() {
    const list = await c.schedules.list()
    setList(list)
    console.log(list)
   }

   getSchedules();
 }, [])
  


  return (
    <main className=' py-[10%] px-7 w-full overflow-hidden flex flex-col justify-center bg-white'>

    <div className='w-full'>
    <h2 className="text-2xl text-[#4642f0] font-main font-semibold leading-7">Create an Time based trigger</h2>
      <p className="mt-1 font-main text-md leading-6 text-gray-600">Time based triggers allow you to schedule one time or recurring mint  </p>
    </div>

    <div className='w-full flex gap-4'>
      <button onClick={() => setOneTimeState(true)} className='bg-[#4642f0] mt-6 text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3'>One Time</button>
      <button onClick={() => setOneTimeState(false)} className='bg-[#4642f0] mt-6 text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3'>Recurring</button>
    </div>


    
      
      
  <div className='w-[50%]'>
  { oneTimeState ? 
    <div className='font-main mt-5 flex flex-col'>
    <label htmlFor="symbol" className='font-semibold text-[#4642f0]'>Delay</label>
    <input
      type="number"
      id="symbol"
      name="symbol"
      placeholder='Delay in minutes'
      className='border-[2px] rounded-xl border-[#4642f0]'
      onChange={(e) => setDelay(parseInt(e.target.value))}
    />
    
  </div> :
  <div className='font-main mt-5 flex flex-col'>
  <label htmlFor="symbol" className='font-semibold text-[#4642f0]'>Duration</label>
  <select
    id="oneTime" 
    name="oneTime" 
    className='border-[2px] rounded-xl border-[#4642f0]' 
    
  >
    <option onClick={() => setDuration("hours")} className='bg-[#4642f0] text-white' value="hours">Hour</option>
    <option onClick={() => setDuration("days")}  value="days">Day</option>
  </select>

<label htmlFor="symbol" className='font-semibold mt-5 text-[#4642f0]'>Frequency</label>
  <input
    type="text"
    id="symbol"
    name="symbol"
    className='border-[2px] rounded-xl border-[#4642f0]'
    placeholder='how many times the duration'
    onChange={(e) => setFrequecy(parseInt(e.target.value))}
  />
</div>
  }
  </div>
  

      <div className='font-main w-[50%] mt-5 flex flex-col'>
        <label htmlFor="description" className='font-semibold text-[#4642f0]'>Wallets</label>
        <input
          type="text"
          id="description"
          name="description"
          className='border-[2px] rounded-xl border-[#4642f0]'
          onChange={(e) => setWallet(e.target.value)}
        />
      </div>

      {/* Submit button */}
      <div>
      <button onClick={handleSubmit} className='bg-[#4642f0] mt-6 text-[#fbd0ff] font-main font-medium px-4 rounded-2xl py-3'>Create time trigger</button>
      </div>
      
      <div className='font-main mt-4'>
      <h3 className='text-2xl font-semibold'>My schedules</h3>

      <div className='mt-4 flex gap-4'>
        {list.map((res) => <div key={res.scheduleId} className='bg-[#4642f0] flex flex-col w-full p-5 text-[#fbd0ff] rounded-2xl'>
          <div className='bg-[#fbd0ff] w-[28%] flex justify-center rounded-sm my-3 text-[#4642f0]'>
          <h3>{res.scheduleId}</h3>
          </div>
          <h3>Body: {res.body}</h3>
          <h3 className='mt-2'>Destination: {res.destination}</h3>
          <span className='mt-3'>{convertCronToNaturalLanguage(res.cron)}</span>
          <div className='flex justify-end'>
            <button onClick={() => deleteSchdule(res.scheduleId)} className='bg-[#fbd0ff] px-3 py-2 rounded-xl text-[#4642f0]'>DELETE</button>
          </div>
        </div>)}
      </div>
      </div>
      
    </main>
  );
};

export default Time;


