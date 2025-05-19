"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Pill,
  AlertTriangle,
  Info,
  Bookmark,
  ChevronRight,
  Filter,
  Stethoscope,
  Layers,
  Repeat,
  Download,
  Printer,
  Share2,
  Heart,
  CheckCircle,
  X,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// 模拟药物数据
const drugData = [
  {
    id: "drug-001",
    name: "二甲双胍",
    englishName: "Metformin",
    category: "口服降糖药",
    subcategory: "双胍类",
    commonBrands: ["格华止", "倍美敏", "达美康"],
    formulations: ["片剂", "缓释片"],
    strengths: ["0.25g", "0.5g", "0.85g"],
    indications: ["2型糖尿病", "多囊卵巢综合征", "糖尿病前期"],
    contraindications: [
      "严重肾功能不全(eGFR < 30 ml/min/1.73m²)",
      "急性或慢性代谢性酸中毒",
      "严重感染",
      "严重创伤",
      "手术前后",
      "严重肝功能不全",
      "酗酒",
      "休克",
      "心力衰竭",
      "急性心肌梗死",
      "呼吸衰竭",
    ],
    adverseEffects: [
      { name: "胃肠道反应", severity: "常见", description: "恶心、呕吐、腹泻、腹痛、食欲减退" },
      { name: "乳酸性酸中毒", severity: "罕见", description: "严重但可能危及生命的不良反应，多见于肾功能不全患者" },
      { name: "维生素B12缺乏", severity: "少见", description: "长期使用可能导致维生素B12吸收减少" },
      { name: "低血糖", severity: "罕见", description: "单药使用时极少发生，与其他降糖药联用时风险增加" },
    ],
    dosage: {
      initial: "从0.5g，每日1-2次开始",
      maintenance: "根据血糖控制情况调整，通常为0.5g-1g，每日2-3次",
      maximum: "每日最大剂量不超过2g",
      renalAdjustment: [
        { condition: "eGFR ≥ 60 ml/min/1.73m²", adjustment: "无需调整" },
        { condition: "eGFR 45-59 ml/min/1.73m²", adjustment: "谨慎使用，从低剂量开始" },
        { condition: "eGFR 30-44 ml/min/1.73m²", adjustment: "减半剂量，密切监测肾功能" },
        { condition: "eGFR < 30 ml/min/1.73m²", adjustment: "禁用" },
      ],
    },
    pharmacokinetics: {
      absorption: "口服吸收，生物利用度约50-60%",
      distribution: "血浆蛋白结合率低，分布容积较大",
      metabolism: "不经肝脏代谢",
      elimination: "主要经肾脏排泄，半衰期约6.5小时",
    },
    mechanismOfAction: "通过抑制肝糖输出和增加外周组织对葡萄糖的摄取，降低血糖水平",
    interactions: [
      {
        drug: "碘造影剂",
        severity: "严重",
        effect: "增加乳酸性酸中毒风险",
        management: "造影检查前48小时停药，检查后48小时恢复用药",
      },
      {
        drug: "氢氯噻嗪",
        severity: "中度",
        effect: "可能增强降糖作用",
        management: "监测血糖，必要时调整剂量",
      },
      {
        drug: "西咪替丁",
        severity: "轻度",
        effect: "可能增加二甲双胍血药浓度",
        management: "通常无需调整剂量，但应监测血糖",
      },
    ],
    patientCounseling: [
      "随餐或餐后服用，可减轻胃肠道反应",
      "定期监测肾功能和维生素B12水平",
      "注意低血糖症状和预防措施",
      "进行造影检查前告知医生正在服用二甲双胍",
      "避免饮酒，增加乳酸性酸中毒风险",
    ],
    pregnancyCategory: "B",
    breastfeedingSafety: "可能安全，但应权衡利弊",
    pediatricUse: "10岁以上儿童可使用，但需专科医生指导",
    geriatricUse: "老年患者应从低剂量开始，定期评估肾功能",
    monitoring: ["血糖", "肾功能", "维生素B12水平", "乳酸水平(如有症状)"],
    costLevel: "低",
    isFavorite: true,
  },
  {
    id: "drug-002",
    name: "阿司匹林",
    englishName: "Aspirin",
    category: "非甾体抗炎药",
    subcategory: "水杨酸盐类",
    commonBrands: ["拜阿司匹灵", "阿司匹林", "倍林达"],
    formulations: ["片剂", "肠溶片", "咀嚼片"],
    strengths: ["25mg", "75mg", "100mg", "300mg"],
    indications: ["抗血小板(预防心血管疾病)", "解热镇痛", "抗炎", "急性心肌梗死", "缺血性脑卒中"],
    contraindications: [
      "对水杨酸盐过敏",
      "活动性消化性溃疡",
      "出血倾向",
      "严重肝功能不全",
      "严重肾功能不全",
      "妊娠晚期",
      "哮喘三联征(阿司匹林过敏、鼻息肉、哮喘)",
    ],
    adverseEffects: [
      { name: "胃肠道反应", severity: "常见", description: "恶心、呕吐、消化不良、胃痛、胃肠道出血" },
      { name: "出血风险增加", severity: "常见", description: "瘀斑、鼻出血、牙龈出血、手术后出血增加" },
      { name: "过敏反应", severity: "少见", description: "皮疹、荨麻疹、血管性水肿、支气管痉挛" },
      { name: "肝功能异常", severity: "罕见", description: "转氨酶升高" },
      { name: "Reye综合征", severity: "罕见", description: "儿童和青少年使用后可能发生，表现为脑病和肝功能衰竭" },
    ],
    dosage: {
      antiplatelet: "75-100mg，每日1次",
      analgesic: "300-600mg，每4-6小时1次，每日最大剂量不超过4g",
      antiinflammatory: "600-900mg，每日3-4次",
      acuteCoronarySyndrome: "负荷剂量300mg，然后75-100mg每日1次",
      renalAdjustment: [
        { condition: "轻中度肾功能不全", adjustment: "谨慎使用" },
        { condition: "严重肾功能不全", adjustment: "避免使用" },
      ],
    },
    pharmacokinetics: {
      absorption: "口服迅速吸收，肠溶片在小肠吸收",
      distribution: "血浆蛋白结合率高(>99%)",
      metabolism: "在肝脏和血浆中水解为水杨酸",
      elimination: "主要经肾脏排泄，半衰期约2-3小时(低剂量)，15-30小时(高剂量)",
    },
    mechanismOfAction:
      "通过不可逆地抑制环氧合酶(COX)，减少前列腺素和血栓素A2的合成，发挥抗血小板、解热、镇痛和抗炎作用",
    interactions: [
      {
        drug: "华法林",
        severity: "严重",
        effect: "增加出血风险",
        management: "避免合用，如必须合用需密切监测INR和出血征象",
      },
      {
        drug: "肝素",
        severity: "严重",
        effect: "增加出血风险",
        management: "谨慎合用，密切监测出血征象",
      },
      {
        drug: "其他NSAIDs",
        severity: "中度",
        effect: "增加胃肠道不良反应风险",
        management: "避免长期合用",
      },
      {
        drug: "ACE抑制剂",
        severity: "中度",
        effect: "可能降低降压效果",
        management: "监测血压",
      },
      {
        drug: "甲氨蝶呤",
        severity: "中度",
        effect: "增加甲氨蝶呤毒性",
        management: "高剂量甲氨蝶呤治疗期间避免使用阿司匹林",
      },
    ],
    patientCounseling: [
      "抗血小板剂量阿司匹林应长期服用，不要擅自停药",
      "如出现黑便、血便、咖啡样呕吐物等出血征象应立即就医",
      "手术前应告知医生正在服用阿司匹林",
      "避免与其他NSAIDs合用",
      "肠溶片应整片吞服，不要咀嚼或压碎",
    ],
    pregnancyCategory: "D",
    breastfeedingSafety: "低剂量可能安全，高剂量应避免",
    pediatricUse: "16岁以下儿童和青少年发热时避免使用，预防Reye综合征",
    geriatricUse: "老年患者更易发生不良反应，应使用最低有效剂量",
    monitoring: ["出血征象", "胃肠道症状", "肾功能(长期使用高剂量时)"],
    costLevel: "低",
    isFavorite: true,
  },
  {
    id: "drug-003",
    name: "氨氯地平",
    englishName: "Amlodipine",
    category: "钙通道阻滞剂",
    subcategory: "二氢吡啶类",
    commonBrands: ["络活喜", "安内真", "玄宁"],
    formulations: ["片剂"],
    strengths: ["2.5mg", "5mg", "10mg"],
    indications: ["高血压", "冠心病", "慢性稳定性心绞痛", "变异型心绞痛"],
    contraindications: ["对二氢吡啶类钙通道阻滞剂过敏", "严重低血压", "休克", "不稳定心绞痛", "严重主动脉瓣狭窄"],
    adverseEffects: [
      { name: "外周水肿", severity: "常见", description: "主要发生在踝部，与剂量相关" },
      { name: "头痛", severity: "常见", description: "通常为轻度至中度，多在治疗初期出现" },
      { name: "面部潮红", severity: "常见", description: "血管扩张所致，多在治疗初期出现" },
      { name: "头晕", severity: "常见", description: "可能与血压降低有关" },
      { name: "心悸", severity: "少见", description: "反射性心率增快" },
      { name: "疲乏", severity: "少见", description: "可能与血压降低有关" },
      { name: "胃肠道不适", severity: "少见", description: "恶心、腹痛、消化不良" },
    ],
    dosage: {
      initial: "高血压：2.5-5mg，每日1次；老年人从2.5mg开始",
      maintenance: "根据血压反应调整，通常5-10mg，每日1次",
      maximum: "每日最大剂量10mg",
      hepaticAdjustment: [
        { condition: "轻中度肝功能不全", adjustment: "从低剂量开始，缓慢调整" },
        { condition: "严重肝功能不全", adjustment: "从2.5mg开始，密切监测" },
      ],
    },
    pharmacokinetics: {
      absorption: "口服吸收良好，生物利用度约60-65%",
      distribution: "血浆蛋白结合率高(约95%)",
      metabolism: "在肝脏经CYP3A4代谢",
      elimination: "主要经胆汁排泄，半衰期约35-50小时",
    },
    mechanismOfAction: "选择性阻断L型钙通道，减少钙离子内流，导致血管平滑肌和心肌收缩力减弱，从而降低血压和减轻心绞痛",
    interactions: [
      {
        drug: "CYP3A4抑制剂(如酮康唑、伊曲康唑)",
        severity: "中度",
        effect: "增加氨氯地平血药浓度",
        management: "监测不良反应，必要时减少氨氯地平剂量",
      },
      {
        drug: "CYP3A4诱导剂(如利福平、苯妥英)",
        severity: "中度",
        effect: "降低氨氯地平血药浓度",
        management: "监测疗效，必要时增加氨氯地平剂量",
      },
      {
        drug: "西柚汁",
        severity: "轻度",
        effect: "增加氨氯地平血药浓度",
        management: "避免同时服用",
      },
    ],
    patientCounseling: [
      "每日固定时间服用，可与食物同服或空腹服用",
      "不要突然停药，需在医生指导下逐渐减量",
      "如出现明显水肿或头晕，应告知医生",
      "避免饮用西柚汁",
      "定期监测血压",
    ],
    pregnancyCategory: "C",
    breastfeedingSafety: "谨慎使用，可能分泌入乳汁",
    pediatricUse: "6岁以上儿童可使用，但需专科医生指导",
    geriatricUse: "老年患者从低剂量开始，缓慢调整",
    monitoring: ["血压", "心率", "外周水肿", "肝功能(肝功能不全患者)"],
    costLevel: "中",
    isFavorite: false,
  },
  {
    id: "drug-004",
    name: "阿托伐他汀",
    englishName: "Atorvastatin",
    category: "调脂药",
    subcategory: "HMG-CoA还原酶抑制剂(他汀类)",
    commonBrands: ["立普妥", "阿乐", "舒降之"],
    formulations: ["片剂"],
    strengths: ["10mg", "20mg", "40mg", "80mg"],
    indications: [
      "原发性高胆固醇血症",
      "混合型高脂血症",
      "纯合子家族性高胆固醇血症",
      "心血管疾病一级和二级预防",
      "急性冠脉综合征",
    ],
    contraindications: ["对他汀类药物过敏", "活动性肝病或不明原因持续性转氨酶升高", "妊娠和哺乳期", "严重肌病史"],
    adverseEffects: [
      { name: "肌肉症状", severity: "常见", description: "肌痛、肌无力、肌酸激酶升高，罕见横纹肌溶解" },
      { name: "肝功能异常", severity: "少见", description: "转氨酶升高，通常为一过性和可逆性" },
      { name: "胃肠道反应", severity: "常见", description: "腹泻、消化不良、恶心、腹痛" },
      { name: "头痛", severity: "常见", description: "通常为轻度" },
      { name: "皮疹", severity: "少见", description: "过敏反应" },
      { name: "血糖升高", severity: "少见", description: "可能增加2型糖尿病风险" },
    ],
    dosage: {
      initial: "10-20mg，每日1次",
      maintenance: "根据血脂反应调整，通常10-80mg，每日1次",
      maximum: "每日最大剂量80mg",
      renalAdjustment: [{ condition: "严重肾功能不全", adjustment: "从低剂量开始，谨慎使用" }],
      hepaticAdjustment: [{ condition: "肝功能不全", adjustment: "禁用" }],
    },
    pharmacokinetics: {
      absorption: "口服吸收，食物可降低吸收速率但不影响程度",
      distribution: "血浆蛋白结合率高(>98%)",
      metabolism: "在肝脏经CYP3A4代谢",
      elimination: "主要经胆汁排泄，半衰期约14小时",
    },
    mechanismOfAction: "抑制HMG-CoA还原酶，减少胆固醇合成，增加LDL受体表达，降低血浆LDL-C水平",
    interactions: [
      {
        drug: "环孢素",
        severity: "严重",
        effect: "增加阿托伐他汀血药浓度和肌病风险",
        management: "避免合用",
      },
      {
        drug: "红霉素、克拉霉素",
        severity: "中度",
        effect: "增加阿托伐他汀血药浓度和肌病风险",
        management: "减少阿托伐他汀剂量，密切监测肌肉症状",
      },
      {
        drug: "西柚汁",
        severity: "中度",
        effect: "增加阿托伐他汀血药浓度",
        management: "避免同时服用",
      },
      {
        drug: "华法林",
        severity: "中度",
        effect: "可能增加华法林抗凝效果",
        management: "监测INR",
      },
    ],
    patientCounseling: [
      "可在一天中任何时间服用，不受食物影响",
      "如出现不明原因的肌肉疼痛、无力或棕色尿，应立即就医",
      "定期监测血脂和肝功能",
      "避免饮用大量西柚汁",
      "妊娠期间禁用，育龄妇女应采取有效避孕措施",
    ],
    pregnancyCategory: "X",
    breastfeedingSafety: "禁用",
    pediatricUse: "10岁以上儿童可使用，但需专科医生指导",
    geriatricUse: "通常无需调整剂量，但应注意肌病风险",
    monitoring: ["血脂", "肝功能", "肌酸激酶(如有肌肉症状)"],
    costLevel: "中",
    isFavorite: true,
  },
  {
    id: "drug-005",
    name: "氯沙坦",
    englishName: "Losartan",
    category: "抗高血压药",
    subcategory: "血管紧张素II受体拮抗剂(ARB)",
    commonBrands: ["科素亚", "洛汀新", "安内喜"],
    formulations: ["片剂"],
    strengths: ["25mg", "50mg", "100mg"],
    indications: ["高血压", "糖尿病肾病", "心力衰竭", "降低脑卒中风险(高血压伴左心室肥厚患者)"],
    contraindications: [
      "对氯沙坦过敏",
      "妊娠中期和晚期",
      "与阿利吉仑合用(糖尿病或中重度肾功能不全患者)",
      "原发性高醛固酮症",
    ],
    adverseEffects: [
      { name: "头晕", severity: "常见", description: "通常为轻度，与血压降低有关" },
      { name: "头痛", severity: "常见", description: "通常为轻度" },
      { name: "上呼吸道感染", severity: "常见", description: "鼻塞、咽痛" },
      { name: "咳嗽", severity: "少见", description: "发生率低于ACE抑制剂" },
      { name: "高钾血症", severity: "少见", description: "尤其在肾功能不全或合用保钾利尿剂患者" },
      { name: "肝功能异常", severity: "罕见", description: "转氨酶升高" },
      { name: "血管性水肿", severity: "罕见", description: "面部、口唇、舌头、喉部肿胀" },
    ],
    dosage: {
      initial: "高血压：50mg，每日1次；肾功能不全或体液不足患者从25mg开始",
      maintenance: "根据血压反应调整，通常25-100mg，每日1次或分2次",
      maximum: "每日最大剂量100mg",
      hepaticAdjustment: [{ condition: "肝功能不全", adjustment: "从低剂量开始，谨慎使用" }],
    },
    pharmacokinetics: {
      absorption: "口服吸收，首过效应明显，生物利用度约33%",
      distribution: "血浆蛋白结合率高(约99%)",
      metabolism: "在肝脏经CYP2C9和CYP3A4代谢为活性代谢物",
      elimination: "主要经胆汁和尿液排泄，半衰期约2小时(活性代谢物约6-9小时)",
    },
    mechanismOfAction: "选择性阻断AT1受体，抑制血管紧张素II的血管收缩和醛固酮分泌作用，从而降低血压",
    interactions: [
      {
        drug: "保钾利尿剂、钾补充剂",
        severity: "中度",
        effect: "增加高钾血症风险",
        management: "监测血钾水平",
      },
      {
        drug: "NSAIDs",
        severity: "中度",
        effect: "可能降低降压效果，增加肾功能损害风险",
        management: "监测血压和肾功能",
      },
      {
        drug: "利福平",
        severity: "中度",
        effect: "降低氯沙坦血药浓度",
        management: "监测血压，必要时调整剂量",
      },
      {
        drug: "阿利吉仑",
        severity: "严重",
        effect: "在糖尿病或中重度肾功能不全患者增加不良反应风险",
        management: "避免合用",
      },
    ],
    patientCounseling: [
      "可与食物同服或空腹服用",
      "定期监测血压",
      "如出现头晕，应避免突然站立",
      "妊娠期间禁用，育龄妇女应采取有效避孕措施",
      "不要在未咨询医生的情况下服用钾补充剂",
    ],
    pregnancyCategory: "D",
    breastfeedingSafety: "谨慎使用，可能分泌入乳汁",
    pediatricUse: "6岁以上高血压儿童可使用，但需专科医生指导",
    geriatricUse: "通常无需调整剂量，但应注意监测肾功能",
    monitoring: ["血压", "肾功能", "血钾", "肝功能(肝功能不全患者)"],
    costLevel: "中",
    isFavorite: false,
  },
]

