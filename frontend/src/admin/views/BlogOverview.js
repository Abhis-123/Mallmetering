import React from "react";
import { Container, Row} from "shards-react";
import ListConnections from "../components/dashboard/ListConnections";

import UserStats from "../components/stats/UserStats";
class BlogOverview extends React.Component {
  render() {
    return (
      <Container fluid className="main-content-container pt-4">
        {/* Page Header */}
        <Row noGutters className="pt-3 mb-1 ">
         <UserStats />
        </Row>
        <Row>
          <ListConnections/>
        </Row>
      </Container>
    );
  }
}

export default BlogOverview;
