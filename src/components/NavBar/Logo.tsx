import * as React from "react"
import {
  chakra,
  // keyframes,
  ImageProps,
  forwardRef,
  Image,
  // usePrefersReducedMotion,
} from "@chakra-ui/react"
import logo from "../../assets/logo.svg"

/*
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
  `
*/

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  /* const prefersReducedMotion = usePrefersReducedMotion() */

  /* const animation = prefersReducedMotion
  *  ? undefined
  *  : `${spin} infinite 20s linear` 

  *return <chakra.img animation={animation} src={logo} ref={ref} {...props} /> */
  return <>
    <chakra.img src={logo} ref={ref} {...props} bg="cyan.300" rounded='full' ml={5} h={9} p={1.5}/>
  </>
})