// 模拟药物相互作用数据
const drugInteractionData = [
  {
    id: "int-001",
    drugA: "阿司匹林",
    drugB: "华法林",
    severity: "严重",
    effect: "增加出血风险",
    mechanism: "阿司匹林抑制血小板功能，华法林抑制凝血因子合成，两者合用显著增加出血风险",
    management: "避免合用，如必须合用需密切监测INR和出血征象，考虑降低华法林剂量",
    evidenceLevel: "A",
    references: [
      {
        id: "ref-001",
        title:
          "Antithrombotic Therapy and Prevention of Thrombosis, 9th ed: American College of Chest Physicians Evidence-Based Clinical Practice Guidelines",
        authors: "Holbrook A, Schulman S, Witt DM, et al.",
        journal: "Chest",
        year: 2012,
        volume: "141",
        pages: "e152S-e184S",
        doi: "10.1378/chest.11-2295",
      },
    ],
  },
  {
    id: "int-002",
    drugA: "阿托伐他汀",
    drugB: "环孢素",
    severity: "严重",
    effect: "增加阿托伐他汀血药浓度和肌病风险",
    mechanism: "环孢素抑制阿托伐他汀的肝脏摄取和代谢，显著增加阿托伐他汀血药浓度",
    management: "避免合用，如必须合用，阿托伐他汀剂量不应超过10mg/日，密切监测肌肉症状和肌酸激酶",
    evidenceLevel: "B",
    references: [
      {
        id: "ref-002",
        title: "Cyclosporine markedly raises the plasma concentrations of repaglinide",
        authors: "Kajosaari LI, Niemi M, Neuvonen M, et al.",
        journal: "Clin Pharmacol Ther",
        year: 2005,
        volume: "78",
        pages: "388-399",
        doi: "10.1016/j.clpt.2005.07.005",
      },
    ],
  },
  {
    id: "int-003",
    drugA: "氯沙坦",
    drugB: "保钾利尿剂",
    severity: "中度",
    effect: "增加高钾血症风险",
    mechanism: "氯沙坦通过抑制醛固酮分泌减少钾排泄，保钾利尿剂直接减少钾排泄，两者合用显著增加高钾血症风险",
    management: "谨慎合用，定期监测血钾水平，尤其在肾功能不全患者",
    evidenceLevel: "B",
    references: [
      {
        id: "ref-003",
        title:
          "Risk of hyperkalemia in patients with moderate chronic kidney disease initiating angiotensin converting enzyme inhibitors or angiotensin receptor blockers: a randomized study",
        authors: "Espinel E, Joven J, Gil I, et al.",
        journal: "BMC Res Notes",
        year: 2013,
        volume: "6",
        pages: "306",
        doi: "10.1186/1756-0500-6-306",
      },
    ],
  },
  {
    id: "int-004",
    drugA: "二甲双胍",
    drugB: "碘造影剂",
    severity: "严重",
    effect: "增加乳酸性酸中毒风险",
    mechanism: "碘造影剂可能导致肾功能暂时性下降，影响二甲双胍的排泄，增加乳酸性酸中毒风险",
    management: "造影检查前48小时停用二甲双胍，检查后确认肾功能正常再恢复用药",
    evidenceLevel: "B",
    references: [
      {
        id: "ref-004",
        title: "Metformin and contrast media: where is the conflict?",
        authors: "Thomsen HS, Morcos SK",
        journal: "Br J Radiol",
        year: 2007,
        volume: "80",
        pages: "583-584",
        doi: "10.1259/bjr/27973850",
      },
    ],
  },
  {
    id: "int-005",
    drugA: "氨氯地平",
    drugB: "西柚汁",
    severity: "轻度",
    effect: "增加氨氯地平血药浓度",
    mechanism: "西柚汁抑制CYP3A4酶，减少氨氯地平的首过效应代谢，增加其生物利用度",
    management: "避免同时服用西柚汁，如已合用，注意监测血压和不良反应",
    evidenceLevel: "C",
    references: [
      {
        id: "ref-005",
        title: "Grapefruit juice-drug interactions",
        authors: "Bailey DG, Dresser G, Arnold JM",
        journal: "CMAJ",
        year: 2013,
        volume: "185",
        pages: "309-316",
        doi: "10.1503/cmaj.120951",
      },
    ],
  },
]

