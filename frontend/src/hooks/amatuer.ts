import { useMemo } from 'react';
import { useQuery, useQueryClient, useQueries } from '@tanstack/react-query';
import {
  getAmatuerResult,
  amatuerSales,
  amatuerLife,
  amatuerResident,
  amatuerJob,
  amatuerCount,
} from '../api/amatuer';
import {
  AmatuerResultParams,
  AmatuerSimulationParams,
} from '../models/amatuer';

export const useAmatuerResult = (params: AmatuerResultParams) =>
  useQuery({
    queryKey: ['amatuer', 'result', params.admCd, params.jobCode],
    queryFn: () => getAmatuerResult(params),
  });

export const usePrefetchAmatuerResult = async (params: AmatuerResultParams) => {
  const queryClient = useQueryClient();
  const data = await queryClient.prefetchQuery({
    queryKey: ['amatuer', 'result', params.admCd, params.jobCode],
    queryFn: () => getAmatuerResult(params),
  });

  return data;
};

export const useAmatuerSimulation = (params: AmatuerSimulationParams) => {
  const { dongName, industryName } = params;
  const response = useQueries({
    queries: [
      {
        queryKey: ['amatuer', 'sales', dongName, industryName],
        queryFn: () => amatuerSales(params),
      },
      {
        queryKey: ['amatuer', 'life', dongName, industryName],
        queryFn: () => amatuerLife(params),
      },
      {
        queryKey: ['amatuer', 'resident', dongName, industryName],
        queryFn: () => amatuerResident(params),
      },
      {
        queryKey: ['amatuer', 'job', dongName, industryName],
        queryFn: () => amatuerJob(params),
      },
      {
        queryKey: ['amatuer', 'count', dongName, industryName],
        queryFn: () => amatuerCount(params),
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

// ???????????? ?????????
export const timeLabels = [
  '0~6???',
  '6~11???',
  '11~14???',
  '14~17???',
  '17~21???',
  '21~24???',
];
export const weekLabels = ['???', '???', '???', '???', '???', '???', '???'];
const genderLabels = ['??????', '??????'];
const ageLabels = ['10???', '20???', '30???', '40???', '50???', '60??? ??????'];
const yearLabels = [2017, 2018, 2019, 2020, 2021];
const storeCntLabels = [
  '2020??? 1??????',
  '2020??? 2??????',
  '2020??? 3??????',
  '2020??? 4??????',
  '2021??? 1??????',
  '2021??? 2??????',
  '2021??? 3??????',
  '2021??? 4??????',
];

const simulLabels = [
  '2022??? 4??????',
  '2023??? 1??????',
  '2023??? 2??????',
  '2023??? 3??????',
  '2023??? 4??????',
];

export const genderGrad = [
  [
    [0, '#B6ACF1'],
    [1, '#27CFFB'],
  ],
  [
    [0, '#F3B79B'],
    [1, '#F872D4'],
  ],
];

const weekGrad = [
  [
    [0, '#23CFFA'],
    [0.25, '#A9B6F6'],
    [0.5, '#C2A0EB'],
    [0.75, '#D98CE1'],
    [1, '#FC6DD1'],
  ],
];

const timeGrad = [
  [
    [0, '#B29AF860'],
    [1, '#B29AF8d9'],
  ],
];

// default Value
const genderDefault = [0, 0];
const timeDefault = [0, 0, 0, 0, 0, 0];
const ageDefault = [0, 0, 0, 0, 0, 0];
const weekDefault = [0, 0, 0, 0, 0, 0, 0];
const quarterDefault = [0, 0, 0, 0];
const cntDefault = [0, 0, 0, 0, 0, 0, 0, 0];
const yearDefault = [0, 0, 0, 0, 0];

/* ?????? ?????? */
export const useStoreData = (amatuerResult: any) => {
  // ?????? ??? ?????? ??? (2021.4??????, 2020.4??????)
  const storeCntData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ['2020???', '2021???'],
        datasets: [
          {
            label: '?????? ?????? ?????? ???(??????)',
            data: amatuerResult
              ? [amatuerResult.store.yearAgo, amatuerResult.store.total]
              : [0, 0],
            barThickness: 70,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#B6ACF1c0'],
          [1, '#27CFFBc0'],
        ],
        [
          [0, '#B6ACF1'],
          [1, '#27CFFB'],
        ],
      ],
    }),
    [amatuerResult]
  );

  // ?????? ??? ????????? ?????? ??????(2021.4??????)
  const storeGenderData = useMemo(
    () => ({
      type: 'pie',
      data: {
        labels: genderLabels.map((e: string) => `${e}(%)`),
        datasets: [
          {
            label: '??????',
            barThickness: 70,
            data: amatuerResult ? amatuerResult.store.gender : genderDefault,
            datalabels: {
              // ??????????????? ??????
              color: 'white',
            },
          },
        ],
      },
      grad: genderGrad,
    }),
    [amatuerResult]
  );

  // ????????? ?????? ???????????? ?????? ????????? ??????(2021.4??????)
  const storeAgeData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ageLabels,
        datasets: [
          {
            label: '?????? ??????',
            data: amatuerResult ? amatuerResult.store.age : ageDefault,
            barThickness: 30,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          [0.8, '#714BF4'],
          [1, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  return { storeCntData, storeGenderData, storeAgeData };
};

/* ?????? ?????? - 2021??? ????????? (?????? : ??????) */
export const useSalesData = (amatuerResult: any) => {
  // 5??? ??? ?????? ??????
  const salesTotalData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: yearLabels,
        datasets: [
          {
            label: '??? ??????(??? ???)',
            data: amatuerResult
              ? amatuerResult.sales.total.map((e: number) =>
                  Math.round(e / 10000)
                )
              : ageDefault,
            borderColor: '#B29AF8',
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: [[[0, '#B29AF8']]],
    }),
    [amatuerResult]
  );

  // ?????? Top3 ??????
  const salesAreaTop3Data = useMemo(
    () => (amatuerResult ? amatuerResult.sales.top3 : ['', '', '']),
    [amatuerResult]
  );

  // ?????? ??????
  const salesWeekData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: weekLabels,
        datasets: [
          {
            label: '????????? ??????(??? ???)',
            data: amatuerResult
              ? amatuerResult.sales.week.map((e: number) =>
                  Math.round(e / 10000)
                )
              : weekDefault,
            barThickness: 30,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: weekGrad,
    }),
    [amatuerResult]
  );

  // ???????????? ??????
  const salesTimeData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: '???????????? ??????(??? ???)',
            data: amatuerResult
              ? amatuerResult.sales.time.map((e: number) =>
                  Math.round(e / 10000)
                )
              : timeDefault,
            borderColor: '#B29AF8',
            backgroundColor: '#B29AF8',
            borderWidth: 2,
            fill: true,
            datalabels: {
              color: 'transparent',
            },
            tension: 0.5,
          },
        ],
      },
      grad: timeGrad,
    }),
    [amatuerResult]
  );

  // ????????? ??????
  const salesAgeData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ageLabels,
        datasets: [
          {
            label: '???????????? ??????(??? ???)',
            data: amatuerResult
              ? amatuerResult.sales.age.map((e: number) =>
                  Math.round(e / 10000)
                )
              : ageDefault,
            barThickness: 30,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          [0.8, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  // ?????? ??????
  const salesGenderData = useMemo(
    () => ({
      type: 'pie',
      data: {
        labels: genderLabels.map((e: string) => `${e}(??? ???)`),
        datasets: [
          {
            label: '??????',
            barThickness: 70,
            data: amatuerResult
              ? amatuerResult.sales.gender.map((e: number) =>
                  Math.round(e / 10000)
                )
              : genderDefault,
            datalabels: {
              // ??????????????? ??????
              color: 'white',
            },
          },
        ],
      },
      grad: genderGrad,
    }),
    [amatuerResult]
  );

  return {
    salesTotalData,
    salesAreaTop3Data,
    salesWeekData,
    salesTimeData,
    salesAgeData,
    salesGenderData,
  };
};

/* ?????? ?????? */
export const useLivingData = (amatuerResult: any) => {
  // ??? ?????? 5??? ??? ???????????? ??????
  const livingTotalData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: yearLabels,
        datasets: [
          {
            label: '??? ???????????? ??????(??? ???)',
            data: amatuerResult
              ? amatuerResult.living.total.map((e: number) =>
                  Math.round(e / 10000)
                )
              : [0, 0, 0, 0, 0],
            borderColor: '#B29AF8',
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: [[[0, '#B29AF8']]],
    }),
    [amatuerResult]
  );

  // ??? ?????? ???????????? top3 ??????
  const livingAreaTop3Data = useMemo(
    () => (amatuerResult ? amatuerResult.living.top3 : ['', '', '']),
    [amatuerResult]
  );

  // ??? ?????? ?????? ????????????
  const livingWeekData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: weekLabels,
        datasets: [
          {
            label: '????????? ????????????(??? ???)',
            data: amatuerResult
              ? amatuerResult.living.week.map((e: number) =>
                  Math.round(e / 10000)
                )
              : weekDefault,
            barThickness: 40,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: weekGrad,
    }),
    [amatuerResult]
  );

  // ??? ?????? ???????????? ????????????
  const livingTimeData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: '???????????? ????????????(??? ???)',
            data: amatuerResult
              ? amatuerResult.living.time.map((e: number) =>
                  Math.round(e / 10000)
                )
              : timeDefault,
            borderColor: '#B29AF8',
            backgroundColor: '#B29AF8',
            borderWidth: 2,
            fill: true,
            datalabels: {
              color: 'transparent',
            },
            tension: 0.5,
          },
        ],
      },
      grad: timeGrad,
    }),
    [amatuerResult]
  );

  // ??? ?????? ???????????? ????????????
  const livingAgeData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ageLabels,
        datasets: [
          {
            label: '???????????? ????????????(??? ???)',
            data: amatuerResult
              ? amatuerResult.living.age.map((e: number) =>
                  Math.round(e / 10000)
                )
              : ageDefault,
            barThickness: 30,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          [0.8, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  // ??? ?????? ?????? ????????????
  const livingGenderData = useMemo(
    () => ({
      type: 'pie',
      data: {
        labels: genderLabels.map((e: string) => `${e}(??? ???)`),
        datasets: [
          {
            barThickness: 70,
            data: amatuerResult
              ? amatuerResult.living.gender.map((e: number) =>
                  Math.round(e / 10000)
                )
              : genderDefault,
            datalabels: {
              // ??????????????? ??????
              color: 'white',
            },
          },
        ],
      },
      grad: genderGrad,
    }),
    [amatuerResult]
  );

  return {
    livingTotalData,
    livingAreaTop3Data,
    livingWeekData,
    livingTimeData,
    livingAgeData,
    livingGenderData,
  };
};

/* ?????? ??? */
export const useStoreCntData = (amatuerResult: any) => {
  const storeCntOpenData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: storeCntLabels,
        datasets: [
          {
            label: '?????? ??????(??????)',
            data: amatuerResult ? amatuerResult.open.open : cntDefault,
            barThickness: 40,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#B6ACF1'],
          [1, '#27CFFB'],
        ],
      ],
      options: {
        legend: {
          display: false,
        },
      },
    }),
    [amatuerResult]
  );

  const storeCntOpenRateData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: storeCntLabels,
        datasets: [
          {
            label: '?????????(%)',
            data: amatuerResult ? amatuerResult.open.open : cntDefault,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
            borderColor: '#27CFFB',
          },
        ],
      },
      grad: [[[0, '#27CFFB']]],
    }),
    [amatuerResult]
  );

  const storeCntCloseData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: storeCntLabels,
        datasets: [
          {
            label: '?????? ??????(??????)',
            data: amatuerResult ? amatuerResult.close.close : cntDefault,
            barThickness: 40,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#ECA6DD'],
          [1, '#FE5D84'],
        ],
      ],
    }),
    [amatuerResult]
  );

  const storeCntCloseRateData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: storeCntLabels,
        datasets: [
          {
            label: '?????????( %)',
            barThickness: 70,
            data: amatuerResult ? amatuerResult.close.rate : cntDefault,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
            // backgroundColor: '#FE5D84',
            borderColor: '#FE5D84',
          },
        ],
      },
      grad: [[[0, '#FE5D84']]],
    }),
    [amatuerResult]
  );

  return {
    storeCntOpenData,
    storeCntCloseData,
    storeCntOpenRateData,
    storeCntCloseRateData,
  };
};

