import React, { lazy, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { greenTheme, blueTheme, purpleTheme } from './styles/theme';
import Layout from './layout/Layout';
import LoadingPage from './components/pages/LoadingPage';
import { DefaultTheme } from 'styled-components';

// Home
const Home = lazy(() => import('./components/pages/IndexPage'));
// Status
const StatusPage = lazy(() => import('./components/pages/status/StatusPage'));
// Professional
const ProfessionalPage = lazy(
  () => import('./components/pages/professional/ProfessionalPage')
);
const ProfessionalStorePage = lazy(
  () => import('./components/pages/professional/ProfessionalStorePage')
);
// Amatuer
const AmatuerPage = lazy(
  () => import('./components/pages/amatuer/AmatuerPage')
);
const AmatuerAnalysisPage = lazy(
  () => import('./components/pages/amatuer/AmatuerAnalysisPage')
);
const AmatuerResultPage = lazy(
  () => import('./components/pages/amatuer/AmatuerResultPage')
);
// User
const LoginPage = lazy(() => import('./components/pages/user/LoginPage'));
const RegisterPage = lazy(() => import('./components/pages/user/RegisterPage'));
const MyPage = lazy(() => import('../src/components/pages/user/MyPage'));

function App() {
  return (
    <Wrapper>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
          <Routes>
            {/* 기본 테마 */}
            <Route path="" element={<CustomThemeProvider theme={greenTheme} />}>
              <Route path="" element={<Home />} />
              <Route path="loading" element={<LoadingPage />} />
              <Route path="user">
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="mypage" element={<MyPage page="mypage" />} />
                <Route path="mystore" element={<MyPage page="mystore" />} />
                <Route path="myarea" element={<MyPage page="myarea" />} />
                {/* <Route path="mypage/:tab" element={<MyPage />} /> */}
              </Route>
            </Route>
            {/* 상권 현황 */}
            <Route
              path="status"
              element={<CustomThemeProvider theme={blueTheme} />}
            >
              <Route path="" element={<StatusPage />} />
            </Route>
            {/* 이미 사장 */}
            <Route
              path="professional"
              element={<CustomThemeProvider theme={greenTheme} />}
            >
              <Route path="" element={<ProfessionalPage />} />
              <Route path="" element={<LoginRequired />}>
                <Route path="store" element={<ProfessionalStorePage />} />
              </Route>
            </Route>
            {/* 아마 사장 */}
            <Route
              path="amatuer"
              element={<CustomThemeProvider theme={purpleTheme} />}
            >
              <Route path="" element={<AmatuerPage />} />
              <Route path="analysis" element={<AmatuerAnalysisPage />} />
              <Route path="result" element={<AmatuerResultPage />} />
            </Route>
          </Routes>
        </Router>
      </ErrorBoundary>
    </Wrapper>
  );
}

interface CustomThemeProviderProps {
  theme: DefaultTheme;
}

export const CustomThemeProvider = ({ theme }: CustomThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  background-image: url('/assets/img/bg-hero-tiles.png');
  background-size: 100%;
  background-position-y: -30%;
  background-position-x: center;
  background-size: 2560px 1836px;
`;

const LoginRequired = () => {
  const user = sessionStorage.getItem('email');
  const location = useLocation();
  if (!user) {
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const ErrorFallback = ({ error }: any) => {
  useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (error?.message && chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }, [error]);
  return <div>{/* <h1>An error occurred: {error?.message}</h1> */}</div>;
};

export default App;
