// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'
import { Alert, IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { createAccount } from 'src/api/dataApi'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const defaultAccount = {
  role: 'OPERATOR',
  username: "",
  password: "",
};

const TabCreateAccount = () => {
  const [account, setAccount] = useState<any>(defaultAccount);
  const [notify, setNotify] = useState<{ success: Boolean, mess: String } | null>();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!account.username) {
        displayAlert(false, 'Hãy nhập username');
        return;
      }
      else if (!account.password) {
        displayAlert(false, 'Hãy nhập password');
        return;
      }

      await createAccount(account.username, account.role, account.password);
      displayAlert(true, "Tạo tài khoản thành công");
      setAccount(defaultAccount);
    } catch (error) {
      displayAlert(false, error.message);
    }
  }

  const displayAlert = (success: Boolean, mess: String) => {
    setNotify({
      success,
      mess
    })

    setTimeout(() => {
      setNotify(null);
    }, 1000)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Username' placeholder='Nhập username' value={account.username} onChange={(e) => {
              setAccount({ ...account, username: e.target.value })
            }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='OPERATOR' value={account.role} onChange={(e) => {
                setAccount({ ...account, role: e.target.value })
              }}>
                <MenuItem value='ADMIN'>Admin</MenuItem>
                <MenuItem value='OPERATOR'>Operator</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                value={account.password}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(e) => setAccount({ ...account, password: e.target.value })}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
      {
        notify && notify.success && <Alert severity="success" style={{ position: 'absolute', marginTop: 30 }}>{notify.mess}</Alert>
      }
      {
        notify && !notify.success && <Alert severity="error" style={{ position: 'absolute', marginTop: 30 }}>{notify.mess}</Alert>
      }
    </CardContent>
  )
}

export default TabCreateAccount
