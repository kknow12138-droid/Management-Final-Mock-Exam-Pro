
import { Question, QuestionType } from './types';

export const QUESTION_POOL: Question[] = [
  // --- 名词解释池 (根据 OCR 补全 20 个) ---
  { id: 'd1', type: QuestionType.DEFINITION, title: '名词解释', content: '管理 (Management)', score: 4, suggestedAnswer: '管理是为了有效的实现组织目标，由管理者利用相关知识，技术和方法对组织活动进行决策，组织，领导，控制并不断创新的过程。' },
  { id: 'd2', type: QuestionType.DEFINITION, title: '名词解释', content: '系统原理', score: 4, suggestedAnswer: '系统是指由若干相互依存，相互作用的要素或子系统组合而成的具有特定功能的有机整体。' },
  { id: 'd3', type: QuestionType.DEFINITION, title: '名词解释', content: '科层组织', score: 4, suggestedAnswer: '又称官僚组织，是通过公职或职位，而不是通过世袭或个人魅力来进行管理的理想组织制度。' },
  { id: 'd4', type: QuestionType.DEFINITION, title: '名词解释', content: '决策', score: 4, suggestedAnswer: '狭义是几种方案中做出选择；广义是一个过程，包括做出最后选择前的一切活动。' },
  { id: 'd5', type: QuestionType.DEFINITION, title: '名词解释', content: '经济环境', score: 4, suggestedAnswer: '指组织运行所处经济系统的情况，如形势、政策、利率、物价等。' },
  { id: 'd6', type: QuestionType.DEFINITION, title: '名词解释', content: '计划', score: 4, suggestedAnswer: '关于组织未来的蓝图，是对未来一段时间内目标和实现路径的策划与安排。' },
  { id: 'd7', type: QuestionType.DEFINITION, title: '名词解释', content: '目标管理 (MBO)', score: 4, suggestedAnswer: '鼓励成员参与目标制定，实现自我控制、自觉完成任务的管理制度。' },
  { id: 'd8', type: QuestionType.DEFINITION, title: '名词解释', content: '决策追踪与调整', score: 4, suggestedAnswer: '在初始决策基础上，对已从事活动的方向、目标、方针等进行的重新调整过程。' },
  { id: 'd9', type: QuestionType.DEFINITION, title: '名词解释', content: '组织结构', score: 4, suggestedAnswer: '组织中正式确定的，使工作任务得以分解、组合和协调的框架体系。' },
  { id: 'd10', type: QuestionType.DEFINITION, title: '名词解释', content: '职能制组织 (U型)', score: 4, suggestedAnswer: '以专业职能作为划分部门的基础，设立职能机构协助从事职能管理。' },
  { id: 'd11', type: QuestionType.DEFINITION, title: '名词解释', content: '事业部制组织', score: 4, suggestedAnswer: '按产品、市场、地域等成立事业部，独立经营、分权管理的组织结构。' },
  { id: 'd12', type: QuestionType.DEFINITION, title: '名词解释', content: '层级整合', score: 4, suggestedAnswer: '纵向设计中确定的管理幅度、层级数量及权责关系。' },
  { id: 'd13', type: QuestionType.DEFINITION, title: '名词解释', content: '组织文化', score: 4, suggestedAnswer: '长期实践中形成的具有本组织特征的文化现象，是全体成员遵循的价值观念和行为准则。' },
  { id: 'd14', type: QuestionType.DEFINITION, title: '名词解释', content: '领导 (Leadership)', score: 4, suggestedAnswer: '名词指领导者；动词指领导行为和过程。' },
  { id: 'd15', type: QuestionType.DEFINITION, title: '名词解释', content: '激励', score: 4, suggestedAnswer: '组织诱发个体产生满足某种需要的动机，促使行为与组织目标趋同的过程。' },
  { id: 'd16', type: QuestionType.DEFINITION, title: '名词解释', content: '激励理论', score: 4, suggestedAnswer: '关于激励的指导思想、原理和方法的概括，分为行为基础、过程和强化理论。' },
  { id: 'd17', type: QuestionType.DEFINITION, title: '名词解释', content: '沟通', score: 4, suggestedAnswer: '信息的传递与理解的过程，是两人或多人间事实、思想、情感的交流。' },
  { id: 'd18', type: QuestionType.DEFINITION, title: '名词解释', content: '有效沟通', score: 4, suggestedAnswer: '克服各种因素干扰，保证信息交流的可靠性和准确性。' },
  { id: 'd19', type: QuestionType.DEFINITION, title: '名词解释', content: '控制', score: 4, suggestedAnswer: '对内部管理活动及其效果进行衡量和矫正，确保目标及计划得以实现。' },
  { id: 'd20', type: QuestionType.DEFINITION, title: '名词解释', content: '前馈控制', score: 4, suggestedAnswer: '又称事前控制，在工作开始前对偏差进行预测估计并采取防范措施。' },

  // --- 简答题池 ---
  { id: 's1', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述管理工作的 5 个职能及其解释。', score: 6, suggestedAnswer: '1.决策（定目标）；2.组织（配资源）；3.领导（引方向）；4.控制（纠偏差）；5.创新（优模式）。' },
  { id: 's2', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述管理的本质及特性。', score: 6, suggestedAnswer: '本质是对人行为的协调。特性包括：科学性与艺术性、自然属性与社会属性。' },
  { id: 's3', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述管理的基本原理 (P28)。', score: 6, suggestedAnswer: '系统原理、人本原理、适度原理、效益原理、责任原理。' },
  { id: 's4', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述古典管理理论的三位代表人物及其贡献。', score: 6, suggestedAnswer: '泰勒（科学管理）、法约尔（一般管理/五职能）、韦伯（行政组织/科层制）。' },
  { id: 's5', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述决策的 6 个阶段。', score: 6, suggestedAnswer: '识别问题→诊断原因→确定目标→制定方案→评价选择→实施监督。' },
  { id: 's6', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述不确定情景下的 4 种决策准则。', score: 6, suggestedAnswer: '乐观准则、悲观准则、概率准则、最小后悔准则。' },
  { id: 's7', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述外部环境分析的两个层次。', score: 6, suggestedAnswer: '一般/宏观环境 (PESTEL)；具体/微观环境 (供应商、购买者、竞争者、合作伙伴等)。' },
  { id: 's8', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述活动方案生产的 4 种方法。', score: 6, suggestedAnswer: '5W2H法、头脑风暴法、德尔菲法、强迫联系法。' },
  { id: 's9', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述 PDCA 循环。', score: 6, suggestedAnswer: 'P（计划）、D（执行）、C（检查）、A（处理）。' },
  { id: 's10', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述人性假设的 4 种类型。', score: 6, suggestedAnswer: '经济人、社会人、自我实现人、复杂人。' },
  { id: 's11', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述双因素理论的内容。', score: 6, suggestedAnswer: '保健因素（消除不满）与激励因素（调动积极性）。' },
  { id: 's12', type: QuestionType.SHORT_ANSWER, title: '简答题', content: '简述马斯洛需求层次理论。', score: 6, suggestedAnswer: '生理、安全、社交、尊重、自我实现。' },

  // --- 案例分析池 ---
  { id: 'c1', type: QuestionType.CASE_STUDY, title: '案例分析: 领导三要素', score: 7.5, content: '结合 P195 领导三要素（领导者、被领导者、情境），分析为何在紧急危机时刻，民主式领导可能不如专制式领导有效？', suggestedAnswer: '情境因素要求快速决策；被领导者在危机中更需要明确指令；领导者需行使法定权保证效率。' },
  { id: 'c2', type: QuestionType.CASE_STUDY, title: '案例分析: 组织结构选型', score: 7.5, content: '某公司面临多项目并行，部门间协作极度困难，权责不清。请对比矩阵制与直线职能制的优劣并给出建议。', suggestedAnswer: '矩阵制灵活、利于协作但易双重指挥；直线职能制稳定但僵化。建议采用矩阵制。' },
  { id: 'c3', type: QuestionType.CASE_STUDY, title: '案例分析: 激励失效', score: 7.5, content: '某员工薪资行业领先却仍离职，表示工作枯燥无成就感。请用亚当斯公平理论或赫茨伯格双因素理论进行分析。', suggestedAnswer: '薪资是保健因素；缺乏挑战和认可是激励因素缺失；可能存在纵向或横向不公平感。' },
  { id: 'c4', type: QuestionType.CASE_STUDY, title: '案例分析: 沟通障碍', score: 7.5, content: '公司通过正式邮件发布改革方案，但基层流传裁员谣言。请分析正式与非正式沟通的关系及管理策略。', suggestedAnswer: '正式沟通具权威性但慢；非正式沟通快但易失真。应加强正式沟通透明度，引导非正式沟通。' },
  { id: 'c5', type: QuestionType.CASE_STUDY, title: '案例分析: 决策风险', score: 7.5, content: '某企业在高度不确定的市场环境下，采用乐观准则投入全部资源，结果导致破产。请分析决策准则的选择风险。', suggestedAnswer: '乐观准则假设最好情况发生；不确定环境下应综合概率准则或最小后悔准则以规避风险。' },
  { id: 'c6', type: QuestionType.CASE_STUDY, title: '案例分析: 组织设计', score: 7.5, content: '根据 P129 组织设计影响因素，分析战略、技术、环境如何共同决定一个互联网公司的组织架构？', suggestedAnswer: '战略定方向；技术（互联网）要求扁平化；环境（多变）要求有机式结构。' }
];

export const MANAGEMENT_FUNCTIONS = [
  {
    name: "决策与计划",
    description: "涵盖决策过程、PESTEL分析、5W2H、PDCA循环等核心考点。",
    icon: "fa-compass"
  },
  {
    name: "组织与设计",
    description: "涵盖职能制、事业部制、矩阵制以及科层组织等结构设计考点。",
    icon: "fa-sitemap"
  },
  {
    name: "领导与激励",
    description: "涵盖人性假设、领导三要素、双因素理论、公平理论等重点考点。",
    icon: "fa-users-rays"
  }
];
