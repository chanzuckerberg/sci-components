import { Gene } from "../components/XAxisChart";

const Genes: string[] = [
  "IGKV1D-8",
  "EWSR1",
  "RBM34",
  "ATP5L",
  "PDPR",
  "KMT5A",
  "SLC26A3",
  "NABP1",
  "CSF1",
  "AKR1A1",
  "C4orf22",
  "SV2C",
  "REEP4",
  "VSTM4",
  "STRN",
  "NXN",
  "NRIP3",
  "SYBU",
  "ASB16",
  "MTUS2-AS1",
  "SH3TC1",
  "THUMPD3-AS1",
  "PILRB",
  "GNAT3",
  "H3F3B",
  "H2AFV",
  "GET4",
  "ERRFI1",
  "DHRS12",
  "STX7",
  "TECR",
  "MAK16",
  "GRK1",
  "BPIFB2",
  "GAS7",
  "DONSON",
  "CD70",
  "CYP4F22",
  "GSG2",
  "LSM12",
  "SYT6",
  "ZBTB24",
  "FAM181A",
  "DLG2-AS1",
  "NDUFB1",
  "HLCS-IT1",
  "ZNF32-AS3",
  "TMEM110",
  "ATRN",
  "IPO5",
  "LINC01272",
  "DPH5",
  "OR1J4",
  "RHOU",
  "POTEH",
  "ZNF266",
  "TSKU",
  "CCT8L2",
  "LGI4",
  "H1FX",
  "NPTN-IT1",
  "SLC1A4",
  "OXNAD1",
  "ST6GALNAC1",
  "CLDND2",
  "PTH1R",
  "PUM2",
  "RUNX1T1",
  "C8orf34",
  "SMPD5",
  "BRE",
  "CDC123",
  "DEFB106A",
  "SCARB1",
  "SPRY1",
  "OR4C6",
  "CLDN10-AS1",
  "UBA5",
  "OR7G3",
  "SRMS",
  "KRT73-AS1",
  "SLC28A3",
  "PEG10",
  "HIST1H4G",
  "CHST10",
  "BAIAP2L1",
  "LINC01525",
  "GSG1L2",
  "ITLN2",
  "NUDT7",
  "PIAS4",
  "FIGNL1",
  "SLC22A14",
  "PKD3",
  "USP43",
  "TADA1",
  "FASTK",
  "ORC1",
  "LINC00574",
  "SPDYE11",
  "GINS1",
  "MAFA",
  "TRK-TTT14-1",
  "TRAJ44",
  "TAPBPL",
  "CLIP2",
  "POLE2",
  "TNNI3K",
  "SERPINB7",
  "PCGF5",
  "ZNF292",
  "C20orf144",
  "GPR135",
  "KDM5A",
  "C11orf45",
  "MUC3A",
  "IGLJ5",
  "GSE1",
  "ATG16L1",
  "NFS1",
  "CDCP2",
  "HSPH1",
  "SYT8",
  "CDKN2B-AS1",
  "ZNF492",
  "ABCC5-AS1",
  "ITGA5",
  "HOXC4",
  "VRK1",
  "MSH4",
  "KHDRBS3",
  "SACM1L",
  "PHPT1",
  "EVI2B",
  "MAPK14",
  "SNORD172",
  "FAM107B",
  "RNU5E-1",
  "FZD8",
  "COX6A1",
  "IGF2BP2-AS1",
  "VDAC1",
  "RAP2B",
  "PRB3",
  "DOCK4-AS1",
  "ETV4",
  "SPPL3",
  "RNA28S3",
  "OR52E5",
  "CDC42SE1",
  "SH2D4B",
  "PTPRM",
  "NARS2",
  "ZNF660",
  "ZNF792",
  "POTEF",
  "DUXA",
  "LINC00331",
  "NR1I3",
  "DAG1",
  "UST",
  "ZNF571",
  "VPS13A",
  "FOS",
  "RANBP10",
  "ABHD15",
  "GABRG3-AS1",
  "OCA2",
  "TBL1Y",
  "TRA-AGC18-2",
  "MUC8",
  "ZNF80",
  "NLRP1",
  "MYO1D",
  "MLC1",
  "RASAL3",
  "NEU3",
  "TRIB3",
  "ELOVL2",
  "CDC27",
  "SET",
  "GRHL2",
  "CCK",
  "HMCN1",
  "CDKAL1",
  "PHLDB3",
  "PLPP1",
  "ANKRD20A4",
  "ARMC5",
  "HVCN1",
  "TBCE",
  "TARID",
  "NCLN",
  "RTN4",
  "SLIT1-AS1",
  "TRSUP-TTA3-1",
  "TRE-TTC1-2",
  "TAL1",
  "BTN3A1",
  "TMUB2",
  "PACRG-AS2",
  "DAZAP1",
  "DCAF12",
  "DUXB",
  "WWTR1",
  "OR4K5",
  "HRNR",
  "PROB1",
  "IGHD1-7",
  "RORA-AS1",
  "DNM3",
  "LRRC52",
  "OPTN",
  "RYBP",
  "ANKRD55",
  "CD40",
  "MHRT",
  "CFHR4",
  "LINC01059",
  "NIN",
  "FAM224B",
  "LHX2",
  "GUCA2B",
  "WDR25",
  "IGKJ1",
  "TRR-TCT5-1",
  "GACAT3",
  "WASH1",
  "DNASE1",
  "MAN2B2",
  "OXGR1",
  "ZNF396",
  "NUP98",
  "PSMB1",
  "BBS7",
  "RPL14",
  "ACSM2A",
  "MFSD13A",
  "OR52N2",
  "IGLL5",
  "SOX15",
  "FABP3",
  "KIAA1211L",
  "TRP-AGG6-1",
  "LINC01220",
  "BBS5",
  "ZNF708",
  "CACNA2D3-AS1",
  "GAP43",
  "ZBTB18",
  "BABAM1",
  "KCND3-IT1",
  "TRI-AAT7-2",
  "RAD21L1",
  "ASPG",
  "DISP1",
  "SP140L",
  "HCAR2",
  "RTL1",
  "HR",
  "HIST2H2BF",
  "COBL",
  "TRBJ1-3",
  "MCM6",
  "SLC25A6",
  "DBX1",
  "THEMIS2",
  "FFAR4",
  "RPL7",
  "PCDHB7",
  "TRC-GCA2-2",
  "CEP128",
  "ST7-OT3",
  "ARHGAP27",
  "KRTAP19-3",
  "CASC10",
  "FLII",
  "PGAP2",
  "SNORD1C",
  "GRHL3",
  "VPS36",
  "TRK-TTT16-1",
  "RBFOX3",
  "CADM1",
  "NPR2",
  "TRE-TTC2-1",
  "ZFPM2-AS1",
  "HNRNPA2B1",
  "PSG5",
  "SPG23",
  "PAG1",
  "LINC00324",
  "USP4",
  "OR52W1",
  "BCL2L10",
  "RNA5S13",
  "CCL2",
  "TRAJ25",
  "MIS18A-AS1",
  "CALCB",
  "CNOT6",
  "ARFGEF2",
  "SOX12",
  "NR5A1",
  "LTBR",
  "TTC19",
  "CCDC158",
  "SIN3A",
  "TRA-AGC12-2",
  "LINC00987",
  "OCIAD2",
  "ABCF3",
  "KIR2DL5A",
  "ADH1C",
  "ORC2",
  "CTSD",
  "GHITM",
  "SCG5",
  "UQCRC2",
  "TRL-AAG7-1",
  "WAC-AS1",
  "MON1B",
  "LARP1B",
  "CSE1L-AS1",
  "OIP5-AS1",
  "CCDC14",
  "LINC00957",
  "LINC01392",
  "COCH",
  "MGAM2",
  "CISH",
  "UGT3A2",
  "MYO5A",
  "CYFIP2",
  "LINC00856",
  "TRT-AGT3-1",
  "SLC39A6",
  "CH25H",
  "TBC1D1",
  "ZNF716",
  "SNORD14D",
  "KIFAP3",
  "SDCBP2",
  "G3BP2",
  "EDIL3",
  "KCNB2",
  "PIK3R2",
  "GALNT15",
  "KLHL5",
  "PLEKHA1",
  "TTTY10",
  "VAMP8",
  "ITIH3",
  "DPH7",
  "FOXO1",
  "IQCF5-AS1",
  "ZDHHC17",
  "MINA",
  "ABHD13",
  "PIGS",
  "CDRT3",
  "STK38L",
  "M6PR",
  "LINC00888",
  "UBAC1",
  "RANGAP1",
  "C10orf111",
  "MATK",
  "CD52",
  "TBC1D29",
  "SQLE",
  "OLIG3",
  "FRA14B",
  "RGS11",
  "CHST6",
  "LINC00476",
  "ARHGEF18",
  "C14orf93",
  "ATOH1",
  "CTDSPL",
  "FAM179B",
  "NAT8L",
  "SLC15A2",
  "ANKRD45",
  "DFNA58",
  "PDS5B",
  "MAST2",
  "EXT1",
  "SBNO2",
  "SNORD130",
  "ZNF727",
  "ERVK-24",
  "MFSD6L",
  "DGAT1",
  "BACE2-IT1",
  "SCHLAP1",
  "LINC01543",
  "LINC01007",
  "GUCY1B3",
  "SLC9A4",
  "FOXB2",
  "RBPMS",
  "NAV3",
  "TERT",
  "RNPEP",
  "OR2D3",
  "OLFML2A",
  "OSCP1",
  "PRNT",
  "POMGNT1",
  "DCST1",
  "TTTY23B",
  "OMA1",
  "OOEP",
  "LINC01143",
  "GNGT1",
  "STAU1",
  "ADCY10",
  "TMPRSS9",
  "PRL",
  "LINC00514",
  "CHED1",
  "FHOD3",
  "TDRP",
  "ARF6",
  "PLBD1-AS1",
  "SFTPA2",
  "FAM124B",
  "PRSS35",
  "SLC22A17",
  "GLI3",
  "THRA",
  "LTB4R2",
  "IGHD4-17",
  "VASP",
  "HLA-DQB-1",
  "AS1",
  "NOD1",
  "DNAJB2",
  "KLF4",
  "GRIK1-AS2",
  "C1QTNF4",
  "TESK2",
  "AUNIP",
  "SUPV3L1",
  "CORO2B",
  "FAM173A",
  "RBBP9",
  "IL17B",
  "OTUD7B",
  "IGH",
  "RDX",
  "TRA-AGC13-2",
  "JPD",
  "NR6A1",
  "TK1",
  "KLKB1",
  "LINC00664",
  "IKZF2",
  "NUFIP2",
  "USP28",
  "OR14C36",
  "NICN1",
  "ADAM23",
  "MPHOSPH8",
  "CCDC25",
  "CCDC92",
  "SCN5A",
  "CASP14",
  "SPA17",
  "FGF8",
  "CD1D",
  "GRIP1",
  "POMT2",
  "UBE2D4",
  "IRAIN",
  "MLNR",
  "TNIP1",
  "RNY5",
  "RNF180",
  "DHX57",
  "TBRG4",
  "TRAT1",
  "SNORD116-24",
  "C14orf2",
  "KLF18",
  "IGLV3-32",
  "MAPK1",
  "OR52E4",
  "POLR2J3",
  "TRL-AAG1-1",
  "ITSN1",
  "TSSK4",
  "PADI4",
  "SNHG18",
  "TRL-CAA2-1",
  "TRGV11",
  "MXI1",
  "FRA11I",
  "SOBP",
  "ADRB3",
  "SPATA32",
  "ZNF616",
  "SEMA3D",
  "PRKAR2A-AS1",
  "SIRT6",
  "HOXB6",
  "ZBTB3",
  "PRSS50",
  "DEAF1",
  "ZBTB40-IT1",
  "SNAPC5",
  "HNRNPH3",
  "DCAKD",
  "RAMP3",
  "PPP1R3G",
  "TRS-AGA4-1",
  "SLC18A1",
  "AKR1E2",
  "ATP13A4",
  "REXO4",
  "GBE1",
  "SLC2A5",
  "TRN-GTT4-1",
  "ZNF268",
  "ANXA11",
  "TMEM123",
  "WDR45B",
  "HTR3E",
  "SNORA3A",
  "HEATR4",
  "SNORD83A",
  "RBP3",
  "KNCN",
  "RHO",
  "RGPD6",
  "PRELP",
  "KIAA1024L",
  "FRA6B",
  "ANKRD37",
  "KLK3",
  "HOXC-AS1",
  "MMS19",
  "ERLIN2",
  "SNAR-B1",
  "DOCK2",
  "GPATCH1",
  "NCKIPSD",
  "TBC1D3K",
  "ZNF559-ZNF177",
  "TAS2R5",
  "DNAJC9-AS1",
  "SH2D3C",
  "LARS2",
  "GIMAP6",
  "KIR2DS2",
  "COL12A1",
  "HNRNPUL2-BSCL2",
  "DDX24",
  "DLL4",
  "SLC26A4",
  "SNORA92",
  "GLC3C",
  "TRIM52",
  "IGKV1-17",
  "SLC8B1",
  "RNA18S2",
  "TRM-CAT4-1",
  "IGLV5-37",
  "COL18A1-AS2",
  "SLC6A1-AS1",
  "RPS6KA1",
  "WDR87",
  "TRAJ57",
  "RAB37",
  "ATL1",
  "BSPRY",
  "ACAP2-IT1",
  "RIBC2",
  "LRRN2",
  "LINC01620",
  "USP53",
  "IGF2BP2",
  "GRM8",
  "IGHV4-30-1",
  "ANKRD46",
  "ADGRL3",
  "CBWD3",
  "C19orf43",
  "RBM43",
  "SYCE1",
  "FBN3",
  "HOXA10-AS",
  "OR5I1",
  "ITGA10",
  "IGSF5",
  "SNORA2B",
  "SRSF9",
  "FSCN1",
  "LRRC49",
  "SNORD116-29",
  "DEPDC1B",
  "ZBTB20-AS4",
  "YDJC",
  "TRF-GAA4-1",
  "SPDYE2B",
  "GRM6",
  "LMNA",
  "SNORD113-2",
  "SLC25A19",
  "ANKRD20A3",
  "KCNC2",
  "NAV2-AS2",
  "LINC00622",
  "KIAA1551",
  "PKD2L1",
  "EPC2",
  "EPHX4",
  "ULBP3",
  "CACNA1I",
  "FAM214A",
  "C4orf47",
  "ZNF101",
  "S100A8",
  "C1orf204",
  "MTRNR2L13",
  "SNX18",
  "ATHL1",
  "TMEM147-AS1",
  "APC",
  "TOMM34",
  "PRKRA",
  "ATG5",
  "SDHB",
  "MPPE1",
  "SPDYE1",
  "TRP-AGG1-1",
  "CDKN2C",
  "SPATA31D3",
  "NDUFB6",
  "PRM3",
  "CDC42EP3",
  "C1RL",
  "OR2A14",
  "ALOX15",
  "PAXIP1-AS1",
  "ARHGEF12",
  "GK2",
  "SLX1A-SULT1A3",
  "ACTRT2",
  "FAM102B",
  "SIGLEC9",
  "KIR3DL3",
  "NR1H3",
  "MRT24",
  "EDEM1",
  "CHPF2",
  "OR2H2",
  "LINC00298",
  "MEF2C-AS1",
  "TRIM74",
  "LINC01359",
  "TRV-CAC1-4",
  "SH2B1",
  "STAC",
  "MAP6",
  "PRSS57",
  "DACT1",
  "ZNF728",
  "MED7",
  "DNAH8",
  "C12orf40",
  "CA4",
  "PPP4C",
  "HCN4",
  "KIF25",
  "DNAAF5",
  "PDRG1",
  "XPA",
  "SRA1",
  "C1QTNF8",
  "MIAT",
  "RXRB",
  "GALNT8",
  "PRR5-ARHGAP8",
  "MRPL20",
  "MEP1B",
  "RNU11",
  "EVL",
  "FZD1",
  "SECISBP2L",
  "WASF3-AS1",
  "LCE3A",
  "SOX30",
  "TRGJP2",
  "SPINT1",
  "LRCOL1",
  "MRPS21",
  "KCNT2",
  "CYB5R3",
  "ALKBH5",
  "DPP9",
  "LMAN2L",
  "PTK2B",
  "PAX6",
  "ANKMY1",
  "TRAV4",
  "SECTM1",
  "C5orf28",
  "CDRT5",
  "FAM117B",
  "DEFB103B",
  "TTBK2",
  "ZNF607",
  "TRAPPC6A",
  "LRRK2",
  "PFKFB3",
  "NSUN4",
  "IGHV3-30-5",
  "FRMPD2",
  "RAG1",
  "SORCS1",
  "DNAH14",
  "ZNF3",
  "TSPAN15",
  "C16orf13",
  "FEN1",
  "LINC01271",
  "LMAN1",
  "ODAM",
  "CEP57",
  "FN3K",
  "MED22",
  "EXT3",
  "ANGEL1",
  "OR8D4",
  "RNF19A",
  "ARHGDIG",
  "TMEM64",
  "B2M",
  "ERVW-7",
  "RTP5",
  "UAP1",
  "PGLYRP4",
  "RPS6KA2-AS1",
  "UFC1",
  "TPRN",
  "TTF2",
  "ARNTL2",
  "KRTAP9-2",
  "C1orf50",
  "CHAF1A",
  "TRAJ48",
  "C1orf233",
  "PPP1R3E",
  "LINC00583",
  "ZNF439",
  "DDX42",
  "RCN1",
  "LUC7L2",
  "ZNF506",
  "CFAP20",
  "TUBA8",
  "DNAJB11",
  "DCAF4L1",
  "DNAJB1",
  "LINC00936",
  "CAPRIN2",
  "OR2G3",
  "ANKS4B",
  "SFXN4",
  "NDUFS1",
  "TNFRSF12A",
  "PALLD",
  "ZNF541",
  "PKHD1",
  "SCARNA8",
  "TNS4",
  "WHCR",
  "GINGF2",
  "EGFL8",
  "MRC2",
  "MKS1",
  "CCP110",
  "NBPF4",
  "POM121L2",
  "ZNF536",
  "GPX7",
  "ADPRH",
  "CREB3L2",
  "IBSP",
  "BCLAF1",
  "RFFL",
  "ETV2",
  "NOTCH2",
  "JUN",
  "GGNBP2",
  "SAXO2",
  "KLHDC7B",
  "VPREB1",
  "HRK",
  "HAUS2",
  "TMEM206",
  "TRK-CTT2-3",
  "FITM2",
  "CXCL5",
  "IQGAP1",
  "LINC00683",
  "MED17",
  "ZRANB3",
  "PIRC76",
  "CD33",
  "GABRG2",
  "PRPH",
  "CKAP4",
  "POLR3F",
  "FAM169B",
  "MFAP3",
  "FAM227A",
  "CBFA2T2",
  "IMPDH1",
  "PRR33",
  "PSORS1C1",
  "MTCH1",
  "USP8",
  "CREB3L4",
  "SNX27",
  "TMEM212-AS1",
  "STEAP1B",
  "EDN2",
  "KPNB1",
  "KLF17",
  "KLHL11",
  "TEKT2",
  "CALCOCO1",
  "ZNF552",
  "BTNL3",
  "TMEM55A",
  "RAP1GDS1",
  "PRDM12",
  "HOXB-AS1",
  "PTRF",
  "SENP5",
  "ITFG1",
  "PCDHGA9",
  "ABHD3",
  "CHKB",
  "RCN2",
  "PAQR9",
  "CCDC114",
  "IGHV1-8",
  "OR2V2",
  "BIRC8",
  "SCASI",
  "SYNE1-AS1",
  "REC8",
  "ZDHHC1",
  "PARPBP",
  "TNXB",
  "C10orf128",
  "C15orf65",
  "SLC17A6",
  "EVX1",
  "TM9SF2",
  "MYLK-AS1",
  "RLBP1",
  "OAP",
  "ELN",
  "PRELID3B",
  "ADGRL4",
  "RAPGEFL1",
  "LINC00463",
  "RALGAPA1",
  "ZNF517",
  "FANCA",
  "GIMAP5",
  "THAP7-AS1",
  "TTC24",
  "NADSYN1",
  "WASIR1",
  "PIRC36",
  "PFKFB4",
  "HSBP1",
  "EHD2",
  "USE1",
  "DSG1-AS1",
  "ZNF76",
  "OR1F1",
  "C8orf48",
  "YY1AP1",
  "DNAH3",
  "VMP1",
  "RHCE",
  "ZNF485",
  "UBE2D3",
  "FDCSP",
  "IL11RA",
  "PLA2G12A",
  "SMOC1",
  "TPRKB",
  "ACP1",
  "KIAA1549L",
  "IGKV1OR2-0",
  "SUFU",
  "LPAR2",
  "RAPGEF4-AS1",
  "DIRAS1",
  "JUP",
  "LINC01228",
  "LINC00836",
  "PHACTR2-AS1",
  "COX5A",
  "ABHD11-AS1",
  "HTR3B",
  "CRB3",
  "SEMA3F",
  "REG3A",
  "KRTAP4-5",
  "ARF3",
  "TRQ-CTG2-1",
  "PRSS56",
  "C2CD4A",
  "RASSF8-AS1",
  "ARL8B",
  "FRG2C",
  "LINC00618",
  "NCAPG2",
  "PRSS44",
  "TAX1BP1",
  "CHST13",
  "RFT1",
  "FOXC2",
  "RUNDC3A",
  "MPZL3",
  "FAM215B",
  "PHB",
  "TRBV5-7",
  "ETV3L",
  "CCDC127",
  "LINC01477",
  "KCNQ3",
  "TRG",
  "LINC00111",
  "NTN1",
  "TMPRSS7",
  "HMSD",
  "CHORDC1",
  "SUSD5",
  "ENGASE",
  "CLDN22",
  "SNORA71C",
  "OTUD6B-AS1",
  "DENR",
  "OR2A5",
  "FUT7",
  "CPEB4",
  "IGLV3-25",
  "IRX1",
  "AJAP1",
  "GOLGB1",
  "ZNF367",
  "ZNF789",
  "REXO1",
  "LHPP",
  "PAN3-AS1",
  "DDTL",
  "NETO2",
  "IL6R",
  "SPRYD4",
  "TRL-AAG1-2",
  "PMPCA",
  "LINC00515",
  "LGALS12",
  "LMO2",
  "ANXA4",
  "MAP3K8",
  "DMBT1",
  "PCDHGA5",
  "VTRNA1-2",
  "POMK",
  "ANKRD30A",
  "NYS4",
  "PRR23D1",
  "TRUB2",
  "SLC22A1",
  "TRK-TTT1-1",
  "TRC-GCA12-1",
  "TRIM11",
  "LINC00866",
  "NR4A1",
  "DDX59",
  "HIPK4",
  "SEC22C",
  "FRMPD1",
  "KRTAP10-10",
  "CD28",
  "PRDM14",
  "IGHV5-10-1",
  "IGHV4-30-2",
  "HMX3",
  "RNF114",
  "DFNA7",
  "ZCCHC23",
  "GABRG3",
  "CGB3",
  "C3orf35",
  "ENTPD2",
  "CDCA7",
  "SMIM24",
  "ERGIC3",
  "MEIOC",
  "TLL1",
  "MTMR10",
  "UBE2C",
  "OR5K3",
  "SEMA4D",
  "RFPL4B",
  "SCX",
  "C5orf66-AS1",
  "MGP",
  "TERF2IP",
  "CRISP2",
  "MAPRE3",
  "RBM15B",
  "ADGRG7",
  "KLF15",
  "TIGAR",
  "ILVBL",
  "ARHGEF39",
  "FAU",
  "TRC-GCA9-1",
  "IL22RA1",
  "ST7",
  "VASH2",
  "COL1A1",
  "NBR2",
  "LINC01554",
  "YAM1",
  "CD244",
  "SCP2",
  "SERPINB9",
  "SCGB1C2",
  "IMP3",
  "NYS3",
  "C8orf34-AS1",
  "LINC00261",
  "RPL27A",
  "TBC1D9B",
  "CDCA8",
  "LINC00535",
  "ATG12",
  "ATP6V1G3",
  "SNORA87",
  "TULP2",
  "FIBP",
  "PCNA-AS1",
  "FUZ",
  "LINC01205",
  "ABCA9",
  "SEN6B",
  "PTPN14",
  "SNORD15A",
  "ZBTB40",
  "LINC01189",
  "HS1BP3",
  "DHCR24",
  "SNUPN",
  "TRV-TAC3-1",
  "AGGF1",
  "SPOCK2",
  "CSNK2B",
  "GRIK5",
  "C19orf70",
  "OR2A7",
  "SNORA2C",
  "DSCAS",
  "KLK5",
  "KCNE3",
  "CD320",
  "SENP7",
  "GATA5",
  "HLA-DOA",
  "TMEM39A",
  "CEP170B",
  "TBC1D10B",
  "LAD1",
  "TTC17",
  "CLEC4C",
  "NRBF2",
  "FRA2B",
  "IL2RB",
  "MDN1",
  "C1orf145",
  "ST3GAL6-AS1",
  "ATP6V1E2",
  "OXCT1",
  "SSSCA1",
  "METTL3",
  "E2F3",
  "HOXC11",
  "TSLP",
  "LINC01593",
  "B3GNT2",
  "HSD11B1L",
  "LRRC30",
  "TMC8",
  "PAX1",
  "TSPAN5",
  "LINC01063",
  "FRA8B",
  "HIVEP3",
  "AFF4",
  "HPS1",
  "LINC01497",
  "MSK9",
  "ADAMTSL1",
  "NEUROD6",
  "DSC1",
  "SMIM6",
  "EPC1",
  "RPLP1",
  "SLC27A2",
  "CD1A",
  "DNAJC25",
  "SMARCAD1",
  "GFOD2",
  "ENTHD2",
  "KISS1",
  "LRRC74B",
  "FLG-AS1",
  "SNORD115-14",
  "LSM5",
  "TRBV17",
  "LDLRAD4-AS1",
  "C9orf106",
  "CARMN",
  "TRAV12-1",
  "ZSWIM8",
  "WDR20",
  "VRTN",
  "SARNP",
  "MAMDC4",
  "PPME1",
  "C1orf95",
  "SLC26A8",
  "IGKV1-27",
  "KHNYN",
  "FRA10AC1",
  "C11orf53",
  "HDAC2",
  "EREG",
  "CUZD1",
  "KRTAP6-3",
  "TSSK3",
  "VPS45",
  "ZMYND11",
  "RN7SL1",
  "XCR1",
  "USP12-AS1",
  "LINC00661",
  "ZFY",
  "LINC01529",
  "PRR20D",
  "OR6N1",
  "KMT5C",
  "KL",
  "CCAR1",
  "SNORD116-22",
  "ISCU",
  "POLE",
  "SCOC-AS1",
  "SMAD5-AS1",
  "FBXL18",
  "CEP68",
  "TRH",
  "CLTB",
  "CRK",
  "PBX4",
  "SNORD15B",
  "KRTAP5-AS1",
  "ZNF790-AS1",
  "CELF6",
  "NFKBIL1",
  "RNF157-AS1",
  "HN1",
  "VPS4B",
  "SNORA63",
  "CHTF18",
  "DDC",
  "TRK-CTT5-1",
  "TSR1",
  "HCG9",
  "LCE3C",
  "TRQ-TTG3-1",
  "ZNF853",
  "RNF40",
  "ACTR3",
  "KDM7A",
  "SNORD116-19",
  "LINC00370",
  "GNAS",
  "ANKRD24",
  "SNAR-C2",
  "ERVFH21-1",
  "SMAD1",
  "COQ10A",
  "LNX1",
  "SLC12A2",
  "PRAMEF15",
  "CAMKV",
  "CASS4",
  "KRTAP9-9",
  "IGLV2-23",
  "TRL-CAA1-1",
  "LINC01096",
  "USP30-AS1",
  "SPCS1",
  "HINFP",
  "FBLIM1",
  "RASL11A",
  "ZNF26",
  "TBC1D30",
  "NMTRQ-CTG1-1",
  "NKX6-1",
  "C20orf195",
  "RFC5",
  "UQCC3",
  "PCDHA1",
  "PDCD2",
  "C3orf67-AS1",
  "KRTAP20-4",
  "INSIG2",
  "SNORD116-8",
  "MINCR",
  "KMT2E-AS1",
  "GIMAP2",
  "CBX4",
  "OR2T35",
  "CARD11",
  "FEB6",
  "IFNAR1",
  "RPRML",
  "NRDE2",
  "MARCH9",
  "TNPO1",
  "CTSK",
  "CREBRF",
  "LOH12CR2",
  "TNFRSF14",
  "TSPAN3",
  "HOXB13",
  "CSF3",
  "EXOSC4",
  "OR4K15",
  "PCYOX1L",
  "ZNF781",
  "TRV-CAC7-1",
  "PIRC83",
  "ZIC2",
  "FASTKD2",
  "CCDC39",
  "MROH9",
  "GAS2L2",
  "TMEM119",
  "LINC01486",
  "FNDC9",
  "SLC2A3",
  "KRT3",
  "TRA-TGC9-1",
  "CHRNA7",
  "CCDC189",
  "TSHZ1",
  "TDP2",
  "VWA5B1",
  "ST3GAL2",
  "NFKB1",
  "DUSP13",
  "CSRNP1",
  "PIRC90",
  "RNR2",
  "PEF1",
  "ATP8B1",
  "FGFR4",
  "WNT3",
  "CTRB1",
  "HLA-A",
  "PIRC17",
  "SSH3",
  "CFAP43",
  "LINC01077",
  "SSX2IP",
  "NMTRP-TGG1-1",
  "SNORD113-4",
  "MYO15B",
  "SWAP70",
  "EMC1",
  "COA4",
  "ASNA1",
  "WDR63",
  "AIP",
  "PHACTR4",
  "PGAM1",
  "DENND6A-AS1",
  "CST9L",
  "HTRA3",
  "SRSF1",
  "ZNF335",
  "ZSCAN16",
  "PDB6",
  "ASB18",
  "FAM43A",
  "PIRC108",
  "LINC00371",
  "SHISA9",
  "CDKN2A-AS1",
  "LINC01521",
  "FGF14-IT1",
  "ALDH1L1-AS2",
  "GNPAT",
  "SLC17A5",
  "ACBD4",
  "MLEC",
  "LINC00566",
  "DFNB51",
  "FADD",
  "WFDC8",
  "NDST4",
  "TEX261",
  "EBF2",
  "AEBP2",
  "ZNF14",
  "ZBED5",
  "IGHD1OR15-1B",
  "LINC00280",
  "GABARAPL1",
  "CCBE1",
  "KIR2DL5B",
  "UGT2A3",
  "DPH3",
  "FTL",
  "C6orf1",
  "PF4",
  "CACFD1",
  "OPN3",
  "PHLPP1",
  "TAF8",
  "PKN2",
  "IL17D",
  "PPP1R21",
  "CTNNA3",
  "PIRC40",
  "ABCA8",
  "LRP8",
  "LPAR3",
  "ACOX1",
  "ELOVL2-AS1",
  "THRB-AS1",
  "LINC00844",
  "EVC2",
  "TRF-GAA6-1",
  "ZBTB8A",
  "OCM2",
  "HSPB11",
  "FAM171B",
  "AGPAT3",
  "CENPB",
  "MBD3L4",
  "COL27A1",
  "RNFT2",
  "SNORD115-31",
  "ARHGAP25",
  "UNC5B-AS1",
  "VKORC1",
  "PSMF1",
  "LINC00334",
  "NLRX1",
  "LUCAT1",
  "PIRC20",
  "SMPD3",
  "ACPT",
  "LINC00597",
  "DNAJC3-AS1",
  "CCT6B",
  "SGTB",
  "PKD2",
  "TRIP4",
  "PHB2",
  "POLR2A",
  "PEAR1",
  "NAV2-AS5",
  "RASAL1",
  "KIAA2013",
  "DPP9-AS1",
  "PTTG2",
  "LCMT1-AS1",
  "QRFP",
  "EDDM3A",
  "IGHV3-38",
  "UNC50",
  "UCN2",
  "PLOD2",
  "LINC00967",
  "IKZF3",
  "DSCC1",
  "OR1N2",
  "CCDC137",
  "ZNF134",
  "MPLKIP",
  "TNRC6C-AS1",
  "KCNJ6",
  "PIK3C2G",
  "SLC43A3",
  "ATN1",
  "SNORD115-16",
  "TTTY17C",
  "SHC1",
  "CLEC4M",
  "ADCYAP1",
  "NMTRV-TAC1-1",
  "LINC01570",
  "SOCS7",
  "LINC01144",
  "SMARCA5",
  "NOP9",
  "TMEM8A",
  "CCDC6",
  "LRRC2",
  "SLC9C2",
  "RCC2",
  "DNAL4",
  "ARL6IP4",
  "CFAP44",
  "NRG1",
  "ZNF565",
  "GJD4",
  "BORA",
  "ZNF416",
  "PRAMEF6",
  "CDK5",
  "RGPD1",
  "DNAJC7",
  "MRPL3",
  "FAM89A",
  "EGFR",
  "MYBPH",
  "SOX21-AS1",
  "LINC01498",
  "OAS2",
  "AQP11",
  "FAM118B",
  "LINC01159",
  "GPR19",
  "AHSA1",
  "C20orf85",
  "IGLV2-33",
  "LINC01451",
  "DNAJC30",
  "LCMT1",
  "HOXC10",
  "GDAP1",
  "LINC01088",
  "DHH",
  "IGHJ3",
  "FREM2",
  "ZNF793",
  "BOLA3",
  "WRN",
  "MRFAP1",
  "RCL1",
  "TNNT2",
  "LRRC37A3",
  "ST3GAL1",
  "SPRED2",
  "RHOF",
  "AKAP8L",
  "PIRC69",
  "SNORA15",
  "USH2A",
  "STMND1",
  "GATA3-AS1",
  "KIF1B",
  "MUC15",
  "ZNF202",
  "TMEM211",
  "NT5C3A",
  "ARPC5L",
  "TBCC",
  "RAE1",
  "INTS8",
  "ENOX1",
  "EIF3J-AS1",
  "IGKV3-15",
  "TMEM200B",
  "ADGRA3",
  "MYCNUT",
  "KCNK13",
  "PPIF",
  "MTRNR2L4",
  "MRPS35",
  "LINC00294",
  "HOXD8",
  "GPBP1",
  "MUC21",
  "DEPTOR",
  "LRRK1",
  "FAM83G",
  "PIK3R5",
  "C6orf183",
  "RARS2",
  "GLIS3",
  "RINL",
  "DLEU1-AS1",
  "ZNF582-AS1",
  "ZNF879",
  "DSCAM-IT1",
  "TMCO6",
  "AQP4-AS1",
  "LYRM2",
  "MKNK1",
  "ATG9A",
  "SYDE1",
  "TRP-AGG2-8",
  "ETM2",
  "SLC8A1",
  "ATF6",
  "GVQW1",
  "TRK-TTT7-1",
  "COL8A1",
  "POU6F2-AS2",
  "SKIV2L2",
  "IGHV3-38-3",
  "C6orf52",
  "RNVU1-7",
  "UBIAD1",
  "PIRC57",
  "TRAJ27",
  "SPACA6",
  "CNIH3",
  "TUSC8",
  "FAM210A",
  "CXCL9",
  "MCC",
  "NCS1",
  "ZNF420",
  "PRR34-AS1",
  "TRH-GTG1-6",
  "IFITM10",
  "STAM-AS1",
  "PDE7B",
  "LINC00221",
  "COL5A2",
  "PGAP3",
  "ENO2",
  "FABP5",
  "H2AFY2",
  "KDELR3",
  "TXN",
  "GPR32",
  "ACSF2",
  "PATE4",
  "LINC00667",
  "METTL17",
  "ZDHHC23",
  "SRSF5",
  "ZNF615",
  "NPPB",
  "PCSK9",
  "TMEM160",
  "NDUFA11",
  "PTPRG-AS1",
  "BMP8A",
  "GLYATL3",
  "UNG",
  "NPIPB4",
  "MFAP3L",
  "DEPDC7",
  "RBP4",
  "FRA2G",
  "ATXN7L3B",
  "MLKL",
  "RADIL",
  "PRC1",
  "MNX1-AS2",
  "SNORD90",
  "FAM124A",
  "OR7A10",
  "AIS2",
  "PKD1L1",
  "GAMT",
  "ARNT",
  "ULBP1",
  "SNORD32B",
  "ANAPC13",
  "CENPM",
  "MACC1-AS1",
  "MCIDAS",
  "GPX8",
  "SNAR-C3",
  "ICAM3",
  "ST6GAL2-IT1",
  "MLH3",
  "KLK6",
  "NCOA7",
  "FGF12",
  "P2RY11",
  "IPMK",
  "LMX1A",
  "TMEM238",
  "HLTF-AS1",
  "MAPK13",
  "NECTIN1",
  "SDC3",
  "EGFLAM-AS2",
  "ZNF790",
  "NPAS2",
  "SFN",
  "DMAP1",
  "STRA13",
  "MRPL48",
  "SUSD4",
  "CTSL",
  "WDR43",
  "C5AR2",
  "SLC34A3",
  "SNORD115-30",
  "TSACC",
  "SLC52A2",
  "C1orf134",
  "ARF4-AS1",
  "TMEM17",
  "PTPRO",
  "PDGFD",
  "ABCA12",
  "MFRP",
  "SNORA73A",
  "UBXN7-AS1",
  "TTBK1",
  "FGB",
  "MEX3C",
  "ANAPC11",
  "SPATA17",
  "PLEKHB2",
  "CCDC33",
  "GPR39",
  "LINC01512",
  "UQCRC1",
  "HAS2-AS1",
  "PPP1CA",
  "ZBTB43",
  "ZNF770",
  "FBXO38",
  "FAM72A",
  "PPP1R32",
  "GEMIN2",
  "UPP2",
  "MSH5-SAPCD1",
  "ZNF575",
  "NUP50-AS1",
  "ZBED4",
  "KCNMB4",
  "POLR2C",
  "LINC01609",
  "ARHGEF1",
  "OR10K1",
  "GLMN",
  "CRX",
  "WASF2",
  "LINC01002",
  "RTCA-AS1",
  "ZNF320",
  "KIF24",
  "PRSS37",
  "ITPR1",
  "C9orf43",
  "PLCE1-AS1",
  "TRD-GTC6-1",
  "HMGA2",
  "FRA1H",
  "MYD88",
  "PAH",
  "CENPH",
  "DENND2C",
  "MPE",
  "PIRC51",
  "SERPINB3",
  "IGKV1D-33",
  "PIRC45",
  "RNF144A",
  "TXN2",
  "CBR3-AS1",
  "LRRC3C",
  "OTOS",
  "DMPK",
  "SPINK13",
  "HIST1H4C",
  "KIF26A",
  "SRP14",
  "FRA16A",
  "DFNA32",
  "COL18A1",
  "MUSTN1",
  "CSHL1",
  "TP53AIP1",
  "PTGER3",
  "SNORD145",
  "FBXO24",
  "ECT2L",
  "TMEM256-PLSCR3",
  "GUK2",
  "C5orf22",
  "CDRT15",
  "IGSF22",
  "LINC00643",
  "CORD4",
  "LINC01350",
  "HNRNPLL",
  "KIR2DL4",
  "FNIP2",
  "PLEKHA5",
  "SCAI",
  "SUMF1",
  "UCA1",
  "CCDC146",
  "CAMTA2",
  "RBM12",
  "CTSH",
  "KIF27",
  "CSNK1E",
  "SSSCA1-AS1",
  "CD46",
  "UGT2B10",
  "LINC01455",
  "RNU6ATAC",
  "IL5",
  "ARFGEF3",
  "HEPHL1",
  "SPATA1",
  "PRSS42",
  "CXCL10",
  "SMIM12",
  "FBXO17",
  "TCF24",
  "TLK2",
  "ZNF641",
  "PKP2",
  "C1QTNF3",
  "KCNQ1-AS1",
  "PCDHA7",
  "HLA-DQA1",
  "PAPD5",
  "LRFN2",
  "ADRA1D",
  "GLIPR2",
  "STAB2",
  "TRIM37",
  "CDY1",
  "TRAPPC6B",
  "LAMA2",
  "HOXA10",
  "PRR35",
  "LAMTOR5",
  "ZNF18",
  "FLYWCH1",
  "SIGIRR",
  "POLR2D",
  "RNF157",
  "APOBEC3H",
  "ZNF408",
  "LINC00449",
  "PROSC",
  "TMEM223",
  "MESP2",
  "TSPO",
  "OTUB2",
  "C1D",
  "METTL16",
  "RSPO3",
  "RUVBL1",
  "TXNDC2",
  "DCDC5",
  "IL18BP",
  "CKBE",
  "DXO",
  "PIRC29",
  "ERVW-20",
  "ZNF837",
  "TRC-GCA2-3",
  "TAF11",
  "HAMP",
  "PTOS1",
  "AMMECR1L",
  "MRPL11",
  "ID4",
  "KLHDC10",
  "KCNK7",
  "SLC25A37",
  "RAPGEF6",
  "MRGPRF-AS1",
  "LINC00333",
  "ZSCAN16-AS1",
  "LINC00519",
  "C14orf132",
  "ATP13A1",
  "SLC31A2",
  "RNF181",
  "OR5B3",
  "B4GALT5",
  "NPIPA8",
  "SYNPR-AS1",
  "PIK3R6",
  "PSG2",
  "RGPD3",
  "TMEM56-RWDD3",
  "FGFBP1",
  "MYL3",
  "TRIM16",
  "TMEM184A",
  "VPS4A",
  "DDX18",
  "LAMA3",
  "FAM212B",
  "CFAP54",
  "KIAA1328",
  "NCDN",
  "HSF5",
  "GHR",
  "NEK3",
  "PLEKHS1",
  "XXYLT1-AS2",
  "OR6C76",
  "GMEB1",
  "NEU1",
  "SNORA71B",
  "LSR",
  "IFIH1",
  "UGT1A3",
  "PCDH11Y",
  "LINC00430",
  "CPSF3L",
  "PPP1R3B",
  "ARHGAP31-AS1",
  "COL15A1",
  "SERPINH1",
  "FAM172A",
  "BANF1",
  "NUP160",
  "SNORD3D",
  "GIMAP1-GIMAP5",
  "GABRG1",
  "BPI",
  "RRS1-AS1",
  "LINC01375",
  "ASCL1",
  "PRG4",
  "BANF2",
  "SCARA5",
  "FAM53B",
  "KRTAP5-1",
  "MIER3",
  "BCL3",
  "TMPRSS11A",
  "MMP26",
  "SULT1A1",
  "LATS2-AS1",
  "SLC5A6",
  "LARGE-IT1",
  "OAT",
  "AAED1",
  "PALMD",
  "ERICH6",
  "DNAH11",
  "GREM2",
  "LINC00560",
  "C4A-AS1",
  "HAPLN3",
  "MTX1",
  "CDC20B",
  "LIG1",
  "CIB1",
  "OR5H2",
  "DAPK1-IT1",
  "TNKS2",
  "TMEM117",
  "KDELR1",
  "PRTG",
  "SPAG8",
  "THOP1",
  "F13A1",
  "PM20D1",
  "TRA-AGC16-1",
  "RAC2",
  "LCTL",
  "FCGR3B",
  "HSPA9",
  "IFT122",
  "CADPS",
  "EIF4ENIF1",
  "SNORD74",
  "SMAD9-IT1",
  "GAL3ST3",
  "DRAXIN",
  "PDPN",
  "THRSP",
  "ALOX5AP",
  "PDE1B",
  "CINP",
  "PRR5L",
  "SLC22A18",
  "DNAJC5G",
  "TCF15",
  "MRPS28",
  "UBA6-AS1",
  "DCAF10",
  "ZBTB17",
  "MFSD12",
  "GTF3C2-AS1",
  "POT1-AS1",
  "FEM1B",
  "OSM",
  "TNFSF12",
  "ATR",
  "SLC6A9",
  "DUSP12",
  "PYDC1",
  "SLMAP",
  "XPO1",
  "SNAP25-AS1",
  "ARHGAP28",
  "GPRC5C",
  "RPL27",
  "GOLGA8K",
  "OPRM1",
  "FAM47E-STBD1",
  "RNA45S5",
  "POC5",
  "CMD1F",
  "PYCARD-AS1",
  "GPRC6A",
  "ZAR1",
  "UBQLN1",
  "ABCB11",
  "HOXA5",
  "LUC7L3",
  "SYT11",
  "KRAS",
  "PALB2",
  "EGFL7",
  "PPP2CB",
  "MPPED2",
  "TMED4",
  "HDAC3",
  "HECW1-IT1",
  "TBC1D3G",
  "SUDS3",
  "ASB4",
  "FER1L6",
  "WDR24",
  "C21orf91-OT1",
  "VPS28",
  "P2RY8",
  "LZTS2",
  "SERINC4",
  "ANK1",
  "FITM1",
  "ATXN7L2",
  "PTGS1",
  "KCTD21-AS1",
  "RC3H2",
  "ATF4",
  "RHNO1",
  "ZC3H18",
  "GIMAP8",
  "OLFML2B",
  "SERPINE3",
  "CCDC60",
  "TRK-TTT4-1",
  "AFG3L2",
  "ZNF518A",
  "RHBDD2",
  "RBP1",
  "TARBP1",
  "MUT",
  "SNORD151",
  "AAR2",
  "OLA1",
  "KRTAP16-1",
  "LINC00895",
  "THAP9",
  "TMEM233",
  "MMP12",
  "IGLV3-16",
  "ZNF764",
  "WASF3",
  "MAML2",
  "MARVELD2",
  "LINC01465",
  "SSTR1",
  "GP1BB",
  "LYNX1",
  "PHC1",
  "TRGV4",
];

const GeneListGenerator = (count: number): Gene[] => {
  return Genes.slice(0, count).map((gene, index) => {
    return {
      index,
      name: gene.toUpperCase(),
    };
  });
};

export default GeneListGenerator;