import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'

interface ShopForm {
  name: string
  description: string
}

function ShopNew(): JSX.Element {
  const [form, setForm] = useState<ShopForm>({
    name: '',
    description: '',
  })
  const navigate = useNavigate()

  const handleChange = (event: any): void => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const onSubmit = (): void => {
    const params = new URLSearchParams()
    params.append('name', form.name)
    params.append('description', form.description)

    axios
      .post<ShopForm>('/shops', params)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('err:', err)
      })
      .finally(() => {
        console.info('ローディング表示終了')
        navigate('/shops')
      })
  }

  return (
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
        <Button variant="contained" onClick={onSubmit}>
          Contained
        </Button>
      </div>
    </Box>
  )
}

export default ShopNew
