import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Detail = () => {
  const params = useParams();
  const id = params.id;
  console.log("params", params);
  const { data } = useSelector((state) => state.diary);

  const diary = data.find((item) => item.id == id);

  console.log("diary", diary);

  return (
    <StyledMain>
      <StyledTitle>{diary?.title}</StyledTitle>
      <StyledDate>{diary.createdAt}</StyledDate>
      <StyledMood>Mood: {diary.moodCode}</StyledMood>
      <StyledContent>{diary.body}</StyledContent>
    </StyledMain>
  );
};

export default Detail;

const StyledMain = styled.main`
  flex: 1;
  padding: 20px;
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  font-size: 24px;
  color: #293241;
`;

const StyledDate = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;

const StyledMood = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: #293241;
`;

const StyledContent = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: #293241;
`;
