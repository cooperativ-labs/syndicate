// Automatically generated with Reach 0.1.12 (1f68dfdb)
/* eslint-disable */
export const _version = '0.1.12';
export const _versionHash = '0.1.12 (1f68dfdb)';
export const _backendVersion = 26;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {};
}
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {};
}
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt256;
  const ctc3 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc4 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc5 = stdlib.T_Tuple([ctc3, ctc4]);
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc7 = stdlib.T_UInt;
  const ctc8 = stdlib.T_Tuple([ctc6, ctc7, ctc7]);
  const ctc9 = stdlib.T_Bool;
  const ctc10 = stdlib.T_Object({
    ctcMan: ctc0,
    currDistr: ctc2,
    cv: ctc5,
    distrNum: ctc2,
    docHash: ctc8,
    saleLocked: ctc9,
    totBT: ctc2,
    totST: ctc2,
    wlIndex: ctc7,
  });
  const ctc11 = stdlib.T_Tuple([ctc7, ctc7, ctc9]);
  const ctc12 = stdlib.T_Array(ctc11, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc13 = stdlib.T_Tuple([ctc2, ctc2]);
  const ctc14 = stdlib.T_Tuple([ctc2, ctc2, ctc2]);
  const ctc15 = stdlib.T_Tuple([ctc2, ctc1]);
  const ctc16 = stdlib.T_Tuple([ctc0, ctc0]);
  const ctc17 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc18 = stdlib.T_Struct([
    ['qty', ctc7],
    ['price', ctc7],
    ['sold', ctc7],
    ['status', ctc17],
    ['cumProceeds', ctc7],
    ['shareIssuanceType', ctc9],
  ]);
  const ctc19 = stdlib.T_Null;
  const ctc20 = stdlib.T_Data({
    None: ctc19,
    Some: ctc2,
  });
  const ctc21 = stdlib.T_Array(ctc7, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc22 = stdlib.T_Data({
    None: ctc19,
    Some: ctc21,
  });
  const ctc23 = stdlib.T_Data({
    None: ctc19,
    Some: ctc17,
  });
  const ctc24 = stdlib.T_Data({
    None: ctc19,
    Some: ctc9,
  });
  const ctc25 = stdlib.T_Data({
    None: ctc19,
    Some: ctc19,
  });
  const map0_ctc = ctc20;

  const map1_ctc = ctc20;

  const map2_ctc = ctc20;

  const map3_ctc = ctc20;

  const map4_ctc = ctc20;

  const map5_ctc = ctc22;

  const map6_ctc = ctc23;

  const map7_ctc = ctc24;

  const map8_ctc = ctc24;

  const map9_ctc = ctc25;

  const _claimSTBT = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async (_v2482) => {
        const v2482 = stdlib.protect(ctc0, _v2482, null);

        const v2483 = stdlib.protect(map0_ctc, await viewlib.viewMapRef(0, v2482), null);
        const v2484 = stdlib.fromSome(
          v2483,
          stdlib.checkedBigNumberify(
            './index.rsh:64:47:decimal',
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
            '0'
          )
        );
        const v2485 = stdlib.protect(map1_ctc, await viewlib.viewMapRef(1, v2482), null);
        const v2486 = stdlib.fromSome(
          v2485,
          stdlib.checkedBigNumberify(
            './index.rsh:64:47:decimal',
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
            '0'
          )
        );
        const v2487 = [v2484, v2486];

        return v2487;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  const _saleLocked = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async () => {
        return v2481;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  const _totSTBTD = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async () => {
        const v2480 = [v2477, v2478, v2479];

        return v2480;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  const _totSTBTDRec = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async (_v2489) => {
        const v2489 = stdlib.protect(ctc0, _v2489, null);

        const v2490 = stdlib.protect(map2_ctc, await viewlib.viewMapRef(2, v2489), null);
        const v2491 = stdlib.fromSome(
          v2490,
          stdlib.checkedBigNumberify(
            './index.rsh:64:47:decimal',
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
            '0'
          )
        );
        const v2492 = stdlib.protect(map3_ctc, await viewlib.viewMapRef(3, v2489), null);
        const v2493 = stdlib.fromSome(
          v2492,
          stdlib.checkedBigNumberify(
            './index.rsh:64:47:decimal',
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
            '0'
          )
        );
        const v2494 = stdlib.protect(map4_ctc, await viewlib.viewMapRef(4, v2489), null);
        const v2495 = stdlib.fromSome(
          v2494,
          stdlib.checkedBigNumberify(
            './index.rsh:64:47:decimal',
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
            '0'
          )
        );
        const v2496 = [v2491, v2493, v2495];

        return v2496;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  const _vBtBal = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async () => {
        const v2514 = [v2513, v2422];

        return v2514;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  const _vCcCm = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async () => {
        const v2516 = [v2418, v2515];

        return v2516;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  const _vCurrSwap = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async (_v2520) => {
        const v2520 = stdlib.protect(ctc0, _v2520, null);

        const v2521 = stdlib.protect(map5_ctc, await viewlib.viewMapRef(5, v2520), null);
        const v2523 = [
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        ];
        const v2525 = stdlib.fromSome(v2521, v2523);
        const v2526 = stdlib.protect(map6_ctc, await viewlib.viewMapRef(6, v2520), null);
        const v2527 = '-----';
        const v2528 = stdlib.fromSome(v2526, v2527);
        const v2529 = stdlib.protect(map7_ctc, await viewlib.viewMapRef(7, v2520), null);
        const v2530 = stdlib.fromSome(v2529, false);
        const v2531 = v2525[stdlib.checkedBigNumberify('./index.rsh:109:56:array ref', stdlib.UInt_max, '1')];
        const v2532 = v2525[stdlib.checkedBigNumberify('./index.rsh:109:69:array ref', stdlib.UInt_max, '0')];
        const v2533 = v2525[stdlib.checkedBigNumberify('./index.rsh:109:83:array ref', stdlib.UInt_max, '3')];
        const v2534 = v2525[stdlib.checkedBigNumberify('./index.rsh:109:125:array ref', stdlib.UInt_max, '2')];
        const v2535 = {
          cumProceeds: v2534,
          price: v2531,
          qty: v2532,
          shareIssuanceType: v2530,
          sold: v2533,
          status: v2528,
        };

        return v2535;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  const _vHash = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async () => {
        return v2502;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  const _vOptedIn = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async (_v2517) => {
        const v2517 = stdlib.protect(ctc0, _v2517, null);

        const v2518 = stdlib.protect(map8_ctc, await viewlib.viewMapRef(8, v2517), null);
        const v2519 = stdlib.fromSome(v2518, false);

        return v2519;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  const _vcVersion = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async () => {
        const v2510 = [v2507, v2509];

        return v2510;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  const _wlMember = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'))) {
      const [
        v2418,
        v2422,
        v2438,
        v2441,
        v2477,
        v2478,
        v2479,
        v2481,
        v2502,
        v2504,
        v2507,
        v2509,
        v2511,
        v2512,
        v2513,
        v2515,
      ] = svs;
      return await (async (_v2498) => {
        const v2498 = stdlib.protect(ctc0, _v2498, null);

        const v2499 = stdlib.protect(map9_ctc, await viewlib.viewMapRef(9, v2498), null);
        const v2500 = {
          None: 0,
          Some: 1,
        }[v2499[0]];
        const v2501 = stdlib.eq(
          v2500,
          stdlib.checkedBigNumberify('reach standard library:38:41:application', stdlib.UInt_max, '1')
        );

        return v2501;
      })(...args);
    }

    stdlib.assert(false, 'illegal view');
  };
  return {
    infos: {
      claimSTBT: {
        decode: _claimSTBT,
        dom: [ctc0],
        rng: ctc13,
      },
      saleLocked: {
        decode: _saleLocked,
        dom: [],
        rng: ctc9,
      },
      totSTBTD: {
        decode: _totSTBTD,
        dom: [],
        rng: ctc14,
      },
      totSTBTDRec: {
        decode: _totSTBTDRec,
        dom: [ctc0],
        rng: ctc14,
      },
      vBtBal: {
        decode: _vBtBal,
        dom: [],
        rng: ctc15,
      },
      vCcCm: {
        decode: _vCcCm,
        dom: [],
        rng: ctc16,
      },
      vCurrSwap: {
        decode: _vCurrSwap,
        dom: [ctc0],
        rng: ctc18,
      },
      vHash: {
        decode: _vHash,
        dom: [],
        rng: ctc8,
      },
      vOptedIn: {
        decode: _vOptedIn,
        dom: [ctc0],
        rng: ctc9,
      },
      vcVersion: {
        decode: _vcVersion,
        dom: [],
        rng: ctc5,
      },
      wlMember: {
        decode: _wlMember,
        dom: [ctc0],
        rng: ctc9,
      },
    },
    views: {
      3: [ctc0, ctc1, ctc10, ctc12, ctc2, ctc2, ctc2, ctc9, ctc8, ctc7, ctc3, ctc4, ctc11, ctc7, ctc2, ctc0],
    },
  };
}
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Tuple([ctc2, ctc2, ctc2, ctc2, ctc2, ctc5, ctc7, ctc9, ctc9, ctc10]);
  return {
    mapDataTy: ctc11,
  };
}
export async function Creator(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Creator expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for Creator expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Token;
  const ctc12 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '128'));
  const ctc13 = stdlib.T_Address;
  const ctc14 = stdlib.T_Object({
    authorizedST: ctc1,
    bT: ctc11,
    companyName: ctc12,
    lockSale: ctc8,
    managerAddr: ctc13,
  });
  const ctc15 = stdlib.T_Tuple([ctc13, ctc13, ctc1]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc17 = stdlib.T_Tuple([ctc16]);
  const ctc18 = stdlib.T_Tuple([ctc13]);
  const ctc19 = stdlib.T_Tuple([]);
  const ctc20 = stdlib.T_Tuple([ctc13, ctc3]);
  const ctc21 = stdlib.T_Tuple([ctc1]);
  const ctc22 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc23 = stdlib.T_Tuple([ctc22]);
  const ctc24 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc25 = stdlib.T_Data({
    aST0_324: ctc15,
    addCoopId0_324: ctc17,
    addWL0_324: ctc18,
    approveSwap0_324: ctc18,
    cBT0_324: ctc19,
    cCM0_324: ctc18,
    cancelSwap0_324: ctc19,
    claimSwapProceeds0_324: ctc19,
    completeSwap0_324: ctc20,
    dBT0_324: ctc21,
    docHash0_324: ctc23,
    initSwap0_324: ctc24,
    optIn0_324: ctc19,
    remWL0_324: ctc18,
  });
  const ctc26 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc27 = stdlib.T_Tuple([ctc26, ctc16]);
  const ctc28 = stdlib.T_Tuple([ctc22, ctc3, ctc3]);
  const ctc29 = stdlib.T_Object({
    ctcMan: ctc13,
    currDistr: ctc1,
    cv: ctc27,
    distrNum: ctc1,
    docHash: ctc28,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc30 = stdlib.T_Array(ctc24, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: false,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: false,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: false,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: false,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: false,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: false,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: false,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: false,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: false,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: false,
    ty: map9_ctc,
  });

  const v2399 = [
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    false,
  ];
  const v2400 = [v2399];
  const v2406 = 'I have deployed';
  const v2407 = stdlib.protect(ctc14, await interact.getParams(v2406), {
    at: './index.rsh:56:103:application',
    fs: ['at ./index.rsh:55:17:application call to [unknown function] (defined at: ./index.rsh:55:21:function exp)'],
    msg: 'getParams',
    who: 'Creator',
  });
  const v2408 = v2407.authorizedST;
  const v2409 = v2407.bT;
  const v2410 = v2407.companyName;
  const v2411 = v2407.lockSale;
  const v2412 = v2407.managerAddr;

  const txn1 = await ctc.sendrecv({
    args: [v2410, v2411, v2412, v2409, v2408],
    evt_cnt: 5,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:59:13:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc12, ctc8, ctc13, ctc11, ctc1],
    pay: [stdlib.checkedBigNumberify('./index.rsh:59:13:decimal', stdlib.UInt_max, '0'), []],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v2419, v2420, v2421, v2422, v2423],
        secs: v2425,
        time: v2424,
        didSend: v42,
        from: v2418,
      } = txn1;

      const v2426 = v2400[stdlib.checkedBigNumberify('./index.rsh:59:13:dot', stdlib.UInt_max, '0')];
      const v2427 = stdlib.Array_set(
        v2426,
        '0',
        stdlib.checkedBigNumberify('./index.rsh:59:13:dot', stdlib.UInt_max, '0')
      );
      const v2428 = stdlib.Array_set(
        v2400,
        stdlib.checkedBigNumberify('./index.rsh:59:13:dot', stdlib.UInt_max, '0'),
        v2427
      );
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        kind: 'init',
        tok: v2422,
      });
      const v2432 = '2.02';
      const v2433 = 'cooperativIdcooperativIdcooperativId';
      const v2434 = [v2432, v2433];
      const v2435 = 'ajdnaeinawindiaengtnifrjwritniqwrnirefindinigajdnaeinawidiaengtniitniqwrnirefindinigfuaebfubawur';
      const v2436 = [
        v2435,
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
      ];
      const v2437 = {
        ctcMan: v2421,
        currDistr: stdlib.checkedBigNumberify(
          '<builtin>',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        ),
        cv: v2434,
        distrNum: stdlib.checkedBigNumberify(
          '<builtin>',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        ),
        docHash: v2436,
        saleLocked: v2420,
        totBT: stdlib.checkedBigNumberify(
          '<builtin>',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        ),
        totST: stdlib.checkedBigNumberify(
          '<builtin>',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        ),
        wlIndex: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
      };
      const v2438 = v2437;
      const v2439 = v2424;
      const v2441 = v2428;

      if (
        await (async () => {
          return true;
        })()
      ) {
        const v2477 = v2438.totST;
        const v2478 = v2438.totBT;
        const v2479 = v2438.distrNum;
        const v2481 = v2438.saleLocked;
        const v2502 = v2438.docHash;
        const v2504 = v2502[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
        const v2506 = v2438.cv;
        const v2507 = v2506[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
        const v2509 = v2506[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
        const v2511 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
        const v2512 = v2511[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
        const v2513 = stdlib.cast('UInt', 'UInt256', v2512, false, true);
        const v2515 = v2438.ctcMan;
        sim_r.isHalt = false;
      } else {
        sim_r.txns.push({
          kind: 'halt',
          tok: v2422,
        });
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */,
        });
        sim_r.isHalt = true;
      }
      return sim_r;
    },
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc12, ctc8, ctc13, ctc11, ctc1],
    waitIfNotPresent: false,
  });
  const {
    data: [v2419, v2420, v2421, v2422, v2423],
    secs: v2425,
    time: v2424,
    didSend: v42,
    from: v2418,
  } = txn1;
  const v2426 = v2400[stdlib.checkedBigNumberify('./index.rsh:59:13:dot', stdlib.UInt_max, '0')];
  const v2427 = stdlib.Array_set(v2426, '0', stdlib.checkedBigNumberify('./index.rsh:59:13:dot', stdlib.UInt_max, '0'));
  const v2428 = stdlib.Array_set(
    v2400,
    stdlib.checkedBigNumberify('./index.rsh:59:13:dot', stdlib.UInt_max, '0'),
    v2427
  );
  const v2431 = 'I HAVE DEPLOYED';
  stdlib.protect(ctc0, await interact.iDeployed(v2431), {
    at: './index.rsh:61:31:application',
    fs: [
      'at ./index.rsh:61:31:application call to [unknown function] (defined at: ./index.rsh:61:31:function exp)',
      'at ./index.rsh:61:31:application call to "liftedInteract" (defined at: ./index.rsh:61:31:application)',
    ],
    msg: 'iDeployed',
    who: 'Creator',
  });

  const v2432 = '2.02';
  const v2433 = 'cooperativIdcooperativIdcooperativId';
  const v2434 = [v2432, v2433];
  const v2435 = 'ajdnaeinawindiaengtnifrjwritniqwrnirefindinigajdnaeinawidiaengtniitniqwrnirefindinigfuaebfubawur';
  const v2436 = [
    v2435,
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
  ];
  const v2437 = {
    ctcMan: v2421,
    currDistr: stdlib.checkedBigNumberify(
      '<builtin>',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      '0'
    ),
    cv: v2434,
    distrNum: stdlib.checkedBigNumberify(
      '<builtin>',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      '0'
    ),
    docHash: v2436,
    saleLocked: v2420,
    totBT: stdlib.checkedBigNumberify(
      '<builtin>',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      '0'
    ),
    totST: stdlib.checkedBigNumberify(
      '<builtin>',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      '0'
    ),
    wlIndex: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
  };
  let v2438 = v2437;
  let v2439 = v2424;
  let v2441 = v2428;

  let txn2 = txn1;
  while (
    await (async () => {
      return true;
    })()
  ) {
    const v2477 = v2438.totST;
    const v2478 = v2438.totBT;
    const v2479 = v2438.distrNum;
    const v2481 = v2438.saleLocked;
    const v2502 = v2438.docHash;
    const v2504 = v2502[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
    const v2506 = v2438.cv;
    const v2507 = v2506[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
    const v2509 = v2506[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
    const v2511 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
    const v2512 = v2511[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
    const v2513 = stdlib.cast('UInt', 'UInt256', v2512, false, true);
    const v2515 = v2438.ctcMan;
    const txn3 = await ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 2,
      out_tys: [ctc25],
      timeoutAt: ['time', stdlib.UInt_max],
      waitIfNotPresent: false,
    });
    if (txn3.didTimeout) {
      const txn4 = await ctc.sendrecv({
        args: [
          v2418,
          v2422,
          v2438,
          v2441,
          v2477,
          v2478,
          v2479,
          v2481,
          v2502,
          v2504,
          v2507,
          v2509,
          v2511,
          v2512,
          v2513,
          v2515,
        ],
        evt_cnt: 0,
        funcNum: 3,
        lct: v2439,
        onlyIf: true,
        out_tys: [],
        pay: [stdlib.checkedBigNumberify('./index.rsh:446:21:decimal', stdlib.UInt_max, '0'), []],
        sim_p: async (txn4) => {
          const sim_r = { txns: [], mapRefs: [], maps: [] };
          let sim_txn_ctr = stdlib.UInt_max;
          const getSimTokCtr = () => {
            sim_txn_ctr = sim_txn_ctr.sub(1);
            return sim_txn_ctr;
          };

          stdlib.simMapDupe(sim_r, 0, map0);
          stdlib.simMapDupe(sim_r, 1, map1);
          stdlib.simMapDupe(sim_r, 2, map2);
          stdlib.simMapDupe(sim_r, 3, map3);
          stdlib.simMapDupe(sim_r, 4, map4);
          stdlib.simMapDupe(sim_r, 5, map5);
          stdlib.simMapDupe(sim_r, 6, map6);
          stdlib.simMapDupe(sim_r, 7, map7);
          stdlib.simMapDupe(sim_r, 8, map8);
          stdlib.simMapDupe(sim_r, 9, map9);

          const {
            data: [],
            secs: v11564,
            time: v11563,
            didSend: v2053,
            from: v11562,
          } = txn4;

          const cv2438 = v2438;
          const cv2439 = v11563;
          const cv2441 = v2441;

          await (async () => {
            const v2438 = cv2438;
            const v2439 = cv2439;
            const v2441 = cv2441;

            if (
              await (async () => {
                return true;
              })()
            ) {
              const v2477 = v2438.totST;
              const v2478 = v2438.totBT;
              const v2479 = v2438.distrNum;
              const v2481 = v2438.saleLocked;
              const v2502 = v2438.docHash;
              const v2504 = v2502[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
              const v2506 = v2438.cv;
              const v2507 = v2506[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
              const v2509 = v2506[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
              const v2511 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
              const v2512 = v2511[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
              const v2513 = stdlib.cast('UInt', 'UInt256', v2512, false, true);
              const v2515 = v2438.ctcMan;
              sim_r.isHalt = false;
            } else {
              sim_r.txns.push({
                kind: 'halt',
                tok: v2422,
              });
              sim_r.txns.push({
                kind: 'halt',
                tok: undefined /* Nothing */,
              });
              sim_r.isHalt = true;
            }
          })();
          return sim_r;
        },
        soloSend: true,
        timeoutAt: undefined /* mto */,
        tys: [ctc13, ctc11, ctc29, ctc30, ctc1, ctc1, ctc1, ctc8, ctc28, ctc3, ctc26, ctc16, ctc24, ctc3, ctc1, ctc13],
        waitIfNotPresent: false,
      });
      const {
        data: [],
        secs: v11564,
        time: v11563,
        didSend: v2053,
        from: v11562,
      } = txn4;
      const v11565 = stdlib.addressEq(v2418, v11562);
      stdlib.assert(v11565, {
        at: './index.rsh:446:21:dot',
        fs: [
          'at ./index.rsh:445:40:application call to [unknown function] (defined at: ./index.rsh:445:40:function exp)',
        ],
        msg: 'sender correct',
        who: 'Creator',
      });
      const cv2438 = v2438;
      const cv2439 = v11563;
      const cv2441 = v2441;

      v2438 = cv2438;
      v2439 = cv2439;
      v2441 = cv2441;

      txn2 = txn4;
      continue;
    } else {
      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn3;
      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];
          undefined /* setApiDetails */;
          const v3177 = v3036[stdlib.checkedBigNumberify('./index.rsh:324:13:spread', stdlib.UInt_max, '0')];
          const v3178 = v3036[stdlib.checkedBigNumberify('./index.rsh:324:13:spread', stdlib.UInt_max, '1')];
          const v3179 = v3036[stdlib.checkedBigNumberify('./index.rsh:324:13:spread', stdlib.UInt_max, '2')];
          const v3180 = stdlib.addressEq(v3177, v2418);
          const v3182 = stdlib.addressEq(v3177, v2515);
          const v3183 = v3180 ? true : v3182;
          stdlib.assert(v3183, {
            at: './index.rsh:336:24:application',
            fs: [
              'at ./index.rsh:335:13:application call to [unknown function] (defined at: ./index.rsh:335:13:function exp)',
            ],
            msg: 'you must be creator or manager',
            who: 'Creator',
          });
          const v3184 = stdlib.gt256(
            v3179,
            stdlib.checkedBigNumberify(
              './index.rsh:337:39:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          stdlib.assert(v3184, {
            at: './index.rsh:337:24:application',
            fs: [
              'at ./index.rsh:335:13:application call to [unknown function] (defined at: ./index.rsh:335:13:function exp)',
            ],
            msg: null,
            who: 'Creator',
          });
          await stdlib.mapSet(map9, v3178, null);
          const v3186 = stdlib.protect(map0_ctc, await stdlib.mapRef(map0, v3178), null);
          const v3187 = stdlib.fromSome(
            v3186,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v3188 = stdlib.safeAdd256(v3187, v3179);
          await stdlib.mapSet(map0, v3178, v3188);
          const v3189 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v3178), null);
          const v3190 = stdlib.fromSome(
            v3189,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v3191 = stdlib.safeAdd256(v3190, v3179);
          await stdlib.mapSet(map2, v3178, v3191);
          const v3193 = stdlib.safeAdd256(v2477, v3179);
          const v3194 = true;
          await txn3.getOutput('aST', 'v3194', ctc8, v3194);
          const v3203 = {
            ...v2438,
            totST: v3193,
          };
          const cv2438 = v3203;
          const cv2439 = v3034;
          const cv2441 = v2441;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];
          undefined /* setApiDetails */;
          const v3814 = v3645[stdlib.checkedBigNumberify('./index.rsh:360:14:spread', stdlib.UInt_max, '0')];
          const v3817 = [v2507, v3814];
          const v3818 = {
            ...v2438,
            cv: v3817,
          };
          const v3819 = true;
          await txn3.getOutput('addCoopId', 'v3819', ctc8, v3819);
          const cv2438 = v3818;
          const cv2439 = v3034;
          const cv2441 = v2441;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];
          undefined /* setApiDetails */;
          const v4436 = v4254[stdlib.checkedBigNumberify('./index.rsh:288:13:spread', stdlib.UInt_max, '0')];
          const v4437 = stdlib.addressEq(v3032, v2418);
          const v4439 = stdlib.addressEq(v3032, v2515);
          const v4440 = v4437 ? true : v4439;
          stdlib.assert(v4440, {
            at: './index.rsh:299:24:application',
            fs: [
              'at ./index.rsh:298:13:application call to [unknown function] (defined at: ./index.rsh:298:13:function exp)',
            ],
            msg: 'you must be creator or manager',
            who: 'Creator',
          });
          await stdlib.mapSet(map9, v4436, null);
          const v4442 = true;
          await txn3.getOutput('addWL', 'v4442', ctc8, v4442);
          const cv2438 = v2438;
          const cv2439 = v3034;
          const cv2441 = v2441;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];
          undefined /* setApiDetails */;
          const v5059 = v4863[stdlib.checkedBigNumberify('./index.rsh:171:13:spread', stdlib.UInt_max, '0')];
          const v5060 = stdlib.addressEq(v3032, v2418);
          const v5062 = stdlib.addressEq(v3032, v2515);
          const v5063 = v5060 ? true : v5062;
          stdlib.assert(v5063, {
            at: './index.rsh:183:24:application',
            fs: [
              'at ./index.rsh:182:13:application call to [unknown function] (defined at: ./index.rsh:182:13:function exp)',
            ],
            msg: 'you must be creator or manager',
            who: 'Creator',
          });
          const v5064 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v5059), null);
          const v5065 = '-----';
          const v5066 = stdlib.fromSome(v5064, v5065);
          const v5067 = 'initd';
          const v5068 = stdlib.digest([ctc6], [v5066]);
          const v5070 = stdlib.digest([ctc6], [v5067]);
          const v5071 = stdlib.digestEq(v5068, v5070);
          stdlib.assert(v5071, {
            at: './index.rsh:184:24:application',
            fs: [
              'at ./index.rsh:182:13:application call to [unknown function] (defined at: ./index.rsh:182:13:function exp)',
            ],
            msg: 'you can onlyapprove an unapproved pending/initiated swap',
            who: 'Creator',
          });
          const v5072 = 'apprv';
          await stdlib.mapSet(map6, v5059, v5072);
          const v5078 = true;
          await txn3.getOutput('approveSwap', 'v5078', ctc8, v5078);
          const cv2438 = v2438;
          const cv2439 = v3034;
          const cv2441 = v2441;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];
          undefined /* setApiDetails */;
          const v5695 = stdlib.protect(map9_ctc, await stdlib.mapRef(map9, v3032), null);
          const v5696 = {
            None: 0,
            Some: 1,
          }[v5695[0]];
          const v5697 = stdlib.eq(
            v5696,
            stdlib.checkedBigNumberify('reach standard library:38:41:application', stdlib.UInt_max, '1')
          );
          stdlib.assert(v5697, {
            at: './index.rsh:413:24:application',
            fs: [
              'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
            ],
            msg: null,
            who: 'Creator',
          });
          const v5698 = stdlib.protect(map4_ctc, await stdlib.mapRef(map4, v3032), null);
          const v5699 = stdlib.fromSome(
            v5698,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v5701 = stdlib.lt256(v5699, v2479);
          stdlib.assert(v5701, {
            at: './index.rsh:414:24:application',
            fs: [
              'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
            ],
            msg: 'You have already claimed your current distribution',
            who: 'Creator',
          });
          const v5705 = stdlib.gt256(
            v2513,
            stdlib.checkedBigNumberify(
              './index.rsh:415:56:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          stdlib.assert(v5705, {
            at: './index.rsh:415:24:application',
            fs: [
              'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
            ],
            msg: 'well, balance(bT) is 0',
            who: 'Creator',
          });
          const v5707 = stdlib.gt256(
            v2477,
            stdlib.checkedBigNumberify(
              './index.rsh:416:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          stdlib.assert(v5707, {
            at: './index.rsh:416:24:application',
            fs: [
              'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
            ],
            msg: 'totST is 0. This means there should be no distributions yet',
            who: 'Creator',
          });
          const v5709 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v3032), null);
          const v5710 = stdlib.fromSome(
            v5709,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v5711 = stdlib.ge256(v2477, v5710);
          stdlib.assert(v5711, {
            at: './index.rsh:417:24:application',
            fs: [
              'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
            ],
            msg: 'weirdly, totST is less than totAllST[this]',
            who: 'Creator',
          });
          const v5714 = stdlib.gt256(
            v5710,
            stdlib.checkedBigNumberify(
              './index.rsh:418:59:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          stdlib.assert(v5714, {
            at: './index.rsh:418:24:application',
            fs: [
              'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
            ],
            msg: 'totAllST[this] is 0. This means you should not rec distr',
            who: 'Creator',
          });
          const v5717 = v2438.currDistr;
          const v5718 = stdlib.safeMul256(v5710, v5717);
          const v5720 = stdlib.safeDiv256(v5718, v2477);
          const v5721 = stdlib.cast('UInt256', 'UInt', v5720, false, true);
          const v5724 = stdlib.le(v5721, v2512);
          stdlib.assert(v5724, {
            at: './index.rsh:420:24:application',
            fs: [
              'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
            ],
            msg: 'weirdly, trying to withdraw more than available balance',
            who: 'Creator',
          });
          const v5731 = stdlib.sub(v2512, v5721);
          const v5733 = stdlib.Array_set(v2511, '0', v5731);
          const v5734 = stdlib.Array_set(
            v2441,
            stdlib.checkedBigNumberify('./index.rsh:421:50:application', stdlib.UInt_max, '0'),
            v5733
          );
          const v5735 = stdlib.protect(map3_ctc, await stdlib.mapRef(map3, v3032), null);
          const v5736 = stdlib.fromSome(
            v5735,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v5737 = stdlib.safeAdd256(v5736, v5720);
          await stdlib.mapSet(map3, v3032, v5737);
          await stdlib.mapSet(map4, v3032, v2479);
          await txn3.getOutput('cBT', 'v5720', ctc1, v5720);
          const cv2438 = v2438;
          const cv2439 = v3034;
          const cv2441 = v5734;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];
          undefined /* setApiDetails */;
          const v6354 = v6081[stdlib.checkedBigNumberify('./index.rsh:428:13:spread', stdlib.UInt_max, '0')];
          const v6355 = stdlib.addressEq(v3032, v2418);
          const v6357 = stdlib.addressEq(v3032, v2515);
          const v6358 = v6355 ? true : v6357;
          stdlib.assert(v6358, {
            at: './index.rsh:439:24:application',
            fs: [
              'at ./index.rsh:438:13:application call to [unknown function] (defined at: ./index.rsh:438:13:function exp)',
            ],
            msg: 'you must be creator or manager',
            who: 'Creator',
          });
          const v6359 = true;
          await txn3.getOutput('cCM', 'v6359', ctc8, v6359);
          const v6366 = {
            ...v2438,
            ctcMan: v6354,
          };
          const cv2438 = v6366;
          const cv2439 = v3034;
          const cv2441 = v2441;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];
          undefined /* setApiDetails */;
          const v6977 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v3032), null);
          const v6978 = '-----';
          const v6979 = stdlib.fromSome(v6977, v6978);
          const v6981 = stdlib.digest([ctc6], [v6979]);
          const v6983 = stdlib.digest([ctc6], [v6978]);
          const v6984 = stdlib.digestEq(v6981, v6983);
          const v6989 = 'compl';
          const v6992 = stdlib.digest([ctc6], [v6989]);
          const v6993 = stdlib.digestEq(v6981, v6992);
          const v6994 = v6993 ? false : true;
          const v6995 = v6984 ? false : v6994;
          stdlib.assert(v6995, {
            at: './index.rsh:159:24:application',
            fs: [
              'at ./index.rsh:158:13:application call to [unknown function] (defined at: ./index.rsh:158:13:function exp)',
            ],
            msg: 'there must be a pending swap',
            who: 'Creator',
          });
          await stdlib.mapSet(map6, v3032, v6978);
          const v6997 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v3032), null);
          const v6999 = [
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          ];
          const v7001 = stdlib.fromSome(v6997, v6999);
          const v7002 = stdlib.Array_set(
            v7001,
            stdlib.checkedBigNumberify('./index.rsh:162:38:decimal', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('./index.rsh:162:41:decimal', stdlib.UInt_max, '0')
          );
          const v7003 = stdlib.Array_set(
            v7002,
            stdlib.checkedBigNumberify('./index.rsh:163:39:decimal', stdlib.UInt_max, '1'),
            stdlib.checkedBigNumberify('./index.rsh:163:42:decimal', stdlib.UInt_max, '0')
          );
          const v7004 = stdlib.Array_set(
            v7003,
            stdlib.checkedBigNumberify('./index.rsh:164:39:decimal', stdlib.UInt_max, '3'),
            stdlib.checkedBigNumberify('./index.rsh:164:42:decimal', stdlib.UInt_max, '0')
          );
          await stdlib.mapSet(map5, v3032, v7004);
          const v7005 = true;
          await txn3.getOutput('cancelSwap', 'v7005', ctc8, v7005);
          const cv2438 = v2438;
          const cv2439 = v3034;
          const cv2441 = v2441;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];
          undefined /* setApiDetails */;
          const v7621 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v3032), null);
          const v7623 = [
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          ];
          const v7625 = stdlib.fromSome(v7621, v7623);
          const v7626 = v7625[stdlib.checkedBigNumberify('./index.rsh:256:60:array ref', stdlib.UInt_max, '2')];
          const v7627 = stdlib.gt(
            v7626,
            stdlib.checkedBigNumberify('./index.rsh:256:66:decimal', stdlib.UInt_max, '0')
          );
          stdlib.assert(v7627, {
            at: './index.rsh:256:24:application',
            fs: [
              'at ./index.rsh:255:13:application call to [unknown function] (defined at: ./index.rsh:255:13:function exp)',
            ],
            msg: 'you must have swap proceeds to claim',
            who: 'Creator',
          });
          const v7636 = stdlib.ge(v2512, v7626);
          stdlib.assert(v7636, {
            at: './index.rsh:258:24:application',
            fs: [
              'at ./index.rsh:255:13:application call to [unknown function] (defined at: ./index.rsh:255:13:function exp)',
            ],
            msg: 'weirdly insufficienct balance of BT',
            who: 'Creator',
          });
          const v7643 = stdlib.sub(v2512, v7626);
          const v7645 = stdlib.Array_set(v2511, '0', v7643);
          const v7646 = stdlib.Array_set(
            v2441,
            stdlib.checkedBigNumberify('./index.rsh:259:47:application', stdlib.UInt_max, '0'),
            v7645
          );
          const v7647 = stdlib.Array_set(
            v7625,
            stdlib.checkedBigNumberify('./index.rsh:260:38:decimal', stdlib.UInt_max, '2'),
            stdlib.checkedBigNumberify('./index.rsh:260:41:decimal', stdlib.UInt_max, '0')
          );
          await stdlib.mapSet(map5, v3032, v7647);
          const v7648 = true;
          await txn3.getOutput('claimSwapProceeds', 'v7648', ctc8, v7648);
          const cv2438 = v2438;
          const cv2439 = v3034;
          const cv2441 = v7646;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];
          undefined /* setApiDetails */;
          const v7976 = v7908[stdlib.checkedBigNumberify('./index.rsh:192:13:spread', stdlib.UInt_max, '0')];
          const v7977 = v7908[stdlib.checkedBigNumberify('./index.rsh:192:13:spread', stdlib.UInt_max, '1')];
          const v7978 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v7976), null);
          const v7980 = [
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          ];
          const v7982 = stdlib.fromSome(v7978, v7980);
          const v7983 = v7982[stdlib.checkedBigNumberify('./index.rsh:204:79:array ref', stdlib.UInt_max, '1')];
          const v7984 = stdlib.safeMul(v7977, v7983);
          const v8044 = stdlib.add(v2512, v7984);
          const v8046 = stdlib.Array_set(v2511, '0', v8044);
          const v8047 = stdlib.Array_set(
            v2441,
            stdlib.checkedBigNumberify('./index.rsh:80:33:dot', stdlib.UInt_max, '0'),
            v8046
          );
          const v8266 = stdlib.addressEq(v3032, v7976);
          const v8267 = v8266 ? false : true;
          stdlib.assert(v8267, {
            at: './index.rsh:207:24:application',
            fs: [
              'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
            ],
            msg: 'you cannot complete/buy your own swap',
            who: 'Creator',
          });
          const v8268 = stdlib.gt(
            v7977,
            stdlib.checkedBigNumberify('./index.rsh:208:31:decimal', stdlib.UInt_max, '0')
          );
          stdlib.assert(v8268, {
            at: './index.rsh:208:24:application',
            fs: [
              'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
            ],
            msg: 'you must buy at least 1 share token',
            who: 'Creator',
          });
          const v8274 = v7982[stdlib.checkedBigNumberify('./index.rsh:209:69:array ref', stdlib.UInt_max, '0')];
          const v8275 = stdlib.le(v7977, v8274);
          stdlib.assert(v8275, {
            at: './index.rsh:209:24:application',
            fs: [
              'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
            ],
            msg: 'you cannot buy more than the quantity offered for sale',
            who: 'Creator',
          });
          const v8276 = stdlib.protect(map9_ctc, await stdlib.mapRef(map9, v3032), null);
          const v8277 = {
            None: 0,
            Some: 1,
          }[v8276[0]];
          const v8278 = stdlib.eq(
            v8277,
            stdlib.checkedBigNumberify('reach standard library:38:41:application', stdlib.UInt_max, '1')
          );
          stdlib.assert(v8278, {
            at: './index.rsh:210:24:application',
            fs: [
              'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
            ],
            msg: 'you must be a whitelist member to complete or buy swap',
            who: 'Creator',
          });
          const v8279 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v7976), null);
          const v8280 = '-----';
          const v8281 = stdlib.fromSome(v8279, v8280);
          const v8282 = 'apprv';
          const v8283 = stdlib.digest([ctc6], [v8281]);
          const v8285 = stdlib.digest([ctc6], [v8282]);
          const v8286 = stdlib.digestEq(v8283, v8285);
          const v8290 = 'partl';
          const v8293 = stdlib.digest([ctc6], [v8290]);
          const v8294 = stdlib.digestEq(v8283, v8293);
          const v8295 = v8286 ? true : v8294;
          stdlib.assert(v8295, {
            at: './index.rsh:211:24:application',
            fs: [
              'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
            ],
            msg: 'you can only buy an approved or partially completed swap',
            who: 'Creator',
          });
          const v8301 = stdlib.protect(map0_ctc, await stdlib.mapRef(map0, v3032), null);
          const v8302 = stdlib.fromSome(
            v8301,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v8303 = stdlib.cast('UInt', 'UInt256', v7977, false, true);
          const v8304 = stdlib.safeAdd256(v8302, v8303);
          await stdlib.mapSet(map0, v3032, v8304);
          const v8305 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v3032), null);
          const v8306 = stdlib.fromSome(
            v8305,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v8308 = stdlib.safeAdd256(v8306, v8303);
          await stdlib.mapSet(map2, v3032, v8308);
          const v8311 = v7982[stdlib.checkedBigNumberify('./index.rsh:218:61:array ref', stdlib.UInt_max, '2')];
          const v8312 = stdlib.safeAdd(v7984, v8311);
          const v8313 = stdlib.Array_set(
            v7982,
            stdlib.checkedBigNumberify('./index.rsh:218:38:decimal', stdlib.UInt_max, '2'),
            v8312
          );
          const v8314 = v7982[stdlib.checkedBigNumberify('./index.rsh:220:45:array ref', stdlib.UInt_max, '3')];
          const v8315 = stdlib.safeAdd(v8314, v7977);
          const v8316 = stdlib.Array_set(
            v8313,
            stdlib.checkedBigNumberify('./index.rsh:220:39:decimal', stdlib.UInt_max, '3'),
            v8315
          );
          const v8318 = stdlib.safeSub(v8274, v7977);
          const v8319 = stdlib.Array_set(
            v8316,
            stdlib.checkedBigNumberify('./index.rsh:222:39:decimal', stdlib.UInt_max, '0'),
            v8318
          );
          await stdlib.mapSet(map5, v7976, v8319);
          const v8320 = v8319[stdlib.checkedBigNumberify('./index.rsh:225:25:array ref', stdlib.UInt_max, '0')];
          const v8321 = stdlib.eq(
            v8320,
            stdlib.checkedBigNumberify('./index.rsh:225:32:decimal', stdlib.UInt_max, '0')
          );
          if (v8321) {
            const v8322 = 'compl';
            await stdlib.mapSet(map6, v7976, v8322);
            const v8323 = true;
            await txn3.getOutput('completeSwap', 'v8323', ctc8, v8323);
            const v8331 = stdlib.protect(map7_ctc, await stdlib.mapRef(map7, v7976), null);
            const v8332 = stdlib.fromSome(v8331, false);
            if (v8332) {
              const v8345 = stdlib.safeAdd256(v2477, v8303);
              const v8346 = {
                ...v2438,
                totST: v8345,
              };
              const cv2438 = v8346;
              const cv2439 = v3034;
              const cv2441 = v8047;

              v2438 = cv2438;
              v2439 = cv2439;
              v2441 = cv2441;

              txn2 = txn3;
              continue;
            } else {
              const v8334 = stdlib.protect(map0_ctc, await stdlib.mapRef(map0, v7976), null);
              const v8335 = stdlib.fromSome(
                v8334,
                stdlib.checkedBigNumberify(
                  './index.rsh:64:47:decimal',
                  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
                  '0'
                )
              );
              const v8337 = stdlib.safeSub256(v8335, v8303);
              await stdlib.mapSet(map0, v7976, v8337);
              const v8338 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v7976), null);
              const v8339 = stdlib.fromSome(
                v8338,
                stdlib.checkedBigNumberify(
                  './index.rsh:64:47:decimal',
                  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
                  '0'
                )
              );
              const v8341 = stdlib.safeSub256(v8339, v8303);
              await stdlib.mapSet(map2, v7976, v8341);
              const cv2438 = v2438;
              const cv2439 = v3034;
              const cv2441 = v8047;

              v2438 = cv2438;
              v2439 = cv2439;
              v2441 = cv2441;

              txn2 = txn3;
              continue;
            }
          } else {
            await stdlib.mapSet(map6, v7976, v8290);
            const v8349 = true;
            await txn3.getOutput('completeSwap', 'v8349', ctc8, v8349);
            const v8357 = stdlib.protect(map7_ctc, await stdlib.mapRef(map7, v7976), null);
            const v8358 = stdlib.fromSome(v8357, false);
            if (v8358) {
              const v8371 = stdlib.safeAdd256(v2477, v8303);
              const v8372 = {
                ...v2438,
                totST: v8371,
              };
              const cv2438 = v8372;
              const cv2439 = v3034;
              const cv2441 = v8047;

              v2438 = cv2438;
              v2439 = cv2439;
              v2441 = cv2441;

              txn2 = txn3;
              continue;
            } else {
              const v8360 = stdlib.protect(map0_ctc, await stdlib.mapRef(map0, v7976), null);
              const v8361 = stdlib.fromSome(
                v8360,
                stdlib.checkedBigNumberify(
                  './index.rsh:64:47:decimal',
                  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
                  '0'
                )
              );
              const v8363 = stdlib.safeSub256(v8361, v8303);
              await stdlib.mapSet(map0, v7976, v8363);
              const v8364 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v7976), null);
              const v8365 = stdlib.fromSome(
                v8364,
                stdlib.checkedBigNumberify(
                  './index.rsh:64:47:decimal',
                  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
                  '0'
                )
              );
              const v8367 = stdlib.safeSub256(v8365, v8303);
              await stdlib.mapSet(map2, v7976, v8367);
              const cv2438 = v2438;
              const cv2439 = v3034;
              const cv2441 = v8047;

              v2438 = cv2438;
              v2439 = cv2439;
              v2441 = cv2441;

              txn2 = txn3;
              continue;
            }
          }
          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];
          undefined /* setApiDetails */;
          const v8601 = v8517[stdlib.checkedBigNumberify('./index.rsh:374:13:spread', stdlib.UInt_max, '0')];
          const v8602 = stdlib.cast('UInt256', 'UInt', v8601, false, true);
          const v8653 = stdlib.add(v2512, v8602);
          const v8655 = stdlib.Array_set(v2511, '0', v8653);
          const v8656 = stdlib.Array_set(
            v2441,
            stdlib.checkedBigNumberify('./index.rsh:80:33:dot', stdlib.UInt_max, '0'),
            v8655
          );
          const v8985 = stdlib.addressEq(v3032, v2418);
          const v8987 = stdlib.addressEq(v3032, v2515);
          const v8988 = v8985 ? true : v8987;
          stdlib.assert(v8988, {
            at: './index.rsh:385:24:application',
            fs: [
              'at ./index.rsh:384:13:application call to [unknown function] (defined at: ./index.rsh:384:13:function exp)',
            ],
            msg: 'you must be creator or manager',
            who: 'Creator',
          });
          const v8990 = stdlib.gt(
            v8602,
            stdlib.checkedBigNumberify('./index.rsh:386:37:decimal', stdlib.UInt_max, '0')
          );
          stdlib.assert(v8990, {
            at: './index.rsh:386:24:application',
            fs: [
              'at ./index.rsh:384:13:application call to [unknown function] (defined at: ./index.rsh:384:13:function exp)',
            ],
            msg: null,
            who: 'Creator',
          });
          const v8992 = stdlib.safeAdd256(v2478, v8601);
          const v8993 = {
            ...v2438,
            totBT: v8992,
          };
          const v8995 = stdlib.safeAdd256(
            v2479,
            stdlib.checkedBigNumberify(
              './index.rsh:389:62:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '1'
            )
          );
          const v8996 = {
            ...v8993,
            distrNum: v8995,
          };
          const v8997 = {
            ...v8996,
            currDistr: v8601,
          };
          const v8998 = true;
          await txn3.getOutput('dBT', 'v8998', ctc8, v8998);
          const cv2438 = v8997;
          const cv2439 = v3034;
          const cv2441 = v8656;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];
          undefined /* setApiDetails */;
          const v9615 = v9126[stdlib.checkedBigNumberify('./index.rsh:267:13:spread', stdlib.UInt_max, '0')];
          const v9618 = stdlib.eq(
            v2504,
            stdlib.checkedBigNumberify('./index.rsh:281:32:decimal', stdlib.UInt_max, '0')
          );
          stdlib.assert(v9618, {
            at: './index.rsh:281:24:application',
            fs: [
              'at ./index.rsh:279:13:application call to [unknown function] (defined at: ./index.rsh:279:13:function exp)',
            ],
            msg: 'hash is immutable',
            who: 'Creator',
          });
          const v9619 = stdlib.addressEq(v3032, v2418);
          const v9621 = stdlib.addressEq(v3032, v2515);
          const v9622 = v9619 ? true : v9621;
          stdlib.assert(v9622, {
            at: './index.rsh:282:24:application',
            fs: [
              'at ./index.rsh:279:13:application call to [unknown function] (defined at: ./index.rsh:279:13:function exp)',
            ],
            msg: 'only creator or contract manager can change hash',
            who: 'Creator',
          });
          const v9623 = stdlib.safeAdd(
            v2504,
            stdlib.checkedBigNumberify('./index.rsh:283:76:decimal', stdlib.UInt_max, '1')
          );
          const v9625 = [v9615, v9623, v3034];
          const v9626 = {
            ...v2438,
            docHash: v9625,
          };
          const v9627 = true;
          await txn3.getOutput('docHash', 'v9627', ctc8, v9627);
          const cv2438 = v9626;
          const cv2439 = v3034;
          const cv2441 = v2441;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];
          undefined /* setApiDetails */;
          const v10244 = v9735[stdlib.checkedBigNumberify('./index.rsh:112:13:spread', stdlib.UInt_max, '0')];
          const v10245 = v9735[stdlib.checkedBigNumberify('./index.rsh:112:13:spread', stdlib.UInt_max, '1')];
          const v10246 = v9735[stdlib.checkedBigNumberify('./index.rsh:112:13:spread', stdlib.UInt_max, '2')];
          const v10248 = stdlib.addressEq(v3032, v2418);
          const v10250 = stdlib.addressEq(v3032, v2515);
          const v10251 = v10248 ? true : v10250;
          const v10252 = v10246 ? v10251 : false;
          const v10253 = v10246 ? false : true;
          const v10254 = v10252 ? true : v10253;
          stdlib.assert(v10254, {
            at: './index.rsh:126:24:application',
            fs: [
              'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
            ],
            msg: 'if you are not creator or manager, the swap cannot be share issuance type',
            who: 'Creator',
          });
          const v10255 = stdlib.protect(map9_ctc, await stdlib.mapRef(map9, v3032), null);
          const v10256 = {
            None: 0,
            Some: 1,
          }[v10255[0]];
          const v10257 = stdlib.eq(
            v10256,
            stdlib.checkedBigNumberify('reach standard library:38:41:application', stdlib.UInt_max, '1')
          );
          const v10259 = v10257 ? v10253 : false;
          const v10261 = v10259 ? true : v10246;
          stdlib.assert(v10261, {
            at: './index.rsh:127:24:application',
            fs: [
              'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
            ],
            msg: 'you must be a whitelist member',
            who: 'Creator',
          });
          const v10262 = stdlib.gt(
            v10244,
            stdlib.checkedBigNumberify('./index.rsh:128:31:decimal', stdlib.UInt_max, '0')
          );
          stdlib.assert(v10262, {
            at: './index.rsh:128:24:application',
            fs: [
              'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
            ],
            msg: 'you must sell at least 1 share token',
            who: 'Creator',
          });
          const v10263 = stdlib.gt(
            v10245,
            stdlib.checkedBigNumberify('./index.rsh:129:33:decimal', stdlib.UInt_max, '0')
          );
          stdlib.assert(v10263, {
            at: './index.rsh:129:24:application',
            fs: [
              'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
            ],
            msg: 'price must be greater than 0',
            who: 'Creator',
          });
          const v10264 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v3032), null);
          const v10265 = '-----';
          const v10266 = stdlib.fromSome(v10264, v10265);
          const v10268 = stdlib.digest([ctc6], [v10266]);
          const v10270 = stdlib.digest([ctc6], [v10265]);
          const v10271 = stdlib.digestEq(v10268, v10270);
          const v10275 = 'compl';
          const v10278 = stdlib.digest([ctc6], [v10275]);
          const v10279 = stdlib.digestEq(v10268, v10278);
          const v10280 = v10271 ? true : v10279;
          stdlib.assert(v10280, {
            at: './index.rsh:130:24:application',
            fs: [
              'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
            ],
            msg: 'there must be no pending swap',
            who: 'Creator',
          });
          const v10286 = v10251 ? v10246 : false;
          if (v10286) {
            const v10287 = 'apprv';
            await stdlib.mapSet(map6, v3032, v10287);
            await stdlib.mapSet(map7, v3032, true);
            const v10288 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v3032), null);
            const v10290 = [
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            ];
            const v10292 = stdlib.fromSome(v10288, v10290);
            const v10293 = stdlib.Array_set(
              v10292,
              stdlib.checkedBigNumberify('./index.rsh:139:38:decimal', stdlib.UInt_max, '0'),
              v10244
            );
            const v10294 = stdlib.Array_set(
              v10293,
              stdlib.checkedBigNumberify('./index.rsh:140:39:decimal', stdlib.UInt_max, '1'),
              v10245
            );
            const v10295 = stdlib.Array_set(
              v10294,
              stdlib.checkedBigNumberify('./index.rsh:141:39:decimal', stdlib.UInt_max, '3'),
              stdlib.checkedBigNumberify('./index.rsh:141:42:decimal', stdlib.UInt_max, '0')
            );
            await stdlib.mapSet(map5, v3032, v10295);
            const v10296 = true;
            await txn3.getOutput('initSwap', 'v10296', ctc8, v10296);
            const cv2438 = v2438;
            const cv2439 = v3034;
            const cv2441 = v2441;

            v2438 = cv2438;
            v2439 = cv2439;
            v2441 = cv2441;

            txn2 = txn3;
            continue;
          } else {
            const v10305 = 'initd';
            await stdlib.mapSet(map6, v3032, v10305);
            await stdlib.mapSet(map7, v3032, v10246);
            const v10306 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v3032), null);
            const v10308 = [
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            ];
            const v10310 = stdlib.fromSome(v10306, v10308);
            const v10311 = stdlib.Array_set(
              v10310,
              stdlib.checkedBigNumberify('./index.rsh:139:38:decimal', stdlib.UInt_max, '0'),
              v10244
            );
            const v10312 = stdlib.Array_set(
              v10311,
              stdlib.checkedBigNumberify('./index.rsh:140:39:decimal', stdlib.UInt_max, '1'),
              v10245
            );
            const v10313 = stdlib.Array_set(
              v10312,
              stdlib.checkedBigNumberify('./index.rsh:141:39:decimal', stdlib.UInt_max, '3'),
              stdlib.checkedBigNumberify('./index.rsh:141:42:decimal', stdlib.UInt_max, '0')
            );
            await stdlib.mapSet(map5, v3032, v10313);
            const v10314 = true;
            await txn3.getOutput('initSwap', 'v10314', ctc8, v10314);
            const cv2438 = v2438;
            const cv2439 = v3034;
            const cv2441 = v2441;

            v2438 = cv2438;
            v2439 = cv2439;
            v2441 = cv2441;

            txn2 = txn3;
            continue;
          }
          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];
          undefined /* setApiDetails */;
          await stdlib.mapSet(map8, v3032, true);
          const v10933 = true;
          await txn3.getOutput('optIn', 'v10933', ctc8, v10933);
          const cv2438 = v2438;
          const cv2439 = v3034;
          const cv2441 = v2441;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];
          undefined /* setApiDetails */;
          const v11549 = v10953[stdlib.checkedBigNumberify('./index.rsh:306:13:spread', stdlib.UInt_max, '0')];
          const v11550 = stdlib.addressEq(v3032, v2418);
          const v11552 = stdlib.addressEq(v3032, v2515);
          const v11553 = v11550 ? true : v11552;
          stdlib.assert(v11553, {
            at: './index.rsh:317:24:application',
            fs: [
              'at ./index.rsh:316:13:application call to [unknown function] (defined at: ./index.rsh:316:13:function exp)',
            ],
            msg: 'you must be creator or manager',
            who: 'Creator',
          });
          await stdlib.mapSet(map9, v11549, undefined /* Nothing */);
          const v11555 = true;
          await txn3.getOutput('remWL', 'v11555', ctc8, v11555);
          const cv2438 = v2438;
          const cv2439 = v3034;
          const cv2441 = v2441;

          v2438 = cv2438;
          v2439 = cv2439;
          v2441 = cv2441;

          txn2 = txn3;
          continue;
          break;
        }
      }
    }
  }
  return;
}
export async function _aST3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _aST3 expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _aST3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc22 = stdlib.T_Tuple([ctc14]);
  const ctc23 = stdlib.T_Tuple([ctc11]);
  const ctc24 = stdlib.T_Tuple([]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc21,
    addCoopId0_324: ctc22,
    addWL0_324: ctc23,
    approveSwap0_324: ctc23,
    cBT0_324: ctc24,
    cCM0_324: ctc23,
    cancelSwap0_324: ctc24,
    claimSwapProceeds0_324: ctc24,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc24,
    remWL0_324: ctc23,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2760 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:327:13:application call to [unknown function] (defined at: ./index.rsh:327:13:function exp)',
      'at ./index.rsh:80:33:application call to "runaST0_324" (defined at: ./index.rsh:324:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'aST',
  });
  const v2761 = v2760[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '0')];
  const v2763 = v2760[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '2')];
  const v2768 = stdlib.addressEq(v2761, v2418);
  const v2770 = stdlib.addressEq(v2761, v2515);
  const v2771 = v2768 ? true : v2770;
  stdlib.assert(v2771, {
    at: './index.rsh:328:23:application',
    fs: [
      'at ./index.rsh:327:13:application call to [unknown function] (defined at: ./index.rsh:327:29:function exp)',
      'at ./index.rsh:327:13:application call to [unknown function] (defined at: ./index.rsh:327:13:function exp)',
      'at ./index.rsh:80:33:application call to "runaST0_324" (defined at: ./index.rsh:324:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must be creator or manager',
    who: 'aST',
  });
  const v2772 = stdlib.gt256(
    v2763,
    stdlib.checkedBigNumberify(
      './index.rsh:329:38:decimal',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      '0'
    )
  );
  stdlib.assert(v2772, {
    at: './index.rsh:329:23:application',
    fs: [
      'at ./index.rsh:327:13:application call to [unknown function] (defined at: ./index.rsh:327:29:function exp)',
      'at ./index.rsh:327:13:application call to [unknown function] (defined at: ./index.rsh:327:13:function exp)',
      'at ./index.rsh:80:33:application call to "runaST0_324" (defined at: ./index.rsh:324:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: null,
    who: 'aST',
  });
  const v2778 = ['aST0_324', v2760];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2778,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:333:30:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:333:34:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'aST',
          });
          const v3178 = v3036[stdlib.checkedBigNumberify('./index.rsh:324:13:spread', stdlib.UInt_max, '1')];
          const v3179 = v3036[stdlib.checkedBigNumberify('./index.rsh:324:13:spread', stdlib.UInt_max, '2')];
          await stdlib.simMapSet(sim_r, 9, v3178, null);
          const v3186 = stdlib.protect(map0_ctc, await stdlib.simMapRef(sim_r, 0, v3178), null);
          const v3187 = stdlib.fromSome(
            v3186,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v3188 = stdlib.safeAdd256(v3187, v3179);
          await stdlib.simMapSet(sim_r, 0, v3178, v3188);
          const v3189 = stdlib.protect(map2_ctc, await stdlib.simMapRef(sim_r, 2, v3178), null);
          const v3190 = stdlib.fromSome(
            v3189,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v3191 = stdlib.safeAdd256(v3190, v3179);
          await stdlib.simMapSet(sim_r, 2, v3178, v3191);
          const v3193 = stdlib.safeAdd256(v2477, v3179);
          const v3194 = true;
          const v3195 = await txn1.getOutput('aST', 'v3194', ctc8, v3194);

          const v3203 = {
            ...v2438,
            totST: v3193,
          };
          const v16780 = v3203;
          const v16782 = v2441;
          const v16783 = v3203.totST;
          const v16784 = v3203.totBT;
          const v16785 = v3203.distrNum;
          const v16786 = v3203.saleLocked;
          const v16787 = v3203.docHash;
          const v16788 = v16787[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v16789 = v3203.cv;
          const v16790 = v16789[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v16791 = v16789[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v16792 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v16793 = v16792[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v16794 = stdlib.cast('UInt', 'UInt256', v16793, false, true);
          const v16795 = v3203.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      undefined /* setApiDetails */;
      const v3177 = v3036[stdlib.checkedBigNumberify('./index.rsh:324:13:spread', stdlib.UInt_max, '0')];
      const v3178 = v3036[stdlib.checkedBigNumberify('./index.rsh:324:13:spread', stdlib.UInt_max, '1')];
      const v3179 = v3036[stdlib.checkedBigNumberify('./index.rsh:324:13:spread', stdlib.UInt_max, '2')];
      const v3180 = stdlib.addressEq(v3177, v2418);
      const v3182 = stdlib.addressEq(v3177, v2515);
      const v3183 = v3180 ? true : v3182;
      stdlib.assert(v3183, {
        at: './index.rsh:336:24:application',
        fs: [
          'at ./index.rsh:335:13:application call to [unknown function] (defined at: ./index.rsh:335:13:function exp)',
        ],
        msg: 'you must be creator or manager',
        who: 'aST',
      });
      const v3184 = stdlib.gt256(
        v3179,
        stdlib.checkedBigNumberify(
          './index.rsh:337:39:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      stdlib.assert(v3184, {
        at: './index.rsh:337:24:application',
        fs: [
          'at ./index.rsh:335:13:application call to [unknown function] (defined at: ./index.rsh:335:13:function exp)',
        ],
        msg: null,
        who: 'aST',
      });
      await stdlib.mapSet(map9, v3178, null);
      const v3186 = stdlib.protect(map0_ctc, await stdlib.mapRef(map0, v3178), null);
      const v3187 = stdlib.fromSome(
        v3186,
        stdlib.checkedBigNumberify(
          './index.rsh:64:47:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      const v3188 = stdlib.safeAdd256(v3187, v3179);
      await stdlib.mapSet(map0, v3178, v3188);
      const v3189 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v3178), null);
      const v3190 = stdlib.fromSome(
        v3189,
        stdlib.checkedBigNumberify(
          './index.rsh:64:47:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      const v3191 = stdlib.safeAdd256(v3190, v3179);
      await stdlib.mapSet(map2, v3178, v3191);
      const v3193 = stdlib.safeAdd256(v2477, v3179);
      const v3194 = true;
      const v3195 = await txn1.getOutput('aST', 'v3194', ctc8, v3194);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v3036, v3195), {
          at: './index.rsh:325:13:application',
          fs: [
            'at ./index.rsh:325:13:application call to [unknown function] (defined at: ./index.rsh:325:13:function exp)',
            'at ./index.rsh:343:20:application call to "res" (defined at: ./index.rsh:335:13:function exp)',
            'at ./index.rsh:335:13:application call to [unknown function] (defined at: ./index.rsh:335:13:function exp)',
          ],
          msg: 'out',
          who: 'aST',
        });
      } else {
      }

      const v3203 = {
        ...v2438,
        totST: v3193,
      };
      const v16780 = v3203;
      const v16782 = v2441;
      const v16783 = v3203.totST;
      const v16784 = v3203.totBT;
      const v16785 = v3203.distrNum;
      const v16786 = v3203.saleLocked;
      const v16787 = v3203.docHash;
      const v16788 = v16787[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v16789 = v3203.cv;
      const v16790 = v16789[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v16791 = v16789[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v16792 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v16793 = v16792[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v16794 = stdlib.cast('UInt', 'UInt256', v16793, false, true);
      const v16795 = v3203.ctcMan;
      return;

      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _addCoopId3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(
      new Error(`The backend for _addCoopId3 expects to receive a contract as its first argument.`)
    );
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _addCoopId3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([ctc14]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc11]);
  const ctc24 = stdlib.T_Tuple([]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc21,
    addWL0_324: ctc23,
    approveSwap0_324: ctc23,
    cBT0_324: ctc24,
    cCM0_324: ctc23,
    cancelSwap0_324: ctc24,
    claimSwapProceeds0_324: ctc24,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc24,
    remWL0_324: ctc23,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2790 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:363:13:application call to [unknown function] (defined at: ./index.rsh:363:13:function exp)',
      'at ./index.rsh:80:33:application call to "runaddCoopId0_324" (defined at: ./index.rsh:360:14:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'addCoopId',
  });
  const v2797 = ['addCoopId0_324', v2790];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2797,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:366:23:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:366:27:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'addCoopId',
          });
          const v3814 = v3645[stdlib.checkedBigNumberify('./index.rsh:360:14:spread', stdlib.UInt_max, '0')];
          const v3817 = [v2507, v3814];
          const v3818 = {
            ...v2438,
            cv: v3817,
          };
          const v3819 = true;
          const v3820 = await txn1.getOutput('addCoopId', 'v3819', ctc8, v3819);

          const v17312 = v3818;
          const v17314 = v2441;
          const v17315 = v3818.totST;
          const v17316 = v3818.totBT;
          const v17317 = v3818.distrNum;
          const v17318 = v3818.saleLocked;
          const v17319 = v3818.docHash;
          const v17320 = v17319[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v17321 = v3818.cv;
          const v17322 = v17321[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v17323 = v17321[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v17324 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v17325 = v17324[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v17326 = stdlib.cast('UInt', 'UInt256', v17325, false, true);
          const v17327 = v3818.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      undefined /* setApiDetails */;
      const v3814 = v3645[stdlib.checkedBigNumberify('./index.rsh:360:14:spread', stdlib.UInt_max, '0')];
      const v3817 = [v2507, v3814];
      const v3818 = {
        ...v2438,
        cv: v3817,
      };
      const v3819 = true;
      const v3820 = await txn1.getOutput('addCoopId', 'v3819', ctc8, v3819);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v3645, v3820), {
          at: './index.rsh:361:13:application',
          fs: [
            'at ./index.rsh:361:13:application call to [unknown function] (defined at: ./index.rsh:361:13:function exp)',
            'at ./index.rsh:370:20:application call to "res" (defined at: ./index.rsh:368:13:function exp)',
            'at ./index.rsh:368:13:application call to [unknown function] (defined at: ./index.rsh:368:13:function exp)',
          ],
          msg: 'out',
          who: 'addCoopId',
        });
      } else {
      }

      const v17312 = v3818;
      const v17314 = v2441;
      const v17315 = v3818.totST;
      const v17316 = v3818.totBT;
      const v17317 = v3818.distrNum;
      const v17318 = v3818.saleLocked;
      const v17319 = v3818.docHash;
      const v17320 = v17319[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v17321 = v3818.cv;
      const v17322 = v17321[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v17323 = v17321[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v17324 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v17325 = v17324[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v17326 = stdlib.cast('UInt', 'UInt256', v17325, false, true);
      const v17327 = v3818.ctcMan;
      return;

      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _addWL3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _addWL3 expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _addWL3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([ctc11]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc21,
    approveSwap0_324: ctc21,
    cBT0_324: ctc24,
    cCM0_324: ctc21,
    cancelSwap0_324: ctc24,
    claimSwapProceeds0_324: ctc24,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc24,
    remWL0_324: ctc21,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2728 = ctc.selfAddress();
  const v2730 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:291:13:application call to [unknown function] (defined at: ./index.rsh:291:13:function exp)',
      'at ./index.rsh:80:33:application call to "runaddWL0_324" (defined at: ./index.rsh:288:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'addWL',
  });
  const v2734 = stdlib.addressEq(v2728, v2418);
  const v2736 = stdlib.addressEq(v2728, v2515);
  const v2737 = v2734 ? true : v2736;
  stdlib.assert(v2737, {
    at: './index.rsh:292:23:application',
    fs: [
      'at ./index.rsh:291:13:application call to [unknown function] (defined at: ./index.rsh:291:18:function exp)',
      'at ./index.rsh:291:13:application call to [unknown function] (defined at: ./index.rsh:291:13:function exp)',
      'at ./index.rsh:80:33:application call to "runaddWL0_324" (defined at: ./index.rsh:288:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must be creator or manager',
    who: 'addWL',
  });
  const v2741 = ['addWL0_324', v2730];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2741,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:296:22:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:296:26:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'addWL',
          });
          const v4436 = v4254[stdlib.checkedBigNumberify('./index.rsh:288:13:spread', stdlib.UInt_max, '0')];
          await stdlib.simMapSet(sim_r, 9, v4436, null);
          const v4442 = true;
          const v4443 = await txn1.getOutput('addWL', 'v4442', ctc8, v4442);

          const v17844 = v2438;
          const v17846 = v2441;
          const v17847 = v2438.totST;
          const v17848 = v2438.totBT;
          const v17849 = v2438.distrNum;
          const v17850 = v2438.saleLocked;
          const v17851 = v2438.docHash;
          const v17852 = v17851[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v17853 = v2438.cv;
          const v17854 = v17853[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v17855 = v17853[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v17856 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v17857 = v17856[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v17858 = stdlib.cast('UInt', 'UInt256', v17857, false, true);
          const v17859 = v2438.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      undefined /* setApiDetails */;
      const v4436 = v4254[stdlib.checkedBigNumberify('./index.rsh:288:13:spread', stdlib.UInt_max, '0')];
      const v4437 = stdlib.addressEq(v3032, v2418);
      const v4439 = stdlib.addressEq(v3032, v2515);
      const v4440 = v4437 ? true : v4439;
      stdlib.assert(v4440, {
        at: './index.rsh:299:24:application',
        fs: [
          'at ./index.rsh:298:13:application call to [unknown function] (defined at: ./index.rsh:298:13:function exp)',
        ],
        msg: 'you must be creator or manager',
        who: 'addWL',
      });
      await stdlib.mapSet(map9, v4436, null);
      const v4442 = true;
      const v4443 = await txn1.getOutput('addWL', 'v4442', ctc8, v4442);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v4254, v4443), {
          at: './index.rsh:289:13:application',
          fs: [
            'at ./index.rsh:289:13:application call to [unknown function] (defined at: ./index.rsh:289:13:function exp)',
            'at ./index.rsh:302:20:application call to "res" (defined at: ./index.rsh:298:13:function exp)',
            'at ./index.rsh:298:13:application call to [unknown function] (defined at: ./index.rsh:298:13:function exp)',
          ],
          msg: 'out',
          who: 'addWL',
        });
      } else {
      }

      const v17844 = v2438;
      const v17846 = v2441;
      const v17847 = v2438.totST;
      const v17848 = v2438.totBT;
      const v17849 = v2438.distrNum;
      const v17850 = v2438.saleLocked;
      const v17851 = v2438.docHash;
      const v17852 = v17851[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v17853 = v2438.cv;
      const v17854 = v17853[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v17855 = v17853[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v17856 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v17857 = v17856[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v17858 = stdlib.cast('UInt', 'UInt256', v17857, false, true);
      const v17859 = v2438.ctcMan;
      return;

      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _approveSwap3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(
      new Error(`The backend for _approveSwap3 expects to receive a contract as its first argument.`)
    );
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _approveSwap3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([ctc11]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc21,
    approveSwap0_324: ctc21,
    cBT0_324: ctc24,
    cCM0_324: ctc21,
    cancelSwap0_324: ctc24,
    claimSwapProceeds0_324: ctc24,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc24,
    remWL0_324: ctc21,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2619 = ctc.selfAddress();
  const v2621 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:174:13:application call to [unknown function] (defined at: ./index.rsh:174:13:function exp)',
      'at ./index.rsh:80:33:application call to "runapproveSwap0_324" (defined at: ./index.rsh:171:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'approveSwap',
  });
  const v2622 = v2621[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '0')];
  const v2625 = stdlib.addressEq(v2619, v2418);
  const v2627 = stdlib.addressEq(v2619, v2515);
  const v2628 = v2625 ? true : v2627;
  stdlib.assert(v2628, {
    at: './index.rsh:175:23:application',
    fs: [
      'at ./index.rsh:174:13:application call to [unknown function] (defined at: ./index.rsh:174:23:function exp)',
      'at ./index.rsh:174:13:application call to [unknown function] (defined at: ./index.rsh:174:13:function exp)',
      'at ./index.rsh:80:33:application call to "runapproveSwap0_324" (defined at: ./index.rsh:171:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must be creator or manager',
    who: 'approveSwap',
  });
  const v2629 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v2622), null);
  const v2630 = '-----';
  const v2631 = stdlib.fromSome(v2629, v2630);
  const v2632 = 'initd';
  const v2633 = stdlib.digest([ctc6], [v2631]);
  const v2635 = stdlib.digest([ctc6], [v2632]);
  const v2636 = stdlib.digestEq(v2633, v2635);
  stdlib.assert(v2636, {
    at: './index.rsh:176:23:application',
    fs: [
      'at ./index.rsh:174:13:application call to [unknown function] (defined at: ./index.rsh:174:23:function exp)',
      'at ./index.rsh:174:13:application call to [unknown function] (defined at: ./index.rsh:174:13:function exp)',
      'at ./index.rsh:80:33:application call to "runapproveSwap0_324" (defined at: ./index.rsh:171:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you can onlyapprove an unapproved pending/initiated swap',
    who: 'approveSwap',
  });
  const v2640 = ['approveSwap0_324', v2621];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2640,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:180:22:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:180:26:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'approveSwap',
          });
          const v5059 = v4863[stdlib.checkedBigNumberify('./index.rsh:171:13:spread', stdlib.UInt_max, '0')];
          stdlib.protect(map6_ctc, await stdlib.simMapRef(sim_r, 6, v5059), null);
          const v5072 = 'apprv';
          await stdlib.simMapSet(sim_r, 6, v5059, v5072);
          const v5078 = true;
          const v5079 = await txn1.getOutput('approveSwap', 'v5078', ctc8, v5078);

          const v18376 = v2438;
          const v18378 = v2441;
          const v18379 = v2438.totST;
          const v18380 = v2438.totBT;
          const v18381 = v2438.distrNum;
          const v18382 = v2438.saleLocked;
          const v18383 = v2438.docHash;
          const v18384 = v18383[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v18385 = v2438.cv;
          const v18386 = v18385[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v18387 = v18385[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v18388 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v18389 = v18388[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v18390 = stdlib.cast('UInt', 'UInt256', v18389, false, true);
          const v18391 = v2438.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      undefined /* setApiDetails */;
      const v5059 = v4863[stdlib.checkedBigNumberify('./index.rsh:171:13:spread', stdlib.UInt_max, '0')];
      const v5060 = stdlib.addressEq(v3032, v2418);
      const v5062 = stdlib.addressEq(v3032, v2515);
      const v5063 = v5060 ? true : v5062;
      stdlib.assert(v5063, {
        at: './index.rsh:183:24:application',
        fs: [
          'at ./index.rsh:182:13:application call to [unknown function] (defined at: ./index.rsh:182:13:function exp)',
        ],
        msg: 'you must be creator or manager',
        who: 'approveSwap',
      });
      const v5064 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v5059), null);
      const v5065 = '-----';
      const v5066 = stdlib.fromSome(v5064, v5065);
      const v5067 = 'initd';
      const v5068 = stdlib.digest([ctc6], [v5066]);
      const v5070 = stdlib.digest([ctc6], [v5067]);
      const v5071 = stdlib.digestEq(v5068, v5070);
      stdlib.assert(v5071, {
        at: './index.rsh:184:24:application',
        fs: [
          'at ./index.rsh:182:13:application call to [unknown function] (defined at: ./index.rsh:182:13:function exp)',
        ],
        msg: 'you can onlyapprove an unapproved pending/initiated swap',
        who: 'approveSwap',
      });
      const v5072 = 'apprv';
      await stdlib.mapSet(map6, v5059, v5072);
      const v5078 = true;
      const v5079 = await txn1.getOutput('approveSwap', 'v5078', ctc8, v5078);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v4863, v5079), {
          at: './index.rsh:172:13:application',
          fs: [
            'at ./index.rsh:172:13:application call to [unknown function] (defined at: ./index.rsh:172:13:function exp)',
            'at ./index.rsh:188:20:application call to "res" (defined at: ./index.rsh:182:13:function exp)',
            'at ./index.rsh:182:13:application call to [unknown function] (defined at: ./index.rsh:182:13:function exp)',
          ],
          msg: 'out',
          who: 'approveSwap',
        });
      } else {
      }

      const v18376 = v2438;
      const v18378 = v2441;
      const v18379 = v2438.totST;
      const v18380 = v2438.totBT;
      const v18381 = v2438.distrNum;
      const v18382 = v2438.saleLocked;
      const v18383 = v2438.docHash;
      const v18384 = v18383[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v18385 = v2438.cv;
      const v18386 = v18385[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v18387 = v18385[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v18388 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v18389 = v18388[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v18390 = stdlib.cast('UInt', 'UInt256', v18389, false, true);
      const v18391 = v2438.ctcMan;
      return;

      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _cBT3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _cBT3 expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _cBT3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([ctc11]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc24,
    approveSwap0_324: ctc24,
    cBT0_324: ctc21,
    cCM0_324: ctc24,
    cancelSwap0_324: ctc21,
    claimSwapProceeds0_324: ctc21,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc21,
    remWL0_324: ctc24,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2816 = ctc.selfAddress();
  const v2818 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcBT0_324" (defined at: ./index.rsh:396:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'cBT',
  });
  const v2820 = stdlib.protect(map9_ctc, await stdlib.mapRef(map9, v2816), null);
  const v2821 = {
    None: 0,
    Some: 1,
  }[v2820[0]];
  const v2822 = stdlib.eq(
    v2821,
    stdlib.checkedBigNumberify('reach standard library:38:41:application', stdlib.UInt_max, '1')
  );
  stdlib.assert(v2822, {
    at: './index.rsh:400:23:application',
    fs: [
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:17:function exp)',
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcBT0_324" (defined at: ./index.rsh:396:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: null,
    who: 'cBT',
  });
  const v2823 = stdlib.protect(map4_ctc, await stdlib.mapRef(map4, v2816), null);
  const v2824 = stdlib.fromSome(
    v2823,
    stdlib.checkedBigNumberify(
      './index.rsh:64:47:decimal',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      '0'
    )
  );
  const v2826 = stdlib.lt256(v2824, v2479);
  stdlib.assert(v2826, {
    at: './index.rsh:401:23:application',
    fs: [
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:17:function exp)',
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcBT0_324" (defined at: ./index.rsh:396:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'You have already claimed your current distribution',
    who: 'cBT',
  });
  const v2830 = stdlib.gt256(
    v2513,
    stdlib.checkedBigNumberify(
      './index.rsh:402:55:decimal',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      '0'
    )
  );
  stdlib.assert(v2830, {
    at: './index.rsh:402:23:application',
    fs: [
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:17:function exp)',
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcBT0_324" (defined at: ./index.rsh:396:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'well, balance(bT) is 0',
    who: 'cBT',
  });
  const v2832 = stdlib.gt256(
    v2477,
    stdlib.checkedBigNumberify(
      './index.rsh:403:46:decimal',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      '0'
    )
  );
  stdlib.assert(v2832, {
    at: './index.rsh:403:23:application',
    fs: [
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:17:function exp)',
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcBT0_324" (defined at: ./index.rsh:396:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'totST is 0. This means there should be no distributions yet',
    who: 'cBT',
  });
  const v2834 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v2816), null);
  const v2835 = stdlib.fromSome(
    v2834,
    stdlib.checkedBigNumberify(
      './index.rsh:64:47:decimal',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      '0'
    )
  );
  const v2836 = stdlib.ge256(v2477, v2835);
  stdlib.assert(v2836, {
    at: './index.rsh:404:23:application',
    fs: [
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:17:function exp)',
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcBT0_324" (defined at: ./index.rsh:396:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'weirdly, totST is less than totAllST[this]',
    who: 'cBT',
  });
  const v2839 = stdlib.gt256(
    v2835,
    stdlib.checkedBigNumberify(
      './index.rsh:405:58:decimal',
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      '0'
    )
  );
  stdlib.assert(v2839, {
    at: './index.rsh:405:23:application',
    fs: [
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:17:function exp)',
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcBT0_324" (defined at: ./index.rsh:396:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'totAllST[this] is 0. This means you should not rec distr',
    who: 'cBT',
  });
  const v2842 = v2438.currDistr;
  const v2843 = stdlib.safeMul256(v2835, v2842);
  const v2845 = stdlib.safeDiv256(v2843, v2477);
  const v2846 = stdlib.cast('UInt256', 'UInt', v2845, false, true);
  const v2849 = stdlib.le(v2846, v2512);
  stdlib.assert(v2849, {
    at: './index.rsh:407:23:application',
    fs: [
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:17:function exp)',
      'at ./index.rsh:399:13:application call to [unknown function] (defined at: ./index.rsh:399:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcBT0_324" (defined at: ./index.rsh:396:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'weirdly, trying to withdraw more than available balance',
    who: 'cBT',
  });
  const v2852 = ['cBT0_324', v2818];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2852,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:410:21:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:410:25:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'cBT',
          });
          stdlib.protect(map9_ctc, await stdlib.simMapRef(sim_r, 9, v3032), null);
          stdlib.protect(map4_ctc, await stdlib.simMapRef(sim_r, 4, v3032), null);
          const v5709 = stdlib.protect(map2_ctc, await stdlib.simMapRef(sim_r, 2, v3032), null);
          const v5710 = stdlib.fromSome(
            v5709,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v5717 = v2438.currDistr;
          const v5718 = stdlib.safeMul256(v5710, v5717);
          const v5720 = stdlib.safeDiv256(v5718, v2477);
          const v5721 = stdlib.cast('UInt256', 'UInt', v5720, false, true);
          const v5731 = stdlib.sub(v2512, v5721);
          const v5733 = stdlib.Array_set(v2511, '0', v5731);
          const v5734 = stdlib.Array_set(
            v2441,
            stdlib.checkedBigNumberify('./index.rsh:421:50:application', stdlib.UInt_max, '0'),
            v5733
          );
          sim_r.txns.push({
            kind: 'from',
            to: v3032,
            tok: v2422,
          });
          const v5735 = stdlib.protect(map3_ctc, await stdlib.simMapRef(sim_r, 3, v3032), null);
          const v5736 = stdlib.fromSome(
            v5735,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v5737 = stdlib.safeAdd256(v5736, v5720);
          await stdlib.simMapSet(sim_r, 3, v3032, v5737);
          await stdlib.simMapSet(sim_r, 4, v3032, v2479);
          const v5739 = await txn1.getOutput('cBT', 'v5720', ctc1, v5720);

          const v18908 = v2438;
          const v18910 = v5734;
          const v18911 = v2438.totST;
          const v18912 = v2438.totBT;
          const v18913 = v2438.distrNum;
          const v18914 = v2438.saleLocked;
          const v18915 = v2438.docHash;
          const v18916 = v18915[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v18917 = v2438.cv;
          const v18918 = v18917[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v18919 = v18917[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v18920 = v5734[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v18921 = v18920[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v18922 = stdlib.cast('UInt', 'UInt256', v18921, false, true);
          const v18923 = v2438.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      undefined /* setApiDetails */;
      const v5695 = stdlib.protect(map9_ctc, await stdlib.mapRef(map9, v3032), null);
      const v5696 = {
        None: 0,
        Some: 1,
      }[v5695[0]];
      const v5697 = stdlib.eq(
        v5696,
        stdlib.checkedBigNumberify('reach standard library:38:41:application', stdlib.UInt_max, '1')
      );
      stdlib.assert(v5697, {
        at: './index.rsh:413:24:application',
        fs: [
          'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
        ],
        msg: null,
        who: 'cBT',
      });
      const v5698 = stdlib.protect(map4_ctc, await stdlib.mapRef(map4, v3032), null);
      const v5699 = stdlib.fromSome(
        v5698,
        stdlib.checkedBigNumberify(
          './index.rsh:64:47:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      const v5701 = stdlib.lt256(v5699, v2479);
      stdlib.assert(v5701, {
        at: './index.rsh:414:24:application',
        fs: [
          'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
        ],
        msg: 'You have already claimed your current distribution',
        who: 'cBT',
      });
      const v5705 = stdlib.gt256(
        v2513,
        stdlib.checkedBigNumberify(
          './index.rsh:415:56:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      stdlib.assert(v5705, {
        at: './index.rsh:415:24:application',
        fs: [
          'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
        ],
        msg: 'well, balance(bT) is 0',
        who: 'cBT',
      });
      const v5707 = stdlib.gt256(
        v2477,
        stdlib.checkedBigNumberify(
          './index.rsh:416:47:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      stdlib.assert(v5707, {
        at: './index.rsh:416:24:application',
        fs: [
          'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
        ],
        msg: 'totST is 0. This means there should be no distributions yet',
        who: 'cBT',
      });
      const v5709 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v3032), null);
      const v5710 = stdlib.fromSome(
        v5709,
        stdlib.checkedBigNumberify(
          './index.rsh:64:47:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      const v5711 = stdlib.ge256(v2477, v5710);
      stdlib.assert(v5711, {
        at: './index.rsh:417:24:application',
        fs: [
          'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
        ],
        msg: 'weirdly, totST is less than totAllST[this]',
        who: 'cBT',
      });
      const v5714 = stdlib.gt256(
        v5710,
        stdlib.checkedBigNumberify(
          './index.rsh:418:59:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      stdlib.assert(v5714, {
        at: './index.rsh:418:24:application',
        fs: [
          'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
        ],
        msg: 'totAllST[this] is 0. This means you should not rec distr',
        who: 'cBT',
      });
      const v5717 = v2438.currDistr;
      const v5718 = stdlib.safeMul256(v5710, v5717);
      const v5720 = stdlib.safeDiv256(v5718, v2477);
      const v5721 = stdlib.cast('UInt256', 'UInt', v5720, false, true);
      const v5724 = stdlib.le(v5721, v2512);
      stdlib.assert(v5724, {
        at: './index.rsh:420:24:application',
        fs: [
          'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
        ],
        msg: 'weirdly, trying to withdraw more than available balance',
        who: 'cBT',
      });
      const v5731 = stdlib.sub(v2512, v5721);
      const v5733 = stdlib.Array_set(v2511, '0', v5731);
      const v5734 = stdlib.Array_set(
        v2441,
        stdlib.checkedBigNumberify('./index.rsh:421:50:application', stdlib.UInt_max, '0'),
        v5733
      );
      const v5735 = stdlib.protect(map3_ctc, await stdlib.mapRef(map3, v3032), null);
      const v5736 = stdlib.fromSome(
        v5735,
        stdlib.checkedBigNumberify(
          './index.rsh:64:47:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      const v5737 = stdlib.safeAdd256(v5736, v5720);
      await stdlib.mapSet(map3, v3032, v5737);
      await stdlib.mapSet(map4, v3032, v2479);
      const v5739 = await txn1.getOutput('cBT', 'v5720', ctc1, v5720);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v5472, v5739), {
          at: './index.rsh:397:13:application',
          fs: [
            'at ./index.rsh:397:13:application call to [unknown function] (defined at: ./index.rsh:397:13:function exp)',
            'at ./index.rsh:424:20:application call to "res" (defined at: ./index.rsh:412:13:function exp)',
            'at ./index.rsh:412:13:application call to [unknown function] (defined at: ./index.rsh:412:13:function exp)',
          ],
          msg: 'out',
          who: 'cBT',
        });
      } else {
      }

      const v18908 = v2438;
      const v18910 = v5734;
      const v18911 = v2438.totST;
      const v18912 = v2438.totBT;
      const v18913 = v2438.distrNum;
      const v18914 = v2438.saleLocked;
      const v18915 = v2438.docHash;
      const v18916 = v18915[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v18917 = v2438.cv;
      const v18918 = v18917[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v18919 = v18917[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v18920 = v5734[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v18921 = v18920[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v18922 = stdlib.cast('UInt', 'UInt256', v18921, false, true);
      const v18923 = v2438.ctcMan;
      return;

      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _cCM3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _cCM3 expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _cCM3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([ctc11]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc21,
    approveSwap0_324: ctc21,
    cBT0_324: ctc24,
    cCM0_324: ctc21,
    cancelSwap0_324: ctc24,
    claimSwapProceeds0_324: ctc24,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc24,
    remWL0_324: ctc21,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2854 = ctc.selfAddress();
  const v2856 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:431:13:application call to [unknown function] (defined at: ./index.rsh:431:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcCM0_324" (defined at: ./index.rsh:428:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'cCM',
  });
  const v2860 = stdlib.addressEq(v2854, v2418);
  const v2862 = stdlib.addressEq(v2854, v2515);
  const v2863 = v2860 ? true : v2862;
  stdlib.assert(v2863, {
    at: './index.rsh:432:23:application',
    fs: [
      'at ./index.rsh:431:13:application call to [unknown function] (defined at: ./index.rsh:431:21:function exp)',
      'at ./index.rsh:431:13:application call to [unknown function] (defined at: ./index.rsh:431:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcCM0_324" (defined at: ./index.rsh:428:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must be creator or manager',
    who: 'cCM',
  });
  const v2867 = ['cCM0_324', v2856];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2867,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:436:22:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:436:26:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'cCM',
          });
          const v6354 = v6081[stdlib.checkedBigNumberify('./index.rsh:428:13:spread', stdlib.UInt_max, '0')];
          const v6359 = true;
          const v6360 = await txn1.getOutput('cCM', 'v6359', ctc8, v6359);

          const v6366 = {
            ...v2438,
            ctcMan: v6354,
          };
          const v19440 = v6366;
          const v19442 = v2441;
          const v19443 = v6366.totST;
          const v19444 = v6366.totBT;
          const v19445 = v6366.distrNum;
          const v19446 = v6366.saleLocked;
          const v19447 = v6366.docHash;
          const v19448 = v19447[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v19449 = v6366.cv;
          const v19450 = v19449[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v19451 = v19449[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v19452 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v19453 = v19452[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v19454 = stdlib.cast('UInt', 'UInt256', v19453, false, true);
          const v19455 = v6366.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      undefined /* setApiDetails */;
      const v6354 = v6081[stdlib.checkedBigNumberify('./index.rsh:428:13:spread', stdlib.UInt_max, '0')];
      const v6355 = stdlib.addressEq(v3032, v2418);
      const v6357 = stdlib.addressEq(v3032, v2515);
      const v6358 = v6355 ? true : v6357;
      stdlib.assert(v6358, {
        at: './index.rsh:439:24:application',
        fs: [
          'at ./index.rsh:438:13:application call to [unknown function] (defined at: ./index.rsh:438:13:function exp)',
        ],
        msg: 'you must be creator or manager',
        who: 'cCM',
      });
      const v6359 = true;
      const v6360 = await txn1.getOutput('cCM', 'v6359', ctc8, v6359);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v6081, v6360), {
          at: './index.rsh:429:13:application',
          fs: [
            'at ./index.rsh:429:13:application call to [unknown function] (defined at: ./index.rsh:429:13:function exp)',
            'at ./index.rsh:441:20:application call to "res" (defined at: ./index.rsh:438:13:function exp)',
            'at ./index.rsh:438:13:application call to [unknown function] (defined at: ./index.rsh:438:13:function exp)',
          ],
          msg: 'out',
          who: 'cCM',
        });
      } else {
      }

      const v6366 = {
        ...v2438,
        ctcMan: v6354,
      };
      const v19440 = v6366;
      const v19442 = v2441;
      const v19443 = v6366.totST;
      const v19444 = v6366.totBT;
      const v19445 = v6366.distrNum;
      const v19446 = v6366.saleLocked;
      const v19447 = v6366.docHash;
      const v19448 = v19447[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v19449 = v6366.cv;
      const v19450 = v19449[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v19451 = v19449[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v19452 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v19453 = v19452[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v19454 = stdlib.cast('UInt', 'UInt256', v19453, false, true);
      const v19455 = v6366.ctcMan;
      return;

      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _cancelSwap3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(
      new Error(`The backend for _cancelSwap3 expects to receive a contract as its first argument.`)
    );
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _cancelSwap3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([ctc11]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc24,
    approveSwap0_324: ctc24,
    cBT0_324: ctc21,
    cCM0_324: ctc24,
    cancelSwap0_324: ctc21,
    claimSwapProceeds0_324: ctc21,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc21,
    remWL0_324: ctc24,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2592 = ctc.selfAddress();
  const v2594 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:151:13:application call to [unknown function] (defined at: ./index.rsh:151:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcancelSwap0_324" (defined at: ./index.rsh:148:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'cancelSwap',
  });
  const v2596 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v2592), null);
  const v2597 = '-----';
  const v2598 = stdlib.fromSome(v2596, v2597);
  const v2600 = stdlib.digest([ctc6], [v2598]);
  const v2602 = stdlib.digest([ctc6], [v2597]);
  const v2603 = stdlib.digestEq(v2600, v2602);
  const v2608 = 'compl';
  const v2611 = stdlib.digest([ctc6], [v2608]);
  const v2612 = stdlib.digestEq(v2600, v2611);
  const v2613 = v2612 ? false : true;
  const v2614 = v2603 ? false : v2613;
  stdlib.assert(v2614, {
    at: './index.rsh:152:23:application',
    fs: [
      'at ./index.rsh:151:13:application call to [unknown function] (defined at: ./index.rsh:151:17:function exp)',
      'at ./index.rsh:151:13:application call to [unknown function] (defined at: ./index.rsh:151:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcancelSwap0_324" (defined at: ./index.rsh:148:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'there must be a pending swap',
    who: 'cancelSwap',
  });
  const v2617 = ['cancelSwap0_324', v2594];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2617,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:156:21:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:156:25:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'cancelSwap',
          });
          stdlib.protect(map6_ctc, await stdlib.simMapRef(sim_r, 6, v3032), null);
          const v6978 = '-----';
          await stdlib.simMapSet(sim_r, 6, v3032, v6978);
          const v6997 = stdlib.protect(map5_ctc, await stdlib.simMapRef(sim_r, 5, v3032), null);
          const v6999 = [
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          ];
          const v7001 = stdlib.fromSome(v6997, v6999);
          const v7002 = stdlib.Array_set(
            v7001,
            stdlib.checkedBigNumberify('./index.rsh:162:38:decimal', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('./index.rsh:162:41:decimal', stdlib.UInt_max, '0')
          );
          const v7003 = stdlib.Array_set(
            v7002,
            stdlib.checkedBigNumberify('./index.rsh:163:39:decimal', stdlib.UInt_max, '1'),
            stdlib.checkedBigNumberify('./index.rsh:163:42:decimal', stdlib.UInt_max, '0')
          );
          const v7004 = stdlib.Array_set(
            v7003,
            stdlib.checkedBigNumberify('./index.rsh:164:39:decimal', stdlib.UInt_max, '3'),
            stdlib.checkedBigNumberify('./index.rsh:164:42:decimal', stdlib.UInt_max, '0')
          );
          await stdlib.simMapSet(sim_r, 5, v3032, v7004);
          const v7005 = true;
          const v7006 = await txn1.getOutput('cancelSwap', 'v7005', ctc8, v7005);

          const v19972 = v2438;
          const v19974 = v2441;
          const v19975 = v2438.totST;
          const v19976 = v2438.totBT;
          const v19977 = v2438.distrNum;
          const v19978 = v2438.saleLocked;
          const v19979 = v2438.docHash;
          const v19980 = v19979[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v19981 = v2438.cv;
          const v19982 = v19981[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v19983 = v19981[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v19984 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v19985 = v19984[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v19986 = stdlib.cast('UInt', 'UInt256', v19985, false, true);
          const v19987 = v2438.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      undefined /* setApiDetails */;
      const v6977 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v3032), null);
      const v6978 = '-----';
      const v6979 = stdlib.fromSome(v6977, v6978);
      const v6981 = stdlib.digest([ctc6], [v6979]);
      const v6983 = stdlib.digest([ctc6], [v6978]);
      const v6984 = stdlib.digestEq(v6981, v6983);
      const v6989 = 'compl';
      const v6992 = stdlib.digest([ctc6], [v6989]);
      const v6993 = stdlib.digestEq(v6981, v6992);
      const v6994 = v6993 ? false : true;
      const v6995 = v6984 ? false : v6994;
      stdlib.assert(v6995, {
        at: './index.rsh:159:24:application',
        fs: [
          'at ./index.rsh:158:13:application call to [unknown function] (defined at: ./index.rsh:158:13:function exp)',
        ],
        msg: 'there must be a pending swap',
        who: 'cancelSwap',
      });
      await stdlib.mapSet(map6, v3032, v6978);
      const v6997 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v3032), null);
      const v6999 = [
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
      ];
      const v7001 = stdlib.fromSome(v6997, v6999);
      const v7002 = stdlib.Array_set(
        v7001,
        stdlib.checkedBigNumberify('./index.rsh:162:38:decimal', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('./index.rsh:162:41:decimal', stdlib.UInt_max, '0')
      );
      const v7003 = stdlib.Array_set(
        v7002,
        stdlib.checkedBigNumberify('./index.rsh:163:39:decimal', stdlib.UInt_max, '1'),
        stdlib.checkedBigNumberify('./index.rsh:163:42:decimal', stdlib.UInt_max, '0')
      );
      const v7004 = stdlib.Array_set(
        v7003,
        stdlib.checkedBigNumberify('./index.rsh:164:39:decimal', stdlib.UInt_max, '3'),
        stdlib.checkedBigNumberify('./index.rsh:164:42:decimal', stdlib.UInt_max, '0')
      );
      await stdlib.mapSet(map5, v3032, v7004);
      const v7005 = true;
      const v7006 = await txn1.getOutput('cancelSwap', 'v7005', ctc8, v7005);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v6690, v7006), {
          at: './index.rsh:149:13:application',
          fs: [
            'at ./index.rsh:149:13:application call to [unknown function] (defined at: ./index.rsh:149:13:function exp)',
            'at ./index.rsh:167:20:application call to "res" (defined at: ./index.rsh:158:13:function exp)',
            'at ./index.rsh:158:13:application call to [unknown function] (defined at: ./index.rsh:158:13:function exp)',
          ],
          msg: 'out',
          who: 'cancelSwap',
        });
      } else {
      }

      const v19972 = v2438;
      const v19974 = v2441;
      const v19975 = v2438.totST;
      const v19976 = v2438.totBT;
      const v19977 = v2438.distrNum;
      const v19978 = v2438.saleLocked;
      const v19979 = v2438.docHash;
      const v19980 = v19979[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v19981 = v2438.cv;
      const v19982 = v19981[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v19983 = v19981[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v19984 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v19985 = v19984[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v19986 = stdlib.cast('UInt', 'UInt256', v19985, false, true);
      const v19987 = v2438.ctcMan;
      return;

      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _claimSwapProceeds3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(
      new Error(`The backend for _claimSwapProceeds3 expects to receive a contract as its first argument.`)
    );
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _claimSwapProceeds3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([ctc11]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc24,
    approveSwap0_324: ctc24,
    cBT0_324: ctc21,
    cCM0_324: ctc24,
    cancelSwap0_324: ctc21,
    claimSwapProceeds0_324: ctc21,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc21,
    remWL0_324: ctc24,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2686 = ctc.selfAddress();
  const v2688 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:247:13:application call to [unknown function] (defined at: ./index.rsh:247:13:function exp)',
      'at ./index.rsh:80:33:application call to "runclaimSwapProceeds0_324" (defined at: ./index.rsh:244:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'claimSwapProceeds',
  });
  const v2690 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v2686), null);
  const v2692 = [
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
  ];
  const v2694 = stdlib.fromSome(v2690, v2692);
  const v2695 = v2694[stdlib.checkedBigNumberify('./index.rsh:248:59:array ref', stdlib.UInt_max, '2')];
  const v2696 = stdlib.gt(v2695, stdlib.checkedBigNumberify('./index.rsh:248:65:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v2696, {
    at: './index.rsh:248:23:application',
    fs: [
      'at ./index.rsh:247:13:application call to [unknown function] (defined at: ./index.rsh:247:17:function exp)',
      'at ./index.rsh:247:13:application call to [unknown function] (defined at: ./index.rsh:247:13:function exp)',
      'at ./index.rsh:80:33:application call to "runclaimSwapProceeds0_324" (defined at: ./index.rsh:244:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must have swap proceeds to claim',
    who: 'claimSwapProceeds',
  });
  const v2705 = stdlib.ge(v2512, v2695);
  stdlib.assert(v2705, {
    at: './index.rsh:249:23:application',
    fs: [
      'at ./index.rsh:247:13:application call to [unknown function] (defined at: ./index.rsh:247:17:function exp)',
      'at ./index.rsh:247:13:application call to [unknown function] (defined at: ./index.rsh:247:13:function exp)',
      'at ./index.rsh:80:33:application call to "runclaimSwapProceeds0_324" (defined at: ./index.rsh:244:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'weirdly insufficienct balance of BT',
    who: 'claimSwapProceeds',
  });
  const v2708 = ['claimSwapProceeds0_324', v2688];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2708,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:253:21:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:253:25:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'claimSwapProceeds',
          });
          const v7621 = stdlib.protect(map5_ctc, await stdlib.simMapRef(sim_r, 5, v3032), null);
          const v7623 = [
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          ];
          const v7625 = stdlib.fromSome(v7621, v7623);
          const v7626 = v7625[stdlib.checkedBigNumberify('./index.rsh:256:60:array ref', stdlib.UInt_max, '2')];
          const v7643 = stdlib.sub(v2512, v7626);
          const v7645 = stdlib.Array_set(v2511, '0', v7643);
          const v7646 = stdlib.Array_set(
            v2441,
            stdlib.checkedBigNumberify('./index.rsh:259:47:application', stdlib.UInt_max, '0'),
            v7645
          );
          sim_r.txns.push({
            kind: 'from',
            to: v3032,
            tok: v2422,
          });
          const v7647 = stdlib.Array_set(
            v7625,
            stdlib.checkedBigNumberify('./index.rsh:260:38:decimal', stdlib.UInt_max, '2'),
            stdlib.checkedBigNumberify('./index.rsh:260:41:decimal', stdlib.UInt_max, '0')
          );
          await stdlib.simMapSet(sim_r, 5, v3032, v7647);
          const v7648 = true;
          const v7649 = await txn1.getOutput('claimSwapProceeds', 'v7648', ctc8, v7648);

          const v20504 = v2438;
          const v20506 = v7646;
          const v20507 = v2438.totST;
          const v20508 = v2438.totBT;
          const v20509 = v2438.distrNum;
          const v20510 = v2438.saleLocked;
          const v20511 = v2438.docHash;
          const v20512 = v20511[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v20513 = v2438.cv;
          const v20514 = v20513[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v20515 = v20513[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v20516 = v7646[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v20517 = v20516[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v20518 = stdlib.cast('UInt', 'UInt256', v20517, false, true);
          const v20519 = v2438.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      undefined /* setApiDetails */;
      const v7621 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v3032), null);
      const v7623 = [
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
      ];
      const v7625 = stdlib.fromSome(v7621, v7623);
      const v7626 = v7625[stdlib.checkedBigNumberify('./index.rsh:256:60:array ref', stdlib.UInt_max, '2')];
      const v7627 = stdlib.gt(v7626, stdlib.checkedBigNumberify('./index.rsh:256:66:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v7627, {
        at: './index.rsh:256:24:application',
        fs: [
          'at ./index.rsh:255:13:application call to [unknown function] (defined at: ./index.rsh:255:13:function exp)',
        ],
        msg: 'you must have swap proceeds to claim',
        who: 'claimSwapProceeds',
      });
      const v7636 = stdlib.ge(v2512, v7626);
      stdlib.assert(v7636, {
        at: './index.rsh:258:24:application',
        fs: [
          'at ./index.rsh:255:13:application call to [unknown function] (defined at: ./index.rsh:255:13:function exp)',
        ],
        msg: 'weirdly insufficienct balance of BT',
        who: 'claimSwapProceeds',
      });
      const v7643 = stdlib.sub(v2512, v7626);
      const v7645 = stdlib.Array_set(v2511, '0', v7643);
      const v7646 = stdlib.Array_set(
        v2441,
        stdlib.checkedBigNumberify('./index.rsh:259:47:application', stdlib.UInt_max, '0'),
        v7645
      );
      const v7647 = stdlib.Array_set(
        v7625,
        stdlib.checkedBigNumberify('./index.rsh:260:38:decimal', stdlib.UInt_max, '2'),
        stdlib.checkedBigNumberify('./index.rsh:260:41:decimal', stdlib.UInt_max, '0')
      );
      await stdlib.mapSet(map5, v3032, v7647);
      const v7648 = true;
      const v7649 = await txn1.getOutput('claimSwapProceeds', 'v7648', ctc8, v7648);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v7299, v7649), {
          at: './index.rsh:245:13:application',
          fs: [
            'at ./index.rsh:245:13:application call to [unknown function] (defined at: ./index.rsh:245:13:function exp)',
            'at ./index.rsh:263:20:application call to "res" (defined at: ./index.rsh:255:13:function exp)',
            'at ./index.rsh:255:13:application call to [unknown function] (defined at: ./index.rsh:255:13:function exp)',
          ],
          msg: 'out',
          who: 'claimSwapProceeds',
        });
      } else {
      }

      const v20504 = v2438;
      const v20506 = v7646;
      const v20507 = v2438.totST;
      const v20508 = v2438.totBT;
      const v20509 = v2438.distrNum;
      const v20510 = v2438.saleLocked;
      const v20511 = v2438.docHash;
      const v20512 = v20511[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v20513 = v2438.cv;
      const v20514 = v20513[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v20515 = v20513[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v20516 = v7646[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v20517 = v20516[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v20518 = stdlib.cast('UInt', 'UInt256', v20517, false, true);
      const v20519 = v2438.ctcMan;
      return;

      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _completeSwap3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(
      new Error(`The backend for _completeSwap3 expects to receive a contract as its first argument.`)
    );
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _completeSwap3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([ctc11]);
  const ctc25 = stdlib.T_Tuple([]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc24,
    approveSwap0_324: ctc24,
    cBT0_324: ctc25,
    cCM0_324: ctc24,
    cancelSwap0_324: ctc25,
    claimSwapProceeds0_324: ctc25,
    completeSwap0_324: ctc21,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc25,
    remWL0_324: ctc24,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2642 = ctc.selfAddress();
  const v2644 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcompleteSwap0_324" (defined at: ./index.rsh:192:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'completeSwap',
  });
  const v2645 = v2644[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '0')];
  const v2646 = v2644[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '1')];
  const v2650 = stdlib.addressEq(v2642, v2645);
  const v2651 = v2650 ? false : true;
  stdlib.assert(v2651, {
    at: './index.rsh:196:23:application',
    fs: [
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:28:function exp)',
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcompleteSwap0_324" (defined at: ./index.rsh:192:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you cannot complete/buy your own swap',
    who: 'completeSwap',
  });
  const v2652 = stdlib.gt(v2646, stdlib.checkedBigNumberify('./index.rsh:197:30:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v2652, {
    at: './index.rsh:197:23:application',
    fs: [
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:28:function exp)',
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcompleteSwap0_324" (defined at: ./index.rsh:192:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must buy at least 1 share token',
    who: 'completeSwap',
  });
  const v2653 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v2645), null);
  const v2655 = [
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
  ];
  const v2657 = stdlib.fromSome(v2653, v2655);
  const v2658 = v2657[stdlib.checkedBigNumberify('./index.rsh:198:68:array ref', stdlib.UInt_max, '0')];
  const v2659 = stdlib.le(v2646, v2658);
  stdlib.assert(v2659, {
    at: './index.rsh:198:23:application',
    fs: [
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:28:function exp)',
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcompleteSwap0_324" (defined at: ./index.rsh:192:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you cannot buy more than the quantity offered for sale',
    who: 'completeSwap',
  });
  const v2660 = stdlib.protect(map9_ctc, await stdlib.mapRef(map9, v2642), null);
  const v2661 = {
    None: 0,
    Some: 1,
  }[v2660[0]];
  const v2662 = stdlib.eq(
    v2661,
    stdlib.checkedBigNumberify('reach standard library:38:41:application', stdlib.UInt_max, '1')
  );
  stdlib.assert(v2662, {
    at: './index.rsh:199:23:application',
    fs: [
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:28:function exp)',
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcompleteSwap0_324" (defined at: ./index.rsh:192:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must be a whitelist member to complete or buy swap',
    who: 'completeSwap',
  });
  const v2663 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v2645), null);
  const v2664 = '-----';
  const v2665 = stdlib.fromSome(v2663, v2664);
  const v2666 = 'apprv';
  const v2667 = stdlib.digest([ctc6], [v2665]);
  const v2669 = stdlib.digest([ctc6], [v2666]);
  const v2670 = stdlib.digestEq(v2667, v2669);
  const v2674 = 'partl';
  const v2677 = stdlib.digest([ctc6], [v2674]);
  const v2678 = stdlib.digestEq(v2667, v2677);
  const v2679 = v2670 ? true : v2678;
  stdlib.assert(v2679, {
    at: './index.rsh:200:23:application',
    fs: [
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:28:function exp)',
      'at ./index.rsh:195:13:application call to [unknown function] (defined at: ./index.rsh:195:13:function exp)',
      'at ./index.rsh:80:33:application call to "runcompleteSwap0_324" (defined at: ./index.rsh:192:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you can only buy an approved or partially completed swap',
    who: 'completeSwap',
  });
  const v2684 = ['completeSwap0_324', v2644];

  const v2964 = v2657[stdlib.checkedBigNumberify('./index.rsh:204:79:array ref', stdlib.UInt_max, '1')];
  const v2965 = stdlib.safeMul(v2646, v2964);

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2684,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [stdlib.checkedBigNumberify('./index.rsh:204:32:decimal', stdlib.UInt_max, '0'), [[v2965, v2422]]],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'completeSwap',
          });
          const v7976 = v7908[stdlib.checkedBigNumberify('./index.rsh:192:13:spread', stdlib.UInt_max, '0')];
          const v7977 = v7908[stdlib.checkedBigNumberify('./index.rsh:192:13:spread', stdlib.UInt_max, '1')];
          const v7978 = stdlib.protect(map5_ctc, await stdlib.simMapRef(sim_r, 5, v7976), null);
          const v7980 = [
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          ];
          const v7982 = stdlib.fromSome(v7978, v7980);
          const v7983 = v7982[stdlib.checkedBigNumberify('./index.rsh:204:79:array ref', stdlib.UInt_max, '1')];
          const v7984 = stdlib.safeMul(v7977, v7983);
          const v8044 = stdlib.add(v2512, v7984);
          const v8046 = stdlib.Array_set(v2511, '0', v8044);
          const v8047 = stdlib.Array_set(
            v2441,
            stdlib.checkedBigNumberify('./index.rsh:80:33:dot', stdlib.UInt_max, '0'),
            v8046
          );
          sim_r.txns.push({
            amt: v7984,
            kind: 'to',
            tok: v2422,
          });
          const v8274 = v7982[stdlib.checkedBigNumberify('./index.rsh:209:69:array ref', stdlib.UInt_max, '0')];
          stdlib.protect(map9_ctc, await stdlib.simMapRef(sim_r, 9, v3032), null);
          stdlib.protect(map6_ctc, await stdlib.simMapRef(sim_r, 6, v7976), null);
          const v8290 = 'partl';
          const v8301 = stdlib.protect(map0_ctc, await stdlib.simMapRef(sim_r, 0, v3032), null);
          const v8302 = stdlib.fromSome(
            v8301,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v8303 = stdlib.cast('UInt', 'UInt256', v7977, false, true);
          const v8304 = stdlib.safeAdd256(v8302, v8303);
          await stdlib.simMapSet(sim_r, 0, v3032, v8304);
          const v8305 = stdlib.protect(map2_ctc, await stdlib.simMapRef(sim_r, 2, v3032), null);
          const v8306 = stdlib.fromSome(
            v8305,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v8308 = stdlib.safeAdd256(v8306, v8303);
          await stdlib.simMapSet(sim_r, 2, v3032, v8308);
          const v8311 = v7982[stdlib.checkedBigNumberify('./index.rsh:218:61:array ref', stdlib.UInt_max, '2')];
          const v8312 = stdlib.safeAdd(v7984, v8311);
          const v8313 = stdlib.Array_set(
            v7982,
            stdlib.checkedBigNumberify('./index.rsh:218:38:decimal', stdlib.UInt_max, '2'),
            v8312
          );
          const v8314 = v7982[stdlib.checkedBigNumberify('./index.rsh:220:45:array ref', stdlib.UInt_max, '3')];
          const v8315 = stdlib.safeAdd(v8314, v7977);
          const v8316 = stdlib.Array_set(
            v8313,
            stdlib.checkedBigNumberify('./index.rsh:220:39:decimal', stdlib.UInt_max, '3'),
            v8315
          );
          const v8318 = stdlib.safeSub(v8274, v7977);
          const v8319 = stdlib.Array_set(
            v8316,
            stdlib.checkedBigNumberify('./index.rsh:222:39:decimal', stdlib.UInt_max, '0'),
            v8318
          );
          await stdlib.simMapSet(sim_r, 5, v7976, v8319);
          const v8320 = v8319[stdlib.checkedBigNumberify('./index.rsh:225:25:array ref', stdlib.UInt_max, '0')];
          const v8321 = stdlib.eq(
            v8320,
            stdlib.checkedBigNumberify('./index.rsh:225:32:decimal', stdlib.UInt_max, '0')
          );
          if (v8321) {
            const v8322 = 'compl';
            await stdlib.simMapSet(sim_r, 6, v7976, v8322);
            const v8323 = true;
            const v8324 = await txn1.getOutput('completeSwap', 'v8323', ctc8, v8323);

            const v8331 = stdlib.protect(map7_ctc, await stdlib.simMapRef(sim_r, 7, v7976), null);
            const v8332 = stdlib.fromSome(v8331, false);
            if (v8332) {
              const v8345 = stdlib.safeAdd256(v2477, v8303);
              const v8346 = {
                ...v2438,
                totST: v8345,
              };
              const v21036 = v8346;
              const v21038 = v8047;
              const v21039 = v8346.totST;
              const v21040 = v8346.totBT;
              const v21041 = v8346.distrNum;
              const v21042 = v8346.saleLocked;
              const v21043 = v8346.docHash;
              const v21044 = v21043[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
              const v21045 = v8346.cv;
              const v21046 = v21045[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
              const v21047 = v21045[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
              const v21048 = v8047[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
              const v21049 = v21048[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
              const v21050 = stdlib.cast('UInt', 'UInt256', v21049, false, true);
              const v21051 = v8346.ctcMan;
              sim_r.isHalt = false;
            } else {
              const v8334 = stdlib.protect(map0_ctc, await stdlib.simMapRef(sim_r, 0, v7976), null);
              const v8335 = stdlib.fromSome(
                v8334,
                stdlib.checkedBigNumberify(
                  './index.rsh:64:47:decimal',
                  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
                  '0'
                )
              );
              const v8337 = stdlib.safeSub256(v8335, v8303);
              await stdlib.simMapSet(sim_r, 0, v7976, v8337);
              const v8338 = stdlib.protect(map2_ctc, await stdlib.simMapRef(sim_r, 2, v7976), null);
              const v8339 = stdlib.fromSome(
                v8338,
                stdlib.checkedBigNumberify(
                  './index.rsh:64:47:decimal',
                  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
                  '0'
                )
              );
              const v8341 = stdlib.safeSub256(v8339, v8303);
              await stdlib.simMapSet(sim_r, 2, v7976, v8341);
              const v21064 = v2438;
              const v21066 = v8047;
              const v21067 = v2438.totST;
              const v21068 = v2438.totBT;
              const v21069 = v2438.distrNum;
              const v21070 = v2438.saleLocked;
              const v21071 = v2438.docHash;
              const v21072 = v21071[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
              const v21073 = v2438.cv;
              const v21074 = v21073[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
              const v21075 = v21073[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
              const v21076 = v8047[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
              const v21077 = v21076[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
              const v21078 = stdlib.cast('UInt', 'UInt256', v21077, false, true);
              const v21079 = v2438.ctcMan;
              sim_r.isHalt = false;
            }
          } else {
            await stdlib.simMapSet(sim_r, 6, v7976, v8290);
            const v8349 = true;
            const v8350 = await txn1.getOutput('completeSwap', 'v8349', ctc8, v8349);

            const v8357 = stdlib.protect(map7_ctc, await stdlib.simMapRef(sim_r, 7, v7976), null);
            const v8358 = stdlib.fromSome(v8357, false);
            if (v8358) {
              const v8371 = stdlib.safeAdd256(v2477, v8303);
              const v8372 = {
                ...v2438,
                totST: v8371,
              };
              const v21092 = v8372;
              const v21094 = v8047;
              const v21095 = v8372.totST;
              const v21096 = v8372.totBT;
              const v21097 = v8372.distrNum;
              const v21098 = v8372.saleLocked;
              const v21099 = v8372.docHash;
              const v21100 = v21099[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
              const v21101 = v8372.cv;
              const v21102 = v21101[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
              const v21103 = v21101[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
              const v21104 = v8047[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
              const v21105 = v21104[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
              const v21106 = stdlib.cast('UInt', 'UInt256', v21105, false, true);
              const v21107 = v8372.ctcMan;
              sim_r.isHalt = false;
            } else {
              const v8360 = stdlib.protect(map0_ctc, await stdlib.simMapRef(sim_r, 0, v7976), null);
              const v8361 = stdlib.fromSome(
                v8360,
                stdlib.checkedBigNumberify(
                  './index.rsh:64:47:decimal',
                  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
                  '0'
                )
              );
              const v8363 = stdlib.safeSub256(v8361, v8303);
              await stdlib.simMapSet(sim_r, 0, v7976, v8363);
              const v8364 = stdlib.protect(map2_ctc, await stdlib.simMapRef(sim_r, 2, v7976), null);
              const v8365 = stdlib.fromSome(
                v8364,
                stdlib.checkedBigNumberify(
                  './index.rsh:64:47:decimal',
                  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
                  '0'
                )
              );
              const v8367 = stdlib.safeSub256(v8365, v8303);
              await stdlib.simMapSet(sim_r, 2, v7976, v8367);
              const v21120 = v2438;
              const v21122 = v8047;
              const v21123 = v2438.totST;
              const v21124 = v2438.totBT;
              const v21125 = v2438.distrNum;
              const v21126 = v2438.saleLocked;
              const v21127 = v2438.docHash;
              const v21128 = v21127[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
              const v21129 = v2438.cv;
              const v21130 = v21129[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
              const v21131 = v21129[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
              const v21132 = v8047[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
              const v21133 = v21132[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
              const v21134 = stdlib.cast('UInt', 'UInt256', v21133, false, true);
              const v21135 = v2438.ctcMan;
              sim_r.isHalt = false;
            }
          }
          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      undefined /* setApiDetails */;
      const v7976 = v7908[stdlib.checkedBigNumberify('./index.rsh:192:13:spread', stdlib.UInt_max, '0')];
      const v7977 = v7908[stdlib.checkedBigNumberify('./index.rsh:192:13:spread', stdlib.UInt_max, '1')];
      const v7978 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v7976), null);
      const v7980 = [
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
      ];
      const v7982 = stdlib.fromSome(v7978, v7980);
      const v7983 = v7982[stdlib.checkedBigNumberify('./index.rsh:204:79:array ref', stdlib.UInt_max, '1')];
      const v7984 = stdlib.safeMul(v7977, v7983);
      const v8044 = stdlib.add(v2512, v7984);
      const v8046 = stdlib.Array_set(v2511, '0', v8044);
      const v8047 = stdlib.Array_set(
        v2441,
        stdlib.checkedBigNumberify('./index.rsh:80:33:dot', stdlib.UInt_max, '0'),
        v8046
      );
      const v8266 = stdlib.addressEq(v3032, v7976);
      const v8267 = v8266 ? false : true;
      stdlib.assert(v8267, {
        at: './index.rsh:207:24:application',
        fs: [
          'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
        ],
        msg: 'you cannot complete/buy your own swap',
        who: 'completeSwap',
      });
      const v8268 = stdlib.gt(v7977, stdlib.checkedBigNumberify('./index.rsh:208:31:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v8268, {
        at: './index.rsh:208:24:application',
        fs: [
          'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
        ],
        msg: 'you must buy at least 1 share token',
        who: 'completeSwap',
      });
      const v8274 = v7982[stdlib.checkedBigNumberify('./index.rsh:209:69:array ref', stdlib.UInt_max, '0')];
      const v8275 = stdlib.le(v7977, v8274);
      stdlib.assert(v8275, {
        at: './index.rsh:209:24:application',
        fs: [
          'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
        ],
        msg: 'you cannot buy more than the quantity offered for sale',
        who: 'completeSwap',
      });
      const v8276 = stdlib.protect(map9_ctc, await stdlib.mapRef(map9, v3032), null);
      const v8277 = {
        None: 0,
        Some: 1,
      }[v8276[0]];
      const v8278 = stdlib.eq(
        v8277,
        stdlib.checkedBigNumberify('reach standard library:38:41:application', stdlib.UInt_max, '1')
      );
      stdlib.assert(v8278, {
        at: './index.rsh:210:24:application',
        fs: [
          'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
        ],
        msg: 'you must be a whitelist member to complete or buy swap',
        who: 'completeSwap',
      });
      const v8279 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v7976), null);
      const v8280 = '-----';
      const v8281 = stdlib.fromSome(v8279, v8280);
      const v8282 = 'apprv';
      const v8283 = stdlib.digest([ctc6], [v8281]);
      const v8285 = stdlib.digest([ctc6], [v8282]);
      const v8286 = stdlib.digestEq(v8283, v8285);
      const v8290 = 'partl';
      const v8293 = stdlib.digest([ctc6], [v8290]);
      const v8294 = stdlib.digestEq(v8283, v8293);
      const v8295 = v8286 ? true : v8294;
      stdlib.assert(v8295, {
        at: './index.rsh:211:24:application',
        fs: [
          'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
        ],
        msg: 'you can only buy an approved or partially completed swap',
        who: 'completeSwap',
      });
      const v8301 = stdlib.protect(map0_ctc, await stdlib.mapRef(map0, v3032), null);
      const v8302 = stdlib.fromSome(
        v8301,
        stdlib.checkedBigNumberify(
          './index.rsh:64:47:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      const v8303 = stdlib.cast('UInt', 'UInt256', v7977, false, true);
      const v8304 = stdlib.safeAdd256(v8302, v8303);
      await stdlib.mapSet(map0, v3032, v8304);
      const v8305 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v3032), null);
      const v8306 = stdlib.fromSome(
        v8305,
        stdlib.checkedBigNumberify(
          './index.rsh:64:47:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '0'
        )
      );
      const v8308 = stdlib.safeAdd256(v8306, v8303);
      await stdlib.mapSet(map2, v3032, v8308);
      const v8311 = v7982[stdlib.checkedBigNumberify('./index.rsh:218:61:array ref', stdlib.UInt_max, '2')];
      const v8312 = stdlib.safeAdd(v7984, v8311);
      const v8313 = stdlib.Array_set(
        v7982,
        stdlib.checkedBigNumberify('./index.rsh:218:38:decimal', stdlib.UInt_max, '2'),
        v8312
      );
      const v8314 = v7982[stdlib.checkedBigNumberify('./index.rsh:220:45:array ref', stdlib.UInt_max, '3')];
      const v8315 = stdlib.safeAdd(v8314, v7977);
      const v8316 = stdlib.Array_set(
        v8313,
        stdlib.checkedBigNumberify('./index.rsh:220:39:decimal', stdlib.UInt_max, '3'),
        v8315
      );
      const v8318 = stdlib.safeSub(v8274, v7977);
      const v8319 = stdlib.Array_set(
        v8316,
        stdlib.checkedBigNumberify('./index.rsh:222:39:decimal', stdlib.UInt_max, '0'),
        v8318
      );
      await stdlib.mapSet(map5, v7976, v8319);
      const v8320 = v8319[stdlib.checkedBigNumberify('./index.rsh:225:25:array ref', stdlib.UInt_max, '0')];
      const v8321 = stdlib.eq(v8320, stdlib.checkedBigNumberify('./index.rsh:225:32:decimal', stdlib.UInt_max, '0'));
      if (v8321) {
        const v8322 = 'compl';
        await stdlib.mapSet(map6, v7976, v8322);
        const v8323 = true;
        const v8324 = await txn1.getOutput('completeSwap', 'v8323', ctc8, v8323);
        if (v1502) {
          stdlib.protect(ctc0, await interact.out(v7908, v8324), {
            at: './index.rsh:193:13:application',
            fs: [
              'at ./index.rsh:193:13:application call to [unknown function] (defined at: ./index.rsh:193:13:function exp)',
              'at ./index.rsh:231:20:application call to "res" (defined at: ./index.rsh:206:13:function exp)',
              'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
            ],
            msg: 'out',
            who: 'completeSwap',
          });
        } else {
        }

        const v8331 = stdlib.protect(map7_ctc, await stdlib.mapRef(map7, v7976), null);
        const v8332 = stdlib.fromSome(v8331, false);
        if (v8332) {
          const v8345 = stdlib.safeAdd256(v2477, v8303);
          const v8346 = {
            ...v2438,
            totST: v8345,
          };
          const v21036 = v8346;
          const v21038 = v8047;
          const v21039 = v8346.totST;
          const v21040 = v8346.totBT;
          const v21041 = v8346.distrNum;
          const v21042 = v8346.saleLocked;
          const v21043 = v8346.docHash;
          const v21044 = v21043[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v21045 = v8346.cv;
          const v21046 = v21045[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v21047 = v21045[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v21048 = v8047[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v21049 = v21048[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v21050 = stdlib.cast('UInt', 'UInt256', v21049, false, true);
          const v21051 = v8346.ctcMan;
          return;
        } else {
          const v8334 = stdlib.protect(map0_ctc, await stdlib.mapRef(map0, v7976), null);
          const v8335 = stdlib.fromSome(
            v8334,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v8337 = stdlib.safeSub256(v8335, v8303);
          await stdlib.mapSet(map0, v7976, v8337);
          const v8338 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v7976), null);
          const v8339 = stdlib.fromSome(
            v8338,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v8341 = stdlib.safeSub256(v8339, v8303);
          await stdlib.mapSet(map2, v7976, v8341);
          const v21064 = v2438;
          const v21066 = v8047;
          const v21067 = v2438.totST;
          const v21068 = v2438.totBT;
          const v21069 = v2438.distrNum;
          const v21070 = v2438.saleLocked;
          const v21071 = v2438.docHash;
          const v21072 = v21071[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v21073 = v2438.cv;
          const v21074 = v21073[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v21075 = v21073[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v21076 = v8047[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v21077 = v21076[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v21078 = stdlib.cast('UInt', 'UInt256', v21077, false, true);
          const v21079 = v2438.ctcMan;
          return;
        }
      } else {
        await stdlib.mapSet(map6, v7976, v8290);
        const v8349 = true;
        const v8350 = await txn1.getOutput('completeSwap', 'v8349', ctc8, v8349);
        if (v1502) {
          stdlib.protect(ctc0, await interact.out(v7908, v8350), {
            at: './index.rsh:193:13:application',
            fs: [
              'at ./index.rsh:193:13:application call to [unknown function] (defined at: ./index.rsh:193:13:function exp)',
              'at ./index.rsh:231:20:application call to "res" (defined at: ./index.rsh:206:13:function exp)',
              'at ./index.rsh:206:13:application call to [unknown function] (defined at: ./index.rsh:206:13:function exp)',
            ],
            msg: 'out',
            who: 'completeSwap',
          });
        } else {
        }

        const v8357 = stdlib.protect(map7_ctc, await stdlib.mapRef(map7, v7976), null);
        const v8358 = stdlib.fromSome(v8357, false);
        if (v8358) {
          const v8371 = stdlib.safeAdd256(v2477, v8303);
          const v8372 = {
            ...v2438,
            totST: v8371,
          };
          const v21092 = v8372;
          const v21094 = v8047;
          const v21095 = v8372.totST;
          const v21096 = v8372.totBT;
          const v21097 = v8372.distrNum;
          const v21098 = v8372.saleLocked;
          const v21099 = v8372.docHash;
          const v21100 = v21099[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v21101 = v8372.cv;
          const v21102 = v21101[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v21103 = v21101[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v21104 = v8047[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v21105 = v21104[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v21106 = stdlib.cast('UInt', 'UInt256', v21105, false, true);
          const v21107 = v8372.ctcMan;
          return;
        } else {
          const v8360 = stdlib.protect(map0_ctc, await stdlib.mapRef(map0, v7976), null);
          const v8361 = stdlib.fromSome(
            v8360,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v8363 = stdlib.safeSub256(v8361, v8303);
          await stdlib.mapSet(map0, v7976, v8363);
          const v8364 = stdlib.protect(map2_ctc, await stdlib.mapRef(map2, v7976), null);
          const v8365 = stdlib.fromSome(
            v8364,
            stdlib.checkedBigNumberify(
              './index.rsh:64:47:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '0'
            )
          );
          const v8367 = stdlib.safeSub256(v8365, v8303);
          await stdlib.mapSet(map2, v7976, v8367);
          const v21120 = v2438;
          const v21122 = v8047;
          const v21123 = v2438.totST;
          const v21124 = v2438.totBT;
          const v21125 = v2438.distrNum;
          const v21126 = v2438.saleLocked;
          const v21127 = v2438.docHash;
          const v21128 = v21127[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v21129 = v2438.cv;
          const v21130 = v21129[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v21131 = v21129[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v21132 = v8047[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v21133 = v21132[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v21134 = stdlib.cast('UInt', 'UInt256', v21133, false, true);
          const v21135 = v2438.ctcMan;
          return;
        }
      }
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _dBT3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _dBT3 expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _dBT3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([ctc1]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([ctc11]);
  const ctc25 = stdlib.T_Tuple([]);
  const ctc26 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc24,
    approveSwap0_324: ctc24,
    cBT0_324: ctc25,
    cCM0_324: ctc24,
    cancelSwap0_324: ctc25,
    claimSwapProceeds0_324: ctc25,
    completeSwap0_324: ctc26,
    dBT0_324: ctc21,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc25,
    remWL0_324: ctc24,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2799 = ctc.selfAddress();
  const v2801 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:377:13:application call to [unknown function] (defined at: ./index.rsh:377:13:function exp)',
      'at ./index.rsh:80:33:application call to "rundBT0_324" (defined at: ./index.rsh:374:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'dBT',
  });
  const v2802 = v2801[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '0')];
  const v2805 = stdlib.addressEq(v2799, v2418);
  const v2807 = stdlib.addressEq(v2799, v2515);
  const v2808 = v2805 ? true : v2807;
  stdlib.assert(v2808, {
    at: './index.rsh:378:23:application',
    fs: [
      'at ./index.rsh:377:13:application call to [unknown function] (defined at: ./index.rsh:377:20:function exp)',
      'at ./index.rsh:377:13:application call to [unknown function] (defined at: ./index.rsh:377:13:function exp)',
      'at ./index.rsh:80:33:application call to "rundBT0_324" (defined at: ./index.rsh:374:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must be creator or manager',
    who: 'dBT',
  });
  const v2809 = stdlib.cast('UInt256', 'UInt', v2802, false, true);
  const v2810 = stdlib.gt(v2809, stdlib.checkedBigNumberify('./index.rsh:379:36:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v2810, {
    at: './index.rsh:379:23:application',
    fs: [
      'at ./index.rsh:377:13:application call to [unknown function] (defined at: ./index.rsh:377:20:function exp)',
      'at ./index.rsh:377:13:application call to [unknown function] (defined at: ./index.rsh:377:13:function exp)',
      'at ./index.rsh:80:33:application call to "rundBT0_324" (defined at: ./index.rsh:374:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: null,
    who: 'dBT',
  });
  const v2814 = ['dBT0_324', v2801];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2814,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [stdlib.checkedBigNumberify('./index.rsh:382:24:decimal', stdlib.UInt_max, '0'), [[v2809, v2422]]],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'dBT',
          });
          const v8601 = v8517[stdlib.checkedBigNumberify('./index.rsh:374:13:spread', stdlib.UInt_max, '0')];
          const v8602 = stdlib.cast('UInt256', 'UInt', v8601, false, true);
          const v8653 = stdlib.add(v2512, v8602);
          const v8655 = stdlib.Array_set(v2511, '0', v8653);
          const v8656 = stdlib.Array_set(
            v2441,
            stdlib.checkedBigNumberify('./index.rsh:80:33:dot', stdlib.UInt_max, '0'),
            v8655
          );
          sim_r.txns.push({
            amt: v8602,
            kind: 'to',
            tok: v2422,
          });
          const v8992 = stdlib.safeAdd256(v2478, v8601);
          const v8993 = {
            ...v2438,
            totBT: v8992,
          };
          const v8995 = stdlib.safeAdd256(
            v2479,
            stdlib.checkedBigNumberify(
              './index.rsh:389:62:decimal',
              '115792089237316195423570985008687907853269984665640564039457584007913129639935',
              '1'
            )
          );
          const v8996 = {
            ...v8993,
            distrNum: v8995,
          };
          const v8997 = {
            ...v8996,
            currDistr: v8601,
          };
          const v8998 = true;
          const v8999 = await txn1.getOutput('dBT', 'v8998', ctc8, v8998);

          const v21652 = v8997;
          const v21654 = v8656;
          const v21655 = v8997.totST;
          const v21656 = v8997.totBT;
          const v21657 = v8997.distrNum;
          const v21658 = v8997.saleLocked;
          const v21659 = v8997.docHash;
          const v21660 = v21659[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v21661 = v8997.cv;
          const v21662 = v21661[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v21663 = v21661[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v21664 = v8656[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v21665 = v21664[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v21666 = stdlib.cast('UInt', 'UInt256', v21665, false, true);
          const v21667 = v8997.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      undefined /* setApiDetails */;
      const v8601 = v8517[stdlib.checkedBigNumberify('./index.rsh:374:13:spread', stdlib.UInt_max, '0')];
      const v8602 = stdlib.cast('UInt256', 'UInt', v8601, false, true);
      const v8653 = stdlib.add(v2512, v8602);
      const v8655 = stdlib.Array_set(v2511, '0', v8653);
      const v8656 = stdlib.Array_set(
        v2441,
        stdlib.checkedBigNumberify('./index.rsh:80:33:dot', stdlib.UInt_max, '0'),
        v8655
      );
      const v8985 = stdlib.addressEq(v3032, v2418);
      const v8987 = stdlib.addressEq(v3032, v2515);
      const v8988 = v8985 ? true : v8987;
      stdlib.assert(v8988, {
        at: './index.rsh:385:24:application',
        fs: [
          'at ./index.rsh:384:13:application call to [unknown function] (defined at: ./index.rsh:384:13:function exp)',
        ],
        msg: 'you must be creator or manager',
        who: 'dBT',
      });
      const v8990 = stdlib.gt(v8602, stdlib.checkedBigNumberify('./index.rsh:386:37:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v8990, {
        at: './index.rsh:386:24:application',
        fs: [
          'at ./index.rsh:384:13:application call to [unknown function] (defined at: ./index.rsh:384:13:function exp)',
        ],
        msg: null,
        who: 'dBT',
      });
      const v8992 = stdlib.safeAdd256(v2478, v8601);
      const v8993 = {
        ...v2438,
        totBT: v8992,
      };
      const v8995 = stdlib.safeAdd256(
        v2479,
        stdlib.checkedBigNumberify(
          './index.rsh:389:62:decimal',
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          '1'
        )
      );
      const v8996 = {
        ...v8993,
        distrNum: v8995,
      };
      const v8997 = {
        ...v8996,
        currDistr: v8601,
      };
      const v8998 = true;
      const v8999 = await txn1.getOutput('dBT', 'v8998', ctc8, v8998);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v8517, v8999), {
          at: './index.rsh:375:13:application',
          fs: [
            'at ./index.rsh:375:13:application call to [unknown function] (defined at: ./index.rsh:375:13:function exp)',
            'at ./index.rsh:392:20:application call to "res" (defined at: ./index.rsh:384:13:function exp)',
            'at ./index.rsh:384:13:application call to [unknown function] (defined at: ./index.rsh:384:13:function exp)',
          ],
          msg: 'out',
          who: 'dBT',
        });
      } else {
      }

      const v21652 = v8997;
      const v21654 = v8656;
      const v21655 = v8997.totST;
      const v21656 = v8997.totBT;
      const v21657 = v8997.distrNum;
      const v21658 = v8997.saleLocked;
      const v21659 = v8997.docHash;
      const v21660 = v21659[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v21661 = v8997.cv;
      const v21662 = v21661[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v21663 = v21661[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v21664 = v8656[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v21665 = v21664[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v21666 = stdlib.cast('UInt', 'UInt256', v21665, false, true);
      const v21667 = v8997.ctcMan;
      return;

      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _docHash3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _docHash3 expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _docHash3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([ctc16]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([ctc11]);
  const ctc25 = stdlib.T_Tuple([]);
  const ctc26 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc27 = stdlib.T_Tuple([ctc1]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc24,
    approveSwap0_324: ctc24,
    cBT0_324: ctc25,
    cCM0_324: ctc24,
    cancelSwap0_324: ctc25,
    claimSwapProceeds0_324: ctc25,
    completeSwap0_324: ctc26,
    dBT0_324: ctc27,
    docHash0_324: ctc21,
    initSwap0_324: ctc19,
    optIn0_324: ctc25,
    remWL0_324: ctc24,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2710 = ctc.selfAddress();
  const v2712 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:270:13:application call to [unknown function] (defined at: ./index.rsh:270:13:function exp)',
      'at ./index.rsh:80:33:application call to "rundocHash0_324" (defined at: ./index.rsh:267:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'docHash',
  });
  const v2718 = stdlib.eq(v2504, stdlib.checkedBigNumberify('./index.rsh:272:31:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v2718, {
    at: './index.rsh:272:23:application',
    fs: [
      'at ./index.rsh:270:13:application call to [unknown function] (defined at: ./index.rsh:270:18:function exp)',
      'at ./index.rsh:270:13:application call to [unknown function] (defined at: ./index.rsh:270:13:function exp)',
      'at ./index.rsh:80:33:application call to "rundocHash0_324" (defined at: ./index.rsh:267:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'hash is immutable',
    who: 'docHash',
  });
  const v2719 = stdlib.addressEq(v2710, v2418);
  const v2721 = stdlib.addressEq(v2710, v2515);
  const v2722 = v2719 ? true : v2721;
  stdlib.assert(v2722, {
    at: './index.rsh:273:23:application',
    fs: [
      'at ./index.rsh:270:13:application call to [unknown function] (defined at: ./index.rsh:270:18:function exp)',
      'at ./index.rsh:270:13:application call to [unknown function] (defined at: ./index.rsh:270:13:function exp)',
      'at ./index.rsh:80:33:application call to "rundocHash0_324" (defined at: ./index.rsh:267:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'only creator or contract manager can change hash',
    who: 'docHash',
  });
  const v2726 = ['docHash0_324', v2712];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2726,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:277:22:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:277:26:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'docHash',
          });
          const v9615 = v9126[stdlib.checkedBigNumberify('./index.rsh:267:13:spread', stdlib.UInt_max, '0')];
          const v9623 = stdlib.safeAdd(
            v2504,
            stdlib.checkedBigNumberify('./index.rsh:283:76:decimal', stdlib.UInt_max, '1')
          );
          const v9625 = [v9615, v9623, v3034];
          const v9626 = {
            ...v2438,
            docHash: v9625,
          };
          const v9627 = true;
          const v9628 = await txn1.getOutput('docHash', 'v9627', ctc8, v9627);

          const v22184 = v9626;
          const v22186 = v2441;
          const v22187 = v9626.totST;
          const v22188 = v9626.totBT;
          const v22189 = v9626.distrNum;
          const v22190 = v9626.saleLocked;
          const v22191 = v9626.docHash;
          const v22192 = v22191[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v22193 = v9626.cv;
          const v22194 = v22193[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v22195 = v22193[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v22196 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v22197 = v22196[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v22198 = stdlib.cast('UInt', 'UInt256', v22197, false, true);
          const v22199 = v9626.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      undefined /* setApiDetails */;
      const v9615 = v9126[stdlib.checkedBigNumberify('./index.rsh:267:13:spread', stdlib.UInt_max, '0')];
      const v9618 = stdlib.eq(v2504, stdlib.checkedBigNumberify('./index.rsh:281:32:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v9618, {
        at: './index.rsh:281:24:application',
        fs: [
          'at ./index.rsh:279:13:application call to [unknown function] (defined at: ./index.rsh:279:13:function exp)',
        ],
        msg: 'hash is immutable',
        who: 'docHash',
      });
      const v9619 = stdlib.addressEq(v3032, v2418);
      const v9621 = stdlib.addressEq(v3032, v2515);
      const v9622 = v9619 ? true : v9621;
      stdlib.assert(v9622, {
        at: './index.rsh:282:24:application',
        fs: [
          'at ./index.rsh:279:13:application call to [unknown function] (defined at: ./index.rsh:279:13:function exp)',
        ],
        msg: 'only creator or contract manager can change hash',
        who: 'docHash',
      });
      const v9623 = stdlib.safeAdd(
        v2504,
        stdlib.checkedBigNumberify('./index.rsh:283:76:decimal', stdlib.UInt_max, '1')
      );
      const v9625 = [v9615, v9623, v3034];
      const v9626 = {
        ...v2438,
        docHash: v9625,
      };
      const v9627 = true;
      const v9628 = await txn1.getOutput('docHash', 'v9627', ctc8, v9627);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v9126, v9628), {
          at: './index.rsh:268:13:application',
          fs: [
            'at ./index.rsh:268:13:application call to [unknown function] (defined at: ./index.rsh:268:13:function exp)',
            'at ./index.rsh:284:20:application call to "res" (defined at: ./index.rsh:279:13:function exp)',
            'at ./index.rsh:279:13:application call to [unknown function] (defined at: ./index.rsh:279:13:function exp)',
          ],
          msg: 'out',
          who: 'docHash',
        });
      } else {
      }

      const v22184 = v9626;
      const v22186 = v2441;
      const v22187 = v9626.totST;
      const v22188 = v9626.totBT;
      const v22189 = v9626.distrNum;
      const v22190 = v9626.saleLocked;
      const v22191 = v9626.docHash;
      const v22192 = v22191[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v22193 = v9626.cv;
      const v22194 = v22193[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v22195 = v22193[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v22196 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v22197 = v22196[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v22198 = stdlib.cast('UInt', 'UInt256', v22197, false, true);
      const v22199 = v9626.ctcMan;
      return;

      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _initSwap3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _initSwap3 expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _initSwap3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc22 = stdlib.T_Tuple([ctc14]);
  const ctc23 = stdlib.T_Tuple([ctc11]);
  const ctc24 = stdlib.T_Tuple([]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc21,
    addCoopId0_324: ctc22,
    addWL0_324: ctc23,
    approveSwap0_324: ctc23,
    cBT0_324: ctc24,
    cCM0_324: ctc23,
    cancelSwap0_324: ctc24,
    claimSwapProceeds0_324: ctc24,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc24,
    remWL0_324: ctc23,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2541 = ctc.selfAddress();
  const v2543 = stdlib.protect(ctc19, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:13:function exp)',
      'at ./index.rsh:80:33:application call to "runinitSwap0_324" (defined at: ./index.rsh:112:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'initSwap',
  });
  const v2544 = v2543[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '0')];
  const v2545 = v2543[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '1')];
  const v2546 = v2543[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '2')];
  const v2552 = stdlib.addressEq(v2541, v2418);
  const v2554 = stdlib.addressEq(v2541, v2515);
  const v2555 = v2552 ? true : v2554;
  const v2556 = v2546 ? v2555 : false;
  const v2557 = v2546 ? false : true;
  const v2558 = v2556 ? true : v2557;
  stdlib.assert(v2558, {
    at: './index.rsh:116:23:application',
    fs: [
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:32:function exp)',
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:13:function exp)',
      'at ./index.rsh:80:33:application call to "runinitSwap0_324" (defined at: ./index.rsh:112:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'if you are not creator or manager, the swap cannot be share issuance type',
    who: 'initSwap',
  });
  const v2559 = stdlib.protect(map9_ctc, await stdlib.mapRef(map9, v2541), null);
  const v2560 = {
    None: 0,
    Some: 1,
  }[v2559[0]];
  const v2561 = stdlib.eq(
    v2560,
    stdlib.checkedBigNumberify('reach standard library:38:41:application', stdlib.UInt_max, '1')
  );
  const v2563 = v2561 ? v2557 : false;
  const v2565 = v2563 ? true : v2546;
  stdlib.assert(v2565, {
    at: './index.rsh:117:23:application',
    fs: [
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:32:function exp)',
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:13:function exp)',
      'at ./index.rsh:80:33:application call to "runinitSwap0_324" (defined at: ./index.rsh:112:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must be a whitelist member',
    who: 'initSwap',
  });
  const v2566 = stdlib.gt(v2544, stdlib.checkedBigNumberify('./index.rsh:118:30:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v2566, {
    at: './index.rsh:118:23:application',
    fs: [
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:32:function exp)',
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:13:function exp)',
      'at ./index.rsh:80:33:application call to "runinitSwap0_324" (defined at: ./index.rsh:112:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must sell at least 1 share token',
    who: 'initSwap',
  });
  const v2567 = stdlib.gt(v2545, stdlib.checkedBigNumberify('./index.rsh:119:32:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v2567, {
    at: './index.rsh:119:23:application',
    fs: [
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:32:function exp)',
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:13:function exp)',
      'at ./index.rsh:80:33:application call to "runinitSwap0_324" (defined at: ./index.rsh:112:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'price must be greater than 0',
    who: 'initSwap',
  });
  const v2568 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v2541), null);
  const v2569 = '-----';
  const v2570 = stdlib.fromSome(v2568, v2569);
  const v2572 = stdlib.digest([ctc6], [v2570]);
  const v2574 = stdlib.digest([ctc6], [v2569]);
  const v2575 = stdlib.digestEq(v2572, v2574);
  const v2579 = 'compl';
  const v2582 = stdlib.digest([ctc6], [v2579]);
  const v2583 = stdlib.digestEq(v2572, v2582);
  const v2584 = v2575 ? true : v2583;
  stdlib.assert(v2584, {
    at: './index.rsh:120:23:application',
    fs: [
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:32:function exp)',
      'at ./index.rsh:115:13:application call to [unknown function] (defined at: ./index.rsh:115:13:function exp)',
      'at ./index.rsh:80:33:application call to "runinitSwap0_324" (defined at: ./index.rsh:112:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'there must be no pending swap',
    who: 'initSwap',
  });
  const v2590 = ['initSwap0_324', v2543];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2590,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:123:28:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:123:32:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'initSwap',
          });
          const v10244 = v9735[stdlib.checkedBigNumberify('./index.rsh:112:13:spread', stdlib.UInt_max, '0')];
          const v10245 = v9735[stdlib.checkedBigNumberify('./index.rsh:112:13:spread', stdlib.UInt_max, '1')];
          const v10246 = v9735[stdlib.checkedBigNumberify('./index.rsh:112:13:spread', stdlib.UInt_max, '2')];
          const v10248 = stdlib.addressEq(v3032, v2418);
          const v10250 = stdlib.addressEq(v3032, v2515);
          const v10251 = v10248 ? true : v10250;
          stdlib.protect(map9_ctc, await stdlib.simMapRef(sim_r, 9, v3032), null);
          stdlib.protect(map6_ctc, await stdlib.simMapRef(sim_r, 6, v3032), null);
          const v10286 = v10251 ? v10246 : false;
          if (v10286) {
            const v10287 = 'apprv';
            await stdlib.simMapSet(sim_r, 6, v3032, v10287);
            await stdlib.simMapSet(sim_r, 7, v3032, true);
            const v10288 = stdlib.protect(map5_ctc, await stdlib.simMapRef(sim_r, 5, v3032), null);
            const v10290 = [
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            ];
            const v10292 = stdlib.fromSome(v10288, v10290);
            const v10293 = stdlib.Array_set(
              v10292,
              stdlib.checkedBigNumberify('./index.rsh:139:38:decimal', stdlib.UInt_max, '0'),
              v10244
            );
            const v10294 = stdlib.Array_set(
              v10293,
              stdlib.checkedBigNumberify('./index.rsh:140:39:decimal', stdlib.UInt_max, '1'),
              v10245
            );
            const v10295 = stdlib.Array_set(
              v10294,
              stdlib.checkedBigNumberify('./index.rsh:141:39:decimal', stdlib.UInt_max, '3'),
              stdlib.checkedBigNumberify('./index.rsh:141:42:decimal', stdlib.UInt_max, '0')
            );
            await stdlib.simMapSet(sim_r, 5, v3032, v10295);
            const v10296 = true;
            const v10297 = await txn1.getOutput('initSwap', 'v10296', ctc8, v10296);

            const v22716 = v2438;
            const v22718 = v2441;
            const v22719 = v2438.totST;
            const v22720 = v2438.totBT;
            const v22721 = v2438.distrNum;
            const v22722 = v2438.saleLocked;
            const v22723 = v2438.docHash;
            const v22724 = v22723[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
            const v22725 = v2438.cv;
            const v22726 = v22725[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
            const v22727 = v22725[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
            const v22728 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
            const v22729 = v22728[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
            const v22730 = stdlib.cast('UInt', 'UInt256', v22729, false, true);
            const v22731 = v2438.ctcMan;
            sim_r.isHalt = false;
          } else {
            const v10305 = 'initd';
            await stdlib.simMapSet(sim_r, 6, v3032, v10305);
            await stdlib.simMapSet(sim_r, 7, v3032, v10246);
            const v10306 = stdlib.protect(map5_ctc, await stdlib.simMapRef(sim_r, 5, v3032), null);
            const v10308 = [
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
              stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
            ];
            const v10310 = stdlib.fromSome(v10306, v10308);
            const v10311 = stdlib.Array_set(
              v10310,
              stdlib.checkedBigNumberify('./index.rsh:139:38:decimal', stdlib.UInt_max, '0'),
              v10244
            );
            const v10312 = stdlib.Array_set(
              v10311,
              stdlib.checkedBigNumberify('./index.rsh:140:39:decimal', stdlib.UInt_max, '1'),
              v10245
            );
            const v10313 = stdlib.Array_set(
              v10312,
              stdlib.checkedBigNumberify('./index.rsh:141:39:decimal', stdlib.UInt_max, '3'),
              stdlib.checkedBigNumberify('./index.rsh:141:42:decimal', stdlib.UInt_max, '0')
            );
            await stdlib.simMapSet(sim_r, 5, v3032, v10313);
            const v10314 = true;
            const v10315 = await txn1.getOutput('initSwap', 'v10314', ctc8, v10314);

            const v22744 = v2438;
            const v22746 = v2441;
            const v22747 = v2438.totST;
            const v22748 = v2438.totBT;
            const v22749 = v2438.distrNum;
            const v22750 = v2438.saleLocked;
            const v22751 = v2438.docHash;
            const v22752 = v22751[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
            const v22753 = v2438.cv;
            const v22754 = v22753[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
            const v22755 = v22753[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
            const v22756 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
            const v22757 = v22756[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
            const v22758 = stdlib.cast('UInt', 'UInt256', v22757, false, true);
            const v22759 = v2438.ctcMan;
            sim_r.isHalt = false;
          }
          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      undefined /* setApiDetails */;
      const v10244 = v9735[stdlib.checkedBigNumberify('./index.rsh:112:13:spread', stdlib.UInt_max, '0')];
      const v10245 = v9735[stdlib.checkedBigNumberify('./index.rsh:112:13:spread', stdlib.UInt_max, '1')];
      const v10246 = v9735[stdlib.checkedBigNumberify('./index.rsh:112:13:spread', stdlib.UInt_max, '2')];
      const v10248 = stdlib.addressEq(v3032, v2418);
      const v10250 = stdlib.addressEq(v3032, v2515);
      const v10251 = v10248 ? true : v10250;
      const v10252 = v10246 ? v10251 : false;
      const v10253 = v10246 ? false : true;
      const v10254 = v10252 ? true : v10253;
      stdlib.assert(v10254, {
        at: './index.rsh:126:24:application',
        fs: [
          'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
        ],
        msg: 'if you are not creator or manager, the swap cannot be share issuance type',
        who: 'initSwap',
      });
      const v10255 = stdlib.protect(map9_ctc, await stdlib.mapRef(map9, v3032), null);
      const v10256 = {
        None: 0,
        Some: 1,
      }[v10255[0]];
      const v10257 = stdlib.eq(
        v10256,
        stdlib.checkedBigNumberify('reach standard library:38:41:application', stdlib.UInt_max, '1')
      );
      const v10259 = v10257 ? v10253 : false;
      const v10261 = v10259 ? true : v10246;
      stdlib.assert(v10261, {
        at: './index.rsh:127:24:application',
        fs: [
          'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
        ],
        msg: 'you must be a whitelist member',
        who: 'initSwap',
      });
      const v10262 = stdlib.gt(v10244, stdlib.checkedBigNumberify('./index.rsh:128:31:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v10262, {
        at: './index.rsh:128:24:application',
        fs: [
          'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
        ],
        msg: 'you must sell at least 1 share token',
        who: 'initSwap',
      });
      const v10263 = stdlib.gt(v10245, stdlib.checkedBigNumberify('./index.rsh:129:33:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v10263, {
        at: './index.rsh:129:24:application',
        fs: [
          'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
        ],
        msg: 'price must be greater than 0',
        who: 'initSwap',
      });
      const v10264 = stdlib.protect(map6_ctc, await stdlib.mapRef(map6, v3032), null);
      const v10265 = '-----';
      const v10266 = stdlib.fromSome(v10264, v10265);
      const v10268 = stdlib.digest([ctc6], [v10266]);
      const v10270 = stdlib.digest([ctc6], [v10265]);
      const v10271 = stdlib.digestEq(v10268, v10270);
      const v10275 = 'compl';
      const v10278 = stdlib.digest([ctc6], [v10275]);
      const v10279 = stdlib.digestEq(v10268, v10278);
      const v10280 = v10271 ? true : v10279;
      stdlib.assert(v10280, {
        at: './index.rsh:130:24:application',
        fs: [
          'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
        ],
        msg: 'there must be no pending swap',
        who: 'initSwap',
      });
      const v10286 = v10251 ? v10246 : false;
      if (v10286) {
        const v10287 = 'apprv';
        await stdlib.mapSet(map6, v3032, v10287);
        await stdlib.mapSet(map7, v3032, true);
        const v10288 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v3032), null);
        const v10290 = [
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        ];
        const v10292 = stdlib.fromSome(v10288, v10290);
        const v10293 = stdlib.Array_set(
          v10292,
          stdlib.checkedBigNumberify('./index.rsh:139:38:decimal', stdlib.UInt_max, '0'),
          v10244
        );
        const v10294 = stdlib.Array_set(
          v10293,
          stdlib.checkedBigNumberify('./index.rsh:140:39:decimal', stdlib.UInt_max, '1'),
          v10245
        );
        const v10295 = stdlib.Array_set(
          v10294,
          stdlib.checkedBigNumberify('./index.rsh:141:39:decimal', stdlib.UInt_max, '3'),
          stdlib.checkedBigNumberify('./index.rsh:141:42:decimal', stdlib.UInt_max, '0')
        );
        await stdlib.mapSet(map5, v3032, v10295);
        const v10296 = true;
        const v10297 = await txn1.getOutput('initSwap', 'v10296', ctc8, v10296);
        if (v1502) {
          stdlib.protect(ctc0, await interact.out(v9735, v10297), {
            at: './index.rsh:113:13:application',
            fs: [
              'at ./index.rsh:113:13:application call to [unknown function] (defined at: ./index.rsh:113:13:function exp)',
              'at ./index.rsh:144:20:application call to "res" (defined at: ./index.rsh:125:13:function exp)',
              'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
            ],
            msg: 'out',
            who: 'initSwap',
          });
        } else {
        }

        const v22716 = v2438;
        const v22718 = v2441;
        const v22719 = v2438.totST;
        const v22720 = v2438.totBT;
        const v22721 = v2438.distrNum;
        const v22722 = v2438.saleLocked;
        const v22723 = v2438.docHash;
        const v22724 = v22723[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
        const v22725 = v2438.cv;
        const v22726 = v22725[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
        const v22727 = v22725[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
        const v22728 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
        const v22729 = v22728[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
        const v22730 = stdlib.cast('UInt', 'UInt256', v22729, false, true);
        const v22731 = v2438.ctcMan;
        return;
      } else {
        const v10305 = 'initd';
        await stdlib.mapSet(map6, v3032, v10305);
        await stdlib.mapSet(map7, v3032, v10246);
        const v10306 = stdlib.protect(map5_ctc, await stdlib.mapRef(map5, v3032), null);
        const v10308 = [
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
          stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        ];
        const v10310 = stdlib.fromSome(v10306, v10308);
        const v10311 = stdlib.Array_set(
          v10310,
          stdlib.checkedBigNumberify('./index.rsh:139:38:decimal', stdlib.UInt_max, '0'),
          v10244
        );
        const v10312 = stdlib.Array_set(
          v10311,
          stdlib.checkedBigNumberify('./index.rsh:140:39:decimal', stdlib.UInt_max, '1'),
          v10245
        );
        const v10313 = stdlib.Array_set(
          v10312,
          stdlib.checkedBigNumberify('./index.rsh:141:39:decimal', stdlib.UInt_max, '3'),
          stdlib.checkedBigNumberify('./index.rsh:141:42:decimal', stdlib.UInt_max, '0')
        );
        await stdlib.mapSet(map5, v3032, v10313);
        const v10314 = true;
        const v10315 = await txn1.getOutput('initSwap', 'v10314', ctc8, v10314);
        if (v1502) {
          stdlib.protect(ctc0, await interact.out(v9735, v10315), {
            at: './index.rsh:113:13:application',
            fs: [
              'at ./index.rsh:113:13:application call to [unknown function] (defined at: ./index.rsh:113:13:function exp)',
              'at ./index.rsh:144:20:application call to "res" (defined at: ./index.rsh:125:13:function exp)',
              'at ./index.rsh:125:13:application call to [unknown function] (defined at: ./index.rsh:125:13:function exp)',
            ],
            msg: 'out',
            who: 'initSwap',
          });
        } else {
        }

        const v22744 = v2438;
        const v22746 = v2441;
        const v22747 = v2438.totST;
        const v22748 = v2438.totBT;
        const v22749 = v2438.distrNum;
        const v22750 = v2438.saleLocked;
        const v22751 = v2438.docHash;
        const v22752 = v22751[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
        const v22753 = v2438.cv;
        const v22754 = v22753[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
        const v22755 = v22753[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
        const v22756 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
        const v22757 = v22756[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
        const v22758 = stdlib.cast('UInt', 'UInt256', v22757, false, true);
        const v22759 = v2438.ctcMan;
        return;
      }
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _optIn3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _optIn3 expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _optIn3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([ctc11]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc24,
    approveSwap0_324: ctc24,
    cBT0_324: ctc21,
    cCM0_324: ctc24,
    cancelSwap0_324: ctc21,
    claimSwapProceeds0_324: ctc21,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc21,
    remWL0_324: ctc24,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2782 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:350:13:application call to [unknown function] (defined at: ./index.rsh:350:13:function exp)',
      'at ./index.rsh:80:33:application call to "runoptIn0_324" (defined at: ./index.rsh:347:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'optIn',
  });
  const v2786 = ['optIn0_324', v2782];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2786,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:353:21:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:353:25:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'optIn',
          });
          await stdlib.simMapSet(sim_r, 8, v3032, true);
          const v10933 = true;
          const v10934 = await txn1.getOutput('optIn', 'v10933', ctc8, v10933);

          const v23276 = v2438;
          const v23278 = v2441;
          const v23279 = v2438.totST;
          const v23280 = v2438.totBT;
          const v23281 = v2438.distrNum;
          const v23282 = v2438.saleLocked;
          const v23283 = v2438.docHash;
          const v23284 = v23283[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v23285 = v2438.cv;
          const v23286 = v23285[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v23287 = v23285[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v23288 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v23289 = v23288[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v23290 = stdlib.cast('UInt', 'UInt256', v23289, false, true);
          const v23291 = v2438.ctcMan;
          sim_r.isHalt = false;

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      undefined /* setApiDetails */;
      await stdlib.mapSet(map8, v3032, true);
      const v10933 = true;
      const v10934 = await txn1.getOutput('optIn', 'v10933', ctc8, v10933);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v10344, v10934), {
          at: './index.rsh:348:13:application',
          fs: [
            'at ./index.rsh:348:13:application call to [unknown function] (defined at: ./index.rsh:348:13:function exp)',
            'at ./index.rsh:357:20:application call to "res" (defined at: ./index.rsh:355:13:function exp)',
            'at ./index.rsh:355:13:application call to [unknown function] (defined at: ./index.rsh:355:13:function exp)',
          ],
          msg: 'out',
          who: 'optIn',
        });
      } else {
      }

      const v23276 = v2438;
      const v23278 = v2441;
      const v23279 = v2438.totST;
      const v23280 = v2438.totBT;
      const v23281 = v2438.distrNum;
      const v23282 = v2438.saleLocked;
      const v23283 = v2438.docHash;
      const v23284 = v23283[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v23285 = v2438.cv;
      const v23286 = v23285[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v23287 = v23285[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v23288 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v23289 = v23288[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v23290 = stdlib.cast('UInt', 'UInt256', v23289, false, true);
      const v23291 = v2438.ctcMan;
      return;

      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      return;
      break;
    }
  }
}
export async function _remWL3(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _remWL3 expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for _remWL3 expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Null;
  const ctc1 = stdlib.T_UInt256;
  const ctc2 = stdlib.T_Data({
    None: ctc0,
    Some: ctc1,
  });
  const ctc3 = stdlib.T_UInt;
  const ctc4 = stdlib.T_Array(ctc3, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc5 = stdlib.T_Data({
    None: ctc0,
    Some: ctc4,
  });
  const ctc6 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '5'));
  const ctc7 = stdlib.T_Data({
    None: ctc0,
    Some: ctc6,
  });
  const ctc8 = stdlib.T_Bool;
  const ctc9 = stdlib.T_Data({
    None: ctc0,
    Some: ctc8,
  });
  const ctc10 = stdlib.T_Data({
    None: ctc0,
    Some: ctc0,
  });
  const ctc11 = stdlib.T_Address;
  const ctc12 = stdlib.T_Token;
  const ctc13 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'));
  const ctc14 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '36'));
  const ctc15 = stdlib.T_Tuple([ctc13, ctc14]);
  const ctc16 = stdlib.T_Bytes(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '96'));
  const ctc17 = stdlib.T_Tuple([ctc16, ctc3, ctc3]);
  const ctc18 = stdlib.T_Object({
    ctcMan: ctc11,
    currDistr: ctc1,
    cv: ctc15,
    distrNum: ctc1,
    docHash: ctc17,
    saleLocked: ctc8,
    totBT: ctc1,
    totST: ctc1,
    wlIndex: ctc3,
  });
  const ctc19 = stdlib.T_Tuple([ctc3, ctc3, ctc8]);
  const ctc20 = stdlib.T_Array(ctc19, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc21 = stdlib.T_Tuple([ctc11]);
  const ctc22 = stdlib.T_Tuple([ctc11, ctc11, ctc1]);
  const ctc23 = stdlib.T_Tuple([ctc14]);
  const ctc24 = stdlib.T_Tuple([]);
  const ctc25 = stdlib.T_Tuple([ctc11, ctc3]);
  const ctc26 = stdlib.T_Tuple([ctc1]);
  const ctc27 = stdlib.T_Tuple([ctc16]);
  const ctc28 = stdlib.T_Data({
    aST0_324: ctc22,
    addCoopId0_324: ctc23,
    addWL0_324: ctc21,
    approveSwap0_324: ctc21,
    cBT0_324: ctc24,
    cCM0_324: ctc21,
    cancelSwap0_324: ctc24,
    claimSwapProceeds0_324: ctc24,
    completeSwap0_324: ctc25,
    dBT0_324: ctc26,
    docHash0_324: ctc27,
    initSwap0_324: ctc19,
    optIn0_324: ctc24,
    remWL0_324: ctc21,
  });

  const map0_ctc = ctc2;
  const map0 = stdlib.newMap({
    ctc: ctc,
    idx: 0,
    isAPI: true,
    ty: map0_ctc,
  });

  const map1_ctc = ctc2;
  const map1 = stdlib.newMap({
    ctc: ctc,
    idx: 1,
    isAPI: true,
    ty: map1_ctc,
  });

  const map2_ctc = ctc2;
  const map2 = stdlib.newMap({
    ctc: ctc,
    idx: 2,
    isAPI: true,
    ty: map2_ctc,
  });

  const map3_ctc = ctc2;
  const map3 = stdlib.newMap({
    ctc: ctc,
    idx: 3,
    isAPI: true,
    ty: map3_ctc,
  });

  const map4_ctc = ctc2;
  const map4 = stdlib.newMap({
    ctc: ctc,
    idx: 4,
    isAPI: true,
    ty: map4_ctc,
  });

  const map5_ctc = ctc5;
  const map5 = stdlib.newMap({
    ctc: ctc,
    idx: 5,
    isAPI: true,
    ty: map5_ctc,
  });

  const map6_ctc = ctc7;
  const map6 = stdlib.newMap({
    ctc: ctc,
    idx: 6,
    isAPI: true,
    ty: map6_ctc,
  });

  const map7_ctc = ctc9;
  const map7 = stdlib.newMap({
    ctc: ctc,
    idx: 7,
    isAPI: true,
    ty: map7_ctc,
  });

  const map8_ctc = ctc9;
  const map8 = stdlib.newMap({
    ctc: ctc,
    idx: 8,
    isAPI: true,
    ty: map8_ctc,
  });

  const map9_ctc = ctc10;
  const map9 = stdlib.newMap({
    ctc: ctc,
    idx: 9,
    isAPI: true,
    ty: map9_ctc,
  });

  const [
    v2418,
    v2422,
    v2438,
    v2441,
    v2477,
    v2478,
    v2479,
    v2481,
    v2502,
    v2504,
    v2507,
    v2509,
    v2511,
    v2512,
    v2513,
    v2515,
  ] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [
    ctc11,
    ctc12,
    ctc18,
    ctc20,
    ctc1,
    ctc1,
    ctc1,
    ctc8,
    ctc17,
    ctc3,
    ctc13,
    ctc14,
    ctc19,
    ctc3,
    ctc1,
    ctc11,
  ]);
  const v2743 = ctc.selfAddress();
  const v2745 = stdlib.protect(ctc21, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: [
      'at ./index.rsh:309:13:application call to [unknown function] (defined at: ./index.rsh:309:13:function exp)',
      'at ./index.rsh:80:33:application call to "runremWL0_324" (defined at: ./index.rsh:306:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'in',
    who: 'remWL',
  });
  const v2749 = stdlib.addressEq(v2743, v2418);
  const v2751 = stdlib.addressEq(v2743, v2515);
  const v2752 = v2749 ? true : v2751;
  stdlib.assert(v2752, {
    at: './index.rsh:310:23:application',
    fs: [
      'at ./index.rsh:309:13:application call to [unknown function] (defined at: ./index.rsh:309:18:function exp)',
      'at ./index.rsh:309:13:application call to [unknown function] (defined at: ./index.rsh:309:13:function exp)',
      'at ./index.rsh:80:33:application call to "runremWL0_324" (defined at: ./index.rsh:306:13:function exp)',
      'at ./index.rsh:80:33:application call to [unknown function] (defined at: ./index.rsh:80:33:function exp)',
    ],
    msg: 'you must be creator or manager',
    who: 'remWL',
  });
  const v2756 = ['remWL0_324', v2745];

  const txn1 = await ctc.sendrecv({
    args: [
      v2418,
      v2422,
      v2438,
      v2441,
      v2477,
      v2478,
      v2479,
      v2481,
      v2502,
      v2504,
      v2507,
      v2509,
      v2511,
      v2512,
      v2513,
      v2515,
      v2756,
    ],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc28],
    pay: [
      stdlib.checkedBigNumberify('./index.rsh:314:22:decimal', stdlib.UInt_max, '0'),
      [[stdlib.checkedBigNumberify('./index.rsh:314:26:decimal', stdlib.UInt_max, '0'), v2422]],
    ],
    sim_p: async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => {
        sim_txn_ctr = sim_txn_ctr.sub(1);
        return sim_txn_ctr;
      };

      stdlib.simMapDupe(sim_r, 0, map0);
      stdlib.simMapDupe(sim_r, 1, map1);
      stdlib.simMapDupe(sim_r, 2, map2);
      stdlib.simMapDupe(sim_r, 3, map3);
      stdlib.simMapDupe(sim_r, 4, map4);
      stdlib.simMapDupe(sim_r, 5, map5);
      stdlib.simMapDupe(sim_r, 6, map6);
      stdlib.simMapDupe(sim_r, 7, map7);
      stdlib.simMapDupe(sim_r, 8, map8);
      stdlib.simMapDupe(sim_r, 9, map9);

      const {
        data: [v3033],
        secs: v3035,
        time: v3034,
        didSend: v1502,
        from: v3032,
      } = txn1;

      switch (v3033[0]) {
        case 'aST0_324': {
          const v3036 = v3033[1];

          break;
        }
        case 'addCoopId0_324': {
          const v3645 = v3033[1];

          break;
        }
        case 'addWL0_324': {
          const v4254 = v3033[1];

          break;
        }
        case 'approveSwap0_324': {
          const v4863 = v3033[1];

          break;
        }
        case 'cBT0_324': {
          const v5472 = v3033[1];

          break;
        }
        case 'cCM0_324': {
          const v6081 = v3033[1];

          break;
        }
        case 'cancelSwap0_324': {
          const v6690 = v3033[1];

          break;
        }
        case 'claimSwapProceeds0_324': {
          const v7299 = v3033[1];

          break;
        }
        case 'completeSwap0_324': {
          const v7908 = v3033[1];

          break;
        }
        case 'dBT0_324': {
          const v8517 = v3033[1];

          break;
        }
        case 'docHash0_324': {
          const v9126 = v3033[1];

          break;
        }
        case 'initSwap0_324': {
          const v9735 = v3033[1];

          break;
        }
        case 'optIn0_324': {
          const v10344 = v3033[1];

          break;
        }
        case 'remWL0_324': {
          const v10953 = v3033[1];
          sim_r.txns.push({
            kind: 'api',
            who: 'remWL',
          });
          const v11549 = v10953[stdlib.checkedBigNumberify('./index.rsh:306:13:spread', stdlib.UInt_max, '0')];
          await stdlib.simMapSet(sim_r, 9, v11549, undefined /* Nothing */);
          const v11555 = true;
          const v11556 = await txn1.getOutput('remWL', 'v11555', ctc8, v11555);

          const v23808 = v2438;
          const v23810 = v2441;
          const v23811 = v2438.totST;
          const v23812 = v2438.totBT;
          const v23813 = v2438.distrNum;
          const v23814 = v2438.saleLocked;
          const v23815 = v2438.docHash;
          const v23816 = v23815[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
          const v23817 = v2438.cv;
          const v23818 = v23817[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
          const v23819 = v23817[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
          const v23820 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v23821 = v23820[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
          const v23822 = stdlib.cast('UInt', 'UInt256', v23821, false, true);
          const v23823 = v2438.ctcMan;
          sim_r.isHalt = false;

          break;
        }
      }
      return sim_r;
    },
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [
      ctc11,
      ctc12,
      ctc18,
      ctc20,
      ctc1,
      ctc1,
      ctc1,
      ctc8,
      ctc17,
      ctc3,
      ctc13,
      ctc14,
      ctc19,
      ctc3,
      ctc1,
      ctc11,
      ctc28,
    ],
    waitIfNotPresent: false,
  });
  const {
    data: [v3033],
    secs: v3035,
    time: v3034,
    didSend: v1502,
    from: v3032,
  } = txn1;
  switch (v3033[0]) {
    case 'aST0_324': {
      const v3036 = v3033[1];
      return;
      break;
    }
    case 'addCoopId0_324': {
      const v3645 = v3033[1];
      return;
      break;
    }
    case 'addWL0_324': {
      const v4254 = v3033[1];
      return;
      break;
    }
    case 'approveSwap0_324': {
      const v4863 = v3033[1];
      return;
      break;
    }
    case 'cBT0_324': {
      const v5472 = v3033[1];
      return;
      break;
    }
    case 'cCM0_324': {
      const v6081 = v3033[1];
      return;
      break;
    }
    case 'cancelSwap0_324': {
      const v6690 = v3033[1];
      return;
      break;
    }
    case 'claimSwapProceeds0_324': {
      const v7299 = v3033[1];
      return;
      break;
    }
    case 'completeSwap0_324': {
      const v7908 = v3033[1];
      return;
      break;
    }
    case 'dBT0_324': {
      const v8517 = v3033[1];
      return;
      break;
    }
    case 'docHash0_324': {
      const v9126 = v3033[1];
      return;
      break;
    }
    case 'initSwap0_324': {
      const v9735 = v3033[1];
      return;
      break;
    }
    case 'optIn0_324': {
      const v10344 = v3033[1];
      return;
      break;
    }
    case 'remWL0_324': {
      const v10953 = v3033[1];
      undefined /* setApiDetails */;
      const v11549 = v10953[stdlib.checkedBigNumberify('./index.rsh:306:13:spread', stdlib.UInt_max, '0')];
      const v11550 = stdlib.addressEq(v3032, v2418);
      const v11552 = stdlib.addressEq(v3032, v2515);
      const v11553 = v11550 ? true : v11552;
      stdlib.assert(v11553, {
        at: './index.rsh:317:24:application',
        fs: [
          'at ./index.rsh:316:13:application call to [unknown function] (defined at: ./index.rsh:316:13:function exp)',
        ],
        msg: 'you must be creator or manager',
        who: 'remWL',
      });
      await stdlib.mapSet(map9, v11549, undefined /* Nothing */);
      const v11555 = true;
      const v11556 = await txn1.getOutput('remWL', 'v11555', ctc8, v11555);
      if (v1502) {
        stdlib.protect(ctc0, await interact.out(v10953, v11556), {
          at: './index.rsh:307:13:application',
          fs: [
            'at ./index.rsh:307:13:application call to [unknown function] (defined at: ./index.rsh:307:13:function exp)',
            'at ./index.rsh:320:20:application call to "res" (defined at: ./index.rsh:316:13:function exp)',
            'at ./index.rsh:316:13:application call to [unknown function] (defined at: ./index.rsh:316:13:function exp)',
          ],
          msg: 'out',
          who: 'remWL',
        });
      } else {
      }

      const v23808 = v2438;
      const v23810 = v2441;
      const v23811 = v2438.totST;
      const v23812 = v2438.totBT;
      const v23813 = v2438.distrNum;
      const v23814 = v2438.saleLocked;
      const v23815 = v2438.docHash;
      const v23816 = v23815[stdlib.checkedBigNumberify('./index.rsh:100:28:application', stdlib.UInt_max, '1')];
      const v23817 = v2438.cv;
      const v23818 = v23817[stdlib.checkedBigNumberify('./index.rsh:101:42:array ref', stdlib.UInt_max, '0')];
      const v23819 = v23817[stdlib.checkedBigNumberify('./index.rsh:101:55:array ref', stdlib.UInt_max, '1')];
      const v23820 = v2441[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v23821 = v23820[stdlib.checkedBigNumberify('./index.rsh:102:46:application', stdlib.UInt_max, '0')];
      const v23822 = stdlib.cast('UInt', 'UInt256', v23821, false, true);
      const v23823 = v2438.ctcMan;
      return;

      break;
    }
  }
}
export async function aST(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for aST expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for aST expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _aST3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function addCoopId(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for addCoopId expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for addCoopId expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _addCoopId3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function addWL(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for addWL expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for addWL expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _addWL3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function approveSwap(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(
      new Error(`The backend for approveSwap expects to receive a contract as its first argument.`)
    );
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for approveSwap expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _approveSwap3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function cBT(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for cBT expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for cBT expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _cBT3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function cCM(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for cCM expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for cCM expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _cCM3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function cancelSwap(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for cancelSwap expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for cancelSwap expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _cancelSwap3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function claimSwapProceeds(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(
      new Error(`The backend for claimSwapProceeds expects to receive a contract as its first argument.`)
    );
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for claimSwapProceeds expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _claimSwapProceeds3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function completeSwap(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(
      new Error(`The backend for completeSwap expects to receive a contract as its first argument.`)
    );
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for completeSwap expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _completeSwap3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function dBT(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for dBT expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for dBT expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _dBT3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function docHash(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for docHash expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for docHash expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _docHash3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function initSwap(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for initSwap expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for initSwap expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _initSwap3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function optIn(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for optIn expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for optIn expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _optIn3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
export async function remWL(ctcTop, interact) {
  if (typeof ctcTop !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for remWL expects to receive a contract as its first argument.`));
  }
  if (typeof interact !== 'object') {
    return Promise.reject(
      new Error(`The backend for remWL expects to receive an interact object as its second argument.`)
    );
  }
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep();
  if (step == 3) {
    return _remWL3(ctcTop, interact);
  }
  throw stdlib.apiStateMismatchError(
    { _stateSourceMap },
    [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')],
    stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step)
  );
}
const _ALGO = {
  ABI: {
    impure: [
      `aST(address,address,uint256)byte`,
      `addCoopId(byte[36])byte`,
      `addWL(address)byte`,
      `approveSwap(address)byte`,
      `cBT()uint256`,
      `cCM(address)byte`,
      `cancelSwap()byte`,
      `claimSwapProceeds()byte`,
      `completeSwap(address,uint64)byte`,
      `dBT(uint256)byte`,
      `docHash(byte[96])byte`,
      `initSwap(uint64,uint64,byte)byte`,
      `optIn()byte`,
      `remWL(address)byte`,
    ],
    pure: [
      `claimSTBT(address)(uint256,uint256)`,
      `saleLocked()byte`,
      `totSTBTD()(uint256,uint256,uint256)`,
      `totSTBTDRec(address)(uint256,uint256,uint256)`,
      `vBtBal()(uint256,uint64)`,
      `vCcCm()(address,address)`,
      `vCurrSwap(address)(uint64,uint64,uint64,byte[5],uint64,byte)`,
      `vHash()(byte[96],uint64,uint64)`,
      `vOptedIn(address)byte`,
      `vcVersion()(byte[4],byte[36])`,
      `wlMember(address)byte`,
    ],
    sigs: [
      `aST(address,address,uint256)byte`,
      `addCoopId(byte[36])byte`,
      `addWL(address)byte`,
      `approveSwap(address)byte`,
      `cBT()uint256`,
      `cCM(address)byte`,
      `cancelSwap()byte`,
      `claimSTBT(address)(uint256,uint256)`,
      `claimSwapProceeds()byte`,
      `completeSwap(address,uint64)byte`,
      `dBT(uint256)byte`,
      `docHash(byte[96])byte`,
      `initSwap(uint64,uint64,byte)byte`,
      `optIn()byte`,
      `remWL(address)byte`,
      `saleLocked()byte`,
      `totSTBTD()(uint256,uint256,uint256)`,
      `totSTBTDRec(address)(uint256,uint256,uint256)`,
      `vBtBal()(uint256,uint64)`,
      `vCcCm()(address,address)`,
      `vCurrSwap(address)(uint64,uint64,uint64,byte[5],uint64,byte)`,
      `vHash()(byte[96],uint64,uint64)`,
      `vOptedIn(address)byte`,
      `vcVersion()(byte[4],byte[36])`,
      `wlMember(address)byte`,
    ],
  },
  GlobalNumByteSlice: 7,
  GlobalNumUint: 0,
  LocalNumByteSlice: 2,
  LocalNumUint: 0,
  appApproval: `ByA2AAMBIAhABGAYEQaZAhACBdEB1J2TzAjg5cOwDOO5zasO2I6Z4A6fk4HRD+LOidYOsILfsAyamI65DJQF7oKunwqht9rXCqKmnpsM+gKaA7oD8eGT4Qjd0eGYCev2jfsF3ZaWgwiK0sKbCLytx6sIl5z91Ab95qmlB7QF2Nv8mQP5hIqRBcn8mLwF0wSXxMGvAZz4g4gC////////////ASjBAukC+wQHDX8mDAEBAQABAwECAQQBBQAFLS0tLS0BBwIBASCf0CYEl4tw6mkMuSyiIXqYTjqXWt+37US2HyWYEUp9PwYBYXBwcnYiNQAxGEETXycGZEkiWzUBSSEEWzUCIQxbNQgxGSQSQQAcMQAhD69LASlLAlcAf2ZLAShLAld/UmZISEITEjYaABdJQQRDIjUEJDUGSSEQDEACo0khEQxAATdJIRIMQAB3SSETDEAAMUkhFAxAABQhFBJENhoBNf8qNP9QIQWvUEIEeyETEkQ2GgE1/4ABDTT/UCEFr1BCBGVJIRUMQAAaIRUSRDYaATYaAlA1/4ABCDT/UIE4r1BCBEQhEhJENhoBNhoCUDYaA1A1/4ABCzT/UIFPr1BCBCZJIRYMQABeSSEXDEAALiEXEkQ0ASMSRClkKGRQK2RQKmRQJwRkUCcFZFBJNQMhGCVYNANXIAhQNQdCEkshFhJENAEjEkQpZChkUCtkUCpkUCcEZFAnBWRQSTUDgdoDJFg1B0ISIiEREkQ0ASMSRDYaATX/MgM0/4gSN1dCIUk1/lcBIDT+IlVNMgM0/4gSIldjIUk1/lcBIDT+IlVNUDIDNP+IEgxXhCFJNf5XASA0/iJVTVA1B0IRzkkhGQxAAMlJIRoMQACtSSEbDEAAcCEbEkQ0ASMSRDYaATX/MgM0/4gRzlelIUk1/VcBIDT9IlVNSTX+VwAINP5XCAhQNP5XGAhQJwc0/4gRp1fGBkk1/VcBBTT9IlVNUDT+VxAIUCI0/4gRjFfMAkk1/VcBARc0/SJVTRZRBwhQNQdCEUkhGhJENAEjEkQpZChkUCtkUCpkUCcEZFAnBWRQSTUDIRwlWDQDIR0lWFA0AyEeJVhQNQdCERMhGRJEJwY1/4ABBjT/UCEHr1BCAp1JIR8MQABkSSEgDEAAHyEgEkQ0ASMSRDYaAYgRC1fQASJVJBIWUQcINQdCENEhHxJENAEjEkQ2GgE1/zIDNP+IEOZXACFJNf5XASA0/iJVTTIDNP+IENFXISFJNf5XASA0/iJVTVA1B0IQkyEQEkQ0ASMSRClkKGRQK2RQKmRQJwRkUCcFZFBJNQOB2wOBcFg1B0IQaUkhIQxAAMtJISIMQABMSSEjDEAAMUkhJAxAABQhJBJENhoBNf8rNP9QIQWvUEIB2CEjEkQ2GgE1/4ABCTT/UCEFr1BCAcIhIhJENhoBNf8oNP9QgTyvUEIBrkkhJQxAAF1JISYMQAAuISYSRDQBIxJEKWQoZFArZFAqZFAnBGRQJwVkUEk1A1cAIDQDISclWFA1B0IP0yElEkQ0ASMSRCI2GgGID+1XzgJJNf9XAQEXNP8iVU0WUQcINQdCD6shIRJEJwY1/ycINP9QIQevUEIBNkkhKAxAAGdJISkMQAAuSSEqDEAAEiEqEkQ2GgE1/4ABCjT/UEIBDyEpEkQnBjX/gAEMNP9QIQevUEIA+iEoEkQ0ASMSRClkKGRQK2RQKmRQJwRkUCcFZFBJNQMhKyEGWDQDgdcEgSRYUDUHQg8pSSEsDEAAMEkhLQxAABUhLRJENhoBNf8nBTT/UCEFr1BCAKUhLBJEJwY1/ycENP9QIQevUEIAkYH1+t+SARJENhoBNhoCUDYaA1A1/yk0/1BCAHU2GgIXNQQ2GgM2GgEXSSENDEAMKUkjDEAAWiMSRCM0ARJENARJIhJMNAISEUQpZChkUCtkUCpkUCcEZFAnBWRQSTUDVwAgNf+ABKdlxLSwMgYhLg9ENP8xABJENP80AyVbNAMhLyEwWDIGNAMhMSEJWEINKkgjNAESRDQESSISTDQCEhFEKWQoZFArZFAqZFAnBGRQJwVkUEk1A0lKSkpKVwAgNf8lWzX+IS8hMFg1/SExIQlYNfwhHCVYNfshHiVYNfqBywRbNfkhMiEJWDX4gYwFWzX3ISclWDX2STUFNfWABOO40ZU09VCwMgYhLgxENPUiVUkhMwxABzZJgQoMQAKuSYEMDEAAk0khNAxAAFAhNBJENPVXASA19DEANP8SMQA09hIRRDT0SYgN0ilc0EsBKUsCVwB/ZksBKEsCV39SZkhIgAkAAAAAAAAtIwGwKDUHNP80/jT9MgY0/EIMPUgxADEAiA2XJwlczksBKUsCVwB/ZksBKEsCV39SZkhIgAkAAAAAAAAqtQGwKDUHNP80/jT9MgY0/EIMAUmBCwxAAcpINPVXARE19DT0Ils18zT0IQRbNfI09FcQARc18TEANP8SMQA09hIRNfA08RQ17zTxNPAQNO8RRDEAiA0fV9ABIlUkEjTvEDTxEUQ08yINRDTyIg1EJwdJNe4xAIgM/VfGBkk17FcBBTTsIlVNAUk17TTuARI07ScKEhFENPA08RBBAJ0xADEAiAzRJwtcxksBKUsCVwB/ZksBKEsCV39SZkhIMQAxAIgMsicJXMxLASlLAlcAf2ZLAShLAld/UmZISDEAMQCIDJMoMgMxAIgMi1elIUk17FcBIDTsIlVNNPMWXAA08hZcCCEEr1wYUFylSwEpSwJXAH9mSwEoSwJXf1JmSEiACQAAAAAAACg4AbAoNQc0/zT+NP0yBjT8QgrZMQAxAIgMNIAGAWluaXRkXMZLASlLAlcAf2ZLAShLAld/UmZISDEAMQCIDA8oNPEWUQcIUFzMSwEpSwJXAH9mSwEoSwJXf1JmSEgxADEAiAvqKDIDMQCIC+JXpSFJNexXASA07CJVTTTzFlwANPIWXAghBK9cGFBcpUsBKUsCVwB/ZksBKEsCV39SZkhIgAkAAAAAAAAoSgGwKDUHNP80/jT9MgY0/EIKMEg09VcBYDX0NPkiEkQxADT/EjEANPYSEUSACQAAAAAAACWbAbAoNQc0/zT+NP009DT5JAgWUDIGFlBciDIGNPxCCe1JIQQMQAPvSYEJDEAAlEg09VcBIDX0NPRJNfNJkyEFDkQhCFs18jTyNP6IC1ExADT/EjEANPYSEUQ08iINRIAJAAAAAAAAIyYBsCg1BzT/NP40/TQDIR0lWDTzoIgLP1z5NPqAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoIgLFVxoNPNcIDIGNPw0+DT3NPIIFlwAXABCCUtINPVXASg19LEisgEhCrIQNAiyGLM09FcAIDXzNPQlWzXyMgM084gKhFelIUk18FcBIDTwIlVNNfE08jTxIQRbCzXwNPw0+DT3NPAIFlwAXAA17zTwNP6ICoIxADTzE0Q08iINRDTxIls17jTyNO4ORDEAiAo3V9ABIlUkEkQnBzTziAooV8YGSTXsVwEFNOwiVU0BNe2ABXBhcnRsNew07YAgc01Vgx2FHebe9jpoxdjMiJk+rqCTCMGDIdksbrT86gASNO007AESEUQhCK808hZQNesxADEAiAnRKDIDMQCICclXACFJNepXASA06iJVTTTroIgKBFBcAEsBKUsCVwB/ZksBKEsCV39SZkhIMQAxAIgJlygyAzEAiAmPV0IhSTXqVwEgNOoiVU0066CICcpQXEJLASlLAlcAf2ZLAShLAld/UmZISDTxNPA08SEMWwgWXBA08SEIWzTyCBZcGDTuNPIJFlwANeo080mICTwoNOpQXKVLASlLAlcAf2ZLAShLAld/UmZISDTqIlsiEkEA4jTzSYgJE4AGAWNvbXBsXMZLASlLAlcAf2ZLAShLAld/UmZISIAJAAAAAAAAIIMBsCg1ByI084gI4FfMAkk16VcBARc06SJVTUEAGDT/NP40/SELNPs066CICQ1dMgY070IHVDTzSYgIsCgyAzTziAioVwAhSTXpVwEgNOkiVU0066GICONQXABLASlLAlcAf2ZLAShLAld/UmZISDTzSYgIdygyAzTziAhvV0IhSTXpVwEgNOkiVU0066GICKpQXEJLASlLAlcAf2ZLAShLAld/UmZISDT/NP40/TIGNO9CBtU080mICDEoNOxQXMZLASlLAlcAf2ZLAShLAld/UmZISIAJAAAAAAAAIJ0BsCg1ByI084gIAlfMAkk16VcBARc06SJVTUEAGDT/NP40/SELNPs066CICC9dMgY070IGdjTzSYgH0igyAzTziAfKVwAhSTXpVwEgNOkiVU0066GICAVQXABLASlLAlcAf2ZLAShLAld/UmZISDTzSYgHmSgyAzTziAeRV0IhSTXpVwEgNOkiVU0066GIB8xQXEJLASlLAlcAf2ZLAShLAld/UmZISDT/NP40/TIGNO9CBfdIMgMxAIgHUVelIUk181cBIDTzIlVNSTX0IQxbSTXzIg1ENPc08w9EsSKyATTzshIhBrIQMQCyFDT+shGzMQAxAIgHFSg09CEEr1wQUFylSwEpSwJXAH9mSwEoSwJXf1JmSEiACQAAAAAAAB3gAbAoNQc0/zT+NP0yBjT8NPg09zTzCRZcAFwAQgVsSSMMQAKWSSEODEAA40khCgxAAKhIJwdJNfQxAIgGr1fGBkk18lcBBTTyIlVNAUk18zT0ARM08ycKExBEMQAxAIgGiyg09FBcxksBKUsCVwB/ZksBKEsCV39SZkhIMQAxAIgGaigyAzEAiAZiV6UhSTXyVwEgNPIiVU0hBK9cACEEr1wIIQSvXBhQXKVLASlLAlcAf2ZLAShLAld/UmZISIAJAAAAAAAAG10BsCg1BzT/NP40/TIGNPxCBLBINPVXASA19DEANP8SMQA09hIRRIAJAAAAAAAAGNcBsCg1BzT/NP40/TT0XAAyBjT8QgR8SSEGDEABGUgxAIgF0VfQASJVJBJEMgMxAIgFwleEIUk19FcBIDT0IlVNNPqkRDQDIRglWDIDpUQ0+zIDpUQyAzEAiAWZV0IhSTXzVwEgNPMiVU019DT7NPSnRDT0MgOlRDT0NP1XICCjiAXBNPuiiAW7STXzSZMhBQ5EIQhbSTXyNPcORLEisgE08rISIQayEDEAshQ0/rIRszEAMQCIBT0oMgMxAIgFNVdjIUk18VcBIDTxIlVNNPOgiAVwUFxjSwEpSwJXAH9mSwEoSwJXf1JmSEgxADEAiAUDKDT6UFyESwEpSwJXAH9mSwEoSwJXf1JmSEiACAAAAAAAABZYNPNQsDTzNQc0/zT+NP0yBjT8NPg09zTyCRZcAFwAQgNcSDT1VwEgNfQ09DXzMQA0/xIxADT2EhFEJwc084gEn1fGBkk18lcBBTTyIlVNAYAglU8rZRR0whK9qAH3FHdYYnk+yw5QM1ptS9PxYUnUmAkSRDTzSYgEZicLXMZLASlLAlcAf2ZLAShLAld/UmZISIAJAAAAAAAAE9YBsCg1BzT/NP40/TIGNPxCAtBJJAxAAIRJIQ0MQABNSDT1VwEgNfQxADT/EjEANPYSEUQ09EmIBAsoXNBLASlLAlcAf2ZLAShLAld/UmZISIAJAAAAAAAAEVoBsCg1BzT/NP40/TIGNPxCAnZINPVXASQ19IAJAAAAAAAADusBsCg1BzT/NP40/TQDISshBlg09FBcQDIGNPxCAkZINPVXAWA19DT0VwAgNfM09FcgIDXyNPRXQCA18TTzNP8SNPM09hIRRDTxMgOlRDTySYgDcyhc0EsBKUsCVwB/ZksBKEsCV39SZkhINPJJiANWKDIDNPKIA05XACFJNfBXASA08CJVTTTxoIgDiVBcAEsBKUsCVwB/ZksBKEsCV39SZkhINPJJiAMdKDIDNPKIAxVXQiFJNfBXASA08CJVTTTxoIgDUFBcQksBKUsCVwB/ZksBKEsCV39SZkhIgAkAAAAAAAAMegGwKDUHNP80/jT9IQs0+zTxoIgDGl0yBjT8QgFhIhJEgcCaDIgC0LEisgEhCrIQIrIYgAYHMQAyCRKyHicIsh+ztD01CCI0ARJENARJIhJMNAISEURJNQVJSklXAIA1/1eAARc1/leBIDX9gaEBWzX8V6kgNfuABJow+R00/1A0/hZRBwhQNP1QNPwWUDT7ULAhCa81+oGgjQaIAlqxIrIBIrISIQayEDIKshQ0/LIRszEANPw0/TIDUIAoMi4wMmNvb3BlcmF0aXZJZGNvb3BlcmF0aXZJZGNvb3BlcmF0aXZJZFAyA1CAcGFqZG5hZWluYXdpbmRpYWVuZ3RuaWZyandyaXRuaXF3cm5pcmVmaW5kaW5pZ2FqZG5hZWluYXdpZGlhZW5ndG5paXRuaXF3cm5pcmVmaW5kaW5pZ2Z1YWViZnViYXd1cgAAAAAAAAAAAAAAAAAAAABQNP4WUQcIUDIDUDIDUCEEr1AyBjT6SVcAESEEr1wAXABCAAA1/zX+Nf01/DX7NP0hCyVYNfo0/Vf5IDX5NP1XaCA1+DT9V/gBFzX3NP1XiHBJNfYhB1s19TT9V0AoSTX0VwAENfM09FcEJDXyNP9XABFJNfEiWzXwIQivNPAWUDXvNP1XACA17jT7NPwWUDT9UDT/UDT6UDT5UDT4UDT3FlEHCFA09lA09RZQNPNQNPJQNPFQNPAWUDTvUDTuUClLAVcAf2coSwFXf39nK0sBV/5/ZypLAYH9AiE1WGcnBEsBgfwDITVYZycFSwEhMoFZWGdIIzUBMgY1AkIALTEZIQ4SRLEisgEhCrIQNAiyGCEOshmzsSKyASKyCCSyEDIJsgkyCrIHs0IABTEZIhJEJwY0ARY0AhY0CBZQUGc0BkEACoAEFR98dTQHULA0AEkkCDIEEkQxFhJEJEMxGSISREL/3yIxNBJEITMxNRJEIjE2EkQhDTE3EkQiNQEiNQIiNQhC/6VJMRhhQAAFSCEPr4lJKWJLAShiUExIiTQASUokCDUAOAcyChJEOBAkEkQ4CBJEiTQASUpJJAg1ADgUMgoSRDgQIQYSRDgRTwISRDgSEkSJSRUlTAmvTFCJ`,
  appClear: `Bw==`,
  companionInfo: {
    api_completeSwap: 1,
  },
  extraPages: 2,
  mapDataKeys: 2,
  mapDataSize: 209,
  stateKeys: 6,
  stateSize: 724,
  unsupported: [],
  version: 11,
  warnings: [],
};
export const _stateSourceMap = {
  2: {
    at: './index.rsh:450:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module',
  },
  3: {
    at: './index.rsh:80:33:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module',
  },
};
export const _Connectors = {
  ALGO: _ALGO,
};
export const _Participants = {
  Creator: Creator,
  aST: aST,
  addCoopId: addCoopId,
  addWL: addWL,
  approveSwap: approveSwap,
  cBT: cBT,
  cCM: cCM,
  cancelSwap: cancelSwap,
  claimSwapProceeds: claimSwapProceeds,
  completeSwap: completeSwap,
  dBT: dBT,
  docHash: docHash,
  initSwap: initSwap,
  optIn: optIn,
  remWL: remWL,
};
export const _APIs = {
  aST: aST,
  addCoopId: addCoopId,
  addWL: addWL,
  approveSwap: approveSwap,
  cBT: cBT,
  cCM: cCM,
  cancelSwap: cancelSwap,
  claimSwapProceeds: claimSwapProceeds,
  completeSwap: completeSwap,
  dBT: dBT,
  docHash: docHash,
  initSwap: initSwap,
  optIn: optIn,
  remWL: remWL,
};
