import { useMemo } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import {
  professionalResult,
  professionalCount,
  professionalJob,
  professionalLife,
  professionalResident,
  professionalSales,
} from '../api/professional';
import {
  ProfessionalResultParams,
  ProfessionalSimulationParams,
} from '../models/professional';

export const useProfessionalResult = (
  proResultParams: ProfessionalResultParams
) => {
  const { email, dongName, industryName } = proResultParams;
  return useQuery({
    queryKey: ['professional', 'result', email, dongName, industryName],
    queryFn: () => professionalResult(proResultParams),
    cacheTime: 0,
  });
};

const gradColor = [
  [
    [0, '#F2ED5F'],
    [1, '#74F991'],
  ],
];

// 분석 결과 (화면 상단)
export const useProfessionalData = (
  storeInfo: ProfessionalResultParams,
  result: any
) => {
  // 가게 면적
  const areaData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ['내 가게 면적', '평균 가게 면적'],
        datasets: [
          {
            label: ['가게 면적(㎡)'],
            data: [storeInfo.area, result.store.area],
            barThickness: 70,
          },
        ],
      },
      options: {
        indexAxis: 'y',
      },
      grad: gradColor,
    }),
    [result]
  );
  const salesData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ['내 월 매출', '평균 월 매출'],
        datasets: [
          {
            label: ['월 매출(만 원)'],
            data: [
              Math.round(storeInfo.sales / 30000),
              Math.round(result.sales.sales / 30000),
            ],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            barThickness: 70,
          },
        ],
      },
      grad: gradColor,
    }),
    [result]
  );
  const clerkData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ['내 가게 직원 수', '평균 직원 수'],
        datasets: [
          {
            label: ['직원 수(명)'],
            data: [storeInfo.clerk, result.store.clerk],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            barThickness: 70,
          },
        ],
      },
      grad: gradColor,
    }),
    [result]
  );
  const frData = useMemo(
    () => ({
      type: 'doughnut',
      data: {
        labels: ['총 점포 수', '프랜차이즈 수'],
        datasets: [
          {
            data: [
              Math.ceil(result.store.total),
              parseInt(result.store.franchise),
            ],
            backgroundColor: ['#edf3f1', 'rgb(255, 205, 86)'],
            hoverOffset: 5,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: '총 점포 수 및 프랜차이즈 점포 수(개소)',
          },
        },
      },
      grad: [
        [[0, '#edf3f1']],
        [
          [1, '#49D0A8'],
          [0.7, '#F9F254'],
        ],
      ],
    }),
    [result]
  );
  const ocData = useMemo(
    () => ({
      type: 'doughnut',
      data: {
        labels: ['총 점포 수', '개업 점포 수', '폐업 점포 수'],
        datasets: [
          {
            data: [
              Math.ceil(result.store.total),
              parseInt(result.status.open),
              parseInt(result.status.close),
            ],
            backgroundColor: [
              '#edf3f1',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 5,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: '총 점포 수 및 개폐업 점포 수(개소)',
          },
        },
      },
    }),
    [result]
  );

  return { areaData, salesData, clerkData, frData, ocData };
};

export const useProfessionalSimulationData = (
  params: ProfessionalSimulationParams
) => {
  // professionalCount,
  // professionalJob,
  // professionalLife,
  // professionalResident,
  // professionalSales,
  const { dongName, industryName, year, quarter, value } = params;
  const response = useQueries({
    queries: [
      {
        queryKey: [
          'professional',
          'sales',
          dongName,
          industryName,
          `${year}-${quarter}`,
          `${value}`,
        ],
        queryFn: () => professionalSales(params),
      },
      {
        queryKey: [
          'professional',
          'life',
          dongName,
          industryName,
          `${year}-${quarter}`,
          `${value}`,
        ],
        queryFn: () => professionalLife(params),
      },
      {
        queryKey: [
          'professional',
          'resident',
          dongName,
          industryName,
          `${year}-${quarter}`,
          `${value}`,
        ],
        queryFn: () => professionalResident(params),
      },
      {
        queryKey: [
          'professional',
          'job',
          dongName,
          industryName,
          `${year}-${quarter}`,
          `${value}`,
        ],
        queryFn: () => professionalJob(params),
      },
      {
        queryKey: [
          'professional',
          'count',
          dongName,
          industryName,
          `${year}-${quarter}`,
          `${value}`,
        ],
        queryFn: () => professionalCount(params),
      },
    ],
  });
  const data = useMemo(
    () => ({
      sales: response[0].data,
      life: response[1].data,
      resident: response[2].data,
      job: response[3].data,
      count: response[4].data,
    }),
    [response]
  );
  const isSuccess = useMemo(
    () => response.every((e) => e.isSuccess),
    [response]
  );
  const isLoading = useMemo(
    () => response.some((e) => e.isLoading),
    [response]
  );
  const isError = useMemo(() => response.some((e) => e.isError), [response]);

  return { data, isSuccess, isLoading, isError };
};
