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
  const [providers, setProviders] = useState<string[]>([])
  const searchBox = useRef<HTMLInputElement>(null)
  const [currentRegionFilter, setCurrentRegionFilter] = useState<string>('')
  const [currentProviderFilter, setCurrentProviderFilter] = useState<string>('')

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
    setFilter(filter.filter(item => {
      if (pattern.test(item.cloud_description) || pattern.test(item.cloud_name)) {
        return item
      } else {
        return null
      }
    }))
  }

  const filterByRegion = (region: string) => {
    setFilter(results.filter(item => {
      if (item.geo_region === region) {
        return item
      } else { return null }
    }))
    setCurrentRegionFilter(region)
  }

  const filterByProvider = (provider: string) => {
    setFilter(results.filter(item => {
      if (item.cloud_name.split('-')[0] === provider) {
        return item
      } else { return null }
    }))
    setCurrentProviderFilter(provider)
  }

  const clearSearch = () => {
    setCurrentRegionFilter('')
    setCurrentProviderFilter('')
    if (searchBox && searchBox.current) {
      setFilter(results)
      searchBox.current.value = ""
    }
  }

  // only once when component mounts
  useEffect(() => {
    nwCall()
  }, [])

  useEffect(() => {
    // unique region list
    setRegions(results.reduce((accumulator: string[], item) => {
      const key = item.geo_region
      if (accumulator.indexOf(key) === -1) {
        accumulator.push(key)
      }
      return accumulator
    }, []));

    // unique cloud providers
    setProviders(results.reduce((acc: string[], item) => {
      let first = item.cloud_name.split('-')[0]
      if (acc.indexOf(first) === -1) {
        acc.push(first)
      }
      return acc
    }, []))
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
            <Col md={2}>
              <Button onClick={clearSearch} variant="outline-danger">reset all filters</Button>
            </Col>
          </Row>

          <br></br>
          <Row>
            <Col md={6}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                  <Badge variant="primary">{regions.length}</Badge> Filter byRegions: <strong>{currentRegionFilter}</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {regions.map(item => (
                    <Dropdown.Item key={item} onClick={() => filterByRegion(item)}>{item}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col md={6}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                  <Badge variant="primary">{providers.length}</Badge> Filter byCloudProviders: <strong>{currentProviderFilter}</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {providers.map(item => (
                    <Dropdown.Item key={item} onClick={() => filterByProvider(item)}>{item}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

        </Alert>

        {/* <pre>{JSON.stringify(providers, null, 4)}</pre> */}

        <Container fluid={true}>
          <Row noGutters={false}>
            {filter.map((item) => (
              <DataCard key={item.cloud_name} {...item} />
            ))}
          </Row>
        </Container>

      </main>
    </Container >
  )
}
