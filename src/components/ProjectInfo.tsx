import React from "react";
import styled from "styled-components";
import Download from '../icons/download';
import Trash from '../icons/trash';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { checkAll, uncheckedAll, deleteAll, downloadAll } from '../redux/itemReducer'

const ProjectInfo = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(state => state.items.items)
  const checkItems = useAppSelector(state => state.items.checkedItems)
  const isAllChecked = useAppSelector(state => state.items.isAllChecked)

  const checkAllItems = () => {
    dispatch(checkAll())
    if (isAllChecked) {
      dispatch(uncheckedAll())
    }
  }

  const onDownloadAll = () => {
    dispatch(downloadAll(Object.keys(checkItems).map(Number)))
  }

  const unCheckAll = () => {
    dispatch(uncheckedAll())
  }

  const onDeleteAll = () => {
    dispatch(deleteAll(Object.keys(checkItems).map(Number)))
    unCheckAll();
  }

  return (
    <ProjectInfoWrapper>
      {Object.keys(checkItems).length > 0 ? 
      <SelectInfo>
        <span>
          {Object.keys(checkItems).length}개의 이미지 선택
        </span>
        <AllChecked type="checkbox" id="selectAll" onClick={checkAllItems}/>
        <label htmlFor='selectAll'>
          모두 선택
        </label>
      </SelectInfo> :
      <ProjectInfomation>
        {data.length}개의 렌더샷
      </ProjectInfomation>
      }
      <TopTitle>갤러리</TopTitle>
      {Object.keys(checkItems).length > 0 ? 
        <RightMenu>
          <DownloadButton onClick={onDownloadAll}>
            <Download />
          </DownloadButton>
          <TrashButton onClick={onDeleteAll}>
            <Trash />
          </TrashButton>
          <Text onClick={unCheckAll}>Deselect</Text>
        </RightMenu> :
          <ProjectFilter>
            <Select>
                <option>All Renderings</option>
                <option>First Person</option>
                <option>Top View</option>
                <option>Panorama</option>
            </Select>
            <Select>           
                <option>All Resolutions</option>
                <option>Standard</option>
                <option>2K</option>
                <option>3K</option>
                <option>4K</option>
            </Select>
          </ProjectFilter>
      }
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
`;

const SelectInfo = styled.span`
  flex: 1 1 0%;
  max-width: 220px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgb(102, 102, 102);
  label {
    margin-left: 3px;
  }
`

const AllChecked = styled.input`
  margin-left: 8px;
`

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

const Select = styled.select`
  text-align: end;
  margin-left: 8px;
  box-sizing: border-box;
  margin: 0 2px;
  padding: 0 4px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: 'tnum';
  cursor: pointer;
`;

const RightMenu = styled.div`
  min-width: 220px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const DownloadButton = styled.button`
  height: 32px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 0 7px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
`

const Text = styled.span`
  font-size: 14px;
  border: 1px solid #ddd;
  padding: 0 7px;
  height: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;
  border-radius: 4px;
`

const TrashButton = styled.button`
  height: 32px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 0 7px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  margin-left: 5px;
`