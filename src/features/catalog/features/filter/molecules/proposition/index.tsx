import { memo } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

interface Props {
  checked: boolean
  onChange?: () => void
  label: string
}

export const Proposition = memo(({ checked, onChange, label }: Props) => {
  return <FormControlLabel control={<Checkbox checked={checked} onChange={onChange} color='primary' />} label={label} />
})
