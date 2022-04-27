import styled from "styled-components"

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`
// announcements banner to show some important announcements in the web app
const Announcement = () => {
  //announcement message in the container component
  return <Container>Super Deal! Free Shipping on Orders Over Rs. 500</Container>
}

export default Announcement
