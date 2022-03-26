import React from "react";
import styled from "styled-components";

const ProjectInfo = () => {
  return (
    <ProjectInfoWrapper>
      <ProjectInfomation>00개의 렌더샷</ProjectInfomation>
      <TopTitle>갤러리</TopTitle>
      <ProjectFilter>
        <Select>모든 렌더샷</Select>
        <Select>모든 화질</Select>
      </ProjectFilter>
    </ProjectInfoWrapper>
  );
};

export default ProjectInfo;

const ProjectInfoWrapper = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0 12px;
  font-size: 14px;
  color: rgb(153, 153, 153);
`;

const ProjectInfomation = styled.span`
  flex: 1 1 0%;
  margin-right: auto;
  color: rgb(102, 102, 102);
  text-transform: lowercase;
`;

const TopTitle = styled.div`
  text-align: center;
  flex: 1 1 0%;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 56px;
  text-transform: capitalize;
  color: rgb(45, 50, 54);
  user-select: none;
`;

const ProjectFilter = styled.span`
  margin-left: auto;
  text-transform: initial;
  flex: 1 1 0%;
  display: flex;
  justify-content: flex-end;
`;

const Select = styled.div`
  text-align: end;
  margin-left: 8px;
  box-sizing: border-box;
  margin: 0;
  padding: 0 4px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: 'tnum';
  cursor: pointer;
`;
