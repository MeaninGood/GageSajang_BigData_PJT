import React, { useEffect } from 'react';
import styled from 'styled-components';
import AnalysisSideBar from '../../organisms/AnalysisSideBar';

declare global {
  interface Window {
    kakao: any;
  }
}

const AnalysisPage = () => {
  useEffect(() => {
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(36.450701, 126.570667), //지도의 중심좌표.
      level: 2, //지도의 레벨(확대, 축소 정도)
    };

    var map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
  }, []);
  return (
    <Wrapper>
      <AnalysisSideBar />
      <div id="map" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & #map {
    width: 100vw;
    height: calc(100vh - 80px);
    background: #595959;
  }
`;

export default AnalysisPage;