import { memo } from 'react'
import { useAppDispatch } from 'configureStore'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

interface Props {
  value: string | number
  checked: boolean | undefined
  onChangeAction: (payload: any) => any
  label: string
  featureId: number
}

export const CheckboxControlFeatures = memo(({ value, checked, onChangeAction, label, featureId }: Props) => {
  const dispatch = useAppDispatch()
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(onChangeAction({ featureId, values: value }))
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
