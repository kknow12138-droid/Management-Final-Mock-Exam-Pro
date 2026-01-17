
import React, { useState, useEffect, useCallback } from 'react';
import { AppMode, ExamSession, Question, QuestionType } from './types';
import { QUESTION_POOL, MANAGEMENT_FUNCTIONS } from './constants';
import { gradeExam } from './services/geminiService';

// Child components
const Navbar: React.FC<{ mode: AppMode, setMode: (m: AppMode) => void }> = ({ mode, setMode }) => (
  <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setMode('LANDING')}>
      <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl">
        <i className="fa-solid fa-graduation-cap"></i>
      </div>
      <span className="font-bold text-xl tracking-tight hidden sm:inline">管理学考试模拟系统</span>
    </div>
    <div className="flex items-center space-x-6">
      <button 
        onClick={() => setMode('LANDING')}
        className={`text-sm font-medium transition-colors ${mode === 'LANDING' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
      >
        首页
      </button>
      <button 
        onClick={() => setMode('ANALYTICS')}
        className={`text-sm font-medium transition-colors ${mode === 'ANALYTICS' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
      >
        大纲考点
      </button>
      <div className="h-6 w-px bg-slate-200"></div>
      <div className="flex items-center space-x-2 text-slate-400 text-xs">
        <i className="fa-solid fa-circle text-green-500 animate-pulse"></i>
        <span>随机组卷模式已开启</span>
      </div>
    </div>
  </nav>
);

const Landing: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="max-w-5xl mx-auto px-4 py-12">
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
        管理学 <span className="text-indigo-600">随机组卷</span>
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
        每次测试从 40+ 核心考点库中随机抽取：名词解释(5)、简答题(5)、案例分析(4)。确保您的复习无死角，完全匹配期末题型要求。
      </p>
      <button 
        onClick={onStart}
        className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200/50 flex items-center space-x-2 mx-auto"
      >
        <span>生成随机试卷并开始</span>
        <i className="fa-solid fa-shuffle"></i>
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-4">
          <i className="fa-solid fa-rotate"></i>
        </div>
        <h3 className="font-bold text-lg mb-2">动态题库</h3>
        <p className="text-slate-500 text-sm">覆盖 P23-P242 全部知识点，每次生成的题目组合都不相同。</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center text-xl mb-4">
          <i className="fa-solid fa-microchip"></i>
        </div>
        <h3 className="font-bold text-lg mb-2">AI 深度阅卷</h3>
        <p className="text-slate-500 text-sm">Gemini AI 根据考纲参考答案，对您的论述进行逻辑性和准确性评估。</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-xl mb-4">
          <i className="fa-solid fa-bullseye"></i>
        </div>
        <h3 className="font-bold text-lg mb-2">高频考点</h3>
        <p className="text-slate-500 text-sm">针对简答题和案例分析题，特别优化了分值分布和答题权重。</p>
      </div>
    </div>
  </div>
);

