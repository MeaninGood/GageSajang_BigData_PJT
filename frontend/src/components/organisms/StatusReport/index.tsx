import React, { useEffect, useState } from 'react';
import ReportModal from '../../atoms/ReportModal';
import styled from 'styled-components';
import StatusReportIndex from '../../molecules/StatusReportIndex';
import StatusReportFP from '../../molecules/StatusReportFP';
import StatusReportRP from '../../molecules/StatusReportRP';
import StatusReportSales from '../../molecules/StatusReportSales';
import StatusReportOpen from '../../molecules/StatusReportOpen';
import StatusReportClose from '../../molecules/StatusReportClose';
import StatusReportStores from '../../molecules/StatusReportStores';

interface StatusReportProps {
  region?: string;
  content: any;
  category: string;
  tab: number;
  icon?: any;
  isOpen?: boolean;
  title?: any;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  statusResult: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const StatusReport = ({
  region,
  content,
  category,
  tab,
  icon,
  isOpen,
  setIsOpen,
  statusResult,
  isLoading,
  isSuccess,
  isError,
}: StatusReportProps) => {
  const [title, setTitle] = useState({
    name: content[0].name,
    icon: icon[0],
  });
  useEffect(() => {
    setTitle({
      name: content[tab].name,
      icon: icon[tab],
    });
  }, [tab]);

  return (
    <Wrapper>
      {isSuccess && (
        <ReportModal
          // 상세 페이지, 모달 + close 버튼 //
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <StatusReportIndex
            // 상세페이지 상단 버튼들 //
            region={region}
            content={content}
            category={category}
            tab={tab}
            icon={icon}
          />
          {tab === 0 && (
            <StatusReportFP
              title={title}
              region={region}
              category={category!}
              tab={tab}
              statusResult={statusResult.living}
            />
          )}
          {tab === 1 && (
            <StatusReportRP
              title={title}
              region={region}
              category={category!}
              tab={tab}
              statusResult={statusResult.resident}
            />
          )}
          {tab === 2 && (
            <StatusReportStores
              title={title}
              region={region}
              category={category!}
              tab={tab}
              statusResult={statusResult.store}
            />
          )}
          {tab === 3 && (
            <StatusReportOpen
              title={title}
              region={region}
              category={category!}
              tab={tab}
              statusResult={statusResult.open}
            />
          )}
          {tab === 4 && (
            <StatusReportClose
              title={title}
              region={region}
              category={category!}
              tab={tab}
              statusResult={statusResult.close + statusResult.change}
            />
          )}
          {tab === 5 && (
            <StatusReportSales
              title={title}
              region={region}
              category={category!}
              tab={tab}
              statusResult={statusResult.sales}
            />
          )}
        </ReportModal>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default StatusReport;
