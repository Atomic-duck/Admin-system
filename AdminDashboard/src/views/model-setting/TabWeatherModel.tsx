import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center',
    marginLeft: 0,
  }
}))

const TabUploadModel = () => {
  // ** State
  const [src, setSrc] = useState<string>('')

  const onChange = (file: ChangeEvent) => {
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      const fileName = files[0].name;
      setSrc(fileName)
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Link
                  component='label'
                  sx={{ cursor: 'pointer', textDecoration: 'underline', color: "darkslategray" }}
                >
                  Chọn Model
                  <input
                    hidden
                    type='file'
                    accept=".h5, .hdf5, .tflite, .pb, .onnx"
                    onChange={onChange}
                    id='weather-model'
                  />
                </Link>
                <Typography variant='body1' sx={{ marginTop: 5 }}>
                  {src}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={5}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Tải lên
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabUploadModel
