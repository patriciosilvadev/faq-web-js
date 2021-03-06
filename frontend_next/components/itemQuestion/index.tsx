import { Container, DivFlexRow, Content } from "./style";
import QtdAcesso from "../qtdAcesso/index";
import Link from "next/link";

interface Question {
  qtdAcesso: string;
  qtdRespostas: number;
  url: string;
  titulo: string;
  autor: string;
  autor_id: string;
  id: string;
}

const ItemQuestion = (props: Question) => {
  return (
    <Container>
      <div>
        <QtdAcesso qtd={props.qtdAcesso} />
        <Content>
          <div>
            <Link href={props.url}>
              <h2>{props.titulo}</h2>
            </Link>
          </div>
          <DivFlexRow>
            <p>
              <span>{props.qtdRespostas}</span>
              {props.qtdRespostas > 1 ? ` respostas` : ` resposta`}
            </p>
            <p>
              Autor: <span>{props.autor}</span>
            </p>
          </DivFlexRow>
        </Content>
      </div>
      <div></div>
    </Container>
  );
};

export default ItemQuestion;
