import { Inter } from '@next/font/google'
import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
import { SectionWithIcon } from '@/components/section-with-icon.component'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div className='flex flex-col justify-center items-center h-screen text-white px-2'>
      <h1 className='text-5xl font-bold mb-20'>ChatGPT Messanger</h1>

      <div className='flex gap-8 text-center '>
        <SectionWithIcon
          title='Examples'
          icon={<SunIcon className='h-8 w-8' />}
          texts={["Explain something to me", "What is a difference between a dot and a cat?", "What is the color of the sun?"]} />

        <SectionWithIcon
            title='Capabilities'
            icon={<BoltIcon className='h-8 w-8' />}
            texts={["Change the ChatGPT Model to use", "Messages are stored in Firebase's Firestore", "Toast notifications while processing!"]} />

        <SectionWithIcon
            title='Limitations'
            icon={<ExclamationTriangleIcon className='h-8 w-8' />}
            texts={["May generate incorrent information", "Limited knowledge of the world", "Model may not be up to date :)"]} />

      </div>
   </div>
  )
}