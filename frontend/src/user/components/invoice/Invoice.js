import React, { Component } from 'react'
import { Col, Container, Row } from 'shards-react'

class Invoice extends Component {
    render() {
        return (
            <Container className="br bt bl bb mt-2 p-3">
                <Row className="bb">
                    <Col sm="6" className="">
                        <p className="mt-5 mr-3">TRISOLAR</p> 
                    </Col>
                    <Col sm="6" className="bl">
                        <p>Tenant Name</p>
                        <p>Tenary  No</p>
                        <p>Address</p>
                        <p>Contact</p> 
                    </Col>
                </Row>
                <Row>
                    <Col sm="8">
                            <p>Description</p>
                            <p>Solar Consumption Charges
                                (100 Kw * 5.00)
                            </p>
                            <p>
                                Other Charges
                            </p>
                    </Col>
                    <Col sm="4" className="bb bl">
                        <p className="mt-5">
                            5000.00 Rupee
                        </p>

                        <p>
                            Nil 
                        </p>
                    </Col >
                </Row>
                <Row className="bb p-0">
                    <Col sm="8">
                        <p>
                            Subtotal
                        </p>
                        <p>
                            Sales Tax 35%
                        </p>
                        <p>
                            Net
                        </p>
                    </Col >
                    <Col sm="4" className="bl p-0 ">
                        <p className="bb  p-1">
                            5000.00
                        </p>
                        <p className="bb">
                            1750.00
                        </p>
                        <p >
                            6750.00 
                        </p>
                    </Col>
                </Row>
                <Row >
                    <p> Signature</p>
                </Row>
            </Container>
        )
    }
}

export default Invoice