// 模拟药物分类数据
const drugCategories = [
  { id: "cat-001", name: "抗高血压药", count: 32 },
  { id: "cat-002", name: "降糖药", count: 28 },
  { id: "cat-003", name: "调脂药", count: 15 },
  { id: "cat-004", name: "抗凝/抗血小板药", count: 18 },
  { id: "cat-005", name: "抗生素", count: 45 },
  { id: "cat-006", name: "非甾体抗炎药", count: 22 },
  { id: "cat-007", name: "精神类药物", count: 30 },
  { id: "cat-008", name: "胃肠道药物", count: 25 },
  { id: "cat-009", name: "呼吸系统药物", count: 20 },
  { id: "cat-010", name: "激素类药物", count: 18 },
]

export function DrugReferenceClient() {
  const [activeTab, setActiveTab] = useState("search")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDrug, setSelectedDrug] = useState<(typeof drugData)[0] | null>(null)
  const [selectedDrugTab, setSelectedDrugTab] = useState("basic")
  const [showInteractionDialog, setShowInteractionDialog] = useState(false)
  const [selectedInteraction, setSelectedInteraction] = useState<(typeof drugInteractionData)[0] | null>(null)

  // 药物相互作用检查
  const [drugA, setDrugA] = useState<string | null>(null)
  const [drugB, setDrugB] = useState<string | null>(null)
  const [interactionResult, setInteractionResult] = useState<(typeof drugInteractionData)[0] | null>(null)
  const [interactionChecked, setInteractionChecked] = useState(false)

  // 多药相互作用检查
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([])
  const [multiInteractionResults, setMultiInteractionResults] = useState<(typeof drugInteractionData)[]>([])
  const [multiInteractionChecked, setMultiInteractionChecked] = useState(false)

  // 过滤药物
  const filteredDrugs = drugData.filter(
    (drug) =>
      (searchTerm === "" ||
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.subcategory.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === null || drug.category === selectedCategory),
  )

  // 查看药物详情
  const viewDrugDetails = (drug: (typeof drugData)[0]) => {
    setSelectedDrug(drug)
    setSelectedDrugTab("basic")
  }

  // 查看相互作用详情
  const viewInteractionDetails = (interaction: (typeof drugInteractionData)[0]) => {
    setSelectedInteraction(interaction)
    setShowInteractionDialog(true)
  }

  // 检查药物相互作用
  const checkInteraction = () => {
    if (!drugA || !drugB) return

    // 查找匹配的相互作用
    const interaction = drugInteractionData.find(
      (int) => (int.drugA === drugA && int.drugB === drugB) || (int.drugA === drugB && int.drugB === drugA),
    )

    setInteractionResult(interaction || null)
    setInteractionChecked(true)
  }

  // 检查多药相互作用
  const checkMultiInteractions = () => {
    if (selectedDrugs.length < 2) return

    // 查找所有可能的相互作用
    const interactions: (typeof drugInteractionData)[] = []

    // 检查所有药物对之间的相互作用
    for (let i = 0; i < selectedDrugs.length; i++) {
      for (let j = i + 1; j < selectedDrugs.length; j++) {
        const drugA = selectedDrugs[i]
        const drugB = selectedDrugs[j]

        const interaction = drugInteractionData.find(
          (int) => (int.drugA === drugA && int.drugB === drugB) || (int.drugA === drugB && int.drugB === drugA),
        )

        if (interaction) {
          interactions.push(interaction)
        }
      }
    }

    setMultiInteractionResults(interactions)
    setMultiInteractionChecked(true)
  }

  // 添加/移除多药相互作用检查中的药物
  const toggleDrugSelection = (drugName: string) => {
    setSelectedDrugs((prev) => (prev.includes(drugName) ? prev.filter((d) => d !== drugName) : [...prev, drugName]))
    setMultiInteractionChecked(false)
  }

  // 获取相互作用严重程度标签颜色
  const getInteractionSeverityColor = (severity: string) => {
    switch (severity) {
      case "严重":
        return "bg-red-100 text-red-800"
      case "中度":
        return "bg-yellow-100 text-yellow-800"
      case "轻度":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取不良反应严重程度标签颜色
  const getAdverseEffectSeverityColor = (severity: string) => {
    switch (severity) {
      case "常见":
        return "bg-yellow-100 text-yellow-800"
      case "少见":
        return "bg-blue-100 text-blue-800"
      case "罕见":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取证据级别标签颜色
  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-blue-100 text-blue-800"
      case "C":
        return "bg-yellow-100 text-yellow-800"
      case "D":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // 获取妊娠分级标签颜色
  const getPregnancyCategoryColor = (category: string) => {
    switch (category) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-blue-100 text-blue-800"
      case "C":
        return "bg-yellow-100 text-yellow-800"
      case "D":
        return "bg-orange-100 text-orange-800"
      case "X":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">药物查询</TabsTrigger>
            <TabsTrigger value="interaction">相互作用检查</TabsTrigger>
            <TabsTrigger value="multi-interaction">多药相互作用</TabsTrigger>
          </TabsList>

          {/* 药物查询选项卡 */}
          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>药物查询</CardTitle>
                <CardDescription>查询药物信息、用法用量和注意事项</CardDescription>

                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="搜索药物名称、英文名或分类..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Select value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || null)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="选择药物分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">全部分类</SelectItem>
                      {drugCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    高级筛选
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDrugs.map((drug) => (
                    <Card key={drug.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{drug.name}</CardTitle>
                            <CardDescription>{drug.englishName}</CardDescription>
                          </div>
                          {drug.isFavorite && <Bookmark className="h-4 w-4 text-blue-500 flex-shrink-0" />}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">{drug.category}</Badge>
                          <Badge variant="outline">{drug.subcategory}</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <Pill className="h-4 w-4 text-blue-500 mt-0.5" />
                            <div>
                              <span className="font-medium">规格：</span>
                              {drug.strengths.join(", ")}
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Stethoscope className="h-4 w-4 text-green-500 mt-0.5" />
                            <div>
                              <span className="font-medium">适应症：</span>
                              {drug.indications.slice(0, 2).join(", ")}
                              {drug.indications.length > 2 && "..."}
                            </div>
                          </div>
                          {drug.contraindications.length > 0 && (
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                              <div>
                                <span className="font-medium">禁忌症：</span>
                                {drug.contraindications.slice(0, 1).join(", ")}
                                {drug.contraindications.length > 1 && "..."}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="ghost" size="sm" className="w-full" onClick={() => viewDrugDetails(drug)}>
                          查看详情
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {filteredDrugs.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Pill className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">未找到匹配的药物</h3>
                    <p className="text-muted-foreground max-w-md">
                      尝试使用不同的搜索词或筛选条件，或者清除筛选条件查看所有药物
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 相互作用检查选项卡 */}
          <TabsContent value="interaction" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>药物相互作用检查</CardTitle>
                <CardDescription>检查两种药物之间的潜在相互作用</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>药物A</Label>
                      <Select value={drugA || ""} onValueChange={setDrugA}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择药物A" />
                        </SelectTrigger>
                        <SelectContent>
                          {drugData.map((drug) => (
                            <SelectItem key={drug.id} value={drug.name}>
                              {drug.name} ({drug.englishName})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>药物B</Label>
                      <Select value={drugB || ""} onValueChange={setDrugB}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择药物B" />
                        </SelectTrigger>
                        <SelectContent>
                          {drugData.map((drug) => (
                            <SelectItem key={drug.id} value={drug.name}>
                              {drug.name} ({drug.englishName})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={checkInteraction}
                      disabled={!drugA || !drugB || drugA === drugB}
                      className="w-full md:w-auto"
                    >
                      <Repeat className="mr-2 h-4 w-4" />
                      检查相互作用
                    </Button>
                  </div>

                  {interactionChecked && (
                    <div className="mt-6">
                      {interactionResult ? (
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle>检测到相互作用</CardTitle>
                              <Badge className={getInteractionSeverityColor(interactionResult.severity)}>
                                {interactionResult.severity}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div className="font-medium">{interactionResult.drugA}</div>
                                <Repeat className="h-5 w-5 text-yellow-500 mx-4" />
                                <div className="font-medium">{interactionResult.drugB}</div>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <h4 className="text-sm font-medium mb-1">影响：</h4>
                                  <p className="text-sm">{interactionResult.effect}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1">处理建议：</h4>
                                  <p className="text-sm">{interactionResult.management}</p>
                                </div>
                              </div>

                              <div className="flex justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => viewInteractionDetails(interactionResult)}
                                >
                                  查看详情
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertTitle>未检测到已知相互作用</AlertTitle>
                          <AlertDescription>
                            在我们的数据库中未找到{drugA}和{drugB}
                            之间的已知相互作用。但这并不意味着不存在相互作用，请咨询医生或药师获取专业建议。
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">常见相互作用</h3>
                    <div className="space-y-3">
                      {drugInteractionData.slice(0, 3).map((interaction) => (
                        <Card key={interaction.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-4">
                                <div className="font-medium">{interaction.drugA}</div>
                                <Repeat className="h-4 w-4 text-yellow-500" />
                                <div className="font-medium">{interaction.drugB}</div>
                              </div>
                              <Badge className={getInteractionSeverityColor(interaction.severity)}>
                                {interaction.severity}
                              </Badge>
                            </div>
                            <p className="text-sm mb-3">{interaction.effect}</p>
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                                onClick={() => viewInteractionDetails(interaction)}
                              >
                                查看详情
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 多药相互作用选项卡 */}
          <TabsContent value="multi-interaction" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>多药相互作用检查</CardTitle>
                <CardDescription>检查多种药物之间的潜在相互作用</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>选择药物（至少2种）</Label>
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                      {drugData.slice(0, 12).map((drug) => (
                        <div key={drug.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={drug.id}
                            checked={selectedDrugs.includes(drug.name)}
                            onCheckedChange={() => toggleDrugSelection(drug.name)}
                          />
                          <Label htmlFor={drug.id} className="text-sm">
                            {drug.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={checkMultiInteractions}
                      disabled={selectedDrugs.length < 2}
                      className="w-full md:w-auto"
                    >
                      <Layers className="mr-2 h-4 w-4" />
                      检查多药相互作用
                    </Button>
                  </div>

                  {multiInteractionChecked && (
                    <div className="mt-6">
                      {multiInteractionResults.length > 0 ? (
                        <div className="space-y-4">
                          <Alert className="bg-yellow-50">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>检测到{multiInteractionResults.length}个相互作用</AlertTitle>
                            <AlertDescription>
                              在选择的{selectedDrugs.length}种药物中，检测到{multiInteractionResults.length}
                              个潜在相互作用。请查看下方详情。
                            </AlertDescription>
                          </Alert>

                          <div className="space-y-3">
                            {multiInteractionResults.map((interaction) => (
                              <Card key={interaction.id}>
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-4">
                                      <div className="font-medium">{interaction.drugA}</div>
                                      <Repeat className="h-4 w-4 text-yellow-500" />
                                      <div className="font-medium">{interaction.drugB}</div>
                                    </div>
                                    <Badge className={getInteractionSeverityColor(interaction.severity)}>
                                      {interaction.severity}
                                    </Badge>
                                  </div>
                                  <p className="text-sm mb-3">{interaction.effect}</p>
                                  <div className="flex justify-end">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-xs"
                                      onClick={() => viewInteractionDetails(interaction)}
                                    >
                                      查看详情
                                      <ChevronRight className="h-3 w-3 ml-1" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertTitle>未检测到已知相互作用</AlertTitle>
                          <AlertDescription>
                            在我们的数据库中未找到选择的药物之间的已知相互作用。但这并不意味着不存在相互作用，请咨询医生或药师获取专业建议。
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">常见多药相互作用模式</h3>
                    <div className="space-y-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">抗凝/抗血小板药物组合</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">华法林</Badge>
                            <Badge variant="outline">阿司匹林</Badge>
                            <Badge variant="outline">氯吡格雷</Badge>
                            <Repeat className="h-4 w-4 text-yellow-500 mx-1" />
                            <Badge className="bg-red-100 text-red-800">严重出血风险</Badge>
                          </div>
                          <p className="text-sm">
                            多种抗凝/抗血小板药物联用显著增加出血风险，应避免同时使用多种此类药物，除非有明确的临床指征且权衡了风险收益。
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">降压药与NSAIDs</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline">ACEI/ARB</Badge>
                            <Badge variant="outline">利尿剂</Badge>
                            <Badge variant="outline">NSAIDs</Badge>
                            <Repeat className="h-4 w-4 text-yellow-500 mx-1" />
                            <Badge className="bg-yellow-100 text-yellow-800">肾功能风险</Badge>
                          </div>
                          <p className="text-sm">
                            ACEI/ARB、利尿剂与NSAIDs的"三联"组合可显著增加急性肾损伤风险，尤其在老年患者和基础肾功能不全患者中。
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 药物详情对话框 */}
      {selectedDrug && (
        <Dialog open={!!selectedDrug} onOpenChange={() => setSelectedDrug(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedDrug.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                {selectedDrug.englishName} · {selectedDrug.category} · {selectedDrug.subcategory}
              </DialogDescription>
            </DialogHeader>

            <Tabs value={selectedDrugTab} onValueChange={setSelectedDrugTab} className="mt-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">基本信息</TabsTrigger>
                <TabsTrigger value="dosage">用法用量</TabsTrigger>
                <TabsTrigger value="adverse">不良反应</TabsTrigger>
                <TabsTrigger value="interaction">相互作用</TabsTrigger>
                <TabsTrigger value="special">特殊人群</TabsTrigger>
              </TabsList>

              {/* 基本信息选项卡 */}
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">常用品牌</div>
                    <div className="font-medium">{selectedDrug.commonBrands.join(", ")}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">剂型</div>
                    <div className="font-medium">{selectedDrug.formulations.join(", ")}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">规格</div>
                    <div className="font-medium">{selectedDrug.strengths.join(", ")}</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">费用水平</div>
                    <div className="font-medium">
                      {selectedDrug.costLevel === "低" ? "低" : selectedDrug.costLevel === "中" ? "中等" : "高"}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">适应症</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <ul className="list-disc list-inside space-y-1">
                        {selectedDrug.indications.map((indication, index) => (
                          <li key={index} className="text-sm">
                            {indication}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">禁忌症</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <ul className="list-disc list-inside space-y-1">
                        {selectedDrug.contraindications.map((contraindication, index) => (
                          <li key={index} className="text-sm">
                            {contraindication}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">作用机制</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <p className="text-sm">{selectedDrug.mechanismOfAction}</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">药代动力学</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1 font-medium text-sm">吸收：</div>
                          <div className="col-span-3 text-sm">{selectedDrug.pharmacokinetics.absorption}</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1 font-medium text-sm">分布：</div>
                          <div className="col-span-3 text-sm">{selectedDrug.pharmacokinetics.distribution}</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1 font-medium text-sm">代谢：</div>
                          <div className="col-span-3 text-sm">{selectedDrug.pharmacokinetics.metabolism}</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1 font-medium text-sm">排泄：</div>
                          <div className="col-span-3 text-sm">{selectedDrug.pharmacokinetics.elimination}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">监测项目</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedDrug.monitoring.map((item, index) => (
                          <Badge key={index} variant="outline">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 用法用量选项卡 */}
              <TabsContent value="dosage" className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">常规用法用量</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1 font-medium text-sm">初始剂量：</div>
                          <div className="col-span-3 text-sm">{selectedDrug.dosage.initial}</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1 font-medium text-sm">维持剂量：</div>
                          <div className="col-span-3 text-sm">{selectedDrug.dosage.maintenance}</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1 font-medium text-sm">最大剂量：</div>
                          <div className="col-span-3 text-sm">{selectedDrug.dosage.maximum}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {selectedDrug.dosage.renalAdjustment && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">肾功能调整</h3>
                    <Card>
                      <CardContent className="pt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>肾功能状态</TableHead>
                              <TableHead>剂量调整</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedDrug.dosage.renalAdjustment.map((adjustment, index) => (
                              <TableRow key={index}>
                                <TableCell>{adjustment.condition}</TableCell>
                                <TableCell>{adjustment.adjustment}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {selectedDrug.dosage.hepaticAdjustment && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">肝功能调整</h3>
                    <Card>
                      <CardContent className="pt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>肝功能状态</TableHead>
                              <TableHead>剂量调整</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedDrug.dosage.hepaticAdjustment.map((adjustment, index) => (
                              <TableRow key={index}>
                                <TableCell>{adjustment.condition}</TableCell>
                                <TableCell>{adjustment.adjustment}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium mb-3">特殊用法</h3>
                  <Card>
                    <CardContent className="pt-4">
                      {"antiplatelet" in selectedDrug.dosage && (
                        <div className="mb-3">
                          <div className="font-medium text-sm mb-1">抗血小板剂量：</div>
                          <div className="text-sm">{selectedDrug.dosage.antiplatelet}</div>
                        </div>
                      )}
                      {"analgesic" in selectedDrug.dosage && (
                        <div className="mb-3">
                          <div className="font-medium text-sm mb-1">镇痛剂量：</div>
                          <div className="text-sm">{selectedDrug.dosage.analgesic}</div>
                        </div>
                      )}
                      {"antiinflammatory" in selectedDrug.dosage && (
                        <div className="mb-3">
                          <div className="font-medium text-sm mb-1">抗炎剂量：</div>
                          <div className="text-sm">{selectedDrug.dosage.antiinflammatory}</div>
                        </div>
                      )}
                      {"acuteCoronarySyndrome" in selectedDrug.dosage && (
                        <div className="mb-3">
                          <div className="font-medium text-sm mb-1">急性冠脉综合征剂量：</div>
                          <div className="text-sm">{selectedDrug.dosage.acuteCoronarySyndrome}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">患者用药指导</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <ul className="list-disc list-inside space-y-1">
                        {selectedDrug.patientCounseling.map((item, index) => (
                          <li key={index} className="text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 不良反应选项卡 */}
              <TabsContent value="adverse" className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">不良反应</h3>
                  <div className="space-y-3">
                    {selectedDrug.adverseEffects.map((effect, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{effect.name}</h4>
                            <Badge className={getAdverseEffectSeverityColor(effect.severity)}>{effect.severity}</Badge>
                          </div>
                          <p className="text-sm">{effect.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">警告与注意事项</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        {selectedDrug.contraindications.slice(0, 3).map((item, index) => (
                          <Alert key={index} className="bg-red-50 border-red-200">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription>{item}</AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">监测建议</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        {selectedDrug.monitoring.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <div className="text-sm">{item}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 相互作用选项卡 */}
              <TabsContent value="interaction" className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">药物相互作用</h3>
                  <Card>
                    <CardContent className="pt-4">
                      {selectedDrug.interactions.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>药物</TableHead>
                              <TableHead>严重程度</TableHead>
                              <TableHead>影响</TableHead>
                              <TableHead>处理建议</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedDrug.interactions.map((interaction, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{interaction.drug}</TableCell>
                                <TableCell>
                                  <Badge className={getInteractionSeverityColor(interaction.severity)}>
                                    {interaction.severity}
                                  </Badge>
                                </TableCell>
                                <TableCell>{interaction.effect}</TableCell>
                                <TableCell>{interaction.management}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-4 text-gray-500">无已知重要药物相互作用</div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">食物相互作用</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        {selectedDrug.interactions.some((i) => i.drug.includes("西柚")) ? (
                          <Alert className="bg-yellow-50 border-yellow-200">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <AlertTitle>西柚汁相互作用</AlertTitle>
                            <AlertDescription>
                              西柚汁可能抑制CYP3A4酶，影响药物代谢，建议避免同时服用西柚汁。
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <div className="text-sm">无已知重要食物相互作用</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">实验室检查相互作用</h3>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm">无已知重要实验室检查相互作用</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 特殊人群选项卡 */}
              <TabsContent value="special" className="space-y-4 mt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-3">妊娠期用药</h3>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getPregnancyCategoryColor(selectedDrug.pregnancyCategory)}>
                            FDA妊娠分级 {selectedDrug.pregnancyCategory}
                          </Badge>
                        </div>
                        <div className="text-sm">
                          {selectedDrug.pregnancyCategory === "X"
                            ? "禁用于妊娠期，可能导致胎儿畸形或死亡"
                            : selectedDrug.pregnancyCategory === "D"
                              ? "有明确的人类胎儿风险证据，但在某些情况下，收益可能大于风险"
                              : selectedDrug.pregnancyCategory === "C"
                                ? "动物研究显示有不良反应，但缺乏人体研究，权衡利弊后使用"
                                : selectedDrug.pregnancyCategory === "B"
                                  ? "动物研究未显示风险，但缺乏人体对照研究，或动物研究显示风险但人体研究未证实"
                                  : "对照研究未显示对胎儿的风险"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">哺乳期用药</h3>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge
                            className={
                              selectedDrug.breastfeedingSafety.includes("禁用")
                                ? "bg-red-100 text-red-800"
                                : selectedDrug.breastfeedingSafety.includes("谨慎")
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {selectedDrug.breastfeedingSafety.includes("禁用")
                              ? "禁用"
                              : selectedDrug.breastfeedingSafety.includes("谨慎")
                                ? "谨慎使用"
                                : "可能安全"}
                          </Badge>
                        </div>
                        <div className="text-sm">{selectedDrug.breastfeedingSafety}</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">儿童用药</h3>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge
                            className={
                              selectedDrug.pediatricUse.includes("不推荐") || selectedDrug.pediatricUse.includes("避免")
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {selectedDrug.pediatricUse.includes("不推荐") || selectedDrug.pediatricUse.includes("避免")
                              ? "不推荐"
                              : "可用于儿童"}
                          </Badge>
                        </div>
                        <div className="text-sm">{selectedDrug.pediatricUse}</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">老年用药</h3>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="text-sm">{selectedDrug.geriatricUse}</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-6 pt-6 border-t">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Printer className="h-4 w-4" />
                  打印
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  下载PDF
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  分享
                </Button>
              </div>
              <Button
                variant={selectedDrug.isFavorite ? "outline" : "default"}
                size="sm"
                className="flex items-center gap-1"
              >
                {selectedDrug.isFavorite ? (
                  <>
                    <X className="h-4 w-4" />
                    取消收藏
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4" />
                    收藏
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* 相互作用详情对话框 */}
      {selectedInteraction && (
        <Dialog open={showInteractionDialog} onOpenChange={() => setShowInteractionDialog(false)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>药物相互作用详情</DialogTitle>
              <DialogDescription>
                {selectedInteraction.drugA} 与 {selectedInteraction.drugB} 的相互作用
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="font-medium">{selectedInteraction.drugA}</div>
                <Repeat className="h-5 w-5 text-yellow-500 mx-4" />
                <div className="font-medium">{selectedInteraction.drugB}</div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium mb-2">严重程度</h3>
                  <Badge className={getInteractionSeverityColor(selectedInteraction.severity)}>
                    {selectedInteraction.severity}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">证据级别</h3>
                  <Badge className={getEvidenceLevelColor(selectedInteraction.evidenceLevel)}>
                    {selectedInteraction.evidenceLevel}级
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">影响</h3>
                <p className="text-sm">{selectedInteraction.effect}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">机制</h3>
                <p className="text-sm">{selectedInteraction.mechanism}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">处理建议</h3>
                <p className="text-sm">{selectedInteraction.management}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">参考文献</h3>
                <div className="space-y-2">
                  {selectedInteraction.references.map((ref) => (
                    <div key={ref.id} className="text-xs">
                      <p className="font-medium">{ref.title}</p>
                      <p>
                        {ref.authors}. {ref.journal}, {ref.year}; {ref.volume}: {ref.pages}
                      </p>
                      <p className="text-blue-600">DOI: {ref.doi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
