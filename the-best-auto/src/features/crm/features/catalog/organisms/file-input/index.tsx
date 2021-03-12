import Dropzone from 'react-dropzone'
import { Control, Controller } from 'react-hook-form'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import CloudUpload from '@material-ui/icons/CloudUpload'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import PublishIcon from '@material-ui/icons/Publish'
import green from '@material-ui/core/colors/green'
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#eee',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#333',
    padding: '10px',
    marginTop: '20px',
  },
  icon: {
    marginTop: '16px',
    color: '#888888',
    fontSize: '42px',
  },
  paper: {
    padding: theme.spacing(4),
  },
  media: {
    height: '145px',
  },
  download: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: green[500],
      },
    },
  },
}))

interface Props {
  control: Control
  name: string
}

export const FileInput = ({ control, name }: Props) => {
  const classes = useStyles()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ onChange, onBlur, value }) => (
        <>
          <Box m={2}>
            <Dropzone accept='image/png, image/jpg, image/jpeg' onDrop={onChange}>
              {({ getRootProps, getInputProps }) => (
                <Paper variant='outlined' className={classes.root} {...getRootProps()}>
                  <CloudUpload className={classes.icon} />
                  <input {...getInputProps()} name={name} onBlur={onBlur} />
                  <p>Перетягнiть файли сюди або натиснiть, щоб вибрати</p>
                </Paper>
              )}
            </Dropzone>
          </Box>

          {value.length !== 0 && (
            <Box m={2}>
              <Paper square className={classes.paper} variant='outlined'>
                <Grid container spacing={2} justify='center'>
                  {value.map((file: any, index: string) => (
                    <Grid item key={index}>
                      <img className={classes.media} src={URL.createObjectURL(file)} alt={file.name} />
                    </Grid>
                  ))}
                </Grid>
                <Box mt={2}>
                  <Button className={classes.download} size='large' variant='contained' endIcon={<PublishIcon />}>
                    Завантажити
                  </Button>
                </Box>
              </Paper>
            </Box>
          )}
        </>
      )}
    />
  )
}
