import React, { FC, useEffect, useState } from 'react'
import css from './Video.module.scss'
import ReactPlayer from 'react-player'

interface IVideo {
   path: string
   name: string
}

const Video: FC = () => {
   const [videos, setVideos] = useState<IVideo[]>([])

   useEffect(() => {
      const fetchVideos = async () => {
         const response = await fetch('/api/getVideo')
         const data = await response.json()
         const regex = /^\/video\//
         const video_data = data.map((path: string) => {
            return { path, name: path.replace(regex, '') }
         })
         setVideos(video_data)
      }
      fetchVideos()
   }, [])

   return (
      <div className={css.video}>
         {videos.map((v) => {
            const { path, name } = v

            return (
               <div key={v.name} className={css.block}>
                  <ReactPlayer
                     url={`${path}`}
                     width={200}
                     height={200}
                     light='/assets/images/video/thumb.png'
                     controls
                  />
                  <p>{name}</p>
               </div>
            )
         })}
      </div>
   )
}

export default Video
