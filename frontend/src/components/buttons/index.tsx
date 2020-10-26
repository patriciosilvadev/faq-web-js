import styled from "styled-components";

const ButtonFaq = styled.button.attrs({ href: "http://debian.org" })`
  height: 55px;
  width: 214px;
  /* left: 1007px;
  top: 363px; */
  border-radius: 27px;
  background: #c20b2e;

  /* margin: 10px 0;
  width: 214px;
  height: 35px;
  border-radius: 10px;
  background: #c20b2e;
  color: #fff; */

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 1s;

  :hover {
    background: #9d0926;
    color: #fff;
  }
`;

export default ButtonFaq;
