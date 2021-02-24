import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
export const ContactsPage = () => {
  return (
    <>
      <Box textAlign='center' my={2}>
        <Typography variant='h4'>Звяжіться з нами через месенджери або по телефону</Typography>
      </Box>
      <Box textAlign='center'>
        <Typography variant='h5'>Авто з Європи:</Typography>
        <a href='tel:+380676703322'>
          <Typography variant='h5'>+380 67 670 33 22 </Typography>
        </a>
        <a href='tel:+380676761122'>
          <Typography variant='h5'>+380 67 676 11 22 </Typography>
        </a>
        <a href='tel:+380673142557'>
          <Typography variant='h5'>+380 67 314 25 57 </Typography>
        </a>
      </Box>
      <Box textAlign='center'>
        <Typography variant='h5'>Авто з США:</Typography>
        <a href='tel:+380673142559'>
          <Typography variant='h5'>+380 67 314 25 59 </Typography>
        </a>
        <a href='tel:+380676723322'>
          <Typography variant='h5'>+380 67 672 33 22 </Typography>
        </a>
      </Box>
      <Box textAlign='center'>
        <Typography variant='h5'>Авто з Канади:</Typography>
        <a href='tel:+380676701166'>
          <Typography variant='h5'>+380 67 670 11 66 </Typography>
        </a>
        <a href='tel:+380676761166'>
          <Typography variant='h5'>+380 67 676 11 66 </Typography>
        </a>
      </Box>
      <Box textAlign='center' my={2}>
        <Typography variant='h4'>Завiтайте в наш офiс</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
          <iframe
            title='м. Київ вул. Преображенська, 8б'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.9048296466485!2d30.47030211573041!3d50.424244779471714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cec7b4e58fd7%3A0x60ed58f70e0e8e2c!2z0YPQuy4g0J_RgNC10L7QsdGA0LDQttC10L3RgdC60LDRjywgONCRLCDQmtC40LXQsiwgMDMwMzc!5e0!3m2!1sru!2sua!4v1614180506230!5m2!1sru!2sua'
            allowFullScreen={true}
            height='300'
            width='400'
            style={{ border: 0 }}
            loading='lazy'></iframe>
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
          <iframe
            title='вул Зелена, 81 Львiв'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20589.85370155051!2d24.04494528152005!3d49.82870745127849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add5b091f0f25%3A0x67f5db57e7941774!2z0YPQuy4g0JfQtdC70ZHQvdCw0Y8sIDgxLCDQm9GM0LLQvtCyLCDQm9GM0LLQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDc5MDAw!5e0!3m2!1sru!2sua!4v1614180828380!5m2!1sru!2sua'
            allowFullScreen={true}
            style={{ border: 0 }}
            height='300'
            width='400'
            loading='lazy'></iframe>
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
          <iframe
            title='вулиця Шевчена, 107 Дубровиця'
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1042.4660950392574!2d26.566391979303198!3d51.57893515429427!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47262851eac8c5a1%3A0x296948430eb4ffd6!2z0LLRg9C70LjRhtGPINCo0LXQstGH0LXQvdC60LAsIDEwNywg0JTRg9Cx0YDQvtCy0LjRhtGPLCDQoNGW0LLQvdC10L3RgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgMzQxMDA!5e0!3m2!1sru!2sua!4v1614180882781!5m2!1sru!2sua'
            allowFullScreen={true}
            style={{ border: 0 }}
            height='300'
            width='400'
            loading='lazy'></iframe>
        </Grid>
      </Grid>
    </>
  )
}