/* ?????? ????????? */
export const useHinterlandData = (amatuerResult: any) => {
  const hinterlandPeopleData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ['?????? ??????', '?????? ??????', '?????? ??????'],
        datasets: [
          {
            label: '?????? ????????? ??????(??? ???)',
            data: amatuerResult
              ? [
                  Math.round(amatuerResult.hinterland.living / 10000),
                  Math.round(amatuerResult.hinterland.work / 10000),
                  Math.round(amatuerResult.hinterland.resident / 10000),
                ]
              : [0, 0, 0],
            barThickness: 30,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          [0.8, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  const hinterlandAgeData = useMemo(
    () => ({
      type: 'bar',
      data: {
        labels: ageLabels,
        datasets: [
          {
            label: '???????????? ??????(???)',
            data: amatuerResult ? amatuerResult.hinterland.age : ageDefault,
            barThickness: 30,
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
          },
        ],
      },
      grad: [
        [
          [0, '#A82BEC'],
          [0.8, '#545BF9'],
        ],
      ],
    }),
    [amatuerResult]
  );

  const hinterlandGenderData = useMemo(
    () => ({
      type: 'pie',
      data: {
        labels: genderLabels.map((e: string) => `${e}(???)`),
        datasets: [
          {
            barThickness: 70,
            data: amatuerResult
              ? amatuerResult.hinterland.gender
              : genderDefault,
            datalabels: {
              // ??????????????? ??????
              color: 'white',
            },
          },
        ],
      },
      grad: genderGrad,
    }),
    [amatuerResult]
  );

  return { hinterlandPeopleData, hinterlandAgeData, hinterlandGenderData };
};

export const useRiskData = (amatuerResult: any) => {
  const riskData = useMemo(
    () =>
      amatuerResult
        ? { risk: amatuerResult.risk, riskRate: amatuerResult.riskRate }
        : { risk: 1, riskRate: 0 },
    [amatuerResult]
  );

  return { riskData };
};

// ??????????????? ?????????
export const useAmatuerSimulationData = (amatuerSimulation: any) => {
  const amaSimulSalesData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: simulLabels,
        datasets: [
          {
            label: '??????(??? ???)',
            data: amatuerSimulation?.sales
              ? amatuerSimulation.sales.map((e: any) =>
                  Math.round(e.value / 10000)
                )
              : [0, 0, 0, 0, 0],
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
            fill: true,
            borderColor: ['#B29AF8a0'],
            tension: 0.5,
          },
        ],
      },
      // grad: timeGrad,
      grad: [
        [
          [0, '#ff000000'],
          [0.26, '#ff000000'],
          [0.26, '#B29AF830'],
          [1, '#B29AF8a0'],
        ],
      ],
    }),
    [amatuerSimulation]
  );
  const amaSimulLifeData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: simulLabels,
        datasets: [
          {
            label: '????????????(??? ???)',
            data: amatuerSimulation?.life
              ? amatuerSimulation.life.map((e: any) =>
                  Math.round(e.value / 10000)
                )
              : [0, 0, 0, 0, 0],
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
            fill: true,
            borderColor: ['#68E1D9a0'],
            tension: 0.5,
          },
        ],
      },
      grad: [
        [
          [0, '#ff000000'],
          [0.25, '#ff000000'],
          [0.25, '#68E1D930'],
          [1, '#68E1D9a0'],
        ],
      ],
    }),
    [amatuerSimulation]
  );
  const amaSimulResidentData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: simulLabels,
        datasets: [
          {
            label: '????????????(???)',
            data: amatuerSimulation?.resident
              ? amatuerSimulation.resident.map((e: any) => e.value)
              : [0, 0, 0, 0, 0],
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
            borderColor: '#F8DB6D',
            tension: 0.5,
            fill: true,
          },
        ],
      },
      grad: [
        [
          [0, '#ff000000'],
          [0.25, '#ff000000'],
          [0.25, '#F8DB6D30'],
          [1, '#F8DB6Da0'],
        ],
      ],
    }),
    [amatuerSimulation]
  );
  const amaSimulJobData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: simulLabels,
        datasets: [
          {
            label: '????????????(???)',
            data: amatuerSimulation?.job
              ? amatuerSimulation.job.map((e: any) => e.value)
              : [0, 0, 0, 0, 0],
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
            fill: true,
            tension: 0.5,
            borderColor: '#F3A6AFa0',
          },
        ],
      },
      grad: [
        [
          [0, '#ff000000'],
          [0.25, '#ff000000'],
          [0.25, '#F3A6AF30'],
          [1, '#F3A6AFa0'],
        ],
      ],
    }),
    [amatuerSimulation]
  );
  const amaSimulCountData = useMemo(
    () => ({
      type: 'line',
      data: {
        labels: simulLabels,
        datasets: [
          {
            label: '?????? ???(??????)',
            data: amatuerSimulation?.count
              ? amatuerSimulation.count.map((e: any) => e.value)
              : [0, 0, 0, 0, 0],
            datalabels: {
              // ??????????????? ??????
              color: 'transparent',
            },
            fill: true,
            borderColor: ['#60AEEE'],
            tension: 0.5,
          },
        ],
      },
      grad: [
        [
          [0, '#ff000000'],
          [0.25, '#ff000000'],
          [0.25, '#60AEEE30'],
          [1, '#60AEEEa0'],
        ],
      ],
    }),
    [amatuerSimulation]
  );

  return {
    amaSimulSalesData,
    amaSimulLifeData,
    amaSimulResidentData,
    amaSimulJobData,
    amaSimulCountData,
  };
};
