import React, { useState, useEffect, useRef } from 'react'
import { getClouds, ICloudItem } from '../../apis'
import { DataCard } from '../DataCard'
import {
  Row,
  Col,
  Button,
  Container,
  Badge,
  Alert,
  Dropdown,
} from 'react-bootstrap';


export const Main = () => {
  const [results, setResults] = useState<ICloudItem[]>([])
  const [filter, setFilter] = useState<ICloudItem[]>(results)
  const [regions, setRegions] = useState<string[]>([])
  const searchBox = useRef<HTMLInputElement>(null)
  const [currentRegionFilter, setCurrentRegionFilter] = useState<string>('')

  const nwCall = async () => {
    const results = await getClouds()
    setResults(results)
    setFilter(results)
  }

  // full text search
  const filterResults: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchTerm = e.target.value
    const pattern = new RegExp(searchTerm, 'i');
    // console.log(searchTerm)
    setFilter(results.filter(item => {
      if (pattern.test(item.cloud_description) || pattern.test(item.cloud_name)) {
        return item
      } else {
        return null
      }
    }))
  }

  const filterByRegion = (region: string) => {
    // console.log(region);
    setFilter(results.filter(item => {
      if (item.geo_region == region) {
        return item
      } else { return null }
    }))
    setCurrentRegionFilter(region)
  }

  const clearSearch = () => {
    setCurrentRegionFilter('')
    if (searchBox && searchBox.current) {
      setFilter(results)
      searchBox.current.value = ""
    }
  }

  useEffect(() => {
    nwCall()
  }, [])

  // unique region list
  useEffect(() => {
    setRegions(results.reduce((accumulator: string[], item) => {
      const key = item.geo_region
      if (accumulator.indexOf(key) === -1) {
        accumulator.push(key)
      }
      return accumulator
    }, []));
  }, [results])

  return (
    <Container>
      <main>

        <Alert variant="secondary">
          Number of results: <Badge variant="primary">{filter.length}</Badge>


          <br /><br></br>
          <Row>
            <Col md={10}>
              <input
                ref={searchBox}
                type="search"
                className="search"
                name="filter"
                placeholder="search"
                onChange={filterResults}
              />
            </Col>
            <Col md={1}>
              <Button onClick={clearSearch} variant="outline-primary">clear</Button>
            </Col>

          </Row>

          <br></br>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">
              <Badge variant="primary">{regions.length}</Badge> Filter byRegions: <strong>{currentRegionFilter}</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {regions.map(item => (
                <Dropdown.Item key={item} onClick={() => filterByRegion(item)}>{item}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Alert>


        {/* <pre>{JSON.stringify(regions, null, 4)}</pre> */}

        {filter.map((item) => (
          <DataCard key={item.cloud_name} {...item} />
        ))}

      </main>
    </Container >
  )
}
