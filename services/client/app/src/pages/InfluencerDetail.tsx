import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Typography } from '@mui/material'
import axios from 'axios'

import { BasicBreadcrumbs, Crumb } from '../components/organisms/Breadcrumbs'
import Influencer from '../entity/influencer'

const apiUrl = process.env.REACT_APP_SERVER_URL

function InfluencerDetail(): JSX.Element {
  const [influencer, setInfluencer] = useState<Influencer>()
  const params = useParams()
  const influencerId: number = Number(params.id)
  if (apiUrl === undefined) {
    console.error('envieonment props "SERVER_URL" is undefined')
    process.exit()
  }
  useEffect(() => {
    axios
      .get(`${apiUrl}/influencers/${influencerId}`)
      .then((res) => {
        setInfluencer(res.data.influencer)
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }, [])

  const crumbs: Crumb[] = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Influencers',
      link: '/influencers',
    },
    {
      name: influencer != null ? influencer.Name : 'NoName',
      link: influencer != null ? `/influencers/${influencer.ID}` : '',
    },
  ]

  return (
    <>
      <BasicBreadcrumbs crumbs={crumbs} />
      <Typography variant="h3">インフルエンサー詳細ページ</Typography>
      <div>
        <h3>名前</h3>
        <p>{influencer?.Name}</p>
        <h3>紹介文</h3>
        <p>{influencer?.Description}</p>
        {influencer?.InstagramLink !== '' && (
          <>
            <h3>Instagram</h3>
            <a href={influencer?.InstagramLink} rel="noreferrer" target="_blank">
              {influencer?.InstagramLink}
            </a>
          </>
        )}
        {influencer?.TwitterLink !== '' && (
          <>
            <h3>Twitter</h3>
            <a href={influencer?.TwitterLink} rel="noreferrer" target="_blank">
              {influencer?.TwitterLink}
            </a>
          </>
        )}
        {influencer?.YoutubeLink !== '' && (
          <>
            <h3>YouTube</h3>
            <a href={influencer?.YoutubeLink} rel="noreferrer" target="_blank">
              {influencer?.YoutubeLink}
            </a>
          </>
        )}
        {influencer?.TiktokLink !== '' && (
          <>
            <h3>TikTok</h3>
            <a href={influencer?.TiktokLink} rel="noreferrer" target="_blank">
              {influencer?.TiktokLink}
            </a>
          </>
        )}
        {influencer?.WebLink !== '' && (
          <>
            <h3>Webサイト</h3>
            <a href={influencer?.WebLink} rel="noreferrer" target="_blank">
              {influencer?.WebLink}
            </a>
          </>
        )}
      </div>
    </>
  )
}

export default InfluencerDetail
