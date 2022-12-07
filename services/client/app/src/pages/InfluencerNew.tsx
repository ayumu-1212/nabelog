import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'

interface InfluencerForm {
  name: string
  description: string
  instagramLink: string
  twitterLink: string
  youtubeLink: string
  tiktokLink: string
  webLink: string
}

function InfluencerNew(): JSX.Element {
  const [form, setForm] = useState<InfluencerForm>({
    name: '',
    description: '',
    instagramLink: '',
    twitterLink: '',
    youtubeLink: '',
    tiktokLink: '',
    webLink: '',
  })
  const navigate = useNavigate()

  const handleChange = (event: any): void => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const onSubmit = (): void => {
    const params = new URLSearchParams()
    params.append('name', form.name)
    params.append('description', form.description)
    params.append('instagramLink', form.instagramLink)
    params.append('twitterLink', form.twitterLink)
    params.append('youtubeLink', form.youtubeLink)
    params.append('tiktokLink', form.tiktokLink)
    params.append('webLink', form.webLink)

    axios
      .post('/influencers', params)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('err:', err)
      })
      .finally(() => {
        console.info('ローディング表示終了')
        navigate('/influencers')
      })
  }

  return (
    <>
      <Typography variant="h3">インフルエンサー追加ページ</Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { my: 1, mr: 1 },
        }}
      >
        <div>
          <TextField
            required
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{ width: '40%', minWidth: 300 }}
          />
        </div>
        <div>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{ width: '80%', minWidth: 300 }}
          />
        </div>
        <div>
          <TextField
            label="InstagramLink"
            name="instagramLink"
            value={form.instagramLink}
            onChange={handleChange}
            sx={{ width: '80%', minWidth: 300 }}
          />
        </div>
        <div>
          <TextField
            label="TwitterLink"
            name="twitterLink"
            value={form.twitterLink}
            onChange={handleChange}
            sx={{ width: '80%', minWidth: 300 }}
          />
        </div>
        <div>
          <TextField
            label="YoutubeLink"
            name="youtubeLink"
            value={form.youtubeLink}
            onChange={handleChange}
            sx={{ width: '80%', minWidth: 300 }}
          />
        </div>
        <div>
          <TextField
            label="TiktokLink"
            name="tiktokLink"
            value={form.tiktokLink}
            onChange={handleChange}
            sx={{ width: '80%', minWidth: 300 }}
          />
        </div>
        <div>
          <TextField
            label="WebLink"
            name="webLink"
            value={form.webLink}
            onChange={handleChange}
            sx={{ width: '80%', minWidth: 300 }}
          />
        </div>
        <div>
          <Button variant="contained" onClick={onSubmit}>
            Created
          </Button>
        </div>
      </Box>
    </>
  )
}

export default InfluencerNew
