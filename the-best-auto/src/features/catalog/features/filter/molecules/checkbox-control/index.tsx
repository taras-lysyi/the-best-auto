import { memo } from 'react'
import { useAppDispatch } from 'configureStore'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

interface Props {
  value: string | number
  checked: boolean | undefined
  onChangeAction: (payload: any) => any
  label: string
}

export const CheckboxControl = memo(({ value, checked, onChangeAction, label }: Props) => {
  const dispatch = useAppDispatch()
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(onChangeAction(value))
  return (
    <>
      <FormControlLabel
        key={value}
        control={<Checkbox checked={checked} onChange={onChange} value={value} color='primary' />}
        label={label}
      />
    </>
  )
})
