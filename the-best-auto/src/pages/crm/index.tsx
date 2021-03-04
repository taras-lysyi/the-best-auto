import { useState, useMemo, useCallback } from 'react'
import { Route, Switch, useLocation, NavLink } from 'react-router-dom'
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import EditIcon from '@material-ui/icons/Edit'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 900,
    },
    chip: {
      margin: 2,
    },
  }),
)
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]
function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}
export const CrmPage = () => {
  const classes = useStyles()

  const theme = useTheme()
  const { pathname } = useLocation()
  const routes = useMemo(() => {
    return [
      {
        path: '/crm/dashboard',
        label: 'Dashboard',
      },
      {
        path: '/crm/menu/list',
        label: 'Меню',
      },
      {
        path: '/crm/catalog/list',
        label: 'Каталог',
      },
      {
        path: '/crm/catalog/add',
        label: 'Додати авто',
      },
    ]
  }, [])
  let initialLocation = useMemo(() => {
    return routes.findIndex(item => `${pathname}` === item.path)
  }, [pathname, routes])

  const [selectedTab, setSelectedTab] = useState(initialLocation)
  const tabHandler = useCallback((event: React.ChangeEvent<{}> | React.MouseEvent, newValue: number) => {
    setSelectedTab(newValue)
    window.scrollTo(0, 0)
  }, [])

  const [category, setCategory] = useState('')
  const categoryHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string)
  }

  const [brand, setBrand] = useState('')
  const brandHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBrand(event.target.value as string)
  }

  const [mileage, setMileage] = useState('')
  const mileageHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMileage(event.target.value as string)
  }

  const [year, setYear] = useState('')
  const yearHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYear(event.target.value as string)
  }
  const [markers, setMarker] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  })

  const markersHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMarker({ ...markers, [event.target.name]: event.target.checked })
  }
  const [cpp, setCpp] = useState('')
  const cppHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCpp(event.target.value as string)
  }
  const [security, setSecurity] = useState('')
  const securityHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSecurity(event.target.value as string)
  }
  const [personName, setPersonName] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[])
  }
  const tabs = useMemo(() => {
    return routes.map(item => {
      return (
        <Tab
          label={item.label}
          key={item.label}
          component={NavLink}
          to={`${item.path}`}
          disabled={pathname === item.path}
        />
      )
    })
  }, [routes, pathname])

  return (
    <>
      <Box mb={2}>
        <Tabs
          value={selectedTab}
          indicatorColor='primary'
          textColor='inherit'
          onChange={tabHandler}
          variant='fullWidth'>
          {tabs}
        </Tabs>
      </Box>
      <Switch>
        <Route path='/crm/dashboard'>
          <Box textAlign='center'>
            <Typography variant='h4'>Особистi данi</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box mr={2}>
              <Typography variant='h5'>Name</Typography>
            </Box>
            <Button size='large' variant='contained' color='primary'>
              Вихiд
            </Button>
          </Box>
        </Route>
        <Route path='/crm/menu/list'>
          <Box textAlign='center'>
            <Typography variant='h4'>Редагування головного меню</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Typography variant='h5'>Категория</Typography>
            <AddIcon className={classes.icon} />
            <ArrowDownwardIcon className={classes.icon} />
            <ArrowUpwardIcon className={classes.icon} />
            <EditIcon className={classes.icon} />
          </Box>
          <Box display='flex' alignItems='center'>
            <Typography variant='h5'>Категория</Typography>
            <AddIcon className={classes.icon} />
            <ArrowDownwardIcon className={classes.icon} />
            <ArrowUpwardIcon className={classes.icon} />
            <EditIcon className={classes.icon} />
          </Box>
          <Box mt={2}>
            <Button variant='contained' size='large' color='primary'>
              Додати категорiю
            </Button>
          </Box>
        </Route>
        <Route path='/crm/catalog/list'>
          <div>каталог</div>
        </Route>
        <Route path='/crm/catalog/add'>
          <Box textAlign='center'>
            <FormControl className={classes.formControl}>
              <InputLabel id='category'>Категорiя</InputLabel>
              <Select labelId='category' id='category-select' value={category} onChange={categoryHandler}>
                <MenuItem value={'category'}>Авто в дорози</MenuItem>
              </Select>
              <FormHelperText>Поле обов'язкове!</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='brand'>Бренд</InputLabel>
              <Select labelId='brand' id='brand-select' value={brand} onChange={brandHandler}>
                <MenuItem value={'brand1'}>brand</MenuItem>
              </Select>
              <FormHelperText>Поле обов'язкове!</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField label={`Повна назва`} />
              <FormHelperText>Поле обов'язкове!</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField label={`VIN номер`} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField label={`Внутрiшнiй код авто`} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField label={`Актуальна цiна ($)`} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField label={`Стара цiна ($)`} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='mileage'>Пробiг</InputLabel>
              <Select labelId='mileage' id='mileage-select' value={mileage} onChange={mileageHandler}>
                <MenuItem value={'Милi'}>Милi</MenuItem>
                <MenuItem value={'Кiлометри'}>Кiлометри</MenuItem>
              </Select>
              <FormHelperText>Поле обов'язкове!</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='year'>Рiк випуску</InputLabel>
              <Select labelId='year' id='year-select' value={year} onChange={yearHandler}>
                <MenuItem value={'2020'}>2020</MenuItem>
              </Select>
              <FormHelperText>Поле обов'язкове!</FormHelperText>
            </FormControl>
            <Typography variant='h5'>Показ на сайтi</Typography>
            <Box textAlign='center'>
              <FormControlLabel
                control={<Checkbox checked={markers.checkedA} onChange={markersHandler} name='checkedA' />}
                label='Топ пропозицiя'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={markers.checkedB} onChange={markersHandler} name='checkedB' color='secondary' />
                }
                label='Новинка'
              />
              <FormControlLabel
                label='Знижка'
                control={<Checkbox checked={markers.checkedC} name='checkedC' onChange={markersHandler} />}
              />
            </Box>
            <Typography variant='h5'>Характеристика</Typography>
            <Button variant='contained' color='primary' size='large' endIcon={<AddIcon />}>
              Додати характеристику
            </Button>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id='cpp'>КПП</InputLabel>
              <Select labelId='cpp' id='cpp-select' value={cpp} onChange={cppHandler}>
                <MenuItem value={'Автомат'}>Автомат</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='cpp'>КПП</InputLabel>
              <Select labelId='cpp' id='cpp-select' value={cpp} onChange={cppHandler}>
                <MenuItem value={'Автомат'}>Автомат</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-mutiple-chip-label'>Безпека</InputLabel>
              <Select
                labelId='demo-mutiple-chip-label'
                id='demo-mutiple-chip'
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input id='select-multiple-chip' />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {(selected as string[]).map(value => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}>
                {names.map(name => (
                  <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <TextField variant='outlined' label={`Опис`} multiline rows={4} placeholder='Введiть опис' />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                variant='outlined'
                label={`Примiтка (не відображається)`}
                multiline
                rows={4}
                placeholder='Введiть примiтку'
              />
            </FormControl>
            <Box textAlign='center'>
              <Button color='secondary' variant='contained' size='large'>
                Додати авто
              </Button>
            </Box>
          </Box>
        </Route>
      </Switch>
    </>
  )
}
