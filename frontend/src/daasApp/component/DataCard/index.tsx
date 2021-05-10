import React from 'react'
import Card from 'react-bootstrap/Card'
import { ICloudItem } from '../../apis'

export const DataCard = (props: ICloudItem) => {
  return (
    <Card key={props.cloud_name} border="dark" style={{ width: "50%" }}>
      <Card.Body>
        <Card.Title>{props.cloud_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.geo_region}</Card.Subtitle>
        <Card.Text>{props.cloud_description}</Card.Text>
        <Card.Text>Lattitide={props.geo_latitude} <br></br>Longitude={props.geo_longitude}</Card.Text>
      </Card.Body>
    </Card >
  )
}
