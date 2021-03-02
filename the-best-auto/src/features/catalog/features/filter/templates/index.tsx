import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { SkeletonLoader, LoadingError } from 'shared/molecules'
import { LoadingStatusT } from 'shared/types'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface FilterBoxTemplateProps {
  title?: string
  children?: React.ReactNode
  status: LoadingStatusT
}

export const FilterBoxTemplate = ({ title, children, status }: FilterBoxTemplateProps) => {
  return (
    <>
      {status === 'loading' ? (
        <SkeletonLoader />
      ) : status === 'success' ? (
        <>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display='flex' flexDirection='column'>
                {children}
              </Box>
            </AccordionDetails>
          </Accordion>
          <Divider />
        </>
      ) : (
        <LoadingError />
      )}
    </>
  )
}
