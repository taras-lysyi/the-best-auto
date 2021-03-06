import { useState } from 'react'
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
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
import { useForm, Controller } from 'react-hook-form'

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

export const Add = () => {
  const { handleSubmit, errors, control } = useForm()
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data))
  }
  const classes = useStyles()
  const theme = useTheme()

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
  /* const [security, setSecurity] = useState('') */
  /* const securityHandler = (event: React.ChangeEvent<{ value: unknown }>) => { */
  /*   setSecurity(event.target.value as string) */
  /* } */
  const [personName, setPersonName] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[])
  }
  return (
    <Box textAlign='center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className={classes.formControl} error={Boolean(errors.categoryId)}>
          <InputLabel id='category-select-label'>Категорiя</InputLabel>
          <Controller
            as={
              <Select>
                <MenuItem value='simple'>Simple Words only (3-5 characters)</MenuItem>
                <MenuItem value='medium'>Medium Words only (5-8 characters)</MenuItem>
                <MenuItem value='complex'>Complex Words only (8+ characters)</MenuItem>
                <MenuItem value='allwords'>Randomly Select Words all across</MenuItem>
              </Select>
            }
            name='categoryId'
            rules={{ required: `Категорiя обов'язкова!` }}
            control={control}
            defaultValue=''
          />
          <FormHelperText>{errors.categoryId && errors.categoryId.message}</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl} error={Boolean(errors.title)}>
          <Controller
            error={Boolean(errors.title)}
            as={TextField}
            rules={{ required: `Назва обов'язкова!` }}
            name='title'
            label='Повна назва'
            control={control}
            defaultValue=''
          />
          <FormHelperText>{errors.title && errors.title.message}</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} error={Boolean(errors.brandId)}>
          <InputLabel id='brand-select-label'>Бренд</InputLabel>
          <Controller
            as={
              <Select>
                <MenuItem value='simple'>brand</MenuItem>
              </Select>
            }
            name='brandId'
            rules={{ required: `Бренд обов'язковий!` }}
            control={control}
            defaultValue=''
          />
          <FormHelperText>{errors.brandId && errors.brandId.message}</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Controller as={TextField} name='vin' label='VIN номер' control={control} defaultValue='' />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Controller as={TextField} name='productCode' label='Внутрiшнiй код авто' control={control} defaultValue='' />
        </FormControl>
        <FormControl className={classes.formControl} error={Boolean(errors.price)}>
          <Controller
            error={Boolean(errors.price)}
            type='number'
            rules={{ required: `Актуальна цiна обов'язкова` }}
            as={TextField}
            name='price'
            label='Актуальна цiна ($)'
            control={control}
            defaultValue=''
          />
          <FormHelperText>{errors.price && errors.price.message}</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Controller
            as={TextField}
            type='number'
            name='offerPrice'
            label='Стара цiна ($)'
            control={control}
            defaultValue={null}
          />
        </FormControl>
        <FormControl className={classes.formControl} error={Boolean(errors.mileage)}>
          <InputLabel id='mileage-select-label'>Пробiг</InputLabel>
          <Controller
            as={
              <Select>
                <MenuItem value='simple'>ml</MenuItem>
              </Select>
            }
            name='mileage'
            rules={{ required: `Пробiг обов'язковий!` }}
            control={control}
            defaultValue=''
          />
          <FormHelperText>{errors.mileage && errors.mileage.message}</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} error={Boolean(errors.year)}>
          <InputLabel id='year-select-label'>Рiк випуску</InputLabel>
          <Controller
            as={
              <Select>
                <MenuItem value='simple'>2000</MenuItem>
              </Select>
            }
            name='year'
            rules={{ required: `Рiк обов'язковий!` }}
            control={control}
            defaultValue=''
          />
          <FormHelperText>{errors.year && errors.year.message}</FormHelperText>
        </FormControl>
        <Typography variant='h5'>Показ на сайтi</Typography>
        <Controller
          name='popular'
          control={control}
          render={props => (
            <FormControlLabel
              label='Топ пропозицiя'
              control={<Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />}
            />
          )}
        />
        <Controller
          name='new'
          control={control}
          render={props => (
            <FormControlLabel
              label='Новинка'
              control={<Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />}
            />
          )}
        />
        <Controller
          name='sold'
          control={control}
          render={props => (
            <FormControlLabel
              label='Знижка'
              control={<Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />}
            />
          )}
        />
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
        <br />
        <Button type='submit' color='secondary' variant='contained' size='large'>
          Додати авто
        </Button>
      </form>
    </Box>
  )
}
