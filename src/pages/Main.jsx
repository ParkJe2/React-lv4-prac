import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getDiaries } from "../redux/modules/diarySlice";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(__getDiaries());
    };

    fetchData();
  }, []);

  const { data, isLoading, isError, error } = useSelector((state) => state.diary);

  if (isLoading) {
    return <h1>아직 로딩중입니다.</h1>;
  }

  if (isError) {
    return <h1>오류가 발생했어요</h1>;
  }
  console.log("data", data);

  const handleDiaryItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <StyledMain>
      {data.map((item, index) => (
        <StyledDiaryBox key={index} onClick={() => handleDiaryItemClick(item.id)}>
          <StyledTitle>Diary {item.title}</StyledTitle>
          <StyledDate>July 7, 2023</StyledDate>
        </StyledDiaryBox>
      ))}

      {/* {[...Array(10)].map((_, index) => (
        <StyledDiaryBox key={index} onClick={handleDiaryItemClick}>
          <StyledTitle>Diary {index + 1}</StyledTitle>
          <StyledDate>July 7, 2023</StyledDate>
        </StyledDiaryBox>
      ))} */}
    </StyledMain>
  );
};

export default Main;

const StyledMain = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 0.5fr));
  grid-gap: 20px;
  padding: 20px;
`;

const StyledDiaryBox = styled.div`
  padding: 20px;
  background-color: #dbe9f6;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
  color: #293241;
`;

const StyledDate = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;
