import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from 'configureStore'
import { useForm, Controller } from 'react-hook-form'
import { getFeatures, getFeaturesValue } from 'features/crm/features/catalog/slice'
import { addFeature, addFeatureValue } from 'features/crm/features/catalog/slice'
import { selectFeaturesItems, selectFeaturesValueItems } from 'features/crm/features/catalog/selectors'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
  }),
)

const AddFeatureForm = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const { handleSubmit, control, errors } = useForm()
  const onSubmit = (data: { title: string }) => {
    dispatch(addFeature(data.title))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display='flex' alignItems='center'>
        <FormControl className={classes.formControl} error={Boolean(errors.title)}>
          <Controller
            error={Boolean(errors.title)}
            as={TextField}
            rules={{ required: `Назва обов'язкова!` }}
            name='title'
            label='Повна назва'
            defaultValue=''
            control={control}
          />
          <FormHelperText>{errors.title && errors.title.message}</FormHelperText>
        </FormControl>
        <Button type='submit' variant='contained' color='primary'>
          <AddIcon />
        </Button>
      </Box>
    </form>
  )
}

const AddFeatureValueForm = ({ selectedFeatureId }: { selectedFeatureId: number }) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const { handleSubmit, control, errors } = useForm()

  const onSubmit = (data: { value: string }) => {
    dispatch(addFeatureValue({ id: selectedFeatureId, name: data.value }))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display='flex' alignItems='center'>
        <FormControl className={classes.formControl} error={Boolean(errors.value)}>
          <Controller
            error={Boolean(errors.value)}
            as={TextField}
            rules={{ required: `Значення обов'язкове!` }}
            name='value'
            label='Значення'
            defaultValue=''
            control={control}
          />
          <FormHelperText>{errors.value && errors.value.message}</FormHelperText>
        </FormControl>
        <Button type='submit' variant='contained' color='primary'>
          <AddIcon />
        </Button>
      </Box>
    </form>
  )
}

export const AddFeature = () => {
  const dispatch = useAppDispatch()
  const featuresItems = useTypedSelector(state => selectFeaturesItems(state))
  const featureValueItems = useTypedSelector(state => selectFeaturesValueItems(state))
  useEffect(() => {
    Promise.all([dispatch(getFeatures()), dispatch(getFeaturesValue())])
  }, [dispatch])
  const [selectedFeatureId, setSelectedFeatureId] = useState<number | null>(null)

  const handleFeatureClick = (e: React.MouseEvent<HTMLElement>, featureId: number) => {
    setSelectedFeatureId(featureId)
  }
  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
      <Box m={2}>
        <Box display='flex'>
          <AddFeatureForm />
          {selectedFeatureId !== null && <AddFeatureValueForm selectedFeatureId={selectedFeatureId} />}
        </Box>
      </Box>
      <Box m={2}>
        <Box fontSize='h6.fontSize' display='flex'>
          <Box>
            {featuresItems.map(item => {
              return (
                <ListItem
                  divider
                  selected={selectedFeatureId === item.feature_id}
                  onClick={e => handleFeatureClick(e, item.feature_id)}
                  button>
                  {item.feature_name}
                </ListItem>
              )
            })}
          </Box>
          <Box>
            {selectedFeatureId === null && <Typography variant='h5'>Виберiть</Typography>}
            {featureValueItems
              .filter(item => {
                return item.feature_id === selectedFeatureId
              })
              .sort((a, b) => a.feature_value.localeCompare(b.feature_value))
              .map(item => {
                return <ListItem divider>{item.feature_value}</ListItem>
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
