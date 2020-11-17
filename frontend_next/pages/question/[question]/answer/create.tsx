import { Router, useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import api from "../../../../Services/api";

import React from "react";
import Header from "../../../../components/header";
import { BodyHome } from "../../../../styles/home/style";
import { iQuestion } from "../..";
import { ContentQuestion } from "../../../../styles/question/index";

import dynamic from "next/dynamic";

import { ItemAnswer } from "../../../../styles/question/index";
import { useAuth } from "../../../../context/AuthContext";
import Btn from "../../../../components/button";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const ViewQuestion = () => {
  const [dataQuestion, setDataquestion] = useState<iQuestion>({
    answers: [],
  } as iQuestion);

  const user = useAuth();

  const [data, setData] = useState("");

  const router = useRouter();
  const { question } = router.query;

  const setAnswer = useCallback(async (texto: string) => {
    if (texto === "") return;

    const response = await api.post(`/questions/${question}/answer`, {
      text: texto,
      autor: user.name,
    });

    router.push(`/question/${question}`);
  }, []);

  const getRequestQuestion = useCallback(async () => {
    const questionData = await api.get(`/questions/${question}`);

    if (questionData.status === 200) {
      setDataquestion(questionData.data.questions[0] as iQuestion);
    }
  }, []);

  useEffect(() => {
    getRequestQuestion();
  }, []);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "code-block",
  ];

  return (
    <>
      <Header />
      <BodyHome>
        <ContentQuestion>
          <div>
            <h2>{dataQuestion.titulo}</h2>
            <h5>{dataQuestion.autor}</h5>
            <p>{dataQuestion.answers.length}</p>
          </div>
        </ContentQuestion>

        <ItemAnswer>
          <QuillNoSSRWrapper
            theme="snow"
            readOnly={false}
            modules={modules}
            formats={formats}
            value={data}
            onChange={setData}
            placeholder={"Digite aqui a resolução desse problema"}
            style={{
              marginBottom: "40px",
            }}
          />
          <Btn
            primary
            value="Salvar"
            width="250px"
            onClick={async () => {
              await setAnswer(data);
            }}
          />
        </ItemAnswer>
      </BodyHome>
    </>
  );
};

export default ViewQuestion;