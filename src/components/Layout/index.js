// components
import Header from '../Header'
import Box from '../Box'

export default function Layout({
  withGutter = true,
  withHeader,
  children,
  ...rest
}) {
  return (
    <>
      {withHeader && <Header />}
      <Box as="main" withGutter={withGutter} {...rest}>
        {children}
      </Box>
    </>
  )
}
