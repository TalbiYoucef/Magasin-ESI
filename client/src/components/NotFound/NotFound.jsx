import React from 'react'
import styled from 'styled-components';
import{Link} from 'react-router-dom'

const Container = styled.div`
display : flex;
flex-direction :column;
align-items : center;
justify-content : center;
`
const H1 = styled.h1`
color : #FA9E15;
font-size :4em;
`
function NotFound() {
  return (
    <Container>
      <H1>404</H1>
      <h2>Page not found</h2>
      <Link to="/dashboard">
        <h3>Back to home</h3>
      </Link>
    </Container>
  )
}

export default NotFound
