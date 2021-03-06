import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
// helpers
import { tumble } from '../BaseStyles/keyframes'
// svg
import Egg from '../../assets/svg/egg.svg'

const ImageWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ width }) =>
    css`
      width: ${width ? `${width}px` : '100%'};
    `}

  ${({ height }) =>
    css`
      height: ${height ? `${height}px` : 'auto'};
    `}
`

const Image = styled(motion.img)`
  will-change: opacity;
  // adjust to wrapper
  ${({ height }) =>
    css`
      width: ${height ? `auto` : '100%'};
      height: ${height ? `${height}px` : 'auto'};
      min-height: ${height ? `${height}px` : 'auto'};
    `}

  ${({ pixelated }) =>
    pixelated &&
    css`
      image-rendering: pixelated;
    `}
`

const Placeholder = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  width: 100%;
  height: 100%;
`

const EggIcon = styled(Egg)`
  animation: ${tumble} 5s ease-in-out 0s infinite;
  ${({ height }) =>
    css`
      height: ${height ? `${height}px` : 'auto'};
    `}
  // width relative to container
  ${({ placeholderwidth }) =>
    css`
      width: ${placeholderwidth ? `${placeholderwidth}` : 'auto'};
    `}
`

export { ImageWrapper, Image, Placeholder, EggIcon }
