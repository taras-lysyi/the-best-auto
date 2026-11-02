import Skeleton from '@material-ui/lab/Skeleton'
export const SkeletonLoader = () => {
  return (
    <>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation='wave' />
    </>
  )
}
