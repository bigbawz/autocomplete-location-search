import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card } from 'react-bootstrap';

function SearchResults({ selectedCity }) {

    if (!selectedCity) {
        return null; // Nothing will be rendered if no city is selected
    };

    return (
        <Container>
            <Card className="mt-3 shadown-sm">
                <Card.Body>
                    <Card.Title>
                        { selectedCity.name }
                    </Card.Title>

                    <Card.Text>
                        <strong>Latitude:</strong> { selectedCity.lat } <br />
                        <strong>Longitude:</strong> { selectedCity.long }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SearchResults
