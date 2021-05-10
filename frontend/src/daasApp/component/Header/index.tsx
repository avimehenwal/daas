import React, { ReactElement } from 'react'
import {
  Row, Col,
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
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Jumbotron >
              {(props.title) && <h1>{props.title}</h1>}
              {(props.text) && <p>{props.text}</p>}
              {(props.children) && <p>{props.children}</p>}
            </Jumbotron>
          </Col>
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
    <br></br>
    <TextBase text="Made with love using react by avi" />
  </footer>
)
