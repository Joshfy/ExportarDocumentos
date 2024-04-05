import styled from '@emotion/styled';
import { Citas } from './components/Citas/Citas';
// import { Ventas } from './components/page/Ventas';
function App() {

  return (
    <>
    <Content>
       <Citas/>
    {/* <Ventas/> */}
    </Content>

    </>
  )
}
const Content = styled.div`
background-color: #e8e7e7;
width: 100%;
height: 100vh;
margin-top: 80px;
`;
export default App
