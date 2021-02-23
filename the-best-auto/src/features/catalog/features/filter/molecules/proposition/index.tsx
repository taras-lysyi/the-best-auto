import { memo } from 'react'
import _ from 'lodash'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

interface Props {
  checked: boolean
  onChange?: () => void
  label: string
}

export const Proposition = memo(({ checked, onChange, label }: Props) => {
  console.log('render proposition')
  return <FormControlLabel control={<Checkbox checked={checked} onChange={onChange} color='primary' />} label={label} />
})
