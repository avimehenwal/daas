import React, { ReactElement } from 'react'
import {
  Row,
  Button,
  Container,
  Jumbotron,
} from 'react-bootstrap';

interface deafultProps {
  title?: string,
  text: string,
  children?: ReactElement<any>,
}

export const TextBase = (props: deafultProps) => {
  return (
    <header>
      <Container>
        <Row className="center">
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

export const Header = (props: deafultProps) => {
  return (
    <header>
      <TextBase {...props}>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </TextBase>
    </header>
  )
}

export const Footer = () => (
  <footer>
    <TextBase text="Built with love by avi" />
  </footer>
)
