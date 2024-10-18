import { Dribbble, Instagram, Linkedin, MousePointer2, Star, Youtube } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

function LeftCol() {
  return (
    <div className="first-div flex-1 space-y-7 text-center lg:text-left">
        <p className="text-3xl sm:text-3xl lg:text-3xl font-normal leading-[3.5rem] lg:leading-[4rem]">
          Your direct link to meet your kind of people
          <Youtube className="bg-red-500 rounded-full p-2 text-white mx-3 w-12 h-12 inline pl-2" />
          events
          <MousePointer2 className="bg-blue-700 rounded-full p-2 text-white mx-3 w-12 h-12 inline " />
          and Endorsement!
        </p>
        <p className="text-gray-400 text-xs">
          At EvCon , we bring you the most heated events with complete sign up
          process!
        </p>

        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <Button className="bg-blue-700 text-white rounded-[0.60rem] hover:bg-blue-900">
            Endorsement
          </Button>
          <Button className="bg-gray-200 text-black rounded-[0.60rem] hover:bg-black hover:text-white">
            Join as a Contributer
          </Button>
        </div>

        <div className=" flex flex-col gap-5 mt-6 ">
          <h1 className="flex items-center gap-2 justify-center lg:justify-start">
            <Star fill="yellow" stroke="none" />
            4.8 by <span className="font-medium">Trevor ikas</span>
          </h1>

          <ul className="flex items-center gap-5 mt-4 justify-center lg:justify-start ">
            <Instagram className="social-media" />
            <Linkedin className="social-media" />
            <Youtube className="social-media" />
            <Dribbble className=" social-media " />
          </ul>
        </div>
      </div>
  )
}

export default LeftCol