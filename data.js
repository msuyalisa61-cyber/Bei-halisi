const marketData = {
  arusha: {
    crops: {
      maize: { marketPrice: 148000, lastWeek: 138000, productionCost: 92000, weekly: [144000, 146000, 147500, 149000, 148000], monthly: [132000, 136000, 141000, 146000, 148000], yearly: [98000, 110000, 119000, 130000, 148000], trend: 1 },
      beans: { marketPrice: 175000, lastWeek: 170000, productionCost: 98000, weekly: [168000, 171000, 174500, 176000, 175000], monthly: [154000, 160000, 166000, 172000, 175000], yearly: [120000, 128000, 142000, 159000, 175000], trend: 1 },
      rice: { marketPrice: 210000, lastWeek: 205000, productionCost: 120000, weekly: [198000, 202000, 206000, 209000, 210000], monthly: [182000, 188000, 193000, 201000, 210000], yearly: [150000, 160000, 176000, 193000, 210000], trend: 1 },
      cassava: { marketPrice: 120000, lastWeek: 126000, productionCost: 76000, weekly: [128000, 129000, 124000, 121000, 120000], monthly: [136000, 132000, 128000, 123000, 120000], yearly: [98000, 103000, 109000, 114000, 120000], trend: -1 },
      millet: { marketPrice: 136000, lastWeek: 128000, productionCost: 85000, weekly: [127000, 129000, 132000, 135000, 136000], monthly: [120000, 122500, 128000, 133000, 136000], yearly: [98000, 105000, 112000, 125000, 136000], trend: 1 }
    }
  },
  mbeya: {
    crops: {
      maize: { marketPrice: 155000, lastWeek: 146000, productionCost: 96000, weekly: [148000, 150500, 152000, 154000, 155000], monthly: [135000, 140000, 145000, 151000, 155000], yearly: [105000, 117000, 128000, 141000, 155000], trend: 1 },
      beans: { marketPrice: 184000, lastWeek: 180000, productionCost: 102000, weekly: [176000, 181000, 183500, 185000, 184000], monthly: [165000, 171000, 177000, 181000, 184000], yearly: [124000, 138000, 154000, 170000, 184000], trend: 1 },
      rice: { marketPrice: 225000, lastWeek: 220000, productionCost: 131000, weekly: [212000, 216000, 219000, 223000, 225000], monthly: [195000, 200000, 208000, 216000, 225000], yearly: [155000, 165000, 181000, 201000, 225000], trend: 1 },
      cassava: { marketPrice: 128000, lastWeek: 132000, productionCost: 81000, weekly: [134000, 133000, 131000, 129000, 128000], monthly: [138000, 136000, 133000, 130000, 128000], yearly: [102000, 106000, 110000, 119000, 128000], trend: -1 },
      millet: { marketPrice: 142000, lastWeek: 135000, productionCost: 90000, weekly: [131000, 136000, 139000, 141000, 142000], monthly: [124000, 127000, 132000, 137000, 142000], yearly: [99000, 108000, 118000, 130000, 142000], trend: 1 }
    }
  },
  dodoma: {
    crops: {
      maize: { marketPrice: 142000, lastWeek: 136000, productionCost: 93000, weekly: [138000, 139500, 141000, 143000, 142000], monthly: [126000, 130000, 134000, 139000, 142000], yearly: [95000, 106000, 117000, 129000, 142000], trend: 1 },
      beans: { marketPrice: 172000, lastWeek: 166000, productionCost: 96000, weekly: [162000, 164000, 168000, 171000, 172000], monthly: [150000, 156000, 160000, 166000, 172000], yearly: [118000, 129000, 144000, 158000, 172000], trend: 1 },
      rice: { marketPrice: 204000, lastWeek: 198000, productionCost: 118000, weekly: [190000, 194000, 199000, 202000, 204000], monthly: [180000, 186000, 192000, 198000, 204000], yearly: [148000, 160000, 175000, 191000, 204000], trend: 1 },
      cassava: { marketPrice: 116000, lastWeek: 122000, productionCost: 73000, weekly: [124000, 123000, 119000, 117000, 116000], monthly: [130000, 128000, 124000, 120000, 116000], yearly: [96000, 100000, 105000, 110000, 116000], trend: -1 },
      millet: { marketPrice: 130000, lastWeek: 123000, productionCost: 82000, weekly: [121000, 124000, 127000, 129000, 130000], monthly: [115000, 118000, 122000, 127000, 130000], yearly: [91000, 99000, 106000, 118000, 130000], trend: 1 }
    }
  },
  'dar-es-salaam': {
    crops: {
      maize: { marketPrice: 160000, lastWeek: 149000, productionCost: 97000, weekly: [150000, 154000, 157000, 159000, 160000], monthly: [137000, 142000, 149000, 156000, 160000], yearly: [108000, 121000, 132000, 146000, 160000], trend: 1 },
      beans: { marketPrice: 190000, lastWeek: 184000, productionCost: 109000, weekly: [180000, 183000, 186500, 188000, 190000], monthly: [168000, 174000, 179000, 185000, 190000], yearly: [128000, 141000, 156000, 173000, 190000], trend: 1 },
      rice: { marketPrice: 232000, lastWeek: 227000, productionCost: 135000, weekly: [220000, 224000, 228500, 231000, 232000], monthly: [201000, 207000, 214000, 222000, 232000], yearly: [160000, 171000, 189000, 209000, 232000], trend: 1 },
      cassava: { marketPrice: 132000, lastWeek: 138000, productionCost: 84000, weekly: [140000, 139000, 136000, 134000, 132000], monthly: [145000, 142000, 138000, 134000, 132000], yearly: [106000, 110000, 116000, 120000, 132000], trend: -1 },
      millet: { marketPrice: 146000, lastWeek: 139000, productionCost: 91000, weekly: [136000, 139000, 142000, 144000, 146000], monthly: [128000, 131000, 136000, 140000, 146000], yearly: [100000, 110000, 122000, 135000, 146000], trend: 1 }
    }
  },
  morogoro: {
    crops: {
      maize: { marketPrice: 152000, lastWeek: 143000, productionCost: 95000, weekly: [146000, 149000, 151000, 153000, 152000], monthly: [132000, 138000, 145000, 150000, 152000], yearly: [103000, 115000, 127000, 139000, 152000], trend: 1 },
      beans: { marketPrice: 178000, lastWeek: 173000, productionCost: 100000, weekly: [170000, 173000, 175500, 177500, 178000], monthly: [158000, 165000, 170000, 175000, 178000], yearly: [120000, 132000, 147000, 163000, 178000], trend: 1 },
      rice: { marketPrice: 220000, lastWeek: 214000, productionCost: 129000, weekly: [208000, 211000, 214500, 218000, 220000], monthly: [192000, 198000, 204000, 212000, 220000], yearly: [150000, 161000, 177000, 196000, 220000], trend: 1 },
      cassava: { marketPrice: 126000, lastWeek: 131000, productionCost: 80000, weekly: [133000, 132000, 129000, 127000, 126000], monthly: [136000, 134000, 131000, 128000, 126000], yearly: [101000, 105000, 110000, 118000, 126000], trend: -1 },
      millet: { marketPrice: 138000, lastWeek: 131000, productionCost: 88000, weekly: [129000, 132000, 135000, 137000, 138000], monthly: [120000, 124000, 129000, 134000, 138000], yearly: [98000, 107000, 115000, 128000, 138000], trend: 1 }
    }
  },
  iringa: {
    crops: {
      maize: { marketPrice: 149000, lastWeek: 141000, productionCost: 92000, weekly: [143000, 146000, 147500, 148000, 149000], monthly: [129000, 134000, 139000, 145000, 149000], yearly: [100000, 111000, 123000, 136000, 149000], trend: 1 },
      beans: { marketPrice: 176000, lastWeek: 171000, productionCost: 99000, weekly: [167000, 170000, 173500, 175000, 176000], monthly: [156000, 162000, 167000, 172000, 176000], yearly: [119000, 131000, 145000, 160000, 176000], trend: 1 },
      rice: { marketPrice: 214000, lastWeek: 208000, productionCost: 126000, weekly: [202000, 205000, 209000, 212000, 214000], monthly: [188000, 194000, 201000, 209000, 214000], yearly: [152000, 162000, 178000, 196000, 214000], trend: 1 },
      cassava: { marketPrice: 122000, lastWeek: 127000, productionCost: 78000, weekly: [129000, 128000, 125000, 123000, 122000], monthly: [133000, 130000, 127000, 124000, 122000], yearly: [100000, 104000, 109000, 115000, 122000], trend: -1 },
      millet: { marketPrice: 134000, lastWeek: 127000, productionCost: 86000, weekly: [126000, 129000, 132000, 133000, 134000], monthly: [118000, 121000, 126000, 130000, 134000], yearly: [94000, 102000, 111000, 123000, 134000], trend: 1 }
    }
  },
  manyara: {
    crops: {
      maize: { marketPrice: 150000, lastWeek: 142000, productionCost: 94000, weekly: [144000, 147000, 149000, 150000, 150000], monthly: [131000, 136000, 142000, 147000, 150000], yearly: [104000, 114000, 126000, 138000, 150000], trend: 1 },
      beans: { marketPrice: 174000, lastWeek: 169000, productionCost: 98000, weekly: [165000, 168000, 171000, 173000, 174000], monthly: [154000, 160000, 166000, 170000, 174000], yearly: [119000, 130000, 145000, 159000, 174000], trend: 1 },
      rice: { marketPrice: 212000, lastWeek: 206000, productionCost: 124000, weekly: [200000, 204000, 207500, 210000, 212000], monthly: [186000, 192000, 199000, 206000, 212000], yearly: [149000, 160000, 177000, 194000, 212000], trend: 1 },
      cassava: { marketPrice: 119000, lastWeek: 124000, productionCost: 75000, weekly: [126000, 125000, 121000, 120000, 119000], monthly: [129000, 127000, 124000, 121000, 119000], yearly: [98000, 101000, 106000, 112000, 119000], trend: -1 },
      millet: { marketPrice: 133000, lastWeek: 126000, productionCost: 85000, weekly: [124000, 127000, 130000, 132000, 133000], monthly: [116000, 120000, 125000, 129000, 133000], yearly: [93000, 101000, 109000, 121000, 133000], trend: 1 }
    }
  },
  kagera: {
    crops: {
      maize: { marketPrice: 147000, lastWeek: 139000, productionCost: 91000, weekly: [141000, 143000, 145500, 146000, 147000], monthly: [128000, 133000, 138000, 143000, 147000], yearly: [101000, 112000, 124000, 136000, 147000], trend: 1 },
      beans: { marketPrice: 170000, lastWeek: 165000, productionCost: 97000, weekly: [160000, 163000, 166500, 169000, 170000], monthly: [151000, 157000, 162000, 166000, 170000], yearly: [117000, 128000, 142000, 157000, 170000], trend: 1 },
      rice: { marketPrice: 208000, lastWeek: 201000, productionCost: 121000, weekly: [194000, 198000, 202000, 206000, 208000], monthly: [182000, 188000, 194000, 201000, 208000], yearly: [146000, 158000, 175000, 192000, 208000], trend: 1 },
      cassava: { marketPrice: 118000, lastWeek: 123000, productionCost: 74000, weekly: [125000, 124000, 120000, 119000, 118000], monthly: [127000, 125000, 122000, 120000, 118000], yearly: [97000, 100000, 104000, 111000, 118000], trend: -1 },
      millet: { marketPrice: 132000, lastWeek: 125000, productionCost: 83000, weekly: [123000, 126000, 129000, 130000, 132000], monthly: [115000, 119000, 123000, 128000, 132000], yearly: [92000, 100000, 108000, 119000, 132000], trend: 1 }
    }
  }
};

const cropLabels = {
  maize: 'Mahindi',
  beans: 'Maharagwe',
  rice: 'Wali',
  cassava: 'Muhogo',
  millet: 'Ulezi'
};

const regionLabels = {
  arusha: 'Arusha',
  mbeya: 'Mbeya',
  dodoma: 'Dodoma',
  'dar-es-salaam': 'Dar es Salaam',
  morogoro: 'Morogoro',
  iringa: 'Iringa',
  manyara: 'Manyara',
  kagera: 'Kagera'
};

const timeFrameLabels = {
  weekly: 'Juma',
  monthly: 'Mwezi',
  yearly: 'Mwaka'
};

window.marketData = marketData;
window.cropLabels = cropLabels;
window.regionLabels = regionLabels;
window.timeFrameLabels = timeFrameLabels;