const FunctionsPanel: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 py-12">
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">核心考点看板</h2>
      <p className="text-slate-500">题库已收录以下三大模块的 40+ 知识点。</p>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {MANAGEMENT_FUNCTIONS.map((func, idx) => (
        <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-transform hover:-translate-y-1">
          <div className="bg-slate-900 p-8 text-white flex justify-center items-center">
            <i className={`fa-solid ${func.icon} text-5xl`}></i>
          </div>
          <div className="p-6">
            <h4 className="font-bold text-xl mb-3">{func.name}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{func.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('LANDING');
  const [examSession, setExamSession] = useState<ExamSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGrading, setIsGrading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200);

  // Helper to shuffle array
  const shuffle = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Start Exam with Randomization
  const handleStartExam = () => {
    // 1. Group questions by type
    const defs = QUESTION_POOL.filter(q => q.type === QuestionType.DEFINITION);
    const sas = QUESTION_POOL.filter(q => q.type === QuestionType.SHORT_ANSWER);
    const cases = QUESTION_POOL.filter(q => q.type === QuestionType.CASE_STUDY);

    // 2. Shuffle and pick
    const selectedDefs = shuffle(defs).slice(0, 5);
    const selectedSAs = shuffle(sas).slice(0, 5);
    const selectedCases = shuffle(cases).slice(0, 4);

    // 3. Assemble paper
    const selectedQuestions = [...selectedDefs, ...selectedSAs, ...selectedCases];

    const session: ExamSession = {
      id: Date.now().toString(),
      startTime: Date.now(),
      questions: selectedQuestions,
      answers: {},
      isCompleted: false
    };

    setExamSession(session);
    setMode('EXAM');
    setCurrentQuestionIndex(0);
    setTimeLeft(7200);
  };

  useEffect(() => {
    if (mode !== 'EXAM' || !examSession || examSession.isCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, examSession]);

  const handleAnswerChange = (qId: string, val: string) => {
    if (!examSession) return;
    setExamSession({
      ...examSession,
      answers: { ...examSession.answers, [qId]: val }
    });
  };

  const handleSubmitExam = async () => {
    if (!examSession) return;
    setIsGrading(true);
    setMode('REVIEW');
    
    // Pass the specific questions of this session for grading
    const results = await gradeExam(examSession.questions, examSession.answers);
    
    setExamSession({
      ...examSession,
      isCompleted: true,
      score: results.totalScore,
      feedback: results.feedback,
      gradedResults: results.results
    });
    setIsGrading(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = examSession?.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar mode={mode} setMode={setMode} />
      
      <main className="flex-grow">
        {mode === 'LANDING' && <Landing onStart={handleStartExam} />}
        {mode === 'ANALYTICS' && <FunctionsPanel />}

        {mode === 'EXAM' && currentQuestion && examSession && (
          <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                <div className="mb-6 text-center">
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">剩余时间</div>
                  <div className={`text-3xl font-mono font-bold ${timeLeft < 600 ? 'text-red-500' : 'text-slate-800'}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase">名词解释 (1-5)</div>
                    <div className="grid grid-cols-5 gap-2">
                      {[0,1,2,3,4].map(idx => (
                        <button 
                          key={idx}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${
                            currentQuestionIndex === idx 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                            : examSession.answers[examSession.questions[idx].id] 
                              ? 'bg-green-50 text-green-600 border-green-200' 
                              : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase">简答题 (6-10)</div>
                    <div className="grid grid-cols-5 gap-2">
                      {[5,6,7,8,9].map(idx => (
                        <button 
                          key={idx}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${
                            currentQuestionIndex === idx 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                            : examSession.answers[examSession.questions[idx].id] 
                              ? 'bg-green-50 text-green-600 border-green-200' 
                              : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase">案例分析 (11-14)</div>
                    <div className="grid grid-cols-4 gap-2">
                      {[10,11,12,13].map(idx => (
                        <button 
                          key={idx}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${
                            currentQuestionIndex === idx 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                            : examSession.answers[examSession.questions[idx].id] 
                              ? 'bg-green-50 text-green-600 border-green-200' 
                              : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleSubmitExam}
                  className="w-full mt-8 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors border border-red-100 shadow-sm"
                >
                  确认交卷
                </button>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      currentQuestion.type === QuestionType.DEFINITION ? 'bg-blue-100 text-blue-700' :
                      currentQuestion.type === QuestionType.SHORT_ANSWER ? 'bg-purple-100 text-purple-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {currentQuestion.type === QuestionType.DEFINITION ? '名词解释' :
                       currentQuestion.type === QuestionType.SHORT_ANSWER ? '简答题' : '案例分析'}
                    </span>
                    <h2 className="font-bold text-slate-800">{currentQuestion.content.length > 20 ? '论述题' : currentQuestion.content}</h2>
                  </div>
                  <div className="text-sm font-medium text-slate-500">分值: {currentQuestion.score}</div>
                </div>

                <div className="p-8 flex-grow">
                  <div className="text-xl font-semibold text-slate-900 mb-8 leading-relaxed">
                    {currentQuestion.content}
                  </div>
                  <textarea 
                    key={currentQuestion.id}
                    defaultValue={examSession.answers[currentQuestion.id] || ''}
                    onBlur={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    placeholder="请在这里输入您的详细回答..."
                    className="w-full h-80 p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-lg resize-none"
                  ></textarea>
                </div>

                <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="flex items-center space-x-2 px-6 py-2 rounded-xl text-slate-500 font-bold hover:bg-slate-100 disabled:opacity-30"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>上一题</span>
                  </button>
                  <button 
                    disabled={currentQuestionIndex === examSession.questions.length - 1}
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all disabled:opacity-30"
                  >
                    <span>下一题</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === 'REVIEW' && examSession && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            {isGrading ? (
              <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-100">
                <div className="relative inline-block mb-8">
                   <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <i className="fa-solid fa-graduation-cap text-indigo-600 text-2xl"></i>
                   </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">正在进行多维度分析...</h2>
                <p className="text-slate-500">Gemini AI 正在对比 40+ 知识点库为您精准打分</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 text-center">
                  <div className="text-indigo-600 text-6xl font-black mb-4">{(examSession.score || 0).toFixed(1)} <span className="text-2xl text-slate-300 font-medium">/ 100</span></div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">本次练习评价</h2>
                  <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto italic">
                    "{examSession.feedback}"
                  </p>
                  <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center gap-4">
                     <button onClick={handleStartExam} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md">再练一套新题</button>
                     <button onClick={() => setMode('LANDING')} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">回到首页</button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 px-2">知识点反馈详情</h3>
                  {examSession.questions.map((q, idx) => {
                    const graded = examSession.gradedResults?.find(r => r.questionId === q.id);
                    return (
                      <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                          <span className="font-bold text-slate-700">第 {idx + 1} 题: {q.type === QuestionType.CASE_STUDY ? q.title : q.content}</span>
                          <span className={`font-black ${graded && graded.score < q.score * 0.6 ? 'text-red-500' : 'text-green-600'}`}>
                            {graded?.score || 0} / {q.score}
                          </span>
                        </div>
                        <div className="p-6 space-y-4">
                          <div>
                            <div className="text-xs font-bold text-slate-400 mb-1 uppercase">题目详情</div>
                            <div className="text-slate-900 font-medium">{q.content}</div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                              <div className="text-xs font-bold text-slate-400 mb-2 uppercase">您的回答</div>
                              <div className="text-slate-600 whitespace-pre-wrap text-sm">{examSession.answers[q.id] || '(未作答)'}</div>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                              <div className="text-xs font-bold text-indigo-400 mb-2 uppercase">AI 教授点拨</div>
                              <div className="text-indigo-900 whitespace-pre-wrap text-sm leading-relaxed">{graded?.feedback || '暂无评语'}</div>
                            </div>
                          </div>
                          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                             <div className="text-xs font-bold text-green-500 mb-2 uppercase">考纲参考答案</div>
                             <div className="text-green-800 italic text-sm">{q.suggestedAnswer}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 mb-4">
               <i className="fa-solid fa-shield-halved"></i>
               <span className="font-bold">备考申明</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              随机组卷模式通过算法确保每个知识点都有概率出现在您的试卷中。建议多次练习，以覆盖所有 40+ 重点名词解释和简答题。
            </p>
          </div>
          <div className="text-right">
             <div className="text-slate-400 text-sm mb-2">Designed for Mastery</div>
             <div className="text-slate-900 font-bold">Management Exam Pro v3.0 (Randomized)</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
