import React from "react";
import { Container } from "semantic-ui-react";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import AdminContainer from "../Components/Admin/Containers/AdminContainer";

const AdminView = () => (
  <Container>
    <FaresoneMenu />
    <h1>Admin</h1>
    <AdminContainer />
  </Container>
);
export default AdminView;
