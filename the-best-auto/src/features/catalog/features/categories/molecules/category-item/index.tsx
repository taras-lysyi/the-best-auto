import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
})

interface Props {
  currentLink: string
  link: string
  name: string
}

export const CategoryItem = ({ currentLink, link, name }: Props) => {
  const classes = useStyles()
  return (
    <>
      <Link className={classes.link} to={`/catalog/${link}`}>
        <Button
          fullWidth
          color={currentLink === link ? 'primary' : 'secondary'}
          disabled={currentLink === link ? true : false}
          variant='contained'
          size='large'>
          {name}
        </Button>
      </Link>
    </>
  )
}
