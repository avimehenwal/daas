import React, { ReactElement } from 'react'
import {
  Row,
  Container,
  Jumbotron,
} from 'react-bootstrap';

interface IdefaultProps {
  title?: string,
  text: string,
  children?: ReactElement<any>,
}

export const TextBase = (props: IdefaultProps) => {
  return (
    <header>
      <Container>
        <Row className="justify-content-md-center center">
          <Jumbotron >
            {(props.title) && <h1>{props.title}</h1>}
            {(props.text) && <p>{props.text}</p>}
            {(props.children) && <p>{props.children}</p>}
          </Jumbotron>
        </Row>
      </Container>
    </header>
  )
}

export const Header = (props: IdefaultProps) => {
  return (
    <header>
      <TextBase {...props} />
    </header>
  )
}

export const Footer = () => (
  <footer>
    <TextBase text="Built with love by avi" />
  </footer>
)
