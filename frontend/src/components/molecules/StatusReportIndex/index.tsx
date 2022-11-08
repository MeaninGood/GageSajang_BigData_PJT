import React from 'react';
import styled from 'styled-components';
import ReportIndexItem from '../../atoms/ReportIndexItem';
import ReportRegionLabel from '../../atoms/ReportRegionLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface StatusReportIndexProps {
  region?: string;
  content: any;
  category: string;
  tab?: number;
  icon?: any;
}

const StatusReportIndex = ({
  region,
  content,
  category,
  tab,
  icon,
}: StatusReportIndexProps) => {
  return (
    <Wrapper>
      <ReportRegionLabel>
        <div className="region-label-div">
          <span className="region-label">{region}</span>
          <span className="label-category">
            {category === 'sub' ? '상권 배후지' : '상권'}
          </span>
        </div>
      </ReportRegionLabel>
      <div className="label-div">
        {content.map((e: any, i: number) => {
          return (
            <ReportIndexItem
              onClick={e.onClick}
              active={tab === i + 1}
              style={{ padding: '10px', marginRight: '0.5rem' }}
              icon={icon[i]}
            >
              {e.name}
            </ReportIndexItem>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 15px 5rem 15px 1.5rem;
  width: 90%;
  height: 30px;
  border-bottom: 1px solid darkgray;
  align-items: center;
  justify-content: space-between;

  & .region-label-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    & .region-label {
      color: ${({ theme }) => theme.darkColor};
      font-weight: 700;
      text-justify: center;
      width: 5rem;
      text-align: center;
    }

    & .label-category {
      width: 7rem;
    }
  }
`;

export default StatusReportIndex;
